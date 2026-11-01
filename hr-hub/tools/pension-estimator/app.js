(() => {
  'use strict';
  const $=id=>document.getElementById(id), E=window.PensionEngine;
  const labels={normal:'معاش بلوغ السن',early:'المعاش المبكر',disability:'معاش العجز',death:'معاش الوفاة'};
  const money=n=>new Intl.NumberFormat('ar-EG',{maximumFractionDigits:2,minimumFractionDigits:2}).format(n)+' جنيه';
  const number=n=>new Intl.NumberFormat('ar-EG',{maximumFractionDigits:4}).format(n);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let kind='normal', rowId=0;
  const form=$('pensionForm');
  const value=id=>$(id).value, checked=id=>Boolean($(id)?.checked);
  const fields=['birth','event','retirementAge','minWage','maxWage','preMonths','prePension','preWage','preSource','wageMode','postMonths','settlement','inflation','lastSettlement','cause','timing','endDate','disabilityType','disabilityRate'];
  const conditionNames=['ageConfirmed','ended','notInsured','applied','dues','medical','noAlternative','shortQualifying','noLump','injuryApproved'];
  const show=(id,on)=>{$(id).hidden=!on;};
  function invalidate() {show('result',false);show('emptyResult',true);show('errors',false);}
  function addPeriod(from='',to='',wage='') {
    const id=++rowId, div=document.createElement('div'); div.className='wage-row';
    div.innerHTML=`<div class="grid"><label>من شهر<input aria-label="بداية الفترة ${id}" data-field="from" type="month" min="2020-01" value="${esc(from)}"></label><label>إلى شهر<input aria-label="نهاية الفترة ${id}" data-field="to" type="month" min="2020-01" value="${esc(to)}"></label><label class="wide">أجر الاشتراك الشهري — جنيه<input data-field="wage" type="number" min="0.01" step="0.01" value="${esc(wage)}"></label></div><button type="button" class="remove-period">حذف الفترة</button>`;
    div.querySelector('button').addEventListener('click',()=>{div.remove();invalidate();});
    $('wageRows').appendChild(div);
  }
  function agePreview(){try{$('agePreview').textContent=number(E.ageAt(value('birth'),value('event')))+' سنة';}catch{$('agePreview').textContent='—';}}
  function setLimits() {
    const year=Number(value('event').slice(0,4)), l=E.limits[year];
    $('minWage').value=l?l[0]:''; $('maxWage').value=l?l[1]:'';
    $('limitsNote').textContent=l?'حدود سنة '+year+' — يمكنك مراجعتها مع المصدر الرسمي.':'لا توجد حدود تلقائية لهذه السنة؛ أدخل الحدين من مصدر مراجع.';
    agePreview();
  }
  function conditions() {
    const old={};conditionNames.forEach(id=>old[id]=checked(id));
    let items=[];
    if(kind==='early') items=[['ended','انتهت الخدمة / العمل بالفعل'],['notInsured','غير خاضع لتأمين الشيخوخة والعجز والوفاة في تاريخ طلب الصرف'],['applied','تم تقديم طلب الصرف'],['dues','تمت تسوية المبالغ والأقساط المستحقة لدى الهيئة']];
    if(['disability','death'].includes(kind)) {
      items.push(['medical',kind==='death'?'واقعة الوفاة ثابتة بالمستندات الرسمية':'العجز ثابت بقرار الجهة الطبية المختصة']);
      if(value('cause')==='injury') items.push(['injuryApproved','إصابة العمل والسببية معتمدتان رسميًا']);
      else {
        if(value('timing')==='during') items.push(['ended','انتهت الخدمة بسبب الواقعة']);
        else items.push(['noLump','لم يُصرف تعويض الدفعة الواحدة']);
        if(value('timing')!=='after') items.push(['shortQualifying','تحقق شرط ٣ أشهر متصلة أو ٦ متقطعة، أو استثناء قانوني معتمد']);
        if(kind==='disability'&&value('disabilityType')==='partial') items.push(['noAlternative','ثبت عدم وجود عمل آخر لدى صاحب العمل بقرار مختص أو استثناء معتمد']);
      }
    }
    $('conditionFields').innerHTML=items.map(([id,label])=>`<label class="check"><input type="checkbox" id="${id}" ${old[id]?'checked':''}>${label}</label>`).join('');
    show('conditionsPanel',!!items.length);
  }
  function sync() {
    const special=['disability','death'].includes(kind), injury=value('cause')==='injury';
    show('specialFields',special);show('disabilityTypeWrap',kind==='disability');show('timingWrap',special&&!injury);
    show('endDateWrap',special&&!injury&&value('timing')!=='during');
    show('rateWrap',kind==='disability'&&injury&&value('disabilityType')==='partial');
    show('earlyWageWrap',kind==='early');show('readyFields',value('wageMode')==='ready');show('periodFields',value('wageMode')==='periods');
    const pre=Number(value('preMonths'))>0;show('preFields',pre);show('preNotice',pre);
    $('caseTitle').textContent=labels[kind];$('eventLabel').textContent=kind==='early'?'تاريخ طلب صرف المعاش المبكر':special?'تاريخ الوفاة / ثبوت العجز':'تاريخ استحقاق المعاش';
    $('specialHint').textContent=injury?'حساب إصابة العمل وحده، دون الجمع مع معاش آخر أو زيادات تالية. يحتاج أجر تسوية محسنًا وفق المادة ٢٢.':kind==='death'?'النتيجة أصل المعاش قبل توزيع أنصبة المستحقين؛ لا تحتاج إدخال الورثة هنا.':'العجز الجزئي غير الإصابي يتطلب انتهاء الخدمة وثبوت عدم وجود عمل آخر؛ بعد انتهاء الخدمة تختص هذه النسخة بالعجز الكلي.';
    conditions();agePreview();
  }
  function read() {
    const d={kind};fields.forEach(id=>d[id]=value(id));conditionNames.forEach(id=>d[id]=checked(id));
    d.rows=[...$('wageRows').children].map(row=>Object.fromEntries([...row.querySelectorAll('[data-field]')].map(input=>[input.dataset.field,input.value])));
    return d;
  }
  function entry(label,val){return `<div><dt>${esc(label)}</dt><dd>${esc(val)}</dd></div>`;}
  function render(r,d) {
    let breakdown=entry('السن / سن الشيخوخة',number(r.age)+' / '+number(r.retirementAge)+' سنة')+entry('مدة الاشتراك الفعلي',number(r.months)+' شهرًا');
    if(r.average!==null) breakdown+=entry('مجموع الأجور التأمينية',money(r.total))+entry('متوسط الأجور الشهري',money(r.average))+entry('متوسط التضخم السنوي المُدخل',number(r.inflation)+'٪');
    breakdown+=entry('أجر التسوية المحسن من ٢٠٢٠',money(r.settlement));
    const injury=['disability','death'].includes(kind)&&d.cause==='injury';
    if(!injury) breakdown+=entry('معامل حساب المعاش — جدول ٥',number(r.factor))+entry('المعاش عن فترة من ٢٠٢٠',money(r.newPart))+entry('المعاش السابق المُدخل يدويًا',money(r.prePension))+entry('المجموع قبل الحدود',money(r.combined))+entry('سقف الجمع للحالة',money(r.cap))+entry('المعاش بعد السقف وقبل الحدود الدنيا',money(r.base));
    if(r.specialFloor) breakdown+=entry('حد ٦٥٪ من أكبر أجر تسوية',money(r.specialFloor));
    let formula=injury?(r.payment==='lump'?'التعويض = ٨٠٪ × أجر التسوية × نسبة العجز × ٤٨ شهرًا.':'معاش الإصابة = ٨٠٪ × أجر التسوية × نسبة العجز (١٠٠٪ للكلي أو الوفاة).'):`جزء ما بعد ٢٠٢٠ = ${money(r.settlement)} × (${number(r.postMonths)} ÷ ١٢) ÷ ${number(r.factor)}، بحد ٨٠٪ من أجر التسوية.`;
    const notes=r.notes.map(t=>`<li>${esc(t)}</li>`).join('');
    const checks=r.checks.map(c=>`<li class="${c.ok?'passed':'failed'}"><b>${c.ok?'✓ تحقق':'○ لم يتحقق أو لم يُؤكد'} — ${esc(c.label)}</b><small>${esc(c.detail)}</small></li>`).join('');
    const inputSnapshot=[['نوع الحساب',labels[kind]],['تاريخ الميلاد',d.birth],['تاريخ الواقعة',d.event],['سن الشيخوخة',d.retirementAge],['حد أجر الاشتراك الأدنى',money(Number(d.minWage))],['حد أجر الاشتراك الأقصى',money(Number(d.maxWage))],['أشهر قبل ٢٠٢٠',r.preMonths],['أشهر من ٢٠٢٠',r.postMonths],['أكبر أجر تسوية سابق',money(r.preWage)],['مصدر القيم السابقة',r.preMonths?(d.preSource||'لم يذكر المستخدم مصدرًا'):'لا توجد مدة سابقة']];
    if(kind==='early')inputSnapshot.push(['أجر التسوية الأخير لفحص المبكر',money(Number(d.lastSettlement))]);
    if(['disability','death'].includes(kind)){
      inputSnapshot.push(['سبب الواقعة',injury?'إصابة عمل معتمدة':'غير إصابي']);
      if(kind==='disability')inputSnapshot.push(['نوع العجز',d.disabilityType==='total'?'كلي مستديم':'جزئي مستديم']);
      if(injury&&kind==='disability'&&d.disabilityType==='partial')inputSnapshot.push(['نسبة العجز',d.disabilityRate+'٪']);
      if(!injury)inputSnapshot.push(['توقيت الواقعة',({during:'أثناء الخدمة',within:'خلال سنة من انتهاء الخدمة',after:'بعد انقضاء سنة من انتهاء الخدمة'})[d.timing]],['تاريخ انتهاء الخدمة',d.timing==='during'?'بسبب الواقعة':d.endDate]);
    }
    if(d.wageMode==='periods') d.rows.forEach((row,i)=>inputSnapshot.push(['فترة أجور '+(i+1),row.from+' ← '+row.to+' | '+money(Number(row.wage))]));
    const title=r.payment==='lump'?'تعويض إصابة دفعة واحدة':'المعاش الشهري التقديري';
    $('resultContent').innerHTML=`<p class="eyebrow">${esc(labels[kind])} · تقرير تقديري</p><div class="result-amount"><small>${title}</small><strong>${esc(money(r.amount))}</strong><p>مبلغ حسابي مشروط — ليس قرار صرف أو تسوية رسمية</p></div><div class="status ${r.eligible?'':'fail'}"><b>${r.eligible?'اجتاز الفحص المبدئي وفق المدخلات':'لم يجتز الفحص المبدئي'}</b><br>${r.eligible?'الاعتماد النهائي على مراجعة الهيئة والمستندات.':'راجع الشروط أدناه؛ المبلغ المعروض لا يعني استحقاق صرفه.'}</div><h3>كيف وصلنا للرقم؟</h3><p class="formula">${esc(formula)}</p><dl class="breakdown">${breakdown}</dl><h3>فحص الشروط</h3><ul class="checks">${checks}</ul><h3>افتراضات وحدود النتيجة</h3><ul class="result-notes">${notes}</ul><details class="report-inputs"><summary>المدخلات المستخدمة في التقرير</summary><dl class="breakdown">${inputSnapshot.map(([k,v])=>entry(k,v)).join('')}</dl></details><p class="muted">قانون ١٤٨ لسنة ٢٠١٩ · جدول ٥ · القواعد مراجعة في ١ نوفمبر ٢٠٢٦<br>تقرير حُسب في ${esc(new Date().toLocaleString('ar-EG',{timeZone:'Africa/Cairo'}))}. <a class="no-print" href="#sources">المصادر</a></p>`;
    show('emptyResult',false);show('result',true);$('result').focus({preventScroll:true});$('result').scrollIntoView({behavior:'smooth',block:'start'});
  }
  document.querySelectorAll('[data-kind]').forEach(button=>button.addEventListener('click',()=>{
    kind=button.dataset.kind;document.querySelectorAll('[data-kind]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
    // Do not carry a different case's declarations into a new entitlement decision.
    conditionNames.filter(id=>id!=='ageConfirmed').forEach(id=>{if($(id))$(id).checked=false;});
    sync();invalidate();
  }));
  form.addEventListener('input',()=>{invalidate();agePreview();});
  form.addEventListener('change',event=>{invalidate();if(event.target.id==='event')setLimits();if(['cause','timing','disabilityType','wageMode','preMonths'].includes(event.target.id))sync();});
  $('addPeriod').addEventListener('click',()=>{addPeriod();invalidate();});
  form.addEventListener('submit',event=>{
    event.preventDefault();try{const d=read();render(E.estimate(d),d);show('errors',false);}catch(error){invalidate();$('errors').textContent=error.message;show('errors',true);$('errors').focus();}
  });
  form.addEventListener('reset',()=>{setTimeout(()=>{kind='normal';document.querySelectorAll('[data-kind]').forEach(b=>{b.classList.toggle('active',b.dataset.kind===kind);b.setAttribute('aria-pressed',String(b.dataset.kind===kind));});$('wageRows').replaceChildren();addPeriod();$('event').value=new Date().toLocaleDateString('en-CA',{timeZone:'Africa/Cairo'});conditionNames.forEach(id=>{if($(id))$(id).checked=false;});setLimits();sync();invalidate();},0);});
  $('sample').addEventListener('click',()=>{
    // Explicit fictional input: avoids presenting made-up inflation or pre-2020 values as official.
    $('birth').value=kind==='early'?'1971-11-01':kind==='normal'?'1966-11-01':'1980-11-01';$('event').value='2026-11-01';$('retirementAge').value='60';setLimits();
    $('preMonths').value=kind==='early'||kind==='normal'?'240':'120';$('prePension').value='3000';$('preWage').value='7000';$('preSource').value='مثال تعليمي افتراضي — ليست تسوية حقيقية';$('wageMode').value='ready';$('postMonths').value='82';$('settlement').value='10000';$('lastSettlement').value='10000';$('cause').value='natural';$('timing').value='during';$('disabilityType').value='total';
    $('wageRows').replaceChildren();addPeriod();sync();conditionNames.forEach(id=>{if($(id))$(id).checked=false;});$('calculator').scrollIntoView({behavior:'smooth'});invalidate();
  });
  $('print').addEventListener('click',()=>{if(!$('result').hidden)window.print();});
  $('share').addEventListener('click',async()=>{
    const url='https://hazemmousa852-dot.github.io/marjaak-alqanuni/hr-hub/tools/pension-estimator/';
    const message='افهم حساب معاشك خطوة بخطوة، وافحص شروط المعاش المبكر مبدئيًا مع حاسبة حازم موسى. نتائج تقديرية تعليمية.';
    try{if(navigator.share){await navigator.share({title:'حاسبة المعاش التقديري | حازم موسى',text:message,url});$('shareStatus').textContent='';}else{await navigator.clipboard.writeText(message+'\n'+url);$('shareStatus').textContent='تم نسخ رسالة المشاركة والرابط.';}}catch(e){if(e.name!=='AbortError')$('shareStatus').textContent='يمكنك نسخ رابط الأداة من شريط العنوان.';}
  });
  $('event').value=new Date().toLocaleDateString('en-CA',{timeZone:'Africa/Cairo'});addPeriod();setLimits();sync();
})();
