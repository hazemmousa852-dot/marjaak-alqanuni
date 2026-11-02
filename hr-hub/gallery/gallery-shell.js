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

  const pages = {"gallery": {"ar": {"pageTitle": "معرض الصور | حازم موسى", "pageDescription": "لحظات من اللقاءات التدريبية وتسليم الشهادات مع حازم موسى."}, "en": {"pageTitle": "Photo Gallery | Hazem Moussa", "pageDescription": "Training sessions, certificate presentations and moments with Hazem Moussa."}}};

  const root = document.documentElement;
  const pageName = document.body.dataset.page;
  const pageTitleKey = document.body.dataset.titleKey || 'pageTitle';
  const pageDescriptionKey = document.body.dataset.descriptionKey || 'pageDescription';
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
  const toolFilterButtons = [...document.querySelectorAll('[data-tool-filter]')];
  const noTools = document.querySelector('#noTools');
  const resultStatus = document.querySelector('#toolResultStatus');
  const videoPlayers = [...document.querySelectorAll('.featured-video-player')];
  const videoFullscreenButtons = [...document.querySelectorAll('[data-video-fullscreen]')];
  const videoCloseButtons = [...document.querySelectorAll('[data-video-close]')];
  const shareVideoButtons = [...document.querySelectorAll('[data-share-video]')];

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
  let activeToolFilter = 'all';

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
    if (!toolCards.length) return;
    const dictionary = getDictionary(currentLanguage);
    const terms = normalize(toolSearch?.value || '').split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    toolCards.forEach((card) => {
      const source = currentLanguage === 'ar' ? card.dataset.searchAr : card.dataset.searchEn;
      const matchesCategory = activeToolFilter === 'all' || card.dataset.toolCategory === activeToolFilter;
      const matchesSearch = !terms.length || terms.every((term) => normalize(`${source} ${card.textContent}`).includes(term));
      const visible = matchesCategory && matchesSearch;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (noTools) noTools.hidden = visibleCount !== 0;
    if (resultStatus) {
      resultStatus.textContent = dictionary.toolResults.replace('{count}', String(visibleCount));
    }
  };

  const setActiveToolFilter = (filter) => {
    activeToolFilter = filter;
    toolFilterButtons.forEach((button) => {
      const selected = button.dataset.toolFilter === filter;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    filterTools();
  };

  const translatePage = (language) => {
    const dictionary = getDictionary(language);
    const translatedPageTitle = dictionary[pageTitleKey] || dictionary.pageTitle;
    const translatedPageDescription = dictionary[pageDescriptionKey] || dictionary.pageDescription;
    document.querySelectorAll("[data-copy-ar][data-copy-en]").forEach((node) => { node.textContent = language === "ar" ? node.dataset.copyAr : node.dataset.copyEn; });
    currentLanguage = language;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = translatedPageTitle;
    description?.setAttribute('content', translatedPageDescription);
    openGraphTitle?.setAttribute('content', translatedPageTitle);
    openGraphDescription?.setAttribute('content', translatedPageDescription);
    openGraphLocale?.setAttribute('content', language === 'ar' ? 'ar_EG' : 'en_US');
    twitterTitle?.setAttribute('content', translatedPageTitle);
    twitterDescription?.setAttribute('content', translatedPageDescription);

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

    document.querySelectorAll('[data-i18n-title]').forEach((element) => {
      const value = dictionary[element.dataset.i18nTitle];
      if (value !== undefined) element.setAttribute('title', value);
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
      setActiveToolFilter('all');
      toolSearch.focus();
    });
  }

  toolFilterButtons.forEach((button) => {
    button.addEventListener('click', () => setActiveToolFilter(button.dataset.toolFilter || 'all'));
  });

  const clearExpandedVideoState = () => {
    videoPlayers.forEach((player) => player.classList.remove('is-expanded'));
    document.body.classList.remove('video-expanded');
  };

  const openExpandedVideo = (player) => {
    if (!player) return;
    clearExpandedVideoState();
    player.classList.add('is-expanded');
    document.body.classList.add('video-expanded');
  };

  const closeExpandedVideo = async (player) => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    } catch {
      // The in-page full-screen fallback still closes below.
    }
    player?.classList.remove('is-expanded');
    if (!videoPlayers.some((item) => item.classList.contains('is-expanded'))) {
      document.body.classList.remove('video-expanded');
    }
  };

  videoFullscreenButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const player = button.closest('.featured-video-card')?.querySelector('.featured-video-player');
      if (!player) return;
      let enteredNativeFullscreen = false;
      try {
        if (player.requestFullscreen) {
          await player.requestFullscreen();
          enteredNativeFullscreen = document.fullscreenElement === player;
        } else if (player.webkitRequestFullscreen) {
          player.webkitRequestFullscreen();
          enteredNativeFullscreen = true;
        }
      } catch {
        enteredNativeFullscreen = false;
      }
      if (!enteredNativeFullscreen) openExpandedVideo(player);
    });
  });

  videoCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const player = button.closest('.featured-video-player');
      closeExpandedVideo(player);
    });
  });
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) clearExpandedVideoState();
  });
  document.addEventListener('webkitfullscreenchange', () => {
    if (!document.webkitFullscreenElement) clearExpandedVideoState();
  });

  document.addEventListener('keydown', (event) => {
    const expandedPlayer = videoPlayers.find((player) => player.classList.contains('is-expanded'));
    if (event.key === 'Escape' && expandedPlayer) closeExpandedVideo(expandedPlayer);
  });

  shareVideoButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const dictionary = getDictionary(currentLanguage);
      const label = button.querySelector('[data-share-label]');
      const url = button.dataset.shareUrl;
      const copyVideoUrl = async () => {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(url);
          return;
        }

        const temporaryInput = document.createElement('textarea');
        temporaryInput.value = url;
        temporaryInput.setAttribute('readonly', '');
        temporaryInput.style.position = 'fixed';
        temporaryInput.style.opacity = '0';
        document.body.appendChild(temporaryInput);
        temporaryInput.select();
        const copied = document.execCommand('copy');
        temporaryInput.remove();
        if (!copied) throw new Error('Copy unavailable');
      };
      const resetLabel = () => {
        if (label) label.textContent = dictionary.shareVideo;
      };

      try {
        if (navigator.share) {
          await navigator.share({
            title: dictionary[button.dataset.shareTitle],
            text: dictionary[button.dataset.shareText],
            url
          });
          return;
        }

        await copyVideoUrl();
        if (label) label.textContent = dictionary.linkCopied;
        window.setTimeout(resetLabel, 2400);
      } catch (error) {
        if (error?.name === 'AbortError') return;
        if (label) label.textContent = dictionary.shareFailed;
        window.setTimeout(resetLabel, 2400);
      }
    });
  });

  function mountFloatingContact() {
    if (document.querySelector('[data-floating-contact]')) return;

    const widget = document.createElement('div');
    widget.className = 'floating-contact';
    widget.dataset.floatingContact = '';
    widget.innerHTML = `
      <button class="floating-contact__top" type="button" aria-label="العودة إلى أعلى الصفحة" title="العودة إلى أعلى الصفحة">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6.5 10.5 12 5l5.5 5.5"/></svg>
      </button>
      <a class="floating-contact__whatsapp" href="https://wa.me/201030006087" target="_blank" rel="noopener noreferrer" aria-label="تواصل الآن عبر واتساب">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.2-4.3a8.5 8.5 0 1 1 15.8-4.5Z"/><path d="M8.1 7.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.5l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .7.5.9 1.2 1.6 2.1 2.1.3.2.5.2.7 0l.8-1c.2-.2.4-.3.7-.2l1.9.9c.3.2.4.3.4.5 0 .3-.1 1.5-.8 2.1-.6.6-1.5.8-2.4.5-1.1-.3-2.5-.8-4.2-2.3-2-1.8-3.2-4-3.3-5.2 0-.6.1-1 .3-1.4Z"/></svg>
        <span>تواصل الآن</span>
      </a>`;

    const topButton = widget.querySelector('.floating-contact__top');
    const whatsappButton = widget.querySelector('.floating-contact__whatsapp');

    function syncLanguage() {
      const english = document.documentElement.lang === 'en';
      const topLabel = english ? 'Back to top' : 'العودة إلى أعلى الصفحة';
      topButton.setAttribute('aria-label', topLabel);
      topButton.title = topLabel;
      whatsappButton.setAttribute('aria-label', english ? 'Contact now on WhatsApp' : 'تواصل الآن عبر واتساب');
      whatsappButton.querySelector('span').textContent = english ? 'Contact Now' : 'تواصل الآن';
      const dictionary = getDictionary(english ? 'en' : 'ar');
      whatsappButton.href = `https://wa.me/201030006087?text=${encodeURIComponent(dictionary.whatsappMessage)}`;
    }

    function syncScrollState() {
      topButton.classList.toggle('is-visible', window.scrollY > 360);
    }

    topButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
    window.addEventListener('scroll', syncScrollState, { passive: true });
    new MutationObserver(syncLanguage).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    document.body.append(widget);
    syncLanguage();
    syncScrollState();
  }

  mountFloatingContact();
})();

