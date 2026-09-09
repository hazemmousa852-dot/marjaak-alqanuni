(() => {
'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s??'').toLowerCase().normalize('NFKD').replace(/[\u064b-\u065f\u0670]/g,'').replace(/[إأآٱ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/[^ء-غف-ي0-9\s]/g,' ').replace(/\s+/g,' ').trim();
let scenarios=[],laws=[];
const list=$('#scenarioList'),count=$('#scenarioCount'),search=$('#scenarioSearch'),filter=$('#categoryFilter'),chips=$('#categoryChips');
function lawName(key){return laws.find(l=>l.key===key)?.short||key}
function categoryOf(s){return s.category||(/tax/i.test(s.type||'')?'الضرائب':'مواقف شئون العاملين')}
function articleLinks(s){return (s.articles||[]).map(a=>`<a class="rel-link" href="article.html?law=${encodeURIComponent(a.law)}&article=${encodeURIComponent(a.num)}">${esc(lawName(a.law))} · المادة ${esc(a.num)}</a>`).join('')}
function render(){
const q=norm(search.value),cat=filter.value;
const rows=scenarios.filter(s=>(cat==='all'||categoryOf(s)===cat)&&(!q||norm([s.title,s.summary,...(s.keywords||[]),...(s.questions||[]),categoryOf(s)].join(' ')).includes(q)));
count.textContent=`${rows.length} موقف`;
list.innerHTML=rows.length?rows.map(s=>`<article class="scenario-browser-card" id="${esc(s.id)}"><div class="scenario-label">${esc(categoryOf(s))}</div><h3>${esc(s.title)}</h3><div class="practical-summary"><strong>الخلاصة</strong><p>${esc(s.summary)}</p></div>${(s.steps||[]).length?`<div class="practical-steps"><strong>الإجراء المطلوب من HR</strong><ol>${s.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`:''}${(s.articles||[]).length?`<div class="scenario-refs"><strong>المواد المرتبطة</strong><div>${articleLinks(s)}</div></div>`:''}</article>`).join(''):'<div class="empty-state"><strong>لا توجد مواقف مطابقة</strong><span>جرّب كلمة أقصر أو اختر كل التصنيفات.</span></div>';
if(location.hash){const el=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(el)setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),50)}
}
async function init(){
try{const [sr,lr]=await Promise.all([fetch('data/hr-scenarios.json?v=20260909-1'),fetch('data/laws.json?v=20260909-1')]);if(!sr.ok||!lr.ok)throw new Error();const sd=await sr.json(),ld=await lr.json();scenarios=sd.scenarios||[];laws=ld.laws||[];const cats=[...new Set(scenarios.map(categoryOf))].sort((a,b)=>a.localeCompare(b,'ar'));filter.innerHTML='<option value="all">كل التصنيفات</option>'+cats.map(c=>`<option>${esc(c)}</option>`).join('');chips.innerHTML=['الكل',...cats.slice(0,12)].map((c,i)=>`<button data-cat="${i===0?'all':esc(c)}" class="${i===0?'active':''}">${esc(c)}</button>`).join('');render()}catch{list.innerHTML='<div class="empty-state"><strong>تعذر تحميل قاعدة المواقف</strong><span>أعد تحميل الصفحة.</span></div>'}}
let t;search.addEventListener('input',()=>{clearTimeout(t);t=setTimeout(render,100)});filter.addEventListener('change',render);chips.addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;filter.value=b.dataset.cat;chips.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));render()});
init();
})();