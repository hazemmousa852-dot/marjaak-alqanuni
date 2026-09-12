(() => {
  'use strict';

  const translations = {
    ar: {
      pageTitle: 'حازم موسى | شئون العاملين والمرتبات',
      pageDescription: 'حازم موسى — متخصص في شئون العاملين والمرتبات وقانون العمل منذ 2008، يقدم تدريبًا عمليًا وأدوات رقمية تساعد محترفي الموارد البشرية والشركات.',
      skip: 'انتقل إلى المحتوى',
      brandLine: 'معًا نحو بيئات عمل أفضل',
      navLabel: 'التنقل الرئيسي',
      mobileNavLabel: 'قائمة الهاتف',
      navHome: 'الرئيسية',
      navTools: 'الأدوات',
      navLegal: 'مرجعك القانوني',
      navKnowledge: 'التدريب والخدمات',
      navAbout: 'من أنا',
      navContact: 'تواصل معي',
      searchToolsAria: 'ابحث في الأدوات',
      themeAria: 'تغيير المظهر',
      themeToLight: 'تفعيل الوضع الفاتح',
      themeToDark: 'تفعيل الوضع الداكن',
      themeControl: 'تغيير المظهر',
      menuAria: 'فتح القائمة',
      closeMenuAria: 'إغلاق القائمة',
      contactNow: 'واتساب الآن',
      mobileWhatsapp: 'تواصل عبر واتساب',
      welcome: 'مرحبًا بك في مساحتي المهنية',
      roleManager: 'مدير موارد بشرية',
      roleTrainer: 'مدرب',
      roleCreator: 'مطوّر أدوات HR',
      roleAria: 'مدير موارد بشرية، مدرب، ومطوّر أدوات HR',
      portraitAlt: 'حازم موسى — متخصص شئون العاملين والمرتبات ومدرب موارد بشرية',
      heroLead: 'أساعد محترفي الموارد البشرية والشركات على تطوير شئون العاملين والمرتبات والامتثال، من خلال تدريب تطبيقي وأدوات رقمية مبنية على خبرة حقيقية في سوق العمل.',
      pillarsLabel: 'مجالات العمل',
      pillarPersonnel: 'شئون العاملين<br>والمرتبات',
      pillarLaw: 'قانون العمل<br>والامتثال',
      pillarTraining: 'تدريب<br>وتطوير',
      pillarTools: 'أدوات عملية<br>تسهّل عملك',
      requestTraining: 'اطلب تفاصيل التدريب',
      exploreTools: 'استكشف الأدوات',
      knowMore: 'تعرّف عليّ أكثر',
      quote: 'لأن تطوير نفسك مش خيار.. ده استثمار',
      statsLabel: 'ملخص الخبرة',
      yearsExperience: 'سنة خبرة عملية',
      regions: 'مصر + الكويت',
      regionalExperience: 'خبرات إقليمية',
      journeyStart: 'بداية الرحلة المهنية',
      practicalTraining: 'تدريب عملي',
      knowledgeToPractice: 'معرفة مرتبطة بالتطبيق',
      hrContent: 'محتوى وأدوات',
      practicalTrusted: 'عملية ومتخصصة',
      toolsEyebrow: 'نماذج من أعمالي',
      toolsTitle: 'أدوات تسهّل عملك',
      toolsLead: 'مشروعات رقمية منشورة طورتها لحل مهام متكررة في شئون العاملين والمرتبات.',
      showAllTools: 'عرض كل الأدوات',
      toolSearchLabel: 'ابحث عن أداة',
      toolSearchPlaceholder: 'ابحث عن أداة...',
      payrollTitle: 'حاسبة صافي / شامل',
      payrollDesc: 'اعرف مرتبك الصافي والشامل بدقة حسب البيانات التي تدخلها.',
      leaveTitle: 'حاسبة الإجازات السنوية',
      leaveDesc: 'احسب رصيد الإجازات بصورة سهلة ومنظمة.',
      insuranceTitle: 'نموذجي | التأمينات',
      insuranceDesc: 'جهّز نماذج س1 وس2 وس6 بسهولة وسرعة.',
      legalTitle: 'مرجعك القانوني',
      legalDesc: 'ابحث في مواد القانون والعقوبات والمواقف العملية.',
      useTool: 'استخدم الأداة',
      openReference: 'افتح المرجع',
      publishedTool: 'أداة منشورة',
      publishedProject: 'مشروع منشور',
      noTools: 'لا توجد أداة مطابقة. جرّب كلمة أقصر.',
      toolResults: 'عدد الأدوات المطابقة: {count}',
      spotlightAlt: 'حازم موسى خلال مسيرته المهنية',
      spotlightTitle: 'رحلة تجمع الإدارة والتدريب والتطوير',
      spotlightDesc: 'منذ 2008، تمتد الرحلة بين العمل في إدارة الموارد البشرية داخل مصر والكويت، وتقديم التدريب العملي، وتطوير أدوات رقمية تخدم مجتمع الـHR.',
      readJourney: 'استكشف مجالات الخبرة',
      servicesEyebrow: 'ما أقدمه',
      expertiseTitle: 'تدريب وخبرة قابلة للتطبيق',
      expertiseLead: 'مجالات عملية تخدم محترفي الموارد البشرية وفرق شئون العاملين والمرتبات داخل الشركات.',
      expert1Title: 'شئون العاملين',
      expert1Desc: 'تطبيقات عملية على الملفات والعقود واللوائح والسجلات والتأمينات والإجراءات اليومية.',
      expert2Title: 'المرتبات وPayroll',
      expert2Desc: 'الاستحقاقات والاستقطاعات والتسويات وحساب صافي وشامل الأجر وربط العمليات بالبيانات.',
      expert3Title: 'قانون العمل والامتثال',
      expert3Desc: 'تبسيط النصوص والقرارات وربطها بمواقف HR الفعلية داخل بيئة العمل.',
      expert4Title: 'برامج تدريبية عملية',
      expert4Desc: 'تدريب أونلاين وورش عمل تحول المعرفة إلى خطوات ونماذج قابلة للتطبيق.',
      programEyebrow: 'برنامج تدريبي متكامل',
      programTitle: 'شئون العاملين والمرتبات',
      programLead: 'برنامج أونلاين عملي ينقلك من فهم الإجراءات والقانون إلى تنفيذ مهام شئون العاملين والمرتبات بصورة منظمة.',
      programFactsLabel: 'معلومات البرنامج',
      programDuration: '30 ساعة',
      programDurationLabel: 'تدريب تطبيقي',
      programDelivery: 'أونلاين',
      programDeliveryLabel: 'تعلم من أي مكان',
      programCertificate: 'شهادة حضور',
      programCertificateLabel: 'في نهاية البرنامج',
      programCta: 'اطلب المواعيد والسعر',
      programTopicsTitle: 'ماذا ستتعلم؟',
      programTopic1: 'قانون العمل رقم 14 لسنة 2025 والقرارات المكملة',
      programTopic2: 'ملفات العاملين والعقود واللوائح والسجلات',
      programTopic3: 'التأمينات الاجتماعية والنماذج المرتبطة بها',
      programTopic4: 'أساسيات المرتبات والاستحقاقات والاستقطاعات',
      programTopic5: 'استخدام Excel في شئون العاملين والمرتبات',
      programTopic6: 'حالات ومواقف عملية من بيئة العمل',
      aboutEyebrow: 'من الخبرة إلى الأثر',
      aboutTitle: 'حازم موسى',
      aboutText: 'متخصص في إدارة الموارد البشرية منذ 2008، مع تركيز عملي على شئون العاملين والمرتبات وقانون العمل والامتثال، إلى جانب التدريب وتطوير أدوات رقمية تساعد مجتمع الموارد البشرية على العمل بصورة أسرع وأكثر دقة.',
      contactProfessional: 'تواصل معي مهنيًا',
      contactEyebrow: 'خلّينا على تواصل',
      contactTitle: 'اختار طريقة التواصل الأنسب لك',
      contactLead: 'لبرامج التدريب وورش العمل والتعاون المهني والاستفسار عن أدوات الموارد البشرية.',
      phoneTitle: 'اتصال هاتفي',
      phoneAction: 'اتصل الآن',
      whatsappTitle: 'واتساب',
      whatsappAction: 'ابدأ المحادثة',
      linkedinDesc: 'تابع المحتوى والخبرة المهنية',
      linkedinAction: 'زيارة الصفحة',
      whatsappMessage: 'مرحبًا أستاذ حازم، أرغب في معرفة تفاصيل التدريب أو التعاون المهني.',
      trainingWhatsAppMessage: 'مرحبًا أستاذ حازم، أرغب في معرفة مواعيد وسعر برنامج شئون العاملين والمرتبات.',
      rights: 'جميع الحقوق محفوظة.'
    },
    en: {
      pageTitle: 'Hazem Moussa | Personnel & Payroll',
      pageDescription: 'Hazem Moussa — a personnel, payroll and labor law specialist since 2008, offering practical HR training and useful digital tools.',
      skip: 'Skip to content',
      brandLine: 'Building better workplaces together',
      navLabel: 'Main navigation',
      mobileNavLabel: 'Mobile navigation',
      navHome: 'Home',
      navTools: 'Tools',
      navLegal: 'Legal Reference',
      navKnowledge: 'Services & Training',
      navAbout: 'About',
      navContact: 'Contact',
      searchToolsAria: 'Search HR tools',
      themeAria: 'Switch theme',
      themeToLight: 'Enable light mode',
      themeToDark: 'Enable dark mode',
      themeControl: 'Switch theme',
      menuAria: 'Open menu',
      closeMenuAria: 'Close menu',
      contactNow: 'WhatsApp',
      mobileWhatsapp: 'Contact me on WhatsApp',
      welcome: 'Welcome to my professional space',
      roleManager: 'HR Manager',
      roleTrainer: 'Trainer',
      roleCreator: 'HR Tools Creator',
      roleAria: 'HR Manager, trainer, and HR tools creator',
      portraitAlt: 'Hazem Moussa — personnel and payroll specialist and HR trainer',
      heroLead: 'I help HR professionals and organizations improve personnel, payroll and compliance through practical training and digital tools grounded in real workplace experience.',
      pillarsLabel: 'Areas of work',
      pillarPersonnel: 'Personnel<br>& Payroll',
      pillarLaw: 'Labor Law<br>& Compliance',
      pillarTraining: 'Training<br>& Development',
      pillarTools: 'Practical tools<br>for your work',
      requestTraining: 'Request training details',
      exploreTools: 'Explore tools',
      knowMore: 'Know me better',
      quote: 'Developing yourself is not optional. It is an investment.',
      statsLabel: 'Experience highlights',
      yearsExperience: 'years of practical experience',
      regions: 'Egypt + Kuwait',
      regionalExperience: 'regional experience',
      journeyStart: 'career journey began',
      practicalTraining: 'Practical training',
      knowledgeToPractice: 'knowledge connected to practice',
      hrContent: 'Content & tools',
      practicalTrusted: 'practical and specialized',
      toolsEyebrow: 'Selected work',
      toolsTitle: 'Tools that make work easier',
      toolsLead: 'Published digital projects I built to solve recurring personnel and payroll tasks.',
      showAllTools: 'Show all tools',
      toolSearchLabel: 'Search for a tool',
      toolSearchPlaceholder: 'Search for a tool...',
      payrollTitle: 'Net / Gross Calculator',
      payrollDesc: 'Calculate net and gross salary accurately using your own inputs.',
      leaveTitle: 'Annual Leave Calculator',
      leaveDesc: 'Calculate annual leave balance in a clear, organized way.',
      insuranceTitle: 'Namozagy | Insurance',
      insuranceDesc: 'Prepare S1, S2 and S6 insurance forms quickly and easily.',
      legalTitle: 'Your Legal Reference',
      legalDesc: 'Search legal articles, penalties and practical HR scenarios.',
      useTool: 'Use tool',
      openReference: 'Open reference',
      publishedTool: 'Published tool',
      publishedProject: 'Published project',
      noTools: 'No matching tool. Try a shorter keyword.',
      toolResults: 'Matching tools: {count}',
      spotlightAlt: 'Hazem Moussa during his professional journey',
      spotlightTitle: 'A journey across management, training and development',
      spotlightDesc: 'Since 2008, the journey has combined HR management experience in Egypt and Kuwait, practical training, and digital tools created for the HR community.',
      readJourney: 'Explore areas of expertise',
      servicesEyebrow: 'What I offer',
      expertiseTitle: 'Training and experience you can apply',
      expertiseLead: 'Practical areas serving HR professionals, personnel teams and payroll teams within organizations.',
      expert1Title: 'Personnel Affairs',
      expert1Desc: 'Practical applications covering employee files, contracts, policies, records, social insurance and daily procedures.',
      expert2Title: 'Payroll',
      expert2Desc: 'Earnings, deductions, settlements, net and gross pay calculations, and data-driven payroll operations.',
      expert3Title: 'Labor Law & Compliance',
      expert3Desc: 'Simplifying legal text and decisions and applying them to real HR situations at work.',
      expert4Title: 'Practical Training Programs',
      expert4Desc: 'Online training and workshops that turn knowledge into applicable steps and templates.',
      programEyebrow: 'Complete training program',
      programTitle: 'Personnel Affairs & Payroll',
      programLead: 'A practical online program that takes you from understanding procedures and law to carrying out personnel and payroll tasks in an organized way.',
      programFactsLabel: 'Program information',
      programDuration: '30 hours',
      programDurationLabel: 'Practical training',
      programDelivery: 'Online',
      programDeliveryLabel: 'Learn from anywhere',
      programCertificate: 'Attendance certificate',
      programCertificateLabel: 'At program completion',
      programCta: 'Request dates and price',
      programTopicsTitle: 'What will you learn?',
      programTopic1: 'Egyptian Labor Law No. 14 of 2025 and its implementing decisions',
      programTopic2: 'Employee files, contracts, workplace policies and records',
      programTopic3: 'Social insurance and the related official forms',
      programTopic4: 'Payroll fundamentals, earnings and deductions',
      programTopic5: 'Using Excel in personnel affairs and payroll',
      programTopic6: 'Practical cases and real workplace situations',
      aboutEyebrow: 'From experience to impact',
      aboutTitle: 'Hazem Moussa',
      aboutText: 'An HR management professional since 2008, focused on personnel, payroll, labor law and compliance, as well as training and digital tools that help the HR community work faster and more accurately.',
      contactProfessional: 'Connect professionally',
      contactEyebrow: 'Let’s connect',
      contactTitle: 'Choose the best way to reach me',
      contactLead: 'For training programs, workshops, professional collaboration, or questions about the HR tools.',
      phoneTitle: 'Phone',
      phoneAction: 'Call now',
      whatsappTitle: 'WhatsApp',
      whatsappAction: 'Start a conversation',
      linkedinDesc: 'Follow my professional work and content',
      linkedinAction: 'View profile',
      whatsappMessage: 'Hello Hazem, I would like to know more about training or professional collaboration.',
      trainingWhatsAppMessage: 'Hello Hazem, I would like to know the dates and price of the Personnel Affairs & Payroll program.',
      rights: 'All rights reserved.'
    }
  };

  const root = document.documentElement;
  const languageButton = document.querySelector('.language-toggle');
  const themeButtons = [...document.querySelectorAll('[data-theme-toggle]')];
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobileNav');
  const toolSearch = document.querySelector('#toolSearch');
  const toolCards = [...document.querySelectorAll('.tool-card')];
  const noTools = document.querySelector('#noTools');
  const toolResultStatus = document.querySelector('#toolResultStatus');
  const description = document.querySelector('meta[name="description"]');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const openGraphTitle = document.querySelector('meta[property="og:title"]');
  const openGraphDescription = document.querySelector('meta[property="og:description"]');
  const openGraphLocale = document.querySelector('meta[property="og:locale"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  const whatsappLinks = [...document.querySelectorAll('[data-whatsapp-link]')];

  const readPreference = (key, fallback) => {
    try {
      return localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  };

  const savePreference = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // The site still works when storage is unavailable.
    }
  };

  let currentLanguage = readPreference('hazem-site-language', 'ar');
  if (!translations[currentLanguage]) currentLanguage = 'ar';

  const translatePage = (language) => {
    const dictionary = translations[language];
    currentLanguage = language;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = dictionary.pageTitle;
    description.setAttribute('content', dictionary.pageDescription);
    openGraphTitle?.setAttribute('content', dictionary.pageTitle);
    openGraphDescription?.setAttribute('content', dictionary.pageDescription);
    openGraphLocale?.setAttribute('content', language === 'ar' ? 'ar_EG' : 'en_US');
    twitterTitle?.setAttribute('content', dictionary.pageTitle);
    twitterDescription?.setAttribute('content', dictionary.pageDescription);

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (value !== undefined) element.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      const value = dictionary[element.dataset.i18nPlaceholder];
      if (value !== undefined) element.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
      const value = dictionary[element.dataset.i18nAlt];
      if (value !== undefined) element.setAttribute('alt', value);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
      const key = element.dataset.i18nAria;
      const value = key === 'menuAria' && menuButton.getAttribute('aria-expanded') === 'true'
        ? dictionary.closeMenuAria
        : key === 'themeAria'
          ? (root.dataset.theme === 'light' ? dictionary.themeToDark : dictionary.themeToLight)
        : dictionary[key];
      if (value !== undefined) element.setAttribute('aria-label', value);
    });

    languageButton.textContent = language === 'ar' ? 'EN' : 'ع';
    languageButton.setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    whatsappLinks.forEach((link) => {
      const message = link.dataset.whatsappContext === 'training'
        ? dictionary.trainingWhatsAppMessage
        : dictionary.whatsappMessage;
      link.setAttribute('href', `https://wa.me/201030006087?text=${encodeURIComponent(message)}`);
    });
    savePreference('hazem-site-language', language);
    filterTools();
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    themeColor.setAttribute('content', theme === 'light' ? '#f8fbfc' : '#071827');
    const dictionary = translations[currentLanguage];
    themeButtons.forEach((button) => {
      button.setAttribute('aria-label', theme === 'light' ? dictionary.themeToDark : dictionary.themeToLight);
    });
    savePreference('hazem-site-theme', theme);
  };

  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', translations[currentLanguage].menuAria);
    mobileNav.hidden = true;
    document.body.classList.remove('menu-open');
  };

  const openMenu = () => {
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', translations[currentLanguage].closeMenuAria);
    mobileNav.hidden = false;
    document.body.classList.add('menu-open');
  };

  function normalize(value = '') {
    return value
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u064b-\u065f\u0670]/g, '')
      .replace(/[إأآٱ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .trim();
  }

  function filterTools() {
    const query = normalize(toolSearch.value);
    const terms = query.split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    toolCards.forEach((card) => {
      const source = currentLanguage === 'ar' ? card.dataset.searchAr : card.dataset.searchEn;
      const haystack = normalize(`${source} ${card.textContent}`);
      const visible = !terms.length || terms.every((term) => haystack.includes(term));
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    noTools.hidden = visibleCount !== 0;
    toolResultStatus.textContent = terms.length
      ? translations[currentLanguage].toolResults.replace('{count}', String(visibleCount))
      : '';
  }

  document.querySelector('#year').textContent = new Date().getFullYear();

  const preferredTheme = readPreference('hazem-site-theme', 'dark');
  setTheme(preferredTheme === 'light' ? 'light' : 'dark');
  translatePage(currentLanguage);

  languageButton.addEventListener('click', () => {
    translatePage(currentLanguage === 'ar' ? 'en' : 'ar');
  });

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
    });
  });

  menuButton.addEventListener('click', () => {
    if (menuButton.getAttribute('aria-expanded') === 'true') closeMenu();
    else openMenu();
  });

  mobileNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1020) closeMenu();
  });

  toolSearch.addEventListener('input', filterTools);
  toolSearch.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !toolSearch.value) return;
    toolSearch.value = '';
    filterTools();
  });

  document.querySelector('#showAllTools').addEventListener('click', () => {
    toolSearch.value = '';
    filterTools();
    toolSearch.focus();
  });

  document.querySelector('.search-jump').addEventListener('click', () => {
    document.querySelector('#tools').scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => toolSearch.focus(), 450);
  });

  const portrait = document.querySelector('.portrait');
  portrait.addEventListener('error', () => {
    portrait.closest('.hero-visual').classList.add('image-missing');
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, .25, .6] });

    sections.forEach((section) => observer.observe(section));
  }
})();
