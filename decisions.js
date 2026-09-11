(() => {
  'use strict';
  const digitMap={'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9'};
  const toLatin=value=>String(value??'').replace(/[٠-٩۰-۹]/g,char=>digitMap[char]);
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const fileUrl=name=>`decisions/${encodeURIComponent(name)}`;
  const norm=value=>toLatin(value).toLowerCase().normalize('NFKD')
    .replace(/[\u064b-\u065f\u0670]/g,'').replace(/[إأآٱ]/g,'ا')
    .replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي')
    .replace(/[^ء-غف-ي0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  function stemWord(word=''){
    let value=word;
    if(value.length>5&&/^(وال|فال|بال|كال)/.test(value))value=value.slice(1);
    else if(value.length>4&&value.startsWith('لل'))value=`ال${value.slice(2)}`;
    if(value.length>4&&value.startsWith('ال'))value=value.slice(2);
    return value;
  }
  const wordsOf=value=>norm(value).split(' ').map(stemWord).filter(Boolean);
  function titleOf(filename=''){
    const base=filename.replace(/\.pdf$/i,'').replace(/_/g,' ').replace(/([0-9٠-٩۰-۹])(?=[ء-ي])/g,'$1 ').replace(/\s+/g,' ').trim();
    const standard=toLatin(base).match(/^2026\s+(\d+)\s*(.*)$/);
    return standard?`قرار رقم ${standard[1]} لسنة 2026${standard[2]?` — ${standard[2]}`:''}`:base;
  }
  function numberOf(name){
    const match=toLatin(name).match(/^2026_(\d+)|رقم\s*(\d+)|قرار\s+(\d+)/);
    return Number(match?.[1]||match?.[2]||match?.[3]||Number.MAX_SAFE_INTEGER);
  }
  function tokenMatches(term,token){
    if(/^\d+$/.test(term)||/^\d+$/.test(token))return term===token;
    return term===token||(term.length>=4&&token.length>=4&&Math.abs(term.length-token.length)<=2&&(term.startsWith(token)||token.startsWith(term)));
  }
  function matches(item,raw){
    const terms=[...new Set(wordsOf(raw).filter(word=>!['قرار','قرارات','رقم'].includes(word)))];
    if(!raw.trim())return true;
    if(!terms.length)return true;
    const tokens=wordsOf(item.title);
    const numeric=terms.filter(term=>/^\d+$/.test(term));
    if(numeric.some(term=>!tokens.includes(term)))return false;
    const text=terms.filter(term=>!/^\d+$/.test(term));
    const hits=text.filter(term=>tokens.some(token=>tokenMatches(term,token))).length;
    return !text.length||hits>=Math.max(1,Math.ceil(text.length*.6));
  }
  async function files(){
    const response=await fetch('data/decisions.json?v=20260911-1');
    if(!response.ok)throw new Error();
    const data=await response.json();
    return (data.files||[]).map(name=>({name,title:titleOf(name)})).sort((a,b)=>numberOf(a.name)-numberOf(b.name)||a.title.localeCompare(b.title,'ar'));
  }
  function row(item,index){
    return `<article class="decision-row"><div class="decision-number">${index+1}</div><div class="decision-name"><h3>${esc(item.title)}</h3><p>ملف PDF متاح للعرض والتنزيل</p></div><div class="decision-actions"><a class="view-decision" href="decision-viewer.html#${encodeURIComponent(item.name)}">عرض القرار</a><a class="download-decision" href="${fileUrl(item.name)}" download>تحميل PDF</a></div></article>`;
  }
  async function list(){
    const host=document.querySelector('#decisionsList');
    const search=document.querySelector('#decisionSearch');
    const count=document.querySelector('#decisionsCount');
    try{
      const all=await files();
      const render=()=>{
        const shown=all.filter(item=>matches(item,search.value));
        count.textContent=search.value.trim()?`${shown.length} من ${all.length} قرارًا وملفًا`:`${all.length} قرارًا وملفًا`;
        host.innerHTML=shown.length?shown.map(row).join(''):'<div class="empty-state"><strong>لا يوجد قرار مطابق</strong><span>جرّب رقم القرار فقط أو كلمة أقصر من موضوعه.</span></div>';
      };
      let timer;
      search.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(render,100)});
      render();
    }catch{
      host.innerHTML='<div class="empty-state"><strong>تعذر تحميل فهرس القرارات</strong><span>أعد تحميل الصفحة لاحقًا.</span></div>';
    }
  }
  async function viewer(){
    const host=document.querySelector('#viewer');
    let requested='';
    try{
      requested=decodeURIComponent(location.hash.slice(1));
      const all=await files();
      const item=all.find(entry=>entry.name===requested);
      if(!item)throw new Error();
      document.title=`${item.title} | مرجعك القانوني`;
      host.innerHTML=`<div class="viewer-head"><h1>${esc(item.title)}</h1><a class="download-decision" href="${fileUrl(item.name)}" download>تحميل PDF</a></div><iframe title="${esc(item.title)}" src="${fileUrl(item.name)}#view=FitH"></iframe><p class="viewer-note">إذا لم يظهر الملف في المتصفح، استخدم زر التحميل لفتحه على جهازك.</p>`;
    }catch{
      host.innerHTML='<div class="empty-state"><strong>القرار غير متاح</strong><span>ارجع إلى فهرس القرارات واختر ملفًا موجودًا.</span></div>';
    }
  }
  document.querySelector('#decisionsList')?list():viewer();
})();
