import type { Owner, Startup, StartupStatus } from '@shared/types';

/* Companies SQB Ventures has invested in. Stage, amount, founders and websites are filled in from the CRM. */
// name, industry, description
const INVESTED: [string, string, string][] = [
  [
    'Clockster',
    'saas',
    'Frontline workforce management: shift scheduling, payroll automation and the HR routine handled by the system.',
  ],
  [
    'Verifix',
    'saas',
    'HRM SaaS compliant with Uzbek law: e-signature, digital documents, time tracking and faster hiring.',
  ],
  [
    'Robosell',
    'e-commerce',
    'All-in-one e-commerce platform: website, Telegram bot, mini-app, payments and CRM from one admin panel, with a mini-app inside the Click Super App.',
  ],
  [
    'Tezbor',
    'logistics',
    'AI-based mobility and logistics platform (MaaS + DaaS) with an API, apps, dashboards and Telegram bots for moving people and goods.',
  ],
  [
    'Recepta',
    'fintech',
    'Digital receipts via NFC and QR for Apple Wallet and Google Pay, plus loyalty programmes, the Sandiq consumer app and Sand IQ data products.',
  ],
  [
    'Redeem',
    'fintech',
    'Corporate fuel expense platform that connects companies, banks and gas stations through an escrow account at a partner bank.',
  ],
];

/* Sample pipeline content. Replace with data from the fund's CRM. */
type Row = [
  string,
  string,
  string,
  StartupStatus,
  string,
  number,
  string,
  string,
  [string, string, number][],
];

// name, industry, stage, status, city, invested, committee date, description, owners
const ROWS: Row[] = [
  [
    'Zavod OS',
    'industrial-tech',
    'Series A',
    'committee',
    'Tashkent',
    0,
    '2026-10-15',
    'Production planning and equipment monitoring for mid-size factories, with sensors retrofitted on existing lines.',
    [
      ['Rustam Tursunov', 'CEO', 41],
      ['Aziz Khamidov', 'CTO', 33],
      ['Angel investors', 'Investors', 18],
      ['Employee option pool', 'ESOP', 8],
    ],
  ],
  [
    'Hisobchi AI',
    'ai',
    'Seed',
    'dd',
    'Tashkent',
    0,
    '',
    'An accounting assistant that reads primary documents and prepares tax reports for small businesses in Uzbek and Russian.',
    [
      ['Kamola Saidova', 'CEO', 55],
      ['Timur Abdullaev', 'CTO', 45],
    ],
  ],
  [
    'Shifo Line',
    'healthtech',
    'Seed',
    'dd',
    'Samarkand',
    0,
    '',
    'Appointment booking and electronic records for private clinics outside the capital.',
    [
      ['Farrukh Ismoilov', 'CEO', 50],
      ['Zarina Mirzaeva', 'CMO', 25],
      ['Otabek Salimov', 'CTO', 25],
    ],
  ],
  [
    'Quyosh Grid',
    'greentech',
    'Seed',
    'committee',
    'Bukhara',
    0,
    '2026-10-15',
    'Rooftop solar financing and monitoring for small manufacturers, repaid through energy savings.',
    [
      ['Sardor Kholmatov', 'CEO', 48],
      ['Lola Rashidova', 'CFO', 32],
      ['Angel investors', 'Investors', 20],
    ],
  ],
  [
    'Darsxona',
    'edtech',
    'Pre-seed',
    'new',
    'Namangan',
    0,
    '',
    'After-school maths and coding courses delivered through a network of partner learning centres.',
    [
      ['Madina Tosheva', 'CEO', 70],
      ['Ulugbek Sodiqov', 'CTO', 30],
    ],
  ],
  [
    'Bozorchi',
    'e-commerce',
    'Seed',
    'new',
    'Tashkent',
    0,
    '',
    'Wholesale ordering app that lets neighbourhood shops restock from bazaars with next-day delivery.',
    [
      ['Anvar Juraev', 'CEO', 58],
      ['Shakhnoza Olimova', 'COO', 42],
    ],
  ],
  [
    "Sug'urta24",
    'insurtech',
    'Pre-seed',
    'new',
    'Tashkent',
    0,
    '',
    'Online motor and travel insurance comparison with instant policy issue.',
    [
      ['Ibrohim Qodirov', 'CEO', 65],
      ['Sevara Aminova', 'CTO', 35],
    ],
  ],
  [
    'Yuk Radar',
    'logistics',
    'Seed',
    'rejected',
    'Andijan',
    0,
    '2026-04-23',
    'Freight matching for regional truck owners and shippers.',
    [
      ['Javlon Umarov', 'CEO', 80],
      ['Akmal Tojiev', 'CTO', 20],
    ],
  ],
  [
    'Mahalla Pay',
    'fintech',
    'Pre-seed',
    'draft',
    'Tashkent',
    0,
    '',
    'Utility and community fee collection for housing associations.',
    [['Shoxrux Latipov', 'CEO', 100]],
  ],
];

const MANAGERS = ['Dilnoza Mamatova', 'Sanjar Ortiqov', 'Kamila Hasanova'];
const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '');
const isFounder = (o: Owner) => !/invest|esop|pool|acquir/i.test(`${o.role} ${o.name}`);
const login = (name: string, domain: string) =>
  `${name
    .toLowerCase()
    .replace(/[^a-z ]/g, '')
    .replace(/^(\w)\w* /, '$1.')}@${domain}`;

const invested: Startup[] = INVESTED.map(([name, industry, description], i) => ({
  id: `p${i + 1}`,
  name,
  industry,
  stage: '',
  status: 'invested',
  city: '',
  country: 'Uzbekistan',
  invested: 0,
  committeeDate: '',
  description,
  website: '',
  manager: MANAGERS[i % 3],
  owners: [],
  memberEmails: [],
}));

const pipeline: Startup[] = ROWS.map(
  ([name, industry, stage, status, city, invested, committeeDate, description, owners], i) => {
    const domain = `${slug(name)}.example`;
    const list = owners.map(([n, role, share]) => ({ name: n, role, share }));
    return {
      id: `s${i + 1}`,
      name,
      industry,
      stage,
      status,
      city,
      country: 'Uzbekistan',
      invested,
      committeeDate,
      description,
      website: `https://${domain}`,
      manager: MANAGERS[i % 3],
      owners: list,
      memberEmails: list.filter(isFounder).map((o) => login(o.name, domain)),
    };
  },
);

export const STARTUPS: Startup[] = [...invested, ...pipeline];

export const startupById = (id: string) => STARTUPS.find((s) => s.id === id);
