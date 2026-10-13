import type { Owner, Startup, StartupStatus } from '@shared/types';

/* Sample content. Replace with data from the fund's CRM. */
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
    'Kredo Score',
    'fintech',
    'Seed',
    'invested',
    'Tashkent',
    500000,
    '2025-04-17',
    'Credit scoring for small retailers built on cash-register and payment data, sold to banks and microfinance organisations.',
    [
      ['Jasur Rakhimov', 'CEO', 46],
      ['Malika Yusupova', 'CTO', 30],
      ['Employee option pool', 'ESOP', 9],
      ['SQB Ventures', 'Investor', 15],
    ],
  ],
  [
    'Omborly',
    'saas',
    'Seed',
    'invested',
    'Tashkent',
    750000,
    '2025-06-12',
    'Warehouse management software for distributors: receiving, picking and stock counts from a phone.',
    [
      ['Bekzod Aliev', 'CEO', 52],
      ['Sherzod Nazarov', 'COO', 28],
      ['SQB Ventures', 'Investor', 20],
    ],
  ],
  [
    'Paxta Link',
    'agrotech',
    'Pre-seed',
    'invested',
    'Fergana',
    200000,
    '2025-09-04',
    'Marketplace and logistics planning that connects cotton and grain clusters with processors.',
    [
      ['Dilshod Ergashev', 'CEO', 60],
      ['Nodira Karimova', 'CPO', 28],
      ['SQB Ventures', 'Investor', 12],
    ],
  ],
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
    'Nasiya Hub',
    'fintech',
    'Series A',
    'exit',
    'Tashkent',
    1000000,
    '2024-06-06',
    'Instalment payments infrastructure for offline retailers. Acquired by a regional payments group in 2026.',
    [
      ['Bobur Hamidov', 'CEO', 44],
      ['Gulnora Ahmedova', 'CTO', 26],
      ['Strategic acquirer', 'Investor', 30],
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

export const STARTUPS: Startup[] = ROWS.map(
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

export const startupById = (id: string) => STARTUPS.find((s) => s.id === id);
