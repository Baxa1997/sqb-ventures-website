import type { ReactNode } from 'react';
import { Words } from './Words';

interface PageHeadProps {
  title: string;
  lede?: string;
  className?: string;
  children?: ReactNode;
}

export function PageHead({ title, lede, className, children }: PageHeadProps) {
  return (
    <section className={className ? `pagehead ${className}` : 'pagehead'}>
      <div className="wrap">
        <h1 className="words">
          <Words text={title} />
        </h1>
        {lede && <p>{lede}</p>}
        {children}
      </div>
    </section>
  );
}
