import {
  Globe,
  GraduationCap,
  Handshake,
  Landmark,
  PlugZap,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

/** What founders get besides money: the moving row on Home, the grid on For Founders. */
export const BENEFITS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Landmark,
    title: 'Pilots with the bank',
    text: 'Test your product inside SQB or with its corporate clients, with a named sponsor on the bank’s side.',
  },
  {
    icon: PlugZap,
    title: 'Integrations',
    text: 'Connect to the bank’s payment, lending and data infrastructure instead of building it yourself.',
  },
  {
    icon: GraduationCap,
    title: 'Mentorship',
    text: 'Work with practitioners in finance, risk, compliance, sales and hiring.',
  },
  {
    icon: TrendingUp,
    title: 'Follow-on investment',
    text: 'We reserve capital for your next rounds and bring co-investors to them.',
  },
  {
    icon: Globe,
    title: 'New markets',
    text: 'Enter Central Asia, the CIS and the Gulf through our partners and portfolio network.',
  },
  {
    icon: Handshake,
    title: 'Introductions',
    text: 'Meet the regulators, corporate buyers and investors you need to reach.',
  },
];

export const PROCESS = [
  ['Application', 'Fill in the short form and attach your pitch deck.'],
  ['Screening', 'An investment manager reviews the application and calls the founders.'],
  ['Due diligence', 'Legal, financial and technical review through a shared data room.'],
  ['Investment committee', 'Founders present. The committee decides and sets the terms.'],
  ['Investment', 'Documents are signed, funds are transferred and reporting begins.'],
] as const;

export const ROTATING_WORDS = ['Pilots,', 'Integrations,', 'Mentorship,', 'New markets,'];
