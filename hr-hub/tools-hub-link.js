(function () {
  'use strict';

  if (window.__hazemToolsHubLinkLoaded) return;
  window.__hazemToolsHubLinkLoaded = true;

  var HUB_URL = 'https://hazemmousa852-dot.github.io/marjaak-alqanuni/hr-hub/tools/';
  var documentElement = document.documentElement;
  var body = document.body;

  if (!body) return;

  var styles = document.createElement('style');
  styles.id = 'hm-tools-hub-styles';
  styles.textContent = [
    '#hm-tools-hub-bar,#hm-tools-hub-footer{all:initial;box-sizing:border-box;font-family:"Cairo","Tajawal","IBM Plex Sans Arabic","Segoe UI",Arial,sans-serif;color:#fff}',
    '#hm-tools-hub-bar *,#hm-tools-hub-footer *{box-sizing:border-box}',
    '#hm-tools-hub-bar{position:sticky;inset-block-start:0;z-index:2147483000;display:block;width:100%;background:linear-gradient(105deg,#071b2b,#0b3047);border-bottom:1px solid rgba(246,185,26,.42);box-shadow:0 8px 24px rgba(1,14,23,.2)}',
    '.hm-tools-hub-bar__inner{width:min(1180px,calc(100% - 32px));min-height:54px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:18px;direction:rtl}',
    '.hm-tools-hub-brand{display:flex;align-items:center;gap:10px;color:#fff;font:700 14px/1.3 inherit;white-space:nowrap}',
    '.hm-tools-hub-brand__mark{display:grid;place-items:center;width:31px;height:31px;border:1px solid rgba(246,185,26,.72);border-radius:10px;color:#f6b91a;font-size:11px;letter-spacing:.04em;background:rgba(255,255,255,.05)}',
    '.hm-tools-hub-brand__sub{display:block;color:#aebfca;font:500 10px/1.25 inherit;margin-top:2px}',
    '.hm-tools-hub-action{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:36px;padding:7px 15px;border:1px solid #f6b91a;border-radius:999px;color:#f6b91a!important;background:rgba(246,185,26,.06);font:700 13px/1.2 inherit;text-decoration:none!important;white-space:nowrap;transition:background .2s ease,color .2s ease,transform .2s ease}',
    '.hm-tools-hub-action:hover{background:#f6b91a;color:#071b2b!important;transform:translateY(-1px)}',
    '.hm-tools-hub-action:focus-visible{outline:3px solid rgba(246,185,26,.35);outline-offset:3px}',
    '.hm-tools-hub-arrow{font-size:17px;line-height:1}',
    '#hm-tools-hub-footer{display:block;width:min(1120px,calc(100% - 32px));margin:38px auto 26px;padding:26px;border:1px solid rgba(246,185,26,.32);border-radius:22px;background:linear-gradient(125deg,#071b2b,#0d3a52);box-shadow:0 18px 45px rgba(4,24,38,.18);direction:rtl;text-align:right}',
    '.hm-tools-hub-footer__inner{display:flex;align-items:center;justify-content:space-between;gap:22px}',
    '.hm-tools-hub-footer__eyebrow{display:block;margin:0 0 5px;color:#f6b91a;font:700 11px/1.4 inherit;letter-spacing:.04em}',
    '.hm-tools-hub-footer__title{display:block;margin:0;color:#fff;font:800 20px/1.45 inherit}',
    '.hm-tools-hub-footer__text{display:block;margin:5px 0 0;color:#c4d1d9;font:500 13px/1.7 inherit}',
    '.hm-tools-hub-footer__button{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:46px;padding:11px 21px;border:0;border-radius:13px;background:#f6b91a;color:#071b2b!important;font:800 14px/1.2 inherit;text-decoration:none!important;white-space:nowrap;box-shadow:0 9px 24px rgba(246,185,26,.19);transition:transform .2s ease,box-shadow .2s ease}',
    '.hm-tools-hub-footer__button:hover{transform:translateY(-2px);box-shadow:0 13px 28px rgba(246,185,26,.27)}',
    '.hm-tools-hub-footer__button:focus-visible{outline:3px solid rgba(246,185,26,.35);outline-offset:4px}',
    '.hm-tools-hub-en{display:none}',
    '.hm-tools-hub-is-en .hm-tools-hub-ar{display:none}',
    '.hm-tools-hub-is-en .hm-tools-hub-en{display:inline}',
    '.hm-tools-hub-is-en .hm-tools-hub-bar__inner,.hm-tools-hub-is-en#hm-tools-hub-footer{direction:ltr;text-align:left}',
    '@media screen and (max-width:640px){.hm-tools-hub-bar__inner{width:min(100% - 20px,1180px);min-height:50px;gap:10px}.hm-tools-hub-brand__copy{display:none}.hm-tools-hub-action{padding:7px 12px;font-size:12px}#hm-tools-hub-footer{width:calc(100% - 20px);margin:24px auto 16px;padding:21px 17px;border-radius:18px}.hm-tools-hub-footer__inner{align-items:stretch;flex-direction:column;gap:15px}.hm-tools-hub-footer__title{font-size:18px}.hm-tools-hub-footer__button{width:100%}}',
    '@media screen{html.hm-tools-hub-page-lock,html.hm-tools-hub-page-lock body{height:auto!important;min-height:100%!important;overflow-y:auto!important}}',
    '@media print{#hm-tools-hub-bar,#hm-tools-hub-footer{display:none!important}}'
  ].join('');
  document.head.appendChild(styles);

  var topBar = document.createElement('nav');
  topBar.id = 'hm-tools-hub-bar';
  topBar.setAttribute('aria-label', 'العودة إلى صفحة جميع الأدوات');
  topBar.innerHTML = '<div class="hm-tools-hub-bar__inner"><span class="hm-tools-hub-brand"><span class="hm-tools-hub-brand__mark" aria-hidden="true">HM</span><span class="hm-tools-hub-brand__copy">Hazem Moussa HR<span class="hm-tools-hub-brand__sub"><span class="hm-tools-hub-ar">أدوات عملية لشئون العاملين والمرتبات</span><span class="hm-tools-hub-en">Practical HR & payroll tools</span></span></span></span><a class="hm-tools-hub-action" href="' + HUB_URL + '"><span class="hm-tools-hub-ar">تصفح جميع أدوات HR</span><span class="hm-tools-hub-en">Browse all HR tools</span><span class="hm-tools-hub-arrow" aria-hidden="true">↗</span></a></div>';

  var footer = document.createElement('section');
  footer.id = 'hm-tools-hub-footer';
  footer.setAttribute('aria-label', 'اكتشف باقي أدوات الموارد البشرية');
  footer.innerHTML = '<div class="hm-tools-hub-footer__inner"><div><span class="hm-tools-hub-footer__eyebrow"><span class="hm-tools-hub-ar">أدوات حازم موسى للموارد البشرية</span><span class="hm-tools-hub-en">Hazem Moussa HR Tools</span></span><strong class="hm-tools-hub-footer__title"><span class="hm-tools-hub-ar">أنجزت مهمتك؟ اكتشف باقي الأدوات</span><span class="hm-tools-hub-en">Finished your task? Explore the rest</span></strong><span class="hm-tools-hub-footer__text"><span class="hm-tools-hub-ar">حاسبات ونماذج ومراجع عملية تساعدك في شئون العاملين والمرتبات.</span><span class="hm-tools-hub-en">Calculators, templates and practical references for HR and payroll work.</span></span></div><a class="hm-tools-hub-footer__button" href="' + HUB_URL + '"><span class="hm-tools-hub-ar">عرض جميع الأدوات</span><span class="hm-tools-hub-en">View all tools</span><span class="hm-tools-hub-arrow" aria-hidden="true">↗</span></a></div>';

  body.insertBefore(topBar, body.firstChild);
  body.appendChild(footer);

  function applyLanguage() {
    var lang = (documentElement.getAttribute('lang') || '').toLowerCase();
    var dir = (documentElement.getAttribute('dir') || body.getAttribute('dir') || '').toLowerCase();
    var appDirectionNode = document.querySelector('#root > [dir]');
    var appDirection = appDirectionNode ? (appDirectionNode.getAttribute('dir') || '').toLowerCase() : '';
    var isEnglish = appDirection === 'ltr' || (appDirection !== 'rtl' && (lang.indexOf('en') === 0 || dir === 'ltr'));
    topBar.classList.toggle('hm-tools-hub-is-en', isEnglish);
    footer.classList.toggle('hm-tools-hub-is-en', isEnglish);
    topBar.setAttribute('aria-label', isEnglish ? 'Return to all HR tools' : 'العودة إلى صفحة جميع الأدوات');
    footer.setAttribute('aria-label', isEnglish ? 'Explore more HR tools' : 'اكتشف باقي أدوات الموارد البشرية');
  }

  function bridgeLockedPage() {
    var htmlOverflow = getComputedStyle(documentElement).overflowY;
    var bodyOverflow = getComputedStyle(body).overflowY;
    if (htmlOverflow === 'hidden' || bodyOverflow === 'hidden') {
      documentElement.classList.add('hm-tools-hub-page-lock');
    }
  }

  applyLanguage();
  bridgeLockedPage();
  new MutationObserver(applyLanguage).observe(documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
  new MutationObserver(applyLanguage).observe(body, { attributes: true, childList: true, subtree: true, attributeFilter: ['lang', 'dir'] });
})();
