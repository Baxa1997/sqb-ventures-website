'use client';

import type { Locale } from '@shared/i18n';
import { PitchFlow } from './PitchFlow';

export function InlinePitch({ locale }: { locale: Locale }) {
  return (
    <div className="panel pitch-inline" id="pitch">
      <PitchFlow
        locale={locale}
        onTop={() => document.getElementById('pitch')?.scrollIntoView({ block: 'start' })}
      />
    </div>
  );
}
