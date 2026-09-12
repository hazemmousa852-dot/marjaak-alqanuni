(() => {
  'use strict';

  const common = {
    ar: {
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
      homeCrumb: 'الرئيسية',
      publishedTool: 'أداة منشورة',
      publishedProject: 'مشروع منشور',
      useTool: 'استخدم الأداة الآن',
      openReference: 'افتح المرجع',
      rights: 'جميع الحقوق محفوظة.',
      whatsappMessage: 'مرحبًا أستاذ حازم، أرغب في معرفة المزيد عن خدماتك وأدوات الموارد البشرية.',
      toolsWhatsAppMessage: 'مرحبًا أستاذ حازم، لدي استفسار بخصوص أدوات الموارد البشرية المنشورة.',
      trainingWhatsAppMessage: 'مرحبًا أستاذ حازم، أرغب في معرفة مواعيد وسعر برنامج شئون العاملين والمرتبات.'
    },
    en: {
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
      homeCrumb: 'Home',
      publishedTool: 'Published tool',
      publishedProject: 'Published project',
      useTool: 'Use tool now',
      openReference: 'Open reference',
      rights: 'All rights reserved.',
      whatsappMessage: 'Hello Hazem, I would like to know more about your services and HR tools.',
      toolsWhatsAppMessage: 'Hello Hazem, I have a question about your published HR tools.',
      trainingWhatsAppMessage: 'Hello Hazem, I would like to know the dates and price of the Personnel Affairs & Payroll program.'
    }
  };

  const pages = {
    tools: {
      ar: {
        pageTitle: 'أدوات الموارد البشرية | حازم موسى',
        pageDescription: 'أدوات مجانية وعملية للمرتبات والإجازات ونماذج التأمينات والبحث في قانون العمل، من تطوير حازم موسى.',
        toolsCrumb: 'الأدوات',
        toolsHeroTitle: 'أدوات HR <span>توفّر وقتك</span>',
        toolsHeroLead: 'حلول رقمية مجانية صنعتها من واقع العمل اليومي في شئون العاملين والمرتبات؛ افتح الأداة وابدأ مباشرة بدون تحميل أو تسجيل.',
        browseTools: 'استعرض الأدوات',
        askAboutTools: 'اسأل عن الأدوات',
        toolsProof1: '4 أدوات منشورة',
        toolsProof2: 'استخدام مجاني',
        toolsProof3: 'تعمل من المتصفح',
        toolsSectionEyebrow: 'جاهزة للاستخدام',
        toolsSectionTitle: 'اختر الأداة المناسبة لمهمتك',
        toolsSectionLead: 'كل أداة مصممة لتبسيط خطوة متكررة وتحويلها إلى عملية أسرع وأوضح.',
        showAllTools: 'عرض كل الأدوات',
        toolSearchLabel: 'ابحث عن أداة',
        toolSearchPlaceholder: 'ابحث بالاسم أو المهمة...',
        noTools: 'لا توجد أداة مطابقة. جرّب كلمة أقصر.',
        toolResults: 'عدد الأدوات المطابقة: {count}',
        payrollImageAlt: 'واجهة دعائية لحاسبة صافي وشامل المرتب',
        payrollTitle: 'حاسبة صافي / شامل المرتب',
        payrollDesc: 'أدخل بيانات المرتب وانتقل بين الصافي والشامل بطريقة عملية وسريعة.',
        payrollBenefit1: 'حساب مباشر حسب البيانات المدخلة',
        payrollBenefit2: 'مناسبة لمراجعة عروض وبيانات الرواتب',
        payrollBenefit3: 'واجهة بسيطة تعمل على الهاتف والكمبيوتر',
        leaveImageAlt: 'واجهة دعائية لحاسبة الإجازات السنوية',
        leaveTitle: 'حاسبة الإجازات السنوية',
        leaveDesc: 'احسب رصيد الإجازات المستحق بصورة منظمة بدل الحسابات اليدوية المتكررة.',
        leaveBenefit1: 'حساب واضح لرصيد الإجازات',
        leaveBenefit2: 'تقليل أخطاء المتابعة اليدوية',
        leaveBenefit3: 'نتيجة سريعة وسهلة المراجعة',
        insuranceImageAlt: 'واجهة دعائية لأداة نماذج التأمينات الاجتماعية',
        insuranceTitle: 'نموذجي | نماذج التأمينات',
        insuranceDesc: 'جهّز نماذج التأمينات المتكررة بصيغة PDF منظمة وجاهزة للمراجعة.',
        insuranceBenefit1: 'دعم نماذج س1 وس2 وس6',
        insuranceBenefit2: 'إعداد مجموعة نماذج في وقت أقل',
        insuranceBenefit3: 'ملفات PDF سهلة الحفظ والطباعة',
        legalImageAlt: 'واجهة دعائية للمرجع القانوني',
        legalTitle: 'مرجعك القانوني',
        legalDesc: 'ابحث داخل مواد القانون والقرارات والمواقف العملية من مكان واحد.',
        legalBenefit1: 'وصول أسرع للمادة القانونية',
        legalBenefit2: 'سيناريوهات مرتبطة بواقع العمل',
        legalBenefit3: 'مرجع عملي لمتخصصي الموارد البشرية',
        toolsCtaTitle: 'عندك فكرة لأداة HR؟',
        toolsCtaLead: 'شارك معي المشكلة المتكررة في شغلك، وقد تتحول إلى أداة رقمية تخدم مجتمع الموارد البشرية.',
        toolsCtaButton: 'ابعث فكرتك على واتساب'
      },
      en: {
        pageTitle: 'HR Tools | Hazem Moussa',
        pageDescription: 'Free practical tools for payroll, annual leave, social insurance forms and labor-law research, created by Hazem Moussa.',
        toolsCrumb: 'Tools',
        toolsHeroTitle: 'HR tools that <span>save you time</span>',
        toolsHeroLead: 'Free digital solutions built around everyday personnel and payroll work. Open any tool and get started — no download or account required.',
        browseTools: 'Browse tools',
        askAboutTools: 'Ask about the tools',
        toolsProof1: '4 published tools',
        toolsProof2: 'Free to use',
        toolsProof3: 'Browser based',
        toolsSectionEyebrow: 'Ready to use',
        toolsSectionTitle: 'Choose the right tool for the task',
        toolsSectionLead: 'Each tool simplifies a recurring step and turns it into a faster, clearer process.',
        showAllTools: 'Show all tools',
        toolSearchLabel: 'Search for a tool',
        toolSearchPlaceholder: 'Search by name or task...',
        noTools: 'No matching tool. Try a shorter keyword.',
        toolResults: 'Matching tools: {count}',
        payrollImageAlt: 'Promotional visual for the Net and Gross Salary Calculator',
        payrollTitle: 'Net / Gross Salary Calculator',
        payrollDesc: 'Enter salary data and move between net and gross figures in a quick, practical workflow.',
        payrollBenefit1: 'Instant calculation using your inputs',
        payrollBenefit2: 'Useful for reviewing salary data and offers',
        payrollBenefit3: 'A simple mobile and desktop interface',
        leaveImageAlt: 'Promotional visual for the Annual Leave Calculator',
        leaveTitle: 'Annual Leave Calculator',
        leaveDesc: 'Calculate annual leave entitlement clearly instead of repeating manual calculations.',
        leaveBenefit1: 'Clear leave-balance calculation',
        leaveBenefit2: 'Fewer manual tracking errors',
        leaveBenefit3: 'Fast, easy-to-review results',
        insuranceImageAlt: 'Promotional visual for the social insurance forms tool',
        insuranceTitle: 'Namozagy | Insurance Forms',
        insuranceDesc: 'Prepare recurring social-insurance forms as organized PDF files ready for review.',
        insuranceBenefit1: 'Supports S1, S2 and S6 forms',
        insuranceBenefit2: 'Prepare batches in less time',
        insuranceBenefit3: 'PDF files ready to save and print',
        legalImageAlt: 'Promotional visual for the legal reference',
        legalTitle: 'Your Legal Reference',
        legalDesc: 'Search legal articles, decisions and practical workplace scenarios in one place.',
        legalBenefit1: 'Faster access to legal provisions',
        legalBenefit2: 'Scenarios connected to real work',
        legalBenefit3: 'A practical reference for HR professionals',
        toolsCtaTitle: 'Have an idea for an HR tool?',
        toolsCtaLead: 'Share the recurring problem you face at work. It may become a digital tool that helps the HR community.',
        toolsCtaButton: 'Send your idea on WhatsApp'
      }
    },
    training: {
      ar: {
        pageTitle: 'برنامج شئون العاملين والمرتبات | حازم موسى',
        pageDescription: 'برنامج أونلاين عملي لمدة 30 ساعة في شئون العاملين والمرتبات وقانون العمل والتأمينات وExcel، مع حازم موسى.',
        trainingCrumb: 'التدريب',
        trainingEyebrow: 'برنامج تدريبي متكامل',
        trainingHeroTitle: 'شئون العاملين <span>والمرتبات</span>',
        trainingHeroLead: 'من فهم القانون والإجراءات إلى تنفيذ المهام اليومية بثقة؛ برنامج أونلاين تطبيقي يربط المعرفة بواقع العمل داخل إدارة الموارد البشرية.',
        requestDetails: 'اطلب المواعيد والسعر',
        exploreCurriculum: 'استعرض المحاور',
        trainingProof1: 'تطبيقات وحالات عملية',
        trainingProof2: 'شرح من واقع الخبرة',
        trainingProof3: 'مسار واضح ومتدرج',
        trainerBadgeTitle: 'حازم موسى',
        trainerBadgeText: 'مدير موارد بشرية ومدرب متخصص منذ 2008',
        factDuration: '30 ساعة',
        factDurationLabel: 'تدريب تطبيقي',
        factMode: 'أونلاين',
        factModeLabel: 'تعلّم من أي مكان',
        factCertificate: 'شهادة حضور',
        factCertificateLabel: 'في نهاية البرنامج',
        factPractice: 'حالات عملية',
        factPracticeLabel: 'مرتبطة بسوق العمل',
        curriculumEyebrow: 'محتوى البرنامج',
        curriculumTitle: 'ماذا ستتعلم؟',
        curriculumLead: 'ستة محاور مترابطة تغطي دورة العمل الأساسية في شئون العاملين والمرتبات.',
        module1Title: 'قانون العمل',
        module1Desc: 'قانون العمل رقم 14 لسنة 2025 والقرارات المكملة وربط النصوص بالمواقف العملية.',
        module2Title: 'شئون العاملين',
        module2Desc: 'ملفات العاملين والعقود واللوائح والسجلات والإجراءات اليومية المنظمة.',
        module3Title: 'التأمينات الاجتماعية',
        module3Desc: 'المفاهيم والإجراءات والنماذج المرتبطة بحركة العاملين داخل المنشأة.',
        module4Title: 'أساسيات المرتبات',
        module4Desc: 'الاستحقاقات والاستقطاعات والتسويات وفهم دورة إعداد الـPayroll.',
        module5Title: 'Excel للـHR',
        module5Desc: 'توظيف Excel لتنظيم البيانات وتسهيل مهام شئون العاملين والمرتبات.',
        module6Title: 'التطبيق العملي',
        module6Desc: 'حالات ومواقف من بيئة العمل تساعدك على تحويل المعرفة إلى قرار وتنفيذ.',
        audienceEyebrow: 'لمن هذا البرنامج؟',
        audienceTitle: 'مصمم لمن يريد أساسًا عمليًا قويًا',
        audienceLead: 'المحتوى مناسب لبدايات المسار المهني ولمن يريد ترتيب خبرته الحالية بصورة أكثر احترافية.',
        audience1Title: 'المبتدئون في مجال HR',
        audience1Desc: 'لبناء فهم منظم للمهام والإجراءات الأساسية بدل الاعتماد على معلومات متفرقة.',
        audience2Title: 'مسئولو شئون العاملين',
        audience2Desc: 'لتثبيت الممارسة اليومية وربطها بالقانون والسجلات والنماذج ذات الصلة.',
        audience3Title: 'متخصصو المرتبات والموارد البشرية',
        audience3Desc: 'لتحسين الربط بين بيانات العاملين والـPayroll والامتثال والإجراءات العملية.',
        methodEyebrow: 'أسلوب التدريب',
        methodTitle: 'تتعلمها ثم تطبقها',
        methodLead: 'البرنامج مبني كرحلة متدرجة، وليس مجموعة معلومات منفصلة.',
        method1Title: 'افهم',
        method1Desc: 'شرح المفهوم والقانون والإجراء بلغة واضحة ومباشرة.',
        method2Title: 'طبّق',
        method2Desc: 'تحويل المعرفة إلى خطوات ونماذج يمكن استخدامها في العمل.',
        method3Title: 'مارس',
        method3Desc: 'مناقشة حالات واقعية لتثبيت القرار المهني الصحيح.',
        linksEyebrow: 'روابط البرنامج',
        linksTitle: 'كل ما تحتاجه سيكون في مكان واحد',
        linksLead: 'سيتم إضافة رابط التسجيل والفيديو التعريفي والمواد المساندة هنا فور اعتمادها.',
        waitingLink: 'قريبًا',
        registrationTitle: 'رابط التسجيل',
        registrationDesc: 'النموذج أو الصفحة المخصصة لحجز مكانك في البرنامج.',
        introTitle: 'فيديو تعريفي',
        introDesc: 'رابط يوتيوب يشرح محتوى البرنامج وطريقة الاستفادة منه.',
        materialsTitle: 'روابط المحتوى',
        materialsDesc: 'أي ملفات أو مواد أو روابط مساندة تريد إضافتها للمتدربين.',
        instructorEyebrow: 'عن المدرب',
        instructorTitle: 'خبرة عملية من 2008',
        instructorDesc: 'حازم موسى متخصص في إدارة الموارد البشرية وشئون العاملين والمرتبات وقانون العمل والامتثال، بخبرة مهنية داخل مصر والكويت، إلى جانب التدريب وتطوير أدوات رقمية تخدم مجتمع الـHR.',
        trainingCtaTitle: 'جاهز تطور خبرتك بصورة عملية؟',
        trainingCtaLead: 'تواصل عبر واتساب لمعرفة الموعد القادم والسعر والإجابة عن أي استفسار قبل التسجيل.',
        trainingCtaButton: 'اطلب التفاصيل على واتساب',
        portraitAlt: 'حازم موسى مدرب شئون العاملين والمرتبات'
      },
      en: {
        pageTitle: 'Personnel Affairs & Payroll Program | Hazem Moussa',
        pageDescription: 'A practical 30-hour online program covering personnel affairs, payroll, labor law, social insurance and Excel with Hazem Moussa.',
        trainingCrumb: 'Training',
        trainingEyebrow: 'Complete training program',
        trainingHeroTitle: 'Personnel Affairs <span>& Payroll</span>',
        trainingHeroLead: 'From understanding law and procedures to performing daily tasks with confidence — a practical online program that connects knowledge to real HR work.',
        requestDetails: 'Request dates and price',
        exploreCurriculum: 'Explore the curriculum',
        trainingProof1: 'Practical cases and applications',
        trainingProof2: 'Taught from real experience',
        trainingProof3: 'A clear, progressive path',
        trainerBadgeTitle: 'Hazem Moussa',
        trainerBadgeText: 'HR manager and specialist trainer since 2008',
        factDuration: '30 hours',
        factDurationLabel: 'Practical training',
        factMode: 'Online',
        factModeLabel: 'Learn from anywhere',
        factCertificate: 'Attendance certificate',
        factCertificateLabel: 'At program completion',
        factPractice: 'Practical cases',
        factPracticeLabel: 'Connected to real work',
        curriculumEyebrow: 'Program content',
        curriculumTitle: 'What will you learn?',
        curriculumLead: 'Six connected modules covering the core personnel and payroll workflow.',
        module1Title: 'Labor Law',
        module1Desc: 'Egyptian Labor Law No. 14 of 2025, its implementing decisions, and application to workplace situations.',
        module2Title: 'Personnel Affairs',
        module2Desc: 'Employee files, contracts, policies, records and organized daily procedures.',
        module3Title: 'Social Insurance',
        module3Desc: 'Core concepts, procedures and forms connected to employee movement within the organization.',
        module4Title: 'Payroll Fundamentals',
        module4Desc: 'Earnings, deductions, settlements and a clear understanding of the payroll cycle.',
        module5Title: 'Excel for HR',
        module5Desc: 'Using Excel to organize data and streamline personnel and payroll tasks.',
        module6Title: 'Practical Application',
        module6Desc: 'Workplace cases that help turn knowledge into sound decisions and execution.',
        audienceEyebrow: 'Who is it for?',
        audienceTitle: 'Built for a strong practical foundation',
        audienceLead: 'The content works for people starting their HR path and professionals who want to organize their current experience.',
        audience1Title: 'HR beginners',
        audience1Desc: 'Build a structured understanding of essential duties and procedures instead of relying on scattered information.',
        audience2Title: 'Personnel officers',
        audience2Desc: 'Strengthen daily practice and connect it to law, records and related official forms.',
        audience3Title: 'Payroll and HR professionals',
        audience3Desc: 'Improve the connection between employee data, payroll, compliance and practical procedures.',
        methodEyebrow: 'Training approach',
        methodTitle: 'Learn it, then apply it',
        methodLead: 'The program is designed as a progressive journey, not a collection of disconnected information.',
        method1Title: 'Understand',
        method1Desc: 'Learn each concept, legal point and procedure in clear, direct language.',
        method2Title: 'Apply',
        method2Desc: 'Turn knowledge into steps and templates you can use at work.',
        method3Title: 'Practice',
        method3Desc: 'Discuss realistic cases to reinforce sound professional decisions.',
        linksEyebrow: 'Program links',
        linksTitle: 'Everything you need in one place',
        linksLead: 'Registration, introduction video and supporting resource links will appear here once confirmed.',
        waitingLink: 'Coming soon',
        registrationTitle: 'Registration link',
        registrationDesc: 'The form or page used to reserve a place in the program.',
        introTitle: 'Introduction video',
        introDesc: 'A YouTube link explaining the program and how to get the most from it.',
        materialsTitle: 'Content links',
        materialsDesc: 'Any files, resources or supporting links you want to provide to trainees.',
        instructorEyebrow: 'About the trainer',
        instructorTitle: 'Practical experience since 2008',
        instructorDesc: 'Hazem Moussa specializes in HR management, personnel affairs, payroll, labor law and compliance, with professional experience in Egypt and Kuwait, alongside training and digital tools built for the HR community.',
        trainingCtaTitle: 'Ready to build practical expertise?',
        trainingCtaLead: 'Contact me on WhatsApp for upcoming dates, pricing and answers to any questions before registration.',
        trainingCtaButton: 'Request details on WhatsApp',
        portraitAlt: 'Hazem Moussa, personnel affairs and payroll trainer'
      }
    }
  };

  const root = document.documentElement;
  const pageName = document.body.dataset.page;
  const languageButton = document.querySelector('.language-toggle');
  const themeButtons = [...document.querySelectorAll('[data-theme-toggle]')];
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobileNav');
  const description = document.querySelector('meta[name="description"]');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const openGraphTitle = document.querySelector('meta[property="og:title"]');
  const openGraphDescription = document.querySelector('meta[property="og:description"]');
  const openGraphLocale = document.querySelector('meta[property="og:locale"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  const whatsappLinks = [...document.querySelectorAll('[data-whatsapp-link]')];
  const toolSearch = document.querySelector('#toolSearch');
  const toolCards = [...document.querySelectorAll('.search-tool-card')];
  const noTools = document.querySelector('#noTools');
  const resultStatus = document.querySelector('#toolResultStatus');

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
      // Preferences are optional; the page remains fully usable.
    }
  };

  let currentLanguage = readPreference('hazem-site-language', 'ar');
  if (!common[currentLanguage]) currentLanguage = 'ar';

  const getDictionary = (language) => ({
    ...common[language],
    ...(pages[pageName]?.[language] || {})
  });

  const normalize = (value = '') => value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u064b-\u065f\u0670]/g, '')
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim();

  const filterTools = () => {
    if (!toolSearch) return;
    const dictionary = getDictionary(currentLanguage);
    const terms = normalize(toolSearch.value).split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    toolCards.forEach((card) => {
      const source = currentLanguage === 'ar' ? card.dataset.searchAr : card.dataset.searchEn;
      const visible = !terms.length || terms.every((term) => normalize(`${source} ${card.textContent}`).includes(term));
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (noTools) noTools.hidden = visibleCount !== 0;
    if (resultStatus) {
      resultStatus.textContent = terms.length
        ? dictionary.toolResults.replace('{count}', String(visibleCount))
        : '';
    }
  };

  const translatePage = (language) => {
    const dictionary = getDictionary(language);
    currentLanguage = language;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = dictionary.pageTitle;
    description?.setAttribute('content', dictionary.pageDescription);
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
      const value = key === 'menuAria' && menuButton?.getAttribute('aria-expanded') === 'true'
        ? dictionary.closeMenuAria
        : key === 'themeAria'
          ? (root.dataset.theme === 'light' ? dictionary.themeToDark : dictionary.themeToLight)
          : dictionary[key];
      if (value !== undefined) element.setAttribute('aria-label', value);
    });

    if (languageButton) {
      languageButton.textContent = language === 'ar' ? 'EN' : 'ع';
      languageButton.setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    }

    whatsappLinks.forEach((link) => {
      const messageKey = link.dataset.whatsappContext === 'training'
        ? 'trainingWhatsAppMessage'
        : link.dataset.whatsappContext === 'tools'
          ? 'toolsWhatsAppMessage'
          : 'whatsappMessage';
      link.setAttribute('href', `https://wa.me/201030006087?text=${encodeURIComponent(dictionary[messageKey])}`);
    });

    savePreference('hazem-site-language', language);
    filterTools();
  };

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    themeColor?.setAttribute('content', theme === 'light' ? '#f8fbfc' : '#071827');
    const dictionary = getDictionary(currentLanguage);
    themeButtons.forEach((button) => {
      button.setAttribute('aria-label', theme === 'light' ? dictionary.themeToDark : dictionary.themeToLight);
    });
    savePreference('hazem-site-theme', theme);
  };

  const closeMenu = () => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', getDictionary(currentLanguage).menuAria);
    mobileNav.hidden = true;
    document.body.classList.remove('menu-open');
  };

  const openMenu = () => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', getDictionary(currentLanguage).closeMenuAria);
    mobileNav.hidden = false;
    document.body.classList.add('menu-open');
  };

  document.querySelector('#year').textContent = new Date().getFullYear();
  setTheme(readPreference('hazem-site-theme', 'dark') === 'light' ? 'light' : 'dark');
  translatePage(currentLanguage);

  languageButton?.addEventListener('click', () => translatePage(currentLanguage === 'ar' ? 'en' : 'ar'));
  themeButtons.forEach((button) => button.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light')));
  menuButton?.addEventListener('click', () => menuButton.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu());
  mobileNav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1020) closeMenu();
  });

  if (toolSearch) {
    toolSearch.addEventListener('input', filterTools);
    toolSearch.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !toolSearch.value) return;
      toolSearch.value = '';
      filterTools();
    });
    document.querySelector('#showAllTools')?.addEventListener('click', () => {
      toolSearch.value = '';
      filterTools();
      toolSearch.focus();
    });
  }
})();
