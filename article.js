(() => {
'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const params=new URLSearchParams(location.search);
const lawKey=params.get('law');
const num=params.get('article');
const view=$('#articleView');
const toast=$('#toast');
const norm=s=>String(s??'').replace(/[٠-٩]/g,c=>'٠١٢٣٤٥٦٧٨٩'.indexOf(c)).trim();
function showToast(t){toast.textContent=t;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1600)}
function articleLink(a,label){return `<a class="rel-link" href="article.html?law=${encodeURIComponent(a.law)}&article=${encodeURIComponent(a.num)}">${esc(label||`المادة ${a.num}`)}</a>`}
function penaltyFor(item,items){const out=[];(item.penaltyNums||[]).forEach(n=>{const p=items.find(x=>String(x.num)===String(n));if(p)out.push(p)});items.filter(p=>p.kind==='penalty'&&(p.linkedTo||[]).some(n=>String(n)===String(item.num))).forEach(p=>out.push(p));return [...new Map(out.map(x=>[x.id,x])).values()]}
async function init(){
try{
const [lr,sr]=await Promise.all([fetch('data/laws.json?v=20260909-1'),fetch('data/hr-scenarios.json?v=20260909-1')]);
if(!lr.ok)throw new Error('laws');
const data=await lr.json(); const sd=sr.ok?await sr.json():{scenarios:[]};
const law=data.laws.find(l=>l.key===lawKey); if(!law)throw new Error('law');
const item=law.items.find(i=>String(i.num)===String(num)); if(!item)throw new Error('article');
const relatedScenarios=(sd.scenarios||[]).filter(s=>(s.articles||[]).some(a=>a.law===lawKey&&String(a.num)===String(item.num)));
const penalties=penaltyFor(item,law.items);
const relatedArticles=[]; relatedScenarios.forEach(s=>(s.articles||[]).forEach(a=>{if(!(a.law===lawKey&&String(a.num)===String(item.num)))relatedArticles.push(a)}));
const uniqueRelated=[...new Map(relatedArticles.map(a=>[`${a.law}:${a.num}`,a])).values()].slice(0,12);
const practicalSummary=relatedScenarios[0]?.summary||'لم يُضف شرح عملي مستقل لهذه المادة حتى الآن. اقرأ النص الرسمي والمواقف المرتبطة إن وجدت.';
const steps=[...new Set(relatedScenarios.flatMap(s=>s.steps||[]))].slice(0,8);
document.title=`المادة ${item.num} - ${law.short} | مرجعك القانوني`;
$('#crumbLaw').textContent=`${law.short} · المادة ${item.num}`;
view.innerHTML=`
<article class="article-hero-card">
<div class="article-kicker">${esc(law.short)}</div>
<div class="article-title-row"><div><h1>المادة (${esc(item.num)})</h1>${item.section?`<p>${esc(item.section)}</p>`:''}</div><div class="article-actions"><button id="copyArticle" class="icon-btn">نسخ المادة</button><a class="primary-link" href="./#q=${encodeURIComponent(item.num)}&law=${encodeURIComponent(lawKey)}">بحث بالمادة</a></div></div>
<div class="official-box"><div class="box-label">النص الرسمي</div><div class="official-text">${esc(item.text)}</div>${(item.sub||[]).length?`<div class="sub-items">${item.sub.map(x=>`<p class="sub-item">${esc(x)}</p>`).join('')}</div>`:''}</div>
</article>
<section class="article-grid">
<div class="info-card"><div class="box-label">شرح عملي مبسط</div><p>${esc(practicalSummary)}</p></div>
<div class="info-card"><div class="box-label">الإجراء العملي</div>${steps.length?`<ol class="practical-list">${steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>`:'<p>لا توجد خطوات عملية مرتبطة مباشرة بهذه المادة في قاعدة المواقف الحالية.</p>'}</div>
<div class="info-card penalty-card"><div class="box-label">العقوبة المرتبطة</div>${penalties.length?penalties.map(p=>`<div class="penalty-item"><strong>المادة (${esc(p.num)})</strong><p>${esc(p.text)}</p></div>`).join(''):'<p>لا توجد مادة عقوبة مرتبطة مباشرة في قاعدة البيانات الحالية.</p>'}</div>
<div class="info-card"><div class="box-label">مواقف HR مرتبطة</div>${relatedScenarios.length?`<div class="scenario-mini-list">${relatedScenarios.slice(0,8).map(s=>`<a href="scenarios.html#${encodeURIComponent(s.id)}"><strong>${esc(s.title)}</strong><span>${esc(s.summary)}</span></a>`).join('')}</div>`:'<p>لا توجد مواقف مرتبطة حاليًا.</p>'}</div>
<div class="info-card full-span"><div class="box-label">مواد مرتبطة</div>${uniqueRelated.length?`<div class="related-links">${uniqueRelated.map(a=>{const l=data.laws.find(x=>x.key===a.law);return articleLink(a,`${l?.short||a.law} · المادة ${a.num}`)}).join('')}</div>`:'<p>لا توجد روابط مواد إضافية مستخرجة من المواقف الحالية.</p>'}</div>
<div class="source-panel full-span"><strong>المصدر</strong><span>${esc(law.source)}</span><span>آخر مراجعة للبيانات: ${esc(data.meta.lastReviewed)}</span></div>
</section>`;
$('#copyArticle').addEventListener('click',()=>navigator.clipboard.writeText(`${law.short} - المادة (${item.num})\n${item.text}`).then(()=>showToast('تم نسخ نص المادة')));
}catch(e){view.innerHTML='<div class="empty-state"><strong>تعذر فتح المادة</strong><span>تأكد من رابط المادة أو ارجع إلى البحث الرئيسي.</span><p><a class="primary-link" href="./">العودة للرئيسية</a></p></div>'}
}
init();
})();