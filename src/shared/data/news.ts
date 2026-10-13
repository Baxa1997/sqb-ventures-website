import type { NewsItem } from '@shared/types';

/* Sample content. Russian and Uzbek bodies fall back to English until they are written. */
export const NEWS: NewsItem[] = [
  {
    id: 'n1',
    date: '2026-09-18',
    category: 'Fund',
    t: {
      en: {
        title: 'Investment committee to review two companies on 15 October',
        excerpt: 'Zavod OS and Quyosh Grid have completed due diligence and move to the committee stage.',
        body: '<p>Two companies from the current pipeline have finished legal, financial and technical review. Both will present to the investment committee on 15 October.</p><p>Founders receive the committee decision in writing within five working days of the session.</p>',
      },
      ru: {
        title: 'Инвестиционный комитет рассмотрит две компании 15 октября',
        excerpt: 'Zavod OS и Quyosh Grid завершили due diligence и переходят на этап комитета.',
      },
      uz: {
        title: 'Investitsiya qo‘mitasi 15-oktabrda ikki kompaniyani ko‘rib chiqadi',
        excerpt: 'Zavod OS va Quyosh Grid due diligence bosqichini yakunladi.',
      },
    },
  },
  {
    id: 'n2',
    date: '2026-08-27',
    category: 'Portfolio',
    t: {
      en: {
        title: 'Nasiya Hub acquired by a regional payments group',
        excerpt: 'The first exit from the SQB Ventures portfolio closes two years after the investment.',
        body: '<p>Nasiya Hub, which builds instalment payment infrastructure for offline retailers, has been acquired. The fund sold its full stake as part of the transaction.</p><p>The team stays in Tashkent and continues to run the product.</p>',
      },
      ru: {
        title: 'Nasiya Hub приобретена региональной платёжной группой',
        excerpt: 'Первый выход из портфеля SQB Ventures состоялся через два года после инвестиции.',
      },
      uz: {
        title: 'Nasiya Hub mintaqaviy to‘lov guruhi tomonidan sotib olindi',
        excerpt: 'SQB Ventures portfelidan birinchi chiqish investitsiyadan ikki yil o‘tib amalga oshdi.',
      },
    },
  },
  {
    id: 'n3',
    date: '2026-07-09',
    category: 'Events',
    t: {
      en: {
        title: 'Open pitch day for industrial and green technology founders',
        excerpt: 'Ten teams will pitch to the fund and to SQB corporate clients looking for pilots.',
        body: '<p>The pitch day is open to teams with a working product and first customers. Each team gets seven minutes and a follow-up meeting with an investment manager.</p>',
      },
      ru: {
        title: 'Открытый питч-день для основателей в сфере промышленных и зелёных технологий',
        excerpt: 'Десять команд выступят перед фондом и корпоративными клиентами SQB.',
      },
      uz: {
        title: 'Sanoat va yashil texnologiyalar asoschilari uchun ochiq pitch-kun',
        excerpt: 'O‘nta jamoa fond va SQB korporativ mijozlari oldida chiqish qiladi.',
      },
    },
  },
  {
    id: 'n4',
    date: '2026-05-21',
    category: 'Portfolio',
    t: {
      en: {
        title: 'Omborly rolls out to 40 distributor warehouses',
        excerpt:
          'The warehouse software company doubled its customer base in the six months after the round.',
        body: '<p>Omborly now runs in 40 warehouses across five regions. The company used part of the round to build offline mode for sites with unstable connectivity.</p>',
      },
      ru: {
        title: 'Omborly внедрён на 40 складах дистрибьюторов',
        excerpt: 'Компания удвоила клиентскую базу за шесть месяцев после раунда.',
      },
      uz: {
        title: 'Omborly 40 ta distribyutor omborida ishga tushdi',
        excerpt: 'Kompaniya raunddan keyingi olti oyda mijozlar bazasini ikki barobar oshirdi.',
      },
    },
  },
  {
    id: 'n5',
    date: '2026-03-12',
    category: 'Fund',
    t: {
      en: {
        title: 'How we run due diligence, step by step',
        excerpt: 'What we ask for, who reviews it and how long each part takes.',
        body: '<p>Due diligence covers four areas: corporate and legal, finance, product and technology, and the team. Founders upload documents to a shared data room, and each area has a named reviewer.</p><p>We publish this so founders can prepare before they apply.</p>',
      },
      ru: {
        title: 'Как мы проводим due diligence: шаг за шагом',
        excerpt: 'Что мы запрашиваем, кто проверяет и сколько времени занимает каждый этап.',
      },
      uz: {
        title: 'Due diligence qanday o‘tkaziladi: bosqichma-bosqich',
        excerpt: 'Nimalar so‘raladi, kim tekshiradi va har bir bosqich qancha vaqt oladi.',
      },
    },
  },
  {
    id: 'n6',
    date: '2026-01-28',
    category: 'Portfolio',
    t: {
      en: {
        title: 'Paxta Link joins the portfolio',
        excerpt:
          'A pre-seed investment in logistics planning for agricultural clusters in the Fergana Valley.',
        body: '<p>Paxta Link connects cotton and grain clusters with processors and plans truck loads between them. The investment funds the first full harvest season on the platform.</p>',
      },
      ru: {
        title: 'Paxta Link вошла в портфель фонда',
        excerpt: 'Pre-seed инвестиция в планирование логистики для аграрных кластеров Ферганской долины.',
      },
      uz: {
        title: 'Paxta Link fond portfeliga qo‘shildi',
        excerpt: 'Farg‘ona vodiysidagi agroklasterlar logistikasiga pre-seed investitsiya.',
      },
    },
  },
  {
    id: 'press-1',
    date: '2026-09-05',
    category: 'Press',
    outlet: 'Sample entry',
    url: '',
    t: {
      en: {
        title: 'Sample press mention: replace with a real publication',
        excerpt:
          'Add each article that mentions SQB Ventures as a news item with the category Press. It appears here with the name of the outlet and a link.',
        body: '<p>This is a sample entry for the Newsroom. Replace it with a link to the publication.</p>',
      },
      ru: {
        title: 'Пример упоминания в прессе: замените реальной публикацией',
        excerpt:
          'Добавляйте каждую статью, где упоминается SQB Ventures, как новость с категорией Press. Она появится здесь с названием издания и ссылкой.',
      },
      uz: {
        title: 'Matbuotdagi eslatma namunasi: haqiqiy nashr bilan almashtiring',
        excerpt:
          'SQB Ventures tilga olingan har bir maqolani Press toifasidagi yangilik sifatida qo‘shing. U shu yerda nashr nomi va havolasi bilan ko‘rinadi.',
      },
    },
  },
];
