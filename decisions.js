(() => {
  'use strict';
  const digitMap={'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9'};
  const toLatin=s=>String(s).replace(/[٠-٩۰-۹]/g,c=>digitMap[c]);
  const numberOf=name=>{const match=toLatin(name).match(/2026_(\d+)|رقم\s*(\d+)|قرار\s+(\d+)/);return Number(match?.[1]||match?.[2]||match?.[3]||Number.MAX_SAFE_INTEGER);};
  const fileUrl=name=>`decisions/${encodeURIComponent(name)}`;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  async function files(){const r=await fetch('data/decisions.json?v=20260907-1');if(!r.ok)throw new Error();const d=await r.json();return d.files.sort((a,b)=>numberOf(a)-numberOf(b)||a.localeCompare(b,'ar'));}
  async function list(){const host=document.querySelector('#decisionsList');try {const list=await files();document.querySelector('#decisionsCount').textContent=`${list.length} قرارًا وملفًا`;host.innerHTML=list.map((name,i)=>`<article class="decision-row"><div class="decision-number">${i+1}</div><div class="decision-name"><h3>${esc(name)}</h3><p>ملف PDF متاح للعرض والتنزيل</p></div><div class="decision-actions"><a class="view-decision" href="decision-viewer.html#${encodeURIComponent(name)}">عرض القرار</a><a class="download-decision" href="${fileUrl(name)}" download>تحميل PDF</a></div></article>`).join('');} catch {host.innerHTML='<div class="empty-state"><strong>تعذر تحميل فهرس القرارات</strong><span>أعد تحميل الصفحة لاحقًا.</span></div>';}}
  async function viewer(){const host=document.querySelector('#viewer');const requested=decodeURIComponent(location.hash.slice(1));try {const list=await files();if(!list.includes(requested))throw new Error();host.innerHTML=`<div class="viewer-head"><h1>${esc(requested)}</h1><a class="download-decision" href="${fileUrl(requested)}" download>تحميل PDF</a></div><iframe title="${esc(requested)}" src="${fileUrl(requested)}#view=FitH"></iframe><p class="viewer-note">إذا لم يظهر الملف في المتصفح، استخدم زر التحميل لفتحه على جهازك.</p>`;} catch {host.innerHTML='<div class="empty-state"><strong>القرار غير متاح</strong><span>ارجع إلى فهرس القرارات واختر ملفًا موجودًا.</span></div>';}}
  document.querySelector('#decisionsList')?list():viewer();
})();
