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
      navKnowledge: 'التدريب',
      navVideos: 'فيديوهات مجانية',
      navJobs: 'الوظائف',
      navAbout: 'من أنا',
      navContact: 'تواصل معي',
      searchToolsAria: 'ابحث في الأدوات',
      themeAria: 'تغيير المظهر',
      themeToLight: 'تفعيل الوضع الفاتح',
      themeToDark: 'تفعيل الوضع الداكن',
      themeControl: 'تغيير المظهر',
      menuAria: 'فتح القائمة',
      closeMenuAria: 'إغلاق القائمة',
      contactNow: 'تواصل الآن',
      mobileWhatsapp: 'تواصل عبر واتساب',
      homeCrumb: 'الرئيسية',
      publishedTool: 'أداة منشورة',
      publishedProject: 'مشروع منشور',
      useTool: 'استخدم الأداة الآن',
      openReference: 'افتح المرجع',
      rights: 'جميع الحقوق محفوظة.',
      whatsappMessage: 'مرحبًا أستاذ حازم، أرغب في معرفة المزيد عن خدماتك وأدوات الموارد البشرية.',
      toolsWhatsAppMessage: 'مرحبًا أستاذ حازم، لدي استفسار بخصوص أدوات الموارد البشرية المنشورة.',
      trainingWhatsAppMessage: 'مرحبًا أستاذ حازم، أرغب في معرفة مواعيد وسعر برنامج شئون العاملين والمرتبات.',
      videosWhatsAppMessage: 'مرحبًا أستاذ حازم، لدي اقتراح لموضوع فيديو في مجال الموارد البشرية.'
    },
    en: {
      skip: 'Skip to content',
      brandLine: 'Building better workplaces together',
      navLabel: 'Main navigation',
      mobileNavLabel: 'Mobile navigation',
      navHome: 'Home',
      navTools: 'Tools',
      navLegal: 'Legal Reference',
      navKnowledge: 'Training',
      navVideos: 'Free Videos',
      navJobs: 'Jobs',
      navAbout: 'About',
      navContact: 'Contact',
      searchToolsAria: 'Search HR tools',
      themeAria: 'Switch theme',
      themeToLight: 'Enable light mode',
      themeToDark: 'Enable dark mode',
      themeControl: 'Switch theme',
      menuAria: 'Open menu',
      closeMenuAria: 'Close menu',
      contactNow: 'Contact',
      mobileWhatsapp: 'Contact me on WhatsApp',
      homeCrumb: 'Home',
      publishedTool: 'Published tool',
      publishedProject: 'Published project',
      useTool: 'Use tool now',
      openReference: 'Open reference',
      rights: 'All rights reserved.',
      whatsappMessage: 'Hello Hazem, I would like to know more about your services and HR tools.',
      toolsWhatsAppMessage: 'Hello Hazem, I have a question about your published HR tools.',
      trainingWhatsAppMessage: 'Hello Hazem, I would like to know the dates and price of the Personnel Affairs & Payroll program.',
      videosWhatsAppMessage: 'Hello Hazem, I would like to suggest a topic for an HR video.'
    }
  };

  const pages = {
    home: {
      ar: {
        pageTitle: 'حازم موسى | HR & Payroll Hub',
        pageDescription: 'الموقع المهني لحازم موسى — مدير موارد بشرية ومتخصص شئون العاملين والمرتبات ومدرب ومطور أدوات HR بخبرة منذ 2008.',
        welcome: 'مرحبًا بك في مساحتي المهنية',
        roleManager: 'مدير موارد بشرية',
        roleTrainer: 'مدرب',
        roleCreator: 'مطوّر أدوات HR',
        roleAria: 'مدير موارد بشرية، مدرب، ومطوّر أدوات HR',
        portraitAlt: 'حازم موسى — مدير موارد بشرية ومدرب متخصص',
        heroLead: 'أحوّل خبرتي العملية في إدارة الموارد البشرية وشئون العاملين والمرتبات إلى تدريب تطبيقي وأدوات ومحتوى يساعد محترفي الـHR على العمل بثقة ودقة.',
        pillarsLabel: 'مجالات العمل',
        pillarPersonnel: 'شئون العاملين<br>والمرتبات',
        pillarLaw: 'قانون العمل<br>والامتثال',
        pillarTraining: 'تدريب<br>وتطوير',
        pillarTools: 'أدوات عملية<br>تسهّل عملك',
        discoverStory: 'اعرف قصتي المهنية',
        startContact: 'تواصل معي',
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
        spotlightAlt: 'حازم موسى خلال مسيرته المهنية',
        storyEyebrow: 'من الخبرة إلى الأثر',
        storyTitle: 'خبرة عملية تتحول إلى معرفة وأدوات',
        storyLead: 'منذ 2008 أعمل في إدارة الموارد البشرية، مع تركيز على شئون العاملين والمرتبات وقانون العمل والامتثال. هدفي أن أجعل المعرفة المهنية أوضح وأسهل في التطبيق من خلال التدريب والمحتوى والأدوات الرقمية.',
        readFullBio: 'اقرأ السيرة المهنية',
        destinationsEyebrow: 'اكتشف الموقع',
        destinationsTitle: 'كل محتوى في مكانه',
        destinationsLead: 'اختر المسار الذي تحتاجه وانتقل إلى صفحته المستقلة.',
        routeAboutTitle: 'من أنا',
        routeAboutDesc: 'الخبرة والتخصصات والرحلة المهنية.',
        routeToolsTitle: 'أدوات HR',
        routeToolsDesc: 'أدوات مجانية للحسابات والنماذج والبحث.',
        routeTrainingTitle: 'التدريب',
        routeTrainingDesc: 'برامج عملية تربط المعرفة بالتطبيق.',
        routeVideosTitle: 'فيديوهات مجانية',
        routeVideosDesc: 'محتوى مرئي منظم حسب موضوعات الـHR.',
        routeJobsTitle: 'الوظائف',
        routeJobsDesc: 'فرص مختارة مع طريقة تقديم واضحة.',
        routeLegalTitle: 'مرجعك القانوني',
        routeLegalDesc: 'قانون العمل والقرارات والمواقف العملية.',
        openPage: 'افتح الصفحة',
        finalEyebrow: 'تواصل مهني',
        finalTitle: 'خلّينا نحوّل المعرفة إلى تطبيق',
        finalLead: 'للتدريب وورش العمل والتعاون المهني أو الاستفسار عن أدوات الموارد البشرية.',
        goContact: 'اذهب لصفحة التواصل'
      },
      en: {
        pageTitle: 'Hazem Moussa | HR & Payroll Hub',
        pageDescription: 'The professional website of Hazem Moussa — HR manager, personnel and payroll specialist, trainer and HR tools creator with experience since 2008.',
        welcome: 'Welcome to my professional space',
        roleManager: 'HR Manager',
        roleTrainer: 'Trainer',
        roleCreator: 'HR Tools Creator',
        roleAria: 'HR manager, trainer, and HR tools creator',
        portraitAlt: 'Hazem Moussa — HR manager and specialist trainer',
        heroLead: 'I turn hands-on experience in HR management, personnel and payroll into practical training, tools and content that help HR professionals work with confidence and accuracy.',
        pillarsLabel: 'Areas of work',
        pillarPersonnel: 'Personnel<br>& Payroll',
        pillarLaw: 'Labor Law<br>& Compliance',
        pillarTraining: 'Training<br>& Development',
        pillarTools: 'Practical tools<br>for your work',
        discoverStory: 'Discover my journey',
        startContact: 'Contact me',
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
        spotlightAlt: 'Hazem Moussa during his professional journey',
        storyEyebrow: 'From experience to impact',
        storyTitle: 'Practical experience turned into knowledge and tools',
        storyLead: 'I have worked in HR management since 2008, focusing on personnel affairs, payroll, labor law and compliance. My goal is to make professional knowledge clearer and easier to apply through training, content and digital tools.',
        readFullBio: 'Read the full profile',
        destinationsEyebrow: 'Explore the website',
        destinationsTitle: 'Every resource in its own place',
        destinationsLead: 'Choose what you need and move to its dedicated page.',
        routeAboutTitle: 'About me',
        routeAboutDesc: 'Experience, specializations and professional journey.',
        routeToolsTitle: 'HR Tools',
        routeToolsDesc: 'Free tools for calculations, forms and research.',
        routeTrainingTitle: 'Training',
        routeTrainingDesc: 'Practical programs connecting knowledge to action.',
        routeVideosTitle: 'Free Videos',
        routeVideosDesc: 'Video content organized by HR topic.',
        routeJobsTitle: 'Jobs',
        routeJobsDesc: 'Selected opportunities with clear application routes.',
        routeLegalTitle: 'Legal Reference',
        routeLegalDesc: 'Labor law, decisions and practical scenarios.',
        openPage: 'Open page',
        finalEyebrow: 'Professional contact',
        finalTitle: 'Let’s turn knowledge into action',
        finalLead: 'For training, workshops, professional collaboration or questions about the HR tools.',
        goContact: 'Go to contact page'
      }
    },
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
    },
    about: {
      ar: {
        pageTitle: 'من أنا | حازم موسى',
        pageDescription: 'تعرف على حازم موسى، مدير موارد بشرية ومتخصص شئون العاملين والمرتبات وقانون العمل ومدرب HR بخبرة منذ 2008.',
        aboutCrumb: 'من أنا',
        aboutEyebrow: 'الخبرة التي وراء المحتوى',
        aboutHeroTitle: 'حازم موسى <span>خبرة تُطبّق</span>',
        aboutHeroLead: 'رحلة مهنية في إدارة الموارد البشرية بدأت عام 2008، تجمع بين الإدارة اليومية، الامتثال، التدريب، وصناعة أدوات رقمية تخدم مجتمع الـHR.',
        aboutPrimary: 'تواصل معي مهنيًا',
        aboutSecondary: 'استكشف التدريب',
        aboutProof1: 'خبرة منذ 2008',
        aboutProof2: 'مصر والكويت',
        aboutProof3: 'إدارة وتدريب وتطوير',
        profileBadgeTitle: 'Hazem Moussa',
        profileBadgeText: 'HR Manager • Trainer • HR Tools Creator',
        introEyebrow: 'قصتي المهنية',
        introTitle: 'من إدارة التفاصيل إلى صناعة أثر أوسع',
        introText1: 'تخصصت في إدارة الموارد البشرية مع تركيز عملي على شئون العاملين والمرتبات وقانون العمل والامتثال؛ وهي مجالات تحتاج إلى دقة في التفاصيل وفهم حقيقي لبيئة العمل.',
        introText2: 'ومع الخبرة، أصبح هدفي ألا تبقى المعرفة داخل نطاق الوظيفة فقط؛ لذلك أقدم تدريبًا تطبيقيًا وأطوّر أدوات ومراجع رقمية تساعد المتخصصين والشركات على العمل بصورة أسرع وأكثر تنظيمًا.',
        focusEyebrow: 'مجالات التخصص',
        focusTitle: 'خبرة تغطي دورة العمل الأساسية',
        focusLead: 'أربعة محاور مترابطة تشكل أساس عملي في إدارة الموارد البشرية.',
        focus1Title: 'شئون العاملين',
        focus1Desc: 'الملفات والعقود واللوائح والسجلات والإجراءات اليومية.',
        focus2Title: 'المرتبات وPayroll',
        focus2Desc: 'الاستحقاقات والاستقطاعات والتسويات وربط البيانات.',
        focus3Title: 'قانون العمل والامتثال',
        focus3Desc: 'فهم النصوص وتطبيقها على مواقف العمل الفعلية.',
        focus4Title: 'التدريب والأدوات',
        focus4Desc: 'تحويل المعرفة إلى خطوات عملية وحلول رقمية مفيدة.',
        journeyEyebrow: 'محطات رئيسية',
        journeyTitle: 'رحلة مستمرة في التعلم والتطوير',
        journeyLead: 'الخبرة ليست عدد سنوات فقط، بل تراكم مواقف وقرارات وحلول قابلة للمشاركة.',
        journey1Title: '2008 — بداية الرحلة',
        journey1Desc: 'الانطلاق في العمل المهني داخل إدارة الموارد البشرية وشئون العاملين.',
        journey2Title: 'خبرات إقليمية',
        journey2Desc: 'ممارسة مهنية داخل مصر والكويت وفهم احتياجات بيئات عمل مختلفة.',
        journey3Title: 'من الخبرة إلى المشاركة',
        journey3Desc: 'تقديم التدريب والمحتوى وتطوير أدوات HR ومراجع عملية مفتوحة للجميع.',
        aboutCtaTitle: 'التعاون يبدأ بمحادثة واضحة',
        aboutCtaLead: 'للتدريب وورش العمل والتعاون المهني أو تطوير حلول تخدم فرق الموارد البشرية.',
        aboutCtaButton: 'اذهب لصفحة التواصل',
        portraitAlt: 'حازم موسى مدير موارد بشرية ومدرب متخصص'
      },
      en: {
        pageTitle: 'About | Hazem Moussa',
        pageDescription: 'Meet Hazem Moussa, an HR manager, personnel and payroll specialist, labor-law practitioner and HR trainer with experience since 2008.',
        aboutCrumb: 'About',
        aboutEyebrow: 'The experience behind the content',
        aboutHeroTitle: 'Hazem Moussa <span>experience in action</span>',
        aboutHeroLead: 'An HR management journey that began in 2008, bringing together daily operations, compliance, training and digital tools built for the HR community.',
        aboutPrimary: 'Connect professionally',
        aboutSecondary: 'Explore training',
        aboutProof1: 'Experience since 2008',
        aboutProof2: 'Egypt and Kuwait',
        aboutProof3: 'Management, training and development',
        profileBadgeTitle: 'Hazem Moussa',
        profileBadgeText: 'HR Manager • Trainer • HR Tools Creator',
        introEyebrow: 'My professional story',
        introTitle: 'From managing details to creating wider impact',
        introText1: 'I specialize in HR management with a practical focus on personnel affairs, payroll, labor law and compliance — disciplines that require accuracy and a real understanding of the workplace.',
        introText2: 'With experience, my goal grew beyond keeping knowledge inside the job. I now deliver practical training and build digital tools and references that help professionals and companies work faster and more systematically.',
        focusEyebrow: 'Areas of expertise',
        focusTitle: 'Experience across the essential HR cycle',
        focusLead: 'Four connected disciplines form the foundation of my practical HR work.',
        focus1Title: 'Personnel Affairs',
        focus1Desc: 'Files, contracts, policies, records and daily procedures.',
        focus2Title: 'Payroll',
        focus2Desc: 'Earnings, deductions, settlements and connected data.',
        focus3Title: 'Labor Law & Compliance',
        focus3Desc: 'Understanding legal requirements and applying them at work.',
        focus4Title: 'Training & Tools',
        focus4Desc: 'Turning knowledge into practical steps and useful digital solutions.',
        journeyEyebrow: 'Key milestones',
        journeyTitle: 'A continuous journey of learning and development',
        journeyLead: 'Experience is not just a number of years; it is accumulated situations, decisions and solutions worth sharing.',
        journey1Title: '2008 — The journey begins',
        journey1Desc: 'Starting a professional path in HR management and personnel affairs.',
        journey2Title: 'Regional experience',
        journey2Desc: 'Professional practice in Egypt and Kuwait across different workplace needs.',
        journey3Title: 'From experience to sharing',
        journey3Desc: 'Delivering training and content while building HR tools and open practical references.',
        aboutCtaTitle: 'Collaboration starts with a clear conversation',
        aboutCtaLead: 'For training, workshops, professional collaboration or solutions that support HR teams.',
        aboutCtaButton: 'Go to contact page',
        portraitAlt: 'Hazem Moussa, HR manager and specialist trainer'
      }
    },
    videos: {
      ar: {
        pageTitle: 'فيديوهات HR مجانية | حازم موسى',
        pageDescription: 'فيديوهات مجانية مبسطة في شئون العاملين والمرتبات وقانون العمل وExcel والتطوير المهني مع حازم موسى.',
        videosCrumb: 'فيديوهات مجانية',
        videosEyebrow: 'معرفة مفتوحة للجميع',
        videosHeroTitle: 'فيديوهات HR <span>مختصرة وعملية</span>',
        videosHeroLead: 'مكتبة مرئية مجانية تساعدك على فهم المفاهيم والإجراءات وتحويلها إلى خطوات يمكن تطبيقها في العمل.',
        videosPrimary: 'استعرض التصنيفات',
        videosSecondary: 'تواصل معي',
        videosProof1: 'محتوى مجاني',
        videosProof2: 'شرح عملي',
        videosProof3: 'تصنيف واضح',
        libraryEyebrow: 'مكتبة الفيديو',
        libraryTitle: 'المحتوى سيكون منظمًا حسب الموضوع',
        libraryLead: 'عند إضافة روابط يوتيوب ستظهر داخل التصنيفات التالية لتصل إلى ما تحتاجه بسرعة.',
        comingSoon: 'قريبًا',
        category1Title: 'شئون العاملين',
        category1Desc: 'العقود والملفات واللوائح والسجلات والإجراءات اليومية.',
        category2Title: 'قانون العمل',
        category2Desc: 'شرح مبسط للنصوص والقرارات والمواقف العملية.',
        category3Title: 'المرتبات وExcel',
        category3Desc: 'Payroll والاستحقاقات والاستقطاعات وتطبيقات Excel.',
        category4Title: 'التطوير المهني',
        category4Desc: 'نصائح تساعد محترفي الموارد البشرية على التطور في العمل.',
        videosEmptyTitle: 'الصفحة جاهزة لاستقبال روابط الفيديوهات',
        videosEmptyDesc: 'سيتم استبدال هذه البطاقات بقوائم الفيديوهات والصور المصغرة وروابط المشاهدة فور إرسالها.',
        videosCtaTitle: 'عندك موضوع تحب أشرحه؟',
        videosCtaLead: 'شارك سؤالك أو الموضوع الذي تحتاج له شرحًا عمليًا، وقد يصبح أحد الفيديوهات القادمة.',
        videosCtaButton: 'اقترح موضوعًا على واتساب'
      },
      en: {
        pageTitle: 'Free HR Videos | Hazem Moussa',
        pageDescription: 'Free practical videos about personnel affairs, payroll, labor law, Excel and professional development with Hazem Moussa.',
        videosCrumb: 'Free Videos',
        videosEyebrow: 'Knowledge open to everyone',
        videosHeroTitle: 'Practical HR videos <span>made simple</span>',
        videosHeroLead: 'A free video library that helps you understand concepts and procedures and turn them into steps you can apply at work.',
        videosPrimary: 'Browse categories',
        videosSecondary: 'Contact me',
        videosProof1: 'Free content',
        videosProof2: 'Practical explanations',
        videosProof3: 'Clear categories',
        libraryEyebrow: 'Video library',
        libraryTitle: 'Content organized by topic',
        libraryLead: 'Once YouTube links are added, they will appear inside these categories so you can find what you need quickly.',
        comingSoon: 'Coming soon',
        category1Title: 'Personnel Affairs',
        category1Desc: 'Contracts, files, policies, records and daily procedures.',
        category2Title: 'Labor Law',
        category2Desc: 'Simple explanations of legal requirements, decisions and cases.',
        category3Title: 'Payroll & Excel',
        category3Desc: 'Payroll, earnings, deductions and practical Excel applications.',
        category4Title: 'Professional Development',
        category4Desc: 'Advice that helps HR professionals grow at work.',
        videosEmptyTitle: 'The page is ready for your video links',
        videosEmptyDesc: 'These cards will be replaced with video lists, thumbnails and watch links once they are provided.',
        videosCtaTitle: 'Have a topic you want explained?',
        videosCtaLead: 'Share your question or the topic you need explained. It may become one of the next videos.',
        videosCtaButton: 'Suggest a topic on WhatsApp'
      }
    },
    jobs: {
      ar: {
        pageTitle: 'وظائف مختارة | حازم موسى',
        pageDescription: 'صفحة فرص عمل مختارة ينشرها حازم موسى مع متطلبات واضحة وطريقة تقديم مباشرة لكل وظيفة.',
        jobsCrumb: 'الوظائف',
        jobsEyebrow: 'فرص مختارة بعناية',
        jobsHeroTitle: 'وظائف واضحة <span>بدون تعقيد</span>',
        jobsHeroLead: 'مساحة مستقلة لعرض فرص العمل التي أختارها، مع المسمى والمكان والمتطلبات وطريقة التقديم المباشر لكل فرصة.',
        jobsPrimary: 'استعرض الفرص',
        jobsSecondary: 'تابعني على LinkedIn',
        jobsProof1: 'تفاصيل واضحة',
        jobsProof2: 'تقديم مباشر',
        jobsProof3: 'فرص مختارة',
        openingsEyebrow: 'الفرص الحالية',
        openingsTitle: 'الوظائف المنشورة',
        openingsLead: 'لن نعرض وظائف قديمة أو غير مؤكدة؛ ستظهر هنا الفرص المعتمدة فقط.',
        noJobsTitle: 'لا توجد فرص منشورة حاليًا',
        noJobsDesc: 'الصفحة جاهزة، وستتم إضافة أول وظيفة بمجرد اعتماد بياناتها ورابط التقديم.',
        howEyebrow: 'طريقة العرض',
        howTitle: 'معلومة كافية قبل أن تقدم',
        howLead: 'كل فرصة ستُعرض بنفس الهيكل الواضح لتعرف سريعًا إن كانت مناسبة لك.',
        how1Title: 'بيانات الوظيفة',
        how1Desc: 'المسمى الوظيفي، الشركة أو المجال، ومكان العمل.',
        how2Title: 'المتطلبات والمزايا',
        how2Desc: 'الخبرة المطلوبة وساعات العمل وأهم المزايا المتاحة.',
        how3Title: 'التقديم المباشر',
        how3Desc: 'زر واضح يقود إلى جهة التقديم المحددة لكل إعلان.',
        jobsCtaTitle: 'تابع الفرص والمحتوى المهني',
        jobsCtaLead: 'حتى إضافة الوظائف هنا، يمكنك متابعة آخر الإعلانات والمحتوى من خلال LinkedIn.',
        jobsCtaButton: 'زيارة LinkedIn'
      },
      en: {
        pageTitle: 'Selected Jobs | Hazem Moussa',
        pageDescription: 'Selected job opportunities shared by Hazem Moussa with clear requirements and a direct application route for each vacancy.',
        jobsCrumb: 'Jobs',
        jobsEyebrow: 'Carefully selected opportunities',
        jobsHeroTitle: 'Clear job opportunities <span>without the noise</span>',
        jobsHeroLead: 'A dedicated space for opportunities I select, showing the role, location, requirements and direct application route for each opening.',
        jobsPrimary: 'Browse openings',
        jobsSecondary: 'Follow me on LinkedIn',
        jobsProof1: 'Clear details',
        jobsProof2: 'Direct application',
        jobsProof3: 'Selected opportunities',
        openingsEyebrow: 'Current openings',
        openingsTitle: 'Published jobs',
        openingsLead: 'Old or unconfirmed vacancies will not be listed; only approved opportunities will appear here.',
        noJobsTitle: 'No openings published right now',
        noJobsDesc: 'The page is ready, and the first vacancy will appear once its details and application link are confirmed.',
        howEyebrow: 'How jobs are presented',
        howTitle: 'Enough information before you apply',
        howLead: 'Every opportunity follows the same clear structure so you can quickly decide whether it fits.',
        how1Title: 'Job details',
        how1Desc: 'Role title, company or sector, and work location.',
        how2Title: 'Requirements and benefits',
        how2Desc: 'Required experience, working hours and key available benefits.',
        how3Title: 'Direct application',
        how3Desc: 'A clear button leading to the specified application destination.',
        jobsCtaTitle: 'Follow opportunities and professional content',
        jobsCtaLead: 'Until openings are added here, follow the latest announcements and content on LinkedIn.',
        jobsCtaButton: 'Visit LinkedIn'
      }
    },
    contact: {
      ar: {
        pageTitle: 'تواصل معي | حازم موسى',
        pageDescription: 'تواصل مع حازم موسى بخصوص التدريب وورش العمل والتعاون المهني وأدوات الموارد البشرية.',
        contactCrumb: 'تواصل معي',
        contactEyebrow: 'خلّينا على تواصل',
        contactHeroTitle: 'ابدأ <span>المحادثة المناسبة</span>',
        contactHeroLead: 'اختر الطريقة الأنسب للتواصل بخصوص التدريب وورش العمل والتعاون المهني أو الاستفسار عن الأدوات والمحتوى.',
        contactProof1: 'واتساب مباشر',
        contactProof2: 'تواصل مهني',
        contactProof3: 'روابط موثوقة',
        channelsEyebrow: 'قنوات التواصل',
        channelsTitle: 'اختار الطريقة الأنسب لك',
        channelsLead: 'اضغط على القناة التي تفضلها وسأستقبل رسالتك مباشرة.',
        phoneTitle: 'اتصال هاتفي',
        phoneDesc: 'للتواصل المباشر خلال الأوقات المناسبة.',
        phoneAction: 'اتصل الآن',
        whatsappTitle: 'واتساب',
        whatsappDesc: 'للاستفسارات السريعة وتفاصيل التدريب.',
        whatsappAction: 'ابدأ المحادثة',
        linkedinTitle: 'LinkedIn',
        linkedinDesc: 'للتواصل المهني ومتابعة المحتوى والخبرة.',
        linkedinAction: 'زيارة الصفحة',
        reasonsEyebrow: 'يمكنك التواصل بخصوص',
        reasonsTitle: 'مسارات واضحة للتعاون',
        reason1Title: 'التدريب وورش العمل',
        reason1Desc: 'تفاصيل البرامج، المواعيد، أو طلب ورشة لفريق عمل.',
        reason2Title: 'التعاون المهني',
        reason2Desc: 'المشروعات والمبادرات والخدمات المرتبطة بالموارد البشرية.',
        reason3Title: 'الأدوات والمحتوى',
        reason3Desc: 'الاقتراحات والاستفسارات حول الأدوات والمراجع والفيديوهات.',
        contactNote: 'للحصول على رد أسرع، اكتب موضوع الرسالة باختصار في بداية محادثة واتساب.'
      },
      en: {
        pageTitle: 'Contact | Hazem Moussa',
        pageDescription: 'Contact Hazem Moussa about training, workshops, professional collaboration and HR tools.',
        contactCrumb: 'Contact',
        contactEyebrow: 'Let’s connect',
        contactHeroTitle: 'Start the <span>right conversation</span>',
        contactHeroLead: 'Choose the best channel for training, workshops, professional collaboration or questions about the tools and content.',
        contactProof1: 'Direct WhatsApp',
        contactProof2: 'Professional contact',
        contactProof3: 'Verified links',
        channelsEyebrow: 'Contact channels',
        channelsTitle: 'Choose what works best for you',
        channelsLead: 'Select your preferred channel and reach me directly.',
        phoneTitle: 'Phone',
        phoneDesc: 'For direct contact at a suitable time.',
        phoneAction: 'Call now',
        whatsappTitle: 'WhatsApp',
        whatsappDesc: 'For quick questions and training details.',
        whatsappAction: 'Start a conversation',
        linkedinTitle: 'LinkedIn',
        linkedinDesc: 'For professional contact and following my work and content.',
        linkedinAction: 'View profile',
        reasonsEyebrow: 'You can contact me about',
        reasonsTitle: 'Clear paths for collaboration',
        reason1Title: 'Training & Workshops',
        reason1Desc: 'Program details, dates or a workshop request for your team.',
        reason2Title: 'Professional Collaboration',
        reason2Desc: 'Projects, initiatives and services connected to human resources.',
        reason3Title: 'Tools & Content',
        reason3Desc: 'Suggestions and questions about tools, references and videos.',
        contactNote: 'For a faster response, briefly state the subject at the beginning of your WhatsApp message.'
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
          : link.dataset.whatsappContext === 'videos'
            ? 'videosWhatsAppMessage'
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
