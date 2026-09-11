(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const state = { data: null, items: [], scenarios: [], decisions: [], scenarioMeta: null, filtered: [], shown: 0, pageSize: 20 };
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
  function provisionNum(value=''){ return norm(String(value)).replace(/\s+/g,' '); }
  function item(key,num){ return state.items.find(i => i.law===key && provisionNum(i.num)===provisionNum(num)); }
  function haystack(i){ return norm([i.num,i.text,i.section,...(i.sub||[])].join(' ')); }

  const stopWords = new Set(['ايه','اي','ازاي','كيف','هل','هو','هي','ده','دي','دا','في','من','عن','علي','الى','الي','له','لها','لو','عايز','عاوزه','اعمل','ممكن','كام','ماده','قانون','رقم','لسنه','سنه','بدون']);
  function stemWord(word=''){
    let value=word;
    if(value.length>5&&/^(وال|فال|بال|كال)/.test(value)) value=value.slice(1);
    else if(value.length>4&&value.startsWith('لل')) value=`ال${value.slice(2)}`;
    if(value.length>4&&value.startsWith('ال')) value=value.slice(2);
    return value;
  }
  function wordsOf(raw){ return norm(raw).split(' ').map(stemWord).filter(Boolean); }
  function usefulWords(raw){ return [...new Set(wordsOf(raw).filter(w=>w.length>1&&!stopWords.has(w)))]; }
  function tokenMatches(term,token){
    if(/^\d+$/.test(term)||/^\d+$/.test(token)) return term===token;
    return term===token||(term.length>=4&&token.length>=4&&Math.abs(term.length-token.length)<=2&&(term.startsWith(token)||token.startsWith(term)));
  }
  function matchedTerms(terms,text){
    const tokens=wordsOf(text);
    return terms.filter(term=>tokens.some(token=>tokenMatches(term,token)));
  }
  function articleNumberFromQuery(raw){
    const match=norm(raw).match(/^(?:(?:الماده|ماده|م|رقم)\s*)?(\d+)$/);
    return match?.[1]||'';
  }

  function score(i, raw){
    const q=norm(raw); if(!q) return 0;
    const requestedNumber=articleNumberFromQuery(raw);
    if(requestedNumber) return /^\d+$/.test(provisionNum(i.num))&&Number(i.num)===Number(requestedNumber)?1000:0;
    const h=haystack(i),words=usefulWords(raw);
    if(!words.length) return 0;
    const matched=matchedTerms(words,h),hits=matched.length;
    const required=words.length===1?1:Math.max(2,Math.ceil(words.length*.65));
    if(hits<required) return 0;
    let n=10;
    n+=hits*5;
    if(hits===words.length) n+=12;
    if(norm(i.text).includes(q)) n+=12;
    if(norm(i.section).includes(q)) n+=5;
    if((i.sub||[]).some(x=>norm(x).includes(q))) n+=7;
    if(i.kind==='article') n+=1;
    return n;
  }

  function scenarioScore(s, raw){
    const q=norm(raw); if(!q||articleNumberFromQuery(raw)) return 0;
    const words=usefulWords(raw);
    if(!words.length) return 0;
    const source=[s.title,s.summary,s.category,...(s.keywords||[]),...(s.questions||[])].join(' ');
    const hits=matchedTerms(words,source).length;
    const required=words.length===1?1:Math.max(2,Math.ceil(words.length*.6));
    if(hits<required) return 0;
    const titleHits=matchedTerms(words,s.title).length;
    const keywordHits=matchedTerms(words,(s.keywords||[]).join(' ')).length;
    const exact=norm(s.title)===q||(s.questions||[]).some(question=>norm(question)===q);
    return hits*12+Math.round((hits/words.length)*20)+titleHits*8+keywordHits*6+(hits===words.length?15:0)+(exact?50:0);
  }

  function isTaxIntent(raw){
    const words=usefulWords(raw);
    const has=prefix=>words.some(word=>word.startsWith(prefix));
    if(['ضريب','وعاء','اعفاء','شريح','تسوي','احتساب','منظوم','معامل'].some(has)) return true;
    return (has('توريد')&&(has('مرتب')||has('اجر')||has('كسب')))||(has('كسب')&&has('عمل'));
  }

  function matchingScenario(raw){
    const allowTax=isTaxIntent(raw);
    return state.scenarios.filter(s=>allowTax||s.type!=='tax-faq')
      .map(s=>({s,n:scenarioScore(s,raw)})).filter(x=>x.n>=32)
      .sort((a,b)=>b.n-a.n||Number(b.s.type!=='tax-faq')-Number(a.s.type!=='tax-faq'))[0]?.s||null;
  }

  const decisionGenericWords=new Set(['قرار','قرارات','وزير','وزاره','وزاري','رقم','لسنه','سنه','بشان']);
  function decisionTitle(filename=''){
    const base=filename.replace(/\.pdf$/i,'').replace(/_/g,' ').replace(/([0-9٠-٩۰-۹])(?=[ء-ي])/g,'$1 ').replace(/\s+/g,' ').trim();
    const standard=digits(base).match(/^2026\s+(\d+)\s*(.*)$/);
    return standard?`قرار رقم ${standard[1]} لسنة 2026${standard[2]?` — ${standard[2]}`:''}`:base;
  }
  function decisionNumber(filename=''){
    const value=digits(filename);
    const direct=value.match(/^2026_(\d+)|^قرار\s+(\d+)/);
    if(direct) return direct[1]||direct[2];
    return value.match(/رقم\s*(\d+)/)?.[1]||'';
  }
  function decisionMatches(raw){
    const queryTokens=wordsOf(raw),numberTerms=queryTokens.filter(word=>/^\d+$/.test(word));
    const textTerms=queryTokens.filter(word=>!/^\d+$/.test(word)&&!decisionGenericWords.has(word));
    return state.decisions.map(filename=>{
      const title=decisionTitle(filename),tokens=wordsOf(title);
      if(numberTerms.some(term=>!tokens.includes(term))) return null;
      const textHits=textTerms.filter(term=>tokens.some(token=>tokenMatches(term,token))).length;
      if(textTerms.length&&textHits<Math.max(1,Math.ceil(textTerms.length*.6))) return null;
      let rank=numberTerms.length*40+textHits*12;
      const number=decisionNumber(filename);
      if(numberTerms.includes(number)) rank+=80;
      if(!numberTerms.length&&!textTerms.length) return null;
      return {filename,title,rank};
    }).filter(Boolean).sort((a,b)=>b.rank-a.rank||a.title.localeCompare(b.title,'ar'));
  }
  function isDecisionIntent(raw){
    return wordsOf(raw).some(word=>['قرار','قرارات','لائحه','وزاري'].some(prefix=>word.startsWith(prefix)));
  }

  function penaltyFor(i){
    if(i.kind!=='article') return [];
    const explicit=(i.penaltyNums||[]).map(n=>item(i.law,n)).filter(Boolean);
    const reverse=state.items.filter(p=>p.law===i.law&&p.kind==='penalty'&&(p.linkedTo||[]).some(n=>provisionNum(n)===provisionNum(i.num)));
    return [...new Map([...explicit,...reverse].map(x=>[x.id,x])).values()];
  }
  function highlight(text, raw){
    if(!raw || /^\s*\d+\s*$/.test(digits(raw))) return esc(text);
    const words=raw.trim().split(/\s+/).filter(Boolean).map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
    if(!words.length) return esc(text);
    const re=new RegExp(`(${words.join('|')})`,'gi');
    return esc(text).replace(re,'<mark class="mark">$1</mark>');
  }
  function penaltySummary(text=''){
    const points=[];
    const fine=text.match(/بغرامة[^،.]*(?:جنيه|جنيهًا)[^،.]*/);
    const multiple=text.match(/تتعدد الغرامة[^.،]*/);
    const repeat=text.match(/تضاعف الغرامة[^.]*/);
    if(fine)points.push(`الغرامة: ${fine[0].replace(/^بغرامة\s*/, '')}`);
    if(multiple)points.push(multiple[0]);
    if(repeat)points.push(repeat[0]);
    return [...new Set(points)].slice(0,3);
  }
  function penaltyMarkup(p){
    const points=penaltySummary(p.text);
    return `<div class="penalty-box"><div class="penalty-head"><span aria-hidden="true">⚖</span><span>الجزاء المرتبط — م (${p.num})</span></div>${points.length?`<ul class="penalty-summary">${points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}<div class="penalty-full"><strong>نص المادة كاملة:</strong> ${esc(p.text)}</div></div>`;
  }
  function card(i, raw){
    const l=law(i.law), penalties=penaltyFor(i);
    const subs=(i.sub||[]).length?`<div class="sub-items">${i.sub.map(x=>`<p class="sub-item">${highlight(x,raw)}</p>`).join('')}</div>`:'';
    const related=i.kind==='article'?penalties.map(p=>penaltyMarkup(p)).join(''):(i.linkedTo||[]).length?`<div class="penalty-box"><div class="penalty-head">المواد المرتبطة بهذه العقوبة</div><div class="linked-list">${i.linkedTo.map(n=>`<button type="button" data-open="${i.law}:${n}">المادة ${n}</button>`).join('')}</div></div>`:'';
    return `<article class="result-card" id="${i.id}"><div class="card-top"><div><div class="meta">${i.kind==='penalty'?'<span class="kind-tag">مادة عقوبات</span>':''}<h3 class="article-no">م (${i.num})</h3></div>${i.section?`<p class="section-name"><span aria-hidden="true">📁</span> ${esc(i.section)}</p>`:''}</div><div class="card-actions"><button class="icon-btn" type="button" data-copy="${i.id}">نسخ</button><button class="icon-btn" type="button" data-share="${i.id}">مشاركة</button></div></div><div class="legal-text">${highlight(i.text,raw)}</div>${subs}${related}<div class="source-line"><span>${esc(l.short)}</span><span>المصدر: ${esc(l.source)} · آخر مراجعة: ${esc(state.data.meta.lastReviewed)}</span></div></article>`;
  }


  function scenarioCard(s){
    const steps=(s.steps||[]).map(x=>`<li>${esc(x)}</li>`).join('');
    const refs=(s.articles||[]).map(a=>{const i=item(a.law,a.num),l=law(a.law);return i?`<button type="button" data-open="${a.law}:${a.num}">${esc(l.short)} · المادة ${a.num}</button>`:''}).join('');
    const isFaq=s.type==='tax-faq';
    return `<article class="scenario-card"><div class="scenario-label">${isFaq?'سؤال ضريبي شائع · بدون AI':'موقف عملي · بدون AI'}</div>${s.category?`<p class="scenario-category">${esc(s.category)}</p>`:''}<h3>${esc(s.title)}</h3><p class="scenario-summary">${esc(s.summary)}</p>${steps?`<div class="scenario-steps"><strong>خطوات المراجعة لمسؤول شئون العاملين</strong><ol>${steps}</ol></div>`:''}${refs?`<div class="scenario-refs"><strong>السند القانوني المذكور في الإجابة</strong><div>${refs}</div></div>`:''}${s.source?`<p class="faq-source">المصدر: ${esc(s.source)}${s.sourcePage?` · ص ${s.sourcePage}`:''}</p>`:''}<p class="scenario-notice">${esc(state.scenarioMeta?.notice||'يظل النص الرسمي للقانون والقرارات المنفذة هو المرجع.')}</p></article>`;
  }

  function decisionCard(decision){
    const target=`decision-viewer.html#${encodeURIComponent(decision.filename)}`;
    return `<article class="decision-row search-decision"><div class="decision-icon" aria-hidden="true">PDF</div><div><p class="decision-kicker">قرار وزاري</p><h3>${esc(decision.title)}</h3></div><a class="decision-link" href="${target}" aria-label="فتح ${esc(decision.title)}">فتح القرار</a></article>`;
  }

  function render(reset=true){
    const raw=els.query.value.trim();
    if(!raw){ showWelcome(); return; }
    const lawFilter=$('input[name="law"]:checked').value, kindFilter=$('input[name="kind"]:checked').value;
    const decisionIntent=lawFilter==='all'&&kindFilter==='all'&&isDecisionIntent(raw);
    const decisions=decisionIntent?decisionMatches(raw):[];
    const scenario=lawFilter==='all'&&kindFilter==='all'?matchingScenario(raw):null;
    state.filtered=state.items.map(i=>({i,s:score(i,raw)})).filter(x=>x.s>0)
      .filter(x=>lawFilter==='all'||x.i.law===lawFilter).filter(x=>kindFilter==='all'||x.i.kind===kindFilter)
      .sort((a,b)=>b.s-a.s||Number.parseInt(a.i.num,10)-Number.parseInt(b.i.num,10)||String(a.i.num).localeCompare(String(b.i.num),'ar')).map(x=>x.i);
    if(reset) state.shown=state.pageSize;
    const visible=state.filtered.slice(0,state.shown);
    if(decisions.length){
      els.title.textContent=`القرارات المطابقة لـ «${raw}»`;
      els.count.textContent=`${decisions.length} قرار`;
      els.results.innerHTML=`<div class="fallback-note"><strong>وجدنا القرار في فهرس القرارات الوزارية.</strong><span>يفتح الرابط ملف القرار داخل عارض الموقع.</span></div>${decisions.map(decisionCard).join('')}`;
      els.more.hidden=true;
      els.clear.hidden=false;
      syncHash(raw,lawFilter,kindFilter);
      return;
    }
    if(decisionIntent){
      els.title.textContent=`البحث في القرارات عن «${raw}»`;
      els.count.textContent='0 قرار';
      els.results.innerHTML='<div class="empty-state"><strong>لا يوجد قرار مطابق في الفهرس</strong><span>تحقق من رقم القرار أو ابحث بكلمة أقصر من موضوعه.</span><p><a class="primary-link" href="decisions.html">تصفح كل القرارات</a></p></div>';
      els.more.hidden=true;
      els.clear.hidden=false;
      syncHash(raw,lawFilter,kindFilter);
      return;
    }
    if(scenario){
      const referenced=(scenario.articles||[]).map(a=>item(a.law,a.num)).filter(Boolean);
      const unique=[...new Map(referenced.map(i=>[i.id,i])).values()];
      els.title.textContent=`${scenario.type==='tax-faq'?'إجابة من دليل الضرائب':'إجابة عملية'} عن «${raw}»`;
      els.count.textContent=scenario.type==='tax-faq'?`سؤال شائع${unique.length?` · ${unique.length} مادة مرتبطة`:''}`:`موقف واحد · ${unique.length} مادة مرتبطة`;
      const linkedMarkup=unique.length?`<div class="legal-results-heading"><strong>النصوص القانونية المرتبطة والعقوبات</strong><span>اضغط على رقم أي مادة للانتقال إليها منفردة.</span></div>${unique.map(i=>card(i,'')).join('')}`:'';
      els.results.innerHTML=scenarioCard(scenario)+linkedMarkup;
      els.more.hidden=true;
      els.clear.hidden=false;
      syncHash(raw,lawFilter,kindFilter);
      return;
    }
    els.title.textContent=`نتائج البحث القانوني عن «${raw}»`;
    els.count.textContent=`${state.filtered.length} نتيجة`;
    els.clear.hidden=false;
    els.results.innerHTML=visible.length?`<div class="fallback-note"><strong>لم نجد موقفًا عمليًا مطابقًا، فبحثنا لك في مواد القانون.</strong><span>تظهر مع كل مادة عقوبتها المرتبطة إن وجدت.</span></div>${visible.map(i=>card(i,raw)).join('')}`:`<div class="empty-state"><strong>لم نجد موقفًا أو مادة مطابقة</strong><span>جرّب كلمة أقصر، أو ابحث برقم المادة فقط.</span></div>`;
    els.more.hidden=state.shown>=state.filtered.length;
    syncHash(raw,lawFilter,kindFilter);
  }
  function showWelcome(){
    els.title.textContent='ابدأ بكتابة كلمة أو رقم مادة'; els.count.textContent=''; els.clear.hidden=true; els.more.hidden=true;
    els.results.innerHTML=`<div class="welcome-state"><div class="welcome-icon" aria-hidden="true">§</div><h3>اسأل عن موقف HR أو ابحث في القانون</h3><p>لو وجدنا موقفًا مطابقًا سنعرض خطواته ومواده، وإلا سنعرض النصوص القانونية الكاملة والعقوبات المرتبطة.</p><div class="quick-searches"><span>جرّب:</span><button data-query="موظف قدم استقالة أعمل إيه؟">استقالة موظف</button><button data-query="الإعفاء الشخصي كام؟">إعفاء المرتبات</button><button data-query="قرار 162">قرار 162</button><button data-query="54">المادة 54</button></div><p class="welcome-links"><a class="primary-link" href="scenarios.html">تصفح المواقف والأسئلة</a><a class="article-page-link" href="hr-hub/">أدوات HR من حازم موسى</a></p></div>`;
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
      const dataVersion='20260911-1';
      const [lawsRes,scenariosRes,decisionsRes]=await Promise.all([
        fetch(`data/laws.json?v=${dataVersion}`),
        fetch(`data/hr-scenarios.json?v=${dataVersion}`),
        fetch(`data/decisions.json?v=${dataVersion}`)
      ]);
      if(!lawsRes.ok)throw new Error(); state.data=await lawsRes.json();
      if(scenariosRes.ok){const scenarioData=await scenariosRes.json();state.scenarios=scenarioData.scenarios||[];state.scenarioMeta=scenarioData.meta||null;}
      if(decisionsRes.ok){const decisionsData=await decisionsRes.json();state.decisions=decisionsData.files||[];}
      state.items=state.data.laws.flatMap(l=>l.items); els.total.textContent=state.items.length;
      const p=new URLSearchParams(location.hash.slice(1)); if(p.get('q')){els.query.value=p.get('q');const lr=$(`input[name="law"][value="${p.get('law')}"]`);const kr=$(`input[name="kind"][value="${p.get('kind')}"]`);if(lr)lr.checked=true;if(kr)kr.checked=true;render();}
    }catch{els.results.innerHTML='<div class="empty-state"><strong>تعذر تحميل بيانات القوانين</strong><span>أعد تحميل الصفحة أو تحقق من ملفات الموقع.</span></div>'}
  }
  let timer; els.query.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>render(),120)});$('#searchBtn').addEventListener('click',()=>render());els.query.addEventListener('keydown',e=>{if(e.key==='Enter')render()});
  els.clear.addEventListener('click',()=>{els.query.value='';els.query.focus();showWelcome()});
  $$('.filters input').forEach(x=>x.addEventListener('change',()=>render()));els.more.addEventListener('click',()=>{state.shown+=state.pageSize;render(false)});
  document.addEventListener('click',e=>{const q=e.target.closest('[data-query]'),o=e.target.closest('[data-open]'),c=e.target.closest('[data-copy]'),s=e.target.closest('[data-share]');if(q){els.query.value=q.dataset.query;render();els.query.focus()}if(o)openItem(o.dataset.open);if(c)copyItem(c.dataset.copy);if(s)shareItem(s.dataset.share)});
  const dialog=$('#aboutDialog');$('#aboutBtn').addEventListener('click',()=>dialog.showModal());$('.dialog-close',dialog).addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  document.addEventListener('contextmenu',e=>{if(!e.target.closest('input,textarea')){e.preventDefault();toast('المحتوى محمي من النسخ المباشر')}});
  document.addEventListener('dragstart',e=>{if(e.target.closest('img,a'))e.preventDefault()});
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&['s','u'].includes(e.key.toLowerCase())){e.preventDefault();toast('استخدم أدوات الموقع للوصول إلى المحتوى')}});
  init();
})();

