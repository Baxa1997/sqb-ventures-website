import type { Localized, PortfolioEntry } from '@shared/types';
import { STARTUPS } from './startups';

type Text = Localized<{ tagline?: string; quote?: string }>;

/* What each portfolio company does, in every language the site speaks. */
const TEXT: Record<string, Text> = {
  Clockster: {
    en: {
      tagline:
        'Clockster builds frontline workforce management software that automates business processes. Its mission is to make every employee more effective: not tighter control or cuts, but more purpose and discipline per person. HR teams stop spending time on routine such as shift scheduling and payroll calculation. Hire, work, and the system does the rest.',
    },
    ru: {
      tagline:
        'Clockster развивает решения для управления линейным персоналом и автоматизирует процессы бизнеса. Миссия компании — повысить эффективность каждого сотрудника: не жесткий контроль или сокращения, а больше смысла и дисциплины на человека. HR-специалисты больше не тратят время на рутину — распределение смен и расчет зарплат. Нанимай, работай, а система сделает остальное.',
    },
    uz: {
      tagline:
        'Clockster chiziqli xodimlarni boshqarish yechimlarini ishlab chiqadi va biznes jarayonlarini avtomatlashtiradi. Kompaniya missiyasi — har bir xodim samaradorligini oshirish: qattiq nazorat yoki qisqartirish emas, balki har bir insonga ko‘proq ma’no va intizom. HR mutaxassislari smenalarni taqsimlash va ish haqini hisoblash kabi muntazam ishlarga vaqt sarflamaydi. Ishga oling, ishlang, qolganini tizim bajaradi.',
    },
  },
  Verifix: {
    en: {
      tagline:
        'Verifix is an HRM platform that meets the requirements of Uzbek law for digital signatures and document storage and management. It automates document flow, cuts costs and makes internal processes transparent, so a business can drop paper entirely. The SaaS also covers time tracking, workforce data collection and faster hiring.',
    },
    ru: {
      tagline:
        'Verifix — HRM-платформа, соответствующая требованиям законодательства Узбекистана в части цифровой подписи, хранения и управления документами. Решение автоматизирует документооборот, снижает издержки и повышает прозрачность внутренних процессов, позволяя полностью отказаться от бумаги. По модели SaaS стартап также предоставляет учет рабочего времени, сбор данных о персонале и ускоренный найм.',
    },
    uz: {
      tagline:
        'Verifix — raqamli imzo, hujjatlarni saqlash va boshqarish bo‘yicha O‘zbekiston qonunchiligi talablariga mos HRM platformasi. Yechim hujjat aylanishini avtomatlashtiradi, xarajatlarni kamaytiradi va ichki jarayonlarni shaffof qiladi, biznes qog‘ozdan butunlay voz kechishi mumkin. SaaS modeli bo‘yicha ish vaqtini hisobga olish, xodimlar haqida ma’lumot yig‘ish va tezkor yollash ham taqdim etiladi.',
    },
  },
  Robosell: {
    en: {
      tagline:
        'Robosell brings the key e-commerce processes into one ecosystem. Entrepreneurs launch a website, a Telegram bot and a mini-app from a single admin panel and connect payments, delivery, CRM, analytics and other services. Robosell built a mini-app for businesses inside the Click Super App, giving merchants instant access to millions of users without building their own mobile app.',
    },
    ru: {
      tagline:
        'Robosell объединяет все ключевые процессы электронной коммерции в одной экосистеме. Предприниматели создают сайт, Telegram-бот и мини-приложение с единой админ-панели и подключают платежные системы, доставку, CRM, аналитику и другие сервисы. Robosell создал мини-приложение для бизнеса внутри Click Super App — это дает предпринимателям мгновенный доступ к миллионам пользователей без разработки собственного мобильного приложения.',
    },
    uz: {
      tagline:
        'Robosell elektron tijoratning barcha asosiy jarayonlarini yagona ekotizimga birlashtiradi. Tadbirkorlar bitta admin panel orqali sayt, Telegram-bot va mini-ilova yaratadi, to‘lov tizimlari, yetkazib berish, CRM, analitika va boshqa xizmatlarni ulaydi. Robosell Click Super App ichida biznes uchun mini-ilova yaratdi — bu tadbirkorlarga o‘z mobil ilovasini ishlab chiqmasdan millionlab foydalanuvchilarga darhol chiqish imkonini beradi.',
    },
  },
  Tezbor: {
    en: {
      tagline:
        'Tezbor builds and runs transport and mobility solutions. Its AI-based mobility and logistics platform (MaaS + DaaS) offers an API, mobile apps, dashboards and Telegram bots that solve delivery for businesses, whether they move people or goods. The team also advises companies on optimising processes to grow e-commerce sales.',
    },
    ru: {
      tagline:
        'Tezbor — технологическая компания, которая создает и эксплуатирует транспортные и мобильные решения. Платформа мобильности и логистики на базе искусственного интеллекта (MaaS + DaaS) предоставляет API, мобильные приложения, панели управления и Telegram-боты для задач доставки бизнеса — будь то перемещение людей или товаров. Команда также консультирует компании по оптимизации процессов для роста продаж в электронной коммерции.',
    },
    uz: {
      tagline:
        'Tezbor — transport va mobil yechimlarni yaratuvchi va ishlatuvchi texnologik kompaniya. Sun’iy intellektga asoslangan mobillik va logistika platformasi (MaaS + DaaS) biznesning yetkazib berish vazifalari uchun API, mobil ilovalar, boshqaruv panellari va Telegram-botlarni taqdim etadi — odamlarni yoki tovarlarni tashishda. Jamoa kompaniyalarga elektron tijoratda savdoni oshirish uchun jarayonlarni optimallashtirish bo‘yicha maslahat ham beradi.',
    },
  },
  Recepta: {
    en: {
      tagline:
        'Recepta automates issuing and collecting digital receipts for every card purchase, removing the need for paper. Customisable receipts arrive via NFC tap or QR code in Apple Wallet, Google Pay or the browser with no extra app to install. The ecosystem includes receipt-based loyalty programmes and lotteries, the Sandiq consumer app, a merchant portal, and Sand IQ data products for government. It serves retail, delivery, travel, food service and healthcare.',
    },
    ru: {
      tagline:
        'Recepta автоматизирует создание и сбор цифровых чеков для всех транзакций по картам, исключая необходимость в бумажных чеках. Настраиваемые чеки приходят через NFC (Tap) и QR-коды в Apple Wallet, Google Pay или браузер без установки отдельного приложения. В экосистему входят программы лояльности и лотереи на основе чеков, потребительское приложение Sandiq, портал для мерчантов и решения для государственных структур и монетизации данных Sand IQ. Сферы применения: розничная торговля, доставка, путешествия, общепит и здравоохранение.',
    },
    uz: {
      tagline:
        'Recepta har bir karta orqali xariddagi raqamli cheklarni yaratish va yig‘ishni avtomatlashtiradi, qog‘oz cheklarga ehtiyoj qolmaydi. Moslashtiriladigan cheklar NFC (Tap) va QR-kodlar orqali Apple Wallet, Google Pay yoki brauzerga alohida ilova o‘rnatmasdan keladi. Ekotizimga cheklarga asoslangan sodiqlik dasturlari va lotereyalar, Sandiq iste’molchi ilovasi, merchantlar portali hamda davlat tuzilmalari va ma’lumotlarni monetizatsiya qilish uchun Sand IQ kiradi. Qo‘llanish sohalari: chakana savdo, yetkazib berish, sayohat, umumiy ovqatlanish va sog‘liqni saqlash.',
    },
  },
  Redeem: {
    en: {
      tagline:
        'Redeem automates and controls corporate spending on fuel and related services. The platform joins companies, banks and gas stations in one digital ecosystem where every payment goes through an escrow account at a partner bank. Drivers pay for fuel in a mobile app, and the system distributes the funds, generates invoices with AI and shows the data in the admin panels of both the client and the gas station.',
    },
    ru: {
      tagline:
        'Redeem автоматизирует и контролирует корпоративные расходы на топливо и связанные с ним услуги. Платформа объединяет компании, банки и АЗС в единую цифровую экосистему, где все платежи проходят через счет эскроу в банке-партнере. Водители оплачивают топливо через мобильное приложение, а система автоматически распределяет средства, генерирует счета-фактуры с помощью искусственного интеллекта и отображает данные в админ-панелях клиента и АЗС.',
    },
    uz: {
      tagline:
        'Redeem korporativ yoqilg‘i va unga bog‘liq xizmatlar xarajatlarini avtomatlashtiradi va nazorat qiladi. Platforma kompaniyalar, banklar va yoqilg‘i quyish shoxobchalarini yagona raqamli ekotizimga birlashtiradi, barcha to‘lovlar hamkor bankdagi eskrou hisobi orqali o‘tadi. Haydovchilar yoqilg‘i uchun mobil ilova orqali to‘laydi, tizim esa mablag‘larni avtomatik taqsimlaydi, sun’iy intellekt yordamida hisob-fakturalar yaratadi va ma’lumotlarni mijoz hamda shoxobcha admin panellarida ko‘rsatadi.',
    },
  },
};

export const PORTFOLIO: PortfolioEntry[] = STARTUPS.filter(
  (s) => s.status === 'invested' || s.status === 'exit',
).map((s, i) => ({
  id: `f${i + 1}`,
  startupId: s.id,
  order: i + 1,
  year: s.committeeDate.slice(0, 4),
  founder: s.owners[0]?.name ?? '',
  founderRole: s.owners[0]?.role ?? '',
  founderLinkedin: '',
  t: TEXT[s.name] ?? { en: { tagline: s.description } },
}));
