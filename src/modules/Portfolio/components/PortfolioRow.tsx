import { ArrowUpRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import type { Row } from '../helpers';

export function PortfolioRow({ row, href, statusLabel }: { row: Row; href: string; statusLabel: string }) {
  return (
    <Link className="pf-row" href={href}>
      <span className="logo">{row.initials}</span>
      <span className="pf-name">
        <b>{row.name}</b>
        <span className={row.status === 'Exited' ? 'st exit' : 'st active'}>{statusLabel}</span>
      </span>
      <span className="pf-text">{row.text}</span>
      <span className="pf-geo">
        <MapPin />
        <span>{row.geo}</span>
      </span>
      <span className="tags">
        <span className="tag">{row.sectorName}</span>
        <span className="tag plain">{row.stage}</span>
      </span>
      <ArrowUpRight className="go" />
    </Link>
  );
}
