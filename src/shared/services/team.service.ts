import 'server-only';
import { cache } from 'react';
import { listAll } from '@shared/api/ucode';
import { isVisible, sortOrder, toTeamMember } from '@shared/api/ucode/mappers';
import { TEAM } from '@shared/data';
import type { TeamMember } from '@shared/types';
import { fromSource } from './source';

/** The people shown on the About page. */
export const getTeam = cache(() =>
  fromSource<TeamMember[]>(
    'team',
    async () =>
      (await listAll('team', { cacheTags: ['team'] })).filter(isVisible).sort(sortOrder).map(toTeamMember),
    () => TEAM,
    [],
  ),
);
