import { ArrowUpRight } from 'lucide-react';
import type { TFunction } from '@shared/i18n';
import type { Source } from '@shared/types';
import { external } from '@shared/utils';

export function SourceCard({ source, t }: { source: Source; t: TFunction }) {
  const url = external(source.url);
  const inner = (
    <>
      <h3>
        {source.name}
        {url && <ArrowUpRight />}
      </h3>
      {source.text && <p>{t(source.text)}</p>}
    </>
  );
  return url ? (
    <a className="src" href={url} target="_blank" rel="noopener">
      {inner}
    </a>
  ) : (
    <div className="src">{inner}</div>
  );
}
