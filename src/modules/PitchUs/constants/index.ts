export const DRAFT_KEY = 'sqbv_pitch_draft';
export const MAX_DECK_BYTES = 20 * 1024 * 1024;
export const STEPS = ['About you', 'Your startup', 'Share pitch deck'] as const;
export const STAGES = ['Pre-seed', 'Seed', 'Pre-Series A', 'Series A'];
export const HEARD_FROM = [
  'Telegram',
  'Social media',
  'Search',
  'AI assistant',
  'Media',
  'Event',
  'Recommendation',
  'Other',
];
export const FAQ = [
  [
    'How will I know the result?',
    'In your Founder Account the application shows one of four statuses: Awaiting review, Reviewed, Accepted or Rejected. We also write to your email.',
  ],
  ['Do we need revenue to apply?', 'No, but you need a working product and evidence that people use it.'],
  [
    'What do you ask for after the first review?',
    'Teams we invite fill in a longer questionnaire in the Founder Account: team and cap table, metrics, market, finance and risks. Documents for due diligence are uploaded to a data room at that stage, not now.',
  ],
  [
    'What happens after a rejection?',
    'You receive the reasons in writing and can apply again after six months or when the situation of the company changes.',
  ],
] as const;
