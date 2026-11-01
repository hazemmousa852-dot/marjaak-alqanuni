/* Shared HR tools header. UI navigation only; excluded from print and document exports. */
(function () {
  'use strict';
  if (document.getElementById('hm-unified-header')) return;
  var root = document.documentElement;
  var body = document.body;
  if (!body) return;
  var hub = 'https://hazemmousa852-dot.github.io/marjaak-alqanuni/hr-hub/tools/';
  var logo = 'https://hazemmousa852-dot.github.io/marjaak-alqanuni/brand/logo-512.png';
  var originalPadding = getComputedStyle(body).paddingTop;
  root.style.setProperty('--hm-header-original-padding', originalPadding);
  var css = document.createElement('style');
  css.id = 'hm-unified-header-styles';
  css.textContent = `
  @media screen {
    html[data-hm-unified-header] body {padding-top:calc(var(--hm-header-original-padding,0px) + var(--hm-unified-header-height,88px))!important}
    html[data-hm-unified-header] body #hm-tools-hub-bar,
    html[data-hm-unified-header] body #hm-tools-brand-chip {display:none!important}
    html[data-hm-unified-header] [data-hm-unified-offset] {top:var(--hm-unified-header-height,88px)!important;inset-block-start:var(--hm-unified-header-height,88px)!important}
    html[data-hm-unified-header] .sidebar[data-hm-unified-offset] {height:calc(100dvh - var(--hm-unified-header-height,88px))!important}
    html[data-hm-unified-header] body:has(#builder) > header,
    html[data-hm-unified-header] body:has(#pensionForm) > header {display:none!important}
    #hm-unified-header {all:initial;box-sizing:border-box;position:fixed;inset:0 0 auto;z-index:1000;display:block;width:100%;background:#071827;border-bottom:1px solid #c8a36566;color:#fff;font-family:Cairo,Tahoma,Arial,sans-serif;box-shadow:0 3px 14px #07182712;isolation:isolate}
    #hm-unified-header * {box-sizing:border-box}
    #hm-unified-header .hm-unified-inner {width:min(1240px,calc(100% - 40px));min-height:88px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:20px;direction:rtl}
    #hm-unified-header a {text-decoration:none;color:inherit;font:inherit}
    #hm-unified-header .hm-unified-brand {display:flex;align-items:center;gap:16px;min-width:0}
    #hm-unified-header img {display:block;width:64px;height:64px;flex:0 0 64px;object-fit:contain;border-radius:50%;border:1px solid #c8a36580;background:#071827}
    #hm-unified-header .hm-unified-copy {display:flex;flex-direction:column;gap:5px;text-align:right;direction:ltr;line-height:1.3}
    #hm-unified-header strong {display:block;color:#fff;font-family:Arial,Tahoma,sans-serif;font-size:25px;font-weight:700;white-space:nowrap}
    #hm-unified-header small {display:block;color:#c8a365;font-family:Arial,Tahoma,sans-serif;font-size:12px;letter-spacing:2.5px;white-space:nowrap}
    #hm-unified-header .hm-unified-all {display:inline-flex;align-items:center;justify-content:center;gap:9px;flex:0 0 auto;padding:11px 19px;min-height:44px;white-space:nowrap;border:1px solid #c8a36599;border-radius:15px;font-weight:700;font-size:15px;line-height:1.5;color:#fff;background:transparent;transition:background .15s,border-color .15s}
    #hm-unified-header .hm-unified-all:hover {background:#ffffff0d;border-color:#c8a365}
    #hm-unified-header a:focus-visible {outline:3px solid #e4c892;outline-offset:4px;border-radius:12px}
    #hm-unified-header .hm-unified-arrow {font-family:Arial,sans-serif;font-size:21px;line-height:1}
    @media(max-width:640px) {
      #hm-unified-header .hm-unified-inner {width:calc(100% - 24px);min-height:76px;gap:10px}
      #hm-unified-header .hm-unified-brand {gap:9px}
      #hm-unified-header img {width:48px;height:48px;flex-basis:48px}
      #hm-unified-header strong {font-size:17px}
      #hm-unified-header small {font-size:9px;letter-spacing:1.2px}
      #hm-unified-header .hm-unified-all {font-size:12px;gap:6px;padding:9px 11px;min-height:42px;border-radius:12px}
      #hm-unified-header .hm-unified-arrow {font-size:18px}
    }
    @media(max-width:350px) {
      #hm-unified-header strong {font-size:15px}
      #hm-unified-header small {font-size:8px;letter-spacing:.7px}
      #hm-unified-header img {width:40px;height:40px;flex-basis:40px}
      #hm-unified-header .hm-unified-all {padding:9px 8px;font-size:11px}
    }
    @media(prefers-reduced-motion:reduce) {#hm-unified-header .hm-unified-all {transition:none}}
  }
  @media print {#hm-unified-header {display:none!important}}
  `;
  var nav = document.createElement('nav');
  nav.id = 'hm-unified-header';
  nav.className = 'no-print print-hidden';
  nav.setAttribute('aria-label', 'أدوات حازم موسى للموارد البشرية');
  nav.innerHTML = '<div class="hm-unified-inner"><a class="hm-unified-brand" href="'+hub+'" aria-label="Hazem Moussa — HR & Payroll Hub"><img src="'+logo+'" width="64" height="64" alt="شعار حازم موسى" decoding="async"><span class="hm-unified-copy"><strong>Hazem Moussa</strong><small>HR &amp; PAYROLL HUB</small></span></a><a class="hm-unified-all" href="'+hub+'"><span class="hm-unified-label">كل أدوات HR</span><span class="hm-unified-arrow" aria-hidden="true">↗</span></a></div>';
  document.head.appendChild(css);
  root.setAttribute('data-hm-unified-header','1');
  body.insertBefore(nav,body.firstChild);
  function sync() {
    var height = Math.ceil(nav.getBoundingClientRect().height);
    var next = height+'px';
    if (height && root.style.getPropertyValue('--hm-unified-header-height') !== next) root.style.setProperty('--hm-unified-header-height',next);
    var nodes = document.querySelectorAll('header,.topbar,.mobile-tabs,.sidebar');
    for (var i=0;i<nodes.length;i++) {
      var node=nodes[i];
      if (nav.contains(node) || node.closest('.cv-document,.certificate,#calculation-print-root,.contract-page')) continue;
      var style=getComputedStyle(node);
      if ((style.position==='fixed'||style.position==='sticky') && (parseFloat(style.top)===0 || node.hasAttribute('data-hm-tools-offset-header') || node.hasAttribute('data-hm-unified-offset'))) {
        if (!node.hasAttribute('data-hm-unified-offset')) node.setAttribute('data-hm-unified-offset','1');
      }
    }
    var english=(root.lang||'').toLowerCase().indexOf('en')===0;
    var app=document.querySelector('#root > [dir]');
    if(app) english=app.getAttribute('dir')==='ltr';
    var label=english?'All HR tools':'كل أدوات HR';
    var labelNode=nav.querySelector('.hm-unified-label');
    if(labelNode.textContent!==label) labelNode.textContent=label;
  }
  sync();
  window.addEventListener('resize',sync,{passive:true});
  if(window.ResizeObserver) new ResizeObserver(sync).observe(nav);
  new MutationObserver(sync).observe(body,{childList:true,subtree:true,attributes:true,attributeFilter:['lang','dir']});
  new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['lang','dir']});
})();
