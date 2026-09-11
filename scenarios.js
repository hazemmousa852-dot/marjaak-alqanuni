(() => {
  'use strict';
  const $=selector=>document.querySelector(selector);
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const digitMap={'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9'};
  const digits=value=>String(value??'').replace(/[٠-٩۰-۹]/g,char=>digitMap[char]);
  const norm=value=>digits(value).toLowerCase().normalize('NFKD')
    .replace(/[\u064b-\u065f\u0670]/g,'').replace(/[إأآٱ]/g,'ا')
    .replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي')
    .replace(/[^ء-غف-ي0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  const stopWords=new Set(['ايه','اي','ازاي','كيف','هل','هو','هي','ده','دي','دا','في','من','عن','علي','الى','الي','له','لها','لو','عايز','عاوزه','اعمل','ممكن','كام','بدون']);

  let scenarios=[],laws=[];
  const list=$('#scenarioList');
  const count=$('#scenarioCount');
  const search=$('#scenarioSearch');
  const categoryFilter=$('#categoryFilter');
  const typeFilter=$('#typeFilter');
  const chips=$('#categoryChips');

  function stemWord(word=''){
    let value=word;
    if(value.length>5&&/^(وال|فال|بال|كال)/.test(value)) value=value.slice(1);
    else if(value.length>4&&value.startsWith('لل')) value=`ال${value.slice(2)}`;
    if(value.length>4&&value.startsWith('ال')) value=value.slice(2);
    return value;
  }
  function wordsOf(value){return norm(value).split(' ').map(stemWord).filter(Boolean)}
  function queryTerms(value){return [...new Set(wordsOf(value).filter(word=>word.length>1&&!stopWords.has(word)))]}
  function tokenMatches(term,token){
    if(/^\d+$/.test(term)||/^\d+$/.test(token))return term===token;
    return term===token||(term.length>=4&&token.length>=4&&Math.abs(term.length-token.length)<=2&&(term.startsWith(token)||token.startsWith(term)));
  }
  function lawName(key){return laws.find(law=>law.key===key)?.short||key}
  function categoryOf(scenario){return scenario.category||'مواقف شئون العاملين'}
  function typeOf(scenario){return scenario.type==='tax-faq'?'tax-faq':'practical'}
  function articleLinks(scenario){
    return (scenario.articles||[]).map(article=>`<a class="rel-link" href="article.html?law=${encodeURIComponent(article.law)}&article=${encodeURIComponent(article.num)}">${esc(lawName(article.law))} · المادة ${esc(article.num)}</a>`).join('');
  }
  function matchesQuery(scenario,raw){
    if(!raw.trim())return true;
    const terms=queryTerms(raw);
    if(!terms.length)return false;
    const tokens=wordsOf([scenario.title,scenario.summary,scenario.category,...(scenario.keywords||[]),...(scenario.questions||[])].join(' '));
    const hits=terms.filter(term=>tokens.some(token=>tokenMatches(term,token))).length;
    const required=terms.length===1?1:Math.max(2,Math.ceil(terms.length*.6));
    return hits>=required;
  }
  function scenarioMarkup(scenario){
    const isFaq=scenario.type==='tax-faq';
    const source=scenario.source?`<p class="faq-source">المصدر: ${esc(scenario.source)}${scenario.sourcePage?` · ص ${esc(scenario.sourcePage)}`:''}</p>`:'';
    return `<article class="scenario-browser-card" id="${esc(scenario.id)}"><div class="scenario-label">${isFaq?'دليل الأسئلة الضريبية':esc(categoryOf(scenario))}</div><h3>${esc(scenario.title)}</h3><div class="practical-summary"><strong>الخلاصة</strong><p>${esc(scenario.summary)}</p></div>${(scenario.steps||[]).length?`<div class="practical-steps"><strong>الإجراء المطلوب من HR</strong><ol>${scenario.steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ol></div>`:''}${(scenario.articles||[]).length?`<div class="scenario-refs"><strong>المواد المرتبطة</strong><div>${articleLinks(scenario)}</div></div>`:''}${source}</article>`;
  }
  function syncChip(){
    chips.querySelectorAll('button').forEach(button=>button.classList.toggle('active',button.dataset.cat===categoryFilter.value));
  }
  function render(){
    const raw=search.value;
    const category=categoryFilter.value;
    const type=typeFilter.value;
    const rows=scenarios.filter(scenario=>(type==='all'||typeOf(scenario)===type)&&(category==='all'||categoryOf(scenario)===category)&&matchesQuery(scenario,raw));
    const practicalCount=rows.filter(scenario=>typeOf(scenario)==='practical').length;
    const faqCount=rows.length-practicalCount;
    count.textContent=`${rows.length} نتيجة · ${practicalCount} موقف عملي · ${faqCount} سؤال ضريبي`;
    list.innerHTML=rows.length?rows.map(scenarioMarkup).join(''):'<div class="empty-state"><strong>لا توجد نتائج مطابقة</strong><span>جرّب كلمات أقل، أو اختر كل أنواع المحتوى والتصنيفات.</span></div>';
    syncChip();
    if(location.hash){const element=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(element)setTimeout(()=>element.scrollIntoView({behavior:'smooth',block:'start'}),50)}
  }
  async function init(){
    try{
      const dataVersion='20260911-1';
      const [scenariosResponse,lawsResponse]=await Promise.all([fetch(`data/hr-scenarios.json?v=${dataVersion}`),fetch(`data/laws.json?v=${dataVersion}`)]);
      if(!scenariosResponse.ok||!lawsResponse.ok)throw new Error();
      const scenarioData=await scenariosResponse.json(),lawData=await lawsResponse.json();
      scenarios=scenarioData.scenarios||[];
      laws=lawData.laws||[];
      const categories=[...new Set(scenarios.map(categoryOf))].sort((a,b)=>a.localeCompare(b,'ar'));
      categoryFilter.innerHTML='<option value="all">كل التصنيفات</option>'+categories.map(category=>`<option>${esc(category)}</option>`).join('');
      chips.innerHTML=['الكل',...categories.slice(0,12)].map((category,index)=>`<button type="button" data-cat="${index===0?'all':esc(category)}" class="${index===0?'active':''}">${esc(category)}</button>`).join('');
      render();
    }catch{
      list.innerHTML='<div class="empty-state"><strong>تعذر تحميل قاعدة المواقف</strong><span>أعد تحميل الصفحة.</span></div>';
    }
  }

  let timer;
  search.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(render,100)});
  categoryFilter.addEventListener('change',render);
  typeFilter.addEventListener('change',render);
  chips.addEventListener('click',event=>{const button=event.target.closest('[data-cat]');if(!button)return;categoryFilter.value=button.dataset.cat;render()});
  init();
})();
