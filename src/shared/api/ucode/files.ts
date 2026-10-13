import 'server-only';
import { ucodeFetch } from './client';
import { UCODE } from './config';

interface UploadResponse {
  data?: { id?: string; link?: string; file_name_download?: string; file_size?: number };
}

/** POST /v1/files/folder_upload — stores a file in ucode Files and returns its link. */
export async function uploadFile(file: File, folder: string = UCODE.decksFolder) {
  const form = new FormData();
  form.append('file', file, file.name);
  const res = await ucodeFetch<UploadResponse>({
    method: 'POST',
    path: '/v1/files/folder_upload',
    query: { folder_name: folder, 'project-id': UCODE.projectId || undefined },
    body: form,
  });
  if (!res.data?.link) throw new Error('ucode file upload returned no link');
  return { id: res.data.id ?? '', link: res.data.link, name: res.data.file_name_download ?? file.name };
}
