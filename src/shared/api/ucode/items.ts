import 'server-only';
import { ucodeFetch } from './client';
import { TABLES, type TableName } from './config';

/** A row in a ucode table. Every row has a guid; other fields are the table's field slugs. */
export type UcodeItem = { guid: string } & Record<string, unknown>;

export interface ListOptions {
  /** Field filters, e.g. { email: 'a@b.uz' } or { status: ['published'] } */
  filter?: Record<string, unknown>;
  search?: string;
  /** e.g. { date: -1 } for newest first */
  order?: Record<string, 1 | -1>;
  limit?: number;
  offset?: number;
  /** Fields to return (all when omitted). */
  fields?: string[];
  /** Cache tags for on-demand refresh; content reads are cached, form checks are not. */
  cacheTags?: string[];
}

interface ListResponse {
  data?: { data?: { count?: number; response?: UcodeItem[] } };
}
interface SingleResponse {
  data?: { data?: { response?: UcodeItem } };
}
interface CreateResponse {
  data?: { data?: UcodeItem };
}

const slug = (table: TableName) => encodeURIComponent(TABLES[table]);

/** GET /v2/items/{table}: a page of rows with the total count. */
export async function listItems(table: TableName, o: ListOptions = {}) {
  const limit = o.limit ?? 100;
  const offset = o.offset ?? 0;
  const data: Record<string, unknown> = { ...o.filter, limit, offset };
  if (o.search) data.search = o.search;
  if (o.order) data.order = o.order;
  if (o.fields) data.view_fields = o.fields;
  const res = await ucodeFetch<ListResponse>({
    path: `/v2/items/${slug(table)}`,
    query: { 'from-ofs': true, data: JSON.stringify(data), offset, limit },
    cache: o.cacheTags ? { tags: o.cacheTags } : undefined,
  });
  return { count: res.data?.data?.count ?? 0, items: res.data?.data?.response ?? [] };
}

/** GET /v2/items/{table}/{guid} */
export async function getItem(table: TableName, guid: string, cacheTags?: string[]) {
  const res = await ucodeFetch<SingleResponse>({
    path: `/v2/items/${slug(table)}/${encodeURIComponent(guid)}`,
    query: { 'from-ofs': true },
    cache: cacheTags ? { tags: cacheTags } : undefined,
  });
  return res.data?.data?.response;
}

/**
 * POST /v2/items/{table}. `runFunctions` lets the table's ucode functions (FaaS) run on the new row,
 * e.g. to create the Founder Account and email the login for a new application.
 */
export async function createItem(table: TableName, data: Record<string, unknown>, runFunctions = false) {
  const res = await ucodeFetch<CreateResponse>({
    method: 'POST',
    path: `/v2/items/${slug(table)}`,
    query: { 'from-ofs': !runFunctions },
    body: { data, disable_faas: !runFunctions },
  });
  return res.data?.data;
}

/** PUT /v2/items/{table} — data must include guid. */
export async function updateItem(table: TableName, data: UcodeItem, runFunctions = false) {
  return ucodeFetch<unknown>({
    method: 'PUT',
    path: `/v2/items/${slug(table)}`,
    query: { 'from-ofs': !runFunctions },
    body: { data, disable_faas: !runFunctions },
  });
}

/** DELETE /v2/items/{table}/{guid} */
export async function deleteItem(table: TableName, guid: string) {
  return ucodeFetch<unknown>({
    method: 'DELETE',
    path: `/v2/items/${slug(table)}/${encodeURIComponent(guid)}`,
    query: { 'from-ofs': true },
    body: { data: {} },
  });
}

/** Reads every row of a small table (content tables: a few hundred rows at most). */
export async function listAll(table: TableName, o: Omit<ListOptions, 'limit' | 'offset'> = {}) {
  const page = 200;
  const first = await listItems(table, { ...o, limit: page });
  const rows = [...first.items];
  for (let offset = page; offset < first.count && offset < 2000; offset += page)
    rows.push(...(await listItems(table, { ...o, limit: page, offset })).items);
  return rows;
}
