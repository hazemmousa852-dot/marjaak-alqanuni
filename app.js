(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const state = { data: null, items: [], filtered: [], shown: 0, pageSize: 20 };
  const els = {
    query: $('#query'), results: $('#results'), title: $('#resultsTitle'), count: $('#resultCount'),
    clear: $('#clearBtn'), more: $('#loadMore'), toast: $('#toast'), total: $('#totalCount')
  };

  const digitMap = {'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9'};
  function digits(s=''){ return s.replace(/[٠-٩۰-۹]/g, c => digitMap[c]); }
  function norm(s=''){
    return digits(s).toLowerCase().normalize('NFKD')
      .replace(/[\u064b-\u065f\u0670]/g,'').replace(/[إأآٱ]/g,'ا')
      .replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي')
      .replace(/[^ء-غف-ي0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  }
  function esc(s=''){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function law(key){ return state.data.laws.find(l => l.key === key); }
  function item(key,num){ return state.items.find(i => i.law===key && Number(i.num)===Number(num)); }
  function haystack(i){ return norm([i.num,i.text,i.section,...(i.sub||[])].join(' ')); }

  function score(i, raw){
    const q = norm(raw); if(!q) return 0;
    const numeric = /^\d+$/.test(q);
    if(numeric) return Number(i.num)===Number(q) ? 1000 : 0;
    const h=haystack(i), words=q.split(' ').filter(Boolean);
    if(!words.every(w=>h.includes(w))) return 0;
    let n=10;
    if(norm(i.text).includes(q)) n+=12;
    if(norm(i.section).includes(q)) n+=5;
    if((i.sub||[]).some(x=>norm(x).includes(q))) n+=7;
    if(i.kind==='article') n+=1;
    return n;
  }

  function penaltyFor(i){
    if(i.kind!=='article') return [];
    const explicit=(i.penaltyNums||[]).map(n=>item(i.law,n)).filter(Boolean);
    const reverse=state.items.filter(p=>p.law===i.law&&p.kind==='penalty'&&(p.linkedTo||[]).includes(Number(i.num)));
    return [...new Map([...explicit,...reverse].map(x=>[x.id,x])).values()];
  }
  function highlight(text, raw){
    if(!raw || /^\s*\d+\s*$/.test(digits(raw))) return esc(text);
    const words=raw.trim().split(/\s+/).filter(Boolean).map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
    if(!words.length) return esc(text);
    const re=new RegExp(`(${words.join('|')})`,'gi');
    return esc(text).replace(re,'<mark class="mark">$1</mark>');
  }
  function penaltyMarkup(p){
    const links=(p.linkedTo||[]).map(n=>`<button type="button" data-open="${p.law}:${n}">المادة ${n}</button>`).join('');
    return `<div class="penalty-box"><div class="penalty-head"><span aria-hidden="true">⚖</span><span>العقوبة المرتبطة - المادة ${p.num}</span></div><p class="penalty-text">${esc(p.text)}</p>${links?`<div class="linked-list"><span>المواد التي تعاقب عليها:</span>${links}</div>`:''}</div>`;
  }
  function card(i, raw){
    const l=law(i.law), penalties=penaltyFor(i);
    const subs=(i.sub||[]).length?`<div class="sub-items">${i.sub.map(x=>`<p class="sub-item">${highlight(x,raw)}</p>`).join('')}</div>`:'';
    const related=i.kind==='article'?penalties.map(p=>penaltyMarkup(p)).join(''):(i.linkedTo||[]).length?`<div class="penalty-box"><div class="penalty-head">المواد المرتبطة بهذه العقوبة</div><div class="linked-list">${i.linkedTo.map(n=>`<button type="button" data-open="${i.law}:${n}">المادة ${n}</button>`).join('')}</div></div>`:'';
    return `<article class="result-card" id="${i.id}"><div class="card-top"><div><div class="meta"><span class="law-tag">${esc(l.short)}</span>${i.kind==='penalty'?'<span class="kind-tag">مادة عقوبات</span>':''}</div><h3 class="article-no">المادة (${i.num})</h3>${i.section?`<p class="section-name">${esc(i.section)}</p>`:''}</div><div class="card-actions"><button class="icon-btn" type="button" data-copy="${i.id}">نسخ</button><button class="icon-btn" type="button" data-share="${i.id}">مشاركة</button></div></div><div class="legal-text">${highlight(i.text,raw)}</div>${subs}${related}<div class="source-line">المصدر: ${esc(l.source)} · آخر مراجعة للبيانات: ${esc(state.data.meta.lastReviewed)}</div></article>`;
  }

  function render(reset=true){
    const raw=els.query.value.trim();
    if(!raw){ showWelcome(); return; }
    const lawFilter=$('input[name="law"]:checked').value, kindFilter=$('input[name="kind"]:checked').value;
    state.filtered=state.items.map(i=>({i,s:score(i,raw)})).filter(x=>x.s>0)
      .filter(x=>lawFilter==='all'||x.i.law===lawFilter).filter(x=>kindFilter==='all'||x.i.kind===kindFilter)
      .sort((a,b)=>b.s-a.s||a.i.num-b.i.num).map(x=>x.i);
    if(reset) state.shown=state.pageSize;
    const visible=state.filtered.slice(0,state.shown);
    els.title.textContent=`نتائج البحث عن «${raw}»`;
    els.count.textContent=`${state.filtered.length} نتيجة`;
    els.clear.hidden=false;
    els.results.innerHTML=visible.length?visible.map(i=>card(i,raw)).join(''):`<div class="empty-state"><strong>لم نجد نتيجة مطابقة</strong><span>جرّب كلمة أقصر، أو ابحث برقم المادة فقط.</span></div>`;
    els.more.hidden=state.shown>=state.filtered.length;
    syncHash(raw,lawFilter,kindFilter);
  }
  function showWelcome(){
    els.title.textContent='ابدأ بكتابة كلمة أو رقم مادة'; els.count.textContent=''; els.clear.hidden=true; els.more.hidden=true;
    els.results.innerHTML=`<div class="welcome-state"><div class="welcome-icon" aria-hidden="true">§</div><h3>الوصول إلى النص القانوني أصبح أسهل</h3><p>اكتب كلمة أو رقم مادة، وسنعرض لك النص الكامل والبنود والعقوبة المرتبطة إن وجدت.</p><div class="quick-searches"><span>جرّب:</span><button data-query="الإجازة">الإجازة</button><button data-query="إصابة العمل">إصابة العمل</button><button data-query="المعاش">المعاش</button><button data-query="54">المادة 54</button></div></div>`;
    history.replaceState(null,'',location.pathname);
  }
  function syncHash(q,l,k){ const p=new URLSearchParams({q}); if(l!=='all')p.set('law',l);if(k!=='all')p.set('kind',k);history.replaceState(null,'',`#${p}`); }
  function openItem(spec){
    const [key,n]=spec.split(':'); const i=item(key,n); if(!i)return;
    const lawRadio=$(`input[name="law"][value="${key}"]`); if(lawRadio)lawRadio.checked=true;
    els.query.value=String(n);render();requestAnimationFrame(()=>document.getElementById(i.id)?.scrollIntoView({behavior:'smooth',block:'start'}));
  }
  function toast(msg){els.toast.textContent=msg;els.toast.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>els.toast.classList.remove('show'),1800)}
  function copyItem(id){const i=state.items.find(x=>x.id===id),l=law(i.law);navigator.clipboard.writeText(`${l.short} - المادة (${i.num})\n${i.text}`).then(()=>toast('تم نسخ نص المادة')).catch(()=>toast('تعذر النسخ'));}
  async function shareItem(id){const i=state.items.find(x=>x.id===id),l=law(i.law),text=`${l.short} - المادة (${i.num})\n${i.text}`;if(navigator.share){try{await navigator.share({title:`المادة ${i.num} - ${l.short}`,text,url:`${location.origin}${location.pathname}#q=${i.num}&law=${i.law}`})}catch{}}else{navigator.clipboard.writeText(text).then(()=>toast('تم نسخ النص للمشاركة'));}}

  async function init(){
    try{
      const res=await fetch('data/laws.json'); if(!res.ok)throw new Error(); state.data=await res.json();
      state.items=state.data.laws.flatMap(l=>l.items); els.total.textContent=state.items.length;
      const p=new URLSearchParams(location.hash.slice(1)); if(p.get('q')){els.query.value=p.get('q');const lr=$(`input[name="law"][value="${p.get('law')}"]`);const kr=$(`input[name="kind"][value="${p.get('kind')}"]`);if(lr)lr.checked=true;if(kr)kr.checked=true;render();}
    }catch{els.results.innerHTML='<div class="empty-state"><strong>تعذر تحميل بيانات القوانين</strong><span>أعد تحميل الصفحة أو تحقق من ملفات الموقع.</span></div>'}
  }
  let timer; els.query.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>render(),120)});$('#searchBtn').addEventListener('click',()=>render());els.query.addEventListener('keydown',e=>{if(e.key==='Enter')render()});
  els.clear.addEventListener('click',()=>{els.query.value='';els.query.focus();showWelcome()});
  $$('.filters input').forEach(x=>x.addEventListener('change',()=>render()));els.more.addEventListener('click',()=>{state.shown+=state.pageSize;render(false)});
  document.addEventListener('click',e=>{const q=e.target.closest('[data-query]'),o=e.target.closest('[data-open]'),c=e.target.closest('[data-copy]'),s=e.target.closest('[data-share]');if(q){els.query.value=q.dataset.query;render();els.query.focus()}if(o)openItem(o.dataset.open);if(c)copyItem(c.dataset.copy);if(s)shareItem(s.dataset.share)});
  const dialog=$('#aboutDialog');$('#aboutBtn').addEventListener('click',()=>dialog.showModal());$('.dialog-close',dialog).addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  init();
})();

