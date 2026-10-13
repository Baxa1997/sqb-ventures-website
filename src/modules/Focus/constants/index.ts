import {
  BrainCircuit,
  Compass,
  CreditCard,
  MapPin,
  Plane,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';

export const FACTS = [
  ['Stage', 'Seed & Pre-Series A'],
  ['Amount', '$50K – $500K'],
  ['Instrument', 'SAFE, convertible note, equity'],
  ['Stake', 'Minority, 5–15%'],
] as const;

export const SECTORS: { icon: LucideIcon; title: string; points: [string, string][] }[] = [
  {
    icon: CreditCard,
    title: 'FinTech & Embedded Finance',
    points: [
      ['What we look for', 'Payment infrastructure, B2B fintech and embedded financial services.'],
      [
        'Our edge',
        'Access to the banking expertise and resources of SQB gives portfolio companies a distribution advantage no other fund can offer.',
      ],
    ],
  },
  {
    icon: BrainCircuit,
    title: 'B2B SaaS & Vertical AI',
    points: [
      [
        'What we look for',
        'AI-first products built for specific industries of the region, such as logistics and retail.',
      ],
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Marketplaces & E-commerce',
    points: [
      ['What we look for', 'Marketplaces with real liquidity, B2B platforms and cross-border commerce.'],
      ['Our focus', 'Companies built deep into the supply chains of Uzbekistan and the CIS.'],
    ],
  },
];

export const ANTI_THESIS = [
  'Speculative Crypto and Web3 products and classic retail trading',
  'Template wrappers over LLMs with no access to unique proprietary data',
  'Purely consumer apps with no network effect',
  'Complex hardware without first commercial contracts and sales',
  'Idea-stage projects whose founders lack deep expertise in the industry',
  'Business models with no clear way to make money within three years',
];

export const GEOGRAPHY: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MapPin, title: 'Core focus', text: 'Central Asia is our home market and the main one.' },
  {
    icon: Compass,
    title: 'Window of opportunity',
    text: 'Southeast Asia, the UAE, Turkey, Georgia, Armenia and the United States, when the business has strategic ties with the CIS and Central Asia or is expanding there.',
  },
  {
    icon: Plane,
    title: 'Special focus',
    text: 'Global founders from our region who scale their products in the CIS and Central Asia.',
  },
];

export const THREE_YES = [
  [
    'Value beyond money',
    'We invest only where we can give a growth lever other funds do not have: exclusive distribution, partnerships or infrastructure.',
  ],
  [
    'Partnership and synergy',
    'We look for founders who are ready for an open dialogue, joint work at board level and an exchange of expertise.',
  ],
  ['A bridge to the next rounds', 'We commit to helping companies raise follow-on capital and scale.'],
] as const;
