import { NextResponse } from 'next/server';
import { ucodeEnabled } from '@shared/api/ucode';

export const dynamic = 'force-dynamic';

/** GET /api/health — for load balancers and uptime checks. */
export const GET = () => NextResponse.json({ ok: true, ucode: ucodeEnabled() ? 'configured' : 'demo' });
