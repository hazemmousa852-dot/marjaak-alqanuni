(() => {
'use strict';
const results=document.getElementById('results');
if(!results)return;
const lawKeys=['labor-14-2025','insurance-148-2019','income-tax-91-2005'];
function extractDuration(text=''){
  const patterns=[/خلال\s+[^،.]{1,35}/, /مدة\s+[^،.]{1,35}/, /بعد\s+[^،.]{1,35}/, /عشرة\s+أيام/, /خمسة\s+أيام/, /عشرين\s+يوم[^،.]*/];
  for(const p of patterns){const m=text.match(p);if(m)return m[0].trim()}
  return '';
}
function enhance(){
  results.querySelectorAll('.scenario-card').forEach(card=>{
    if(card.dataset.upgraded)return;card.dataset.upgraded='1';
    const summary=card.querySelector('.scenario-summary');
    if(summary){const label=document.createElement('span');label.className='practical-summary-label';label.textContent='الخلاصة العملية';summary.before(label);const d=extractDuration(summary.textContent);if(d){const facts=document.createElement('div');facts.className='practical-facts';facts.innerHTML=`<span class="practical-fact"><strong>المدة القانونية:</strong> ${d}</span>`;summary.after(facts)}}
    const steps=card.querySelector('.scenario-steps strong');if(steps)steps.textContent='الإجراء المطلوب من HR';
    const refs=card.querySelectorAll('.scenario-refs button[data-open]');refs.forEach(btn=>{const spec=btn.dataset.open||'';const [law,num]=spec.split(':');if(!law||!num)return;const a=document.createElement('a');a.className='rel-link';a.href=`article.html?law=${encodeURIComponent(law)}&article=${encodeURIComponent(num)}`;a.textContent=`فتح صفحة المادة ${num}`;btn.after(a)})
  });
  results.querySelectorAll('.result-card').forEach(card=>{
    if(card.dataset.articleLink)return;
    const id=card.id||'';const law=lawKeys.find(k=>id.startsWith(k+'-'));if(!law)return;
    const n=card.querySelector('.article-no')?.textContent?.match(/[0-9٠-٩۰-۹]+/)?.[0];if(!n)return;
    card.dataset.articleLink='1';const actions=card.querySelector('.card-actions')||card.querySelector('.card-top');const a=document.createElement('a');a.className='article-page-link';a.href=`article.html?law=${encodeURIComponent(law)}&article=${encodeURIComponent(n)}`;a.textContent='صفحة المادة';actions?.append(a)
  });
}
new MutationObserver(enhance).observe(results,{childList:true,subtree:true});
enhance();
})();