// DC2SC Comprehensive Trilingual Localization Dictionary (UK / EN / DE)

export interface LocaleDictionary {
  [key: string]: {
    uk: string;
    en: string;
    de: string;
  };
}

export const translations: LocaleDictionary = {
  // META TOPBAR
  'topbar.directory': {
    uk: 'DC2SC // ІНСТИТУЦІЙНИЙ РЕЄСТР ДОСЛІДЖЕНЬ',
    en: 'DC2SC // INSTITUTIONAL RESEARCH DIRECTORY',
    de: 'DC2SC // INSTITUTIONELLES FORSCHUNGSVERZEICHNIS',
  },
  'topbar.status': {
    uk: 'СТАТУС: КОНСЕНСУС ВАЛІДОВАНО',
    en: 'STATUS: CONSENSUS VALIDATED',
    de: 'STATUS: KONSENS VALIDIERTE',
  },
  'topbar.nodes': {
    uk: '12 ВУЗЛІВ ОНЛАЙН',
    en: '12 NODES ONLINE',
    de: '12 KNOTEN ONLINE',
  },

  // NAV
  'nav.research': {
    uk: 'Дослідження',
    en: 'Research',
    de: 'Forschung',
  },
  'nav.journal': {
    uk: 'Журнал',
    en: 'Journal',
    de: 'Journal',
  },
  'nav.goliaf': {
    uk: 'GOLIAF',
    en: 'GOLIAF',
    de: 'GOLIAF',
  },
  'nav.community': {
    uk: 'Спільнота',
    en: 'Community',
    de: 'Gemeinschaft',
  },
  'nav.about': {
    uk: 'Про проєкт',
    en: 'About',
    de: 'Über uns',
  },
  'nav.search': {
    uk: 'Пошук',
    en: 'Search',
    de: 'Suche',
  },
  'nav.donate': {
    uk: 'ДОНАТ',
    en: 'SUPPORT',
    de: 'SPENDEN',
  },
  'nav.specification': {
    uk: 'СПЕЦИФІКАЦІЯ',
    en: 'SPECIFICATION',
    de: 'SPEZIFIKATION',
  },

  // HERO
  'hero.eyebrow': {
    uk: 'DC2SC / Дослідження формування ринку на стороні покупця',
    en: 'DC2SC / Buyer-side market formation research',
    de: 'DC2SC / Käuferseitige Marktbildungsforschung',
  },
  'hero.headline': {
    uk: 'Більше вибору.<br/>Менше голосу.',
    en: 'More choice.<br/>Less voice.',
    de: 'Mehr Auswahl.<br/>Weniger Mitsprache.',
  },
  'hero.body': {
    uk: 'Цифрові ринки чудово зіставляють індивідуальні кліки з наявними пропозиціями. Але вони значно гірше допомагають незалежним людям висловлювати, координувати та захищати умови попиту, які вони поділяють.',
    en: 'Digital markets are good at matching individual clicks to existing offers. They are much worse at helping independent people express, coordinate and contest the terms of demand they may share.',
    de: 'Digitale Märkte stimmen individuelle Klicks effizient mit bestehenden Angeboten ab. Sie versagen jedoch dabei, unabhängigen Menschen zu helfen, gemeinsame Nachfragebedingungen zu artikulieren, zu koordinieren und durchzusetzen.',
  },
  'hero.sig1': {
    uk: 'Натовп — це увага.',
    en: 'A crowd is attention.',
    de: 'Eine Menge ist Aufmerksamkeit.',
  },
  'hero.sig2': {
    uk: 'Ринкова позиція — це суб\'єктність.',
    en: 'A market position is agency.',
    de: 'Eine Marktposition ist Handlungsfähigkeit.',
  },
  'hero.btn.explore': {
    uk: 'Дослідити програму',
    en: 'Explore the research',
    de: 'Forschung erkunden',
  },
  'hero.btn.journal': {
    uk: 'Читати журнал',
    en: 'Read the journal',
    de: 'Journal lesen',
  },

  // SIGNALS TEASER STREAM
  'signals.eyebrow': {
    uk: 'СИГНАЛИ ТА РЕПУБЛІКАЦІЇ // CURATED SIGNALS STREAM',
    en: 'CURATED SIGNALS & REPUBLICATION STREAM',
    de: 'KURATIERTE SIGNALE & REPUBLIKATIONS-STREAM',
  },
  'signals.title': {
    uk: 'Актуальні публікації, дискусії та препринти ринкової суб\'єктності',
    en: 'Live Discussions, Articles and Preprints on Buyer Agency',
    de: 'Aktuelle Publikationen, Diskussionen und Preprints zur Käufer-Handlungsfähigkeit',
  },
  'signals.lead': {
    uk: 'Автоматизований моніторинг Substack, Twitter/X, arXiv та Medium через Perplexity AI з конституційною верифікацією та чергою на републікацію.',
    en: 'Automated monitoring across Substack, Twitter/X, arXiv and Medium via Perplexity AI with constitutional verification and republication queue.',
    de: 'Automatisierte Überwachung von Substack, Twitter/X, arXiv und Medium via Perplexity AI mit verifizierter Publikationswarteschlange.',
  },
  'signals.filter.all': {
    uk: 'Всі джерела',
    en: 'All Sources',
    de: 'Alle Quellen',
  },

  // PROBLEM SECTION
  'problem.eyebrow': {
    uk: 'Структурна асиметрія',
    en: 'Structural asymmetry',
    de: 'Strukturelle Asymmetrie',
  },
  'problem.headline': {
    uk: 'Ринки бачать окремі сесії. Люди живуть у спільних умовах.',
    en: 'Markets see separate sessions. People live overlapping conditions.',
    de: 'Märkte sehen separate Sitzungen. Menschen leben in überlappenden Bedingungen.',
  },
  'problem.body': {
    uk: 'Люди можуть шукати, порівнювати та приймати рішення ефективно, проте все одно нести роботу, ризики та невизначеність участі в ринку наодинці. Спільні обставини не перетворюються автоматично на спільний авторитет, представництво чи колективну дію.',
    en: 'People may search, compare and decide efficiently while still carrying the work, risk and uncertainty of market participation alone. Shared circumstances do not automatically become shared authority, shared representation or collective action.',
    de: 'Menschen suchen, vergleichen und entscheiden effizient, tragen jedoch die Risiken und Unsicherheiten der Marktteilnahme weiterhin allein. Gemeinsame Umstände führen nicht automatisch zu gemeinsamer Repräsentanz oder kollektivem Handeln.',
  },
  'problem.footer': {
    uk: 'Цифрові ринки оптимізують окремі сесії. Вони не спостерігають спільних умов.',
    en: 'Digital markets optimize for individual sessions. They do not observe shared conditions.',
    de: 'Digitale Märkte optimieren einzelne Sitzungen. Sie erfassen keine geteilten Lebensbedingungen.',
  },

  // PRINCIPLES
  'principles.eyebrow': {
    uk: 'Конституційні інваріанти',
    en: 'Constitutional invariants',
    de: 'Verfassungsrechtliche Invarianten',
  },
  'principles.headline': {
    uk: 'Що дослідження відмовляється припускати',
    en: 'What the research refuses to assume',
    de: 'Was die Forschung ablehnt vorauszusetzen',
  },
  'p1.title': {
    uk: 'Схожість — це не повноваження',
    en: 'Similarity is not authority',
    de: 'Ähnlichkeit ist keine Autorität',
  },
  'p1.desc': {
    uk: 'Спільні обставини не надають автоматично права представляти інших або говорити від їхнього імені.',
    en: 'Shared circumstances do not automatically confer the right to represent others or speak in their name.',
    de: 'Geteilte Umstände berechtigen nicht automatisch dazu, andere zu vertreten oder in ihrem Namen zu sprechen.',
  },
  'p2.title': {
    uk: 'Ратифікація — це не зобов\'язання',
    en: 'Ratification is not commitment',
    de: 'Ratifizierung ist keine Bindung',
  },
  'p2.desc': {
    uk: 'Схвалення колективної позиції не є тотожним беззастережному підпорядкуванню їй.',
    en: 'Approving a collective position is not the same as binding oneself to it unconditionally.',
    de: 'Die Zustimmung zu einer kollektiven Position bedeutet keine bedingungslose Bindung daran.',
  },
  'p3.title': {
    uk: 'Відповідь постачальника — це не цінність',
    en: 'Supplier response is not participant value',
    de: 'Lieferantenantwort ist kein Teilnehmermehrwert',
  },
  'p3.desc': {
    uk: 'Факт визнання позиції продавцем не означає, що учасники отримують від цього реальну користь.',
    en: 'A supplier acknowledging a collective position does not mean participants benefit from it.',
    de: 'Dass ein Anbieter eine Position anerkennt, bedeutet nicht, dass Teilnehmer davon profitieren.',
  },
  'p4.title': {
    uk: 'Транзакція — це не успіх',
    en: 'Transaction is not success',
    de: 'Transaktion ist kein Erfolg',
  },
  'p4.desc': {
    uk: 'Завершена угода не доводить, що колективний процес перевершив індивідуальні альтернативи.',
    en: 'A completed transaction does not confirm that the collective process improved on individual alternatives.',
    de: 'Ein Geschäftsabschluss beweist nicht, dass der kollektive Prozess individuelle Alternativen übertroffen hat.',
  },
  'p5.title': {
    uk: 'Базові права є невідчужуваними',
    en: 'Rights floors are non-compensable',
    de: 'Rechte-Untergrenzen sind nicht verhandelbar',
  },
  'p5.desc': {
    uk: 'Приватність, право на вихід та оскарження не можуть бути продані в обмін на кращі комерційні умови.',
    en: 'Privacy, exit, and contestability rights cannot be traded away in exchange for better terms.',
    de: 'Datenschutz, Ausstiegs- und Anfechtungsrechte können nicht gegen günstigere Konditionen eingetauscht werden.',
  },
  'p6.title': {
    uk: '«Не об\'єднуватися» — валідний результат',
    en: 'Do not aggregate is a valid result',
    de: '„Nicht aggregieren“ ist ein gültiges Ergebnis',
  },
  'p6.desc': {
    uk: 'Рішення не формувати колективну позицію є легітимним та повноцінним науковим підсумком.',
    en: 'A decision not to form a collective position is a legitimate and complete research outcome.',
    de: 'Die Entscheidung gegen eine Aggregation ist ein valides und vollständiges Forschungsergebnis.',
  },

  // GOLIAF SECTION
  'goliaf.eyebrow': {
    uk: 'GOLIAF / Стрес-тест подорожами',
    en: 'GOLIAF / Travel stress test',
    de: 'GOLIAF / Reise-Stresstest',
  },
  'goliaf.headline': {
    uk: 'Подорож — це не обіцянка.<br/>Це стрес-тест.',
    en: 'Travel is not the promise.<br/>It is the stress test.',
    de: 'Reisen ist kein Versprechen.<br/>Es ist der Stresstest.',
  },
  'goliaf.body': {
    uk: 'GOLIAF — це обмежене дослідницьке середовище для перевірки: чи може колективна суб\'єктність витримати нестабільну наявність місць, різні дати й бюджети, сімейні потреби, правила скасування та сильні індивідуальні альтернативи.',
    en: 'GOLIAF is a bounded research environment for asking whether collective market agency can survive volatile availability, different dates and budgets, household needs, cancellation conditions, privacy boundaries and strong individual alternatives.',
    de: 'GOLIAF ist eine Forschungsumgebung zur Frage, ob kollektive Handlungsfähigkeit volatile Verfügbarkeiten, unterschiedliche Termine, Budgets, Stornobedingungen und starke Alternativen überstehen kann.',
  },
  'goliaf.boundary.title': {
    uk: 'Дослідницькі межі',
    en: 'Research boundary',
    de: 'Forschungsgrenzen',
  },
  'goliaf.boundary.body': {
    uk: 'GOLIAF є науковим середовищем. Він не позиціонується як комерційний сервіс бронювання, знижкова програма чи туристичний пул.',
    en: 'GOLIAF is a research environment. It is not presented as a live booking service, discount program, travel pool, supplier network or proven market mechanism.',
    de: 'GOLIAF ist eine Forschungsumgebung und kein kommerzieller Buchungsdienst, Rabattprogramm oder Anbieter-Netzwerk.',
  },
  'goliaf.btn': {
    uk: 'Дослідити GOLIAF',
    en: 'Explore GOLIAF research',
    de: 'GOLIAF-Forschung erkunden',
  },

  // FOOTER
  'footer.explore': {
    uk: 'Дослідження',
    en: 'Explore',
    de: 'Erkunden',
  },
  'footer.project': {
    uk: 'Проєкт',
    en: 'Project',
    de: 'Projekt',
  },
  'footer.standards': {
    uk: 'Стандарти та Етика',
    en: 'Standards & Ethics',
    de: 'Standards & Ethik',
  },
  'footer.disclosure': {
    uk: 'DC2SC публікує концептуальні дослідження та докази з явними межами застосування. Концептуальні моделі не видаються за польові докази.',
    en: 'DC2SC publishes conceptual research and evidence with explicit scope boundaries. It does not present conceptual work as field proof.',
    de: 'DC2SC veröffentlicht konzeptionelle Forschung mit klaren Grenzen. Konzeptionelle Modelle werden nicht als Feldbeweise dargestellt.',
  },
  'footer.copyright': {
    uk: '© Програма досліджень DC2SC. Всі права захищено.',
    en: '© DC2SC Research Program. All rights reserved.',
    de: '© DC2SC Forschungsprogramm. Alle Rechte vorbehalten.',
  }
};
