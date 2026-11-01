/* Educational estimate, private-sector employees, Law 148/2019.
 * Pre-2020 entitlement and improved settlement wage are reviewed manual inputs.
 * No automatic assumed inflation, future limits, purchased periods or survivor shares.
 */
(function (root) {
  'use strict';
  const tables = {
    60: [81.8,76.3,71.4,67.2,63.4,60,56.3,52.9,50,47.4,45],
    61: [90,83.3,77.6,72.6,68.2,64.3,60,56.3,52.9,50,47.4,45],
    62: [100,91.8,84.9,78.9,73.8,69.2,64.3,60,56.3,52.9,50,47.4,45],
    63: [112.5,102.3,93.8,86.5,80.4,75,69.2,64.3,60,56.3,52.9,50,47.4,45],
    64: [128.6,115.4,104.7,95.7,88.2,81.8,75,69.2,64.3,60,56.3,52.9,50,47.4,45],
    65: [150,132.4,118.4,107.1,97.8,90,81.8,75,69.2,64.3,60,56.3,52.9,50,47.4,45]
  };
  const limits = {2020:[1000,7000],2021:[1200,8100],2022:[1400,9400],2023:[1700,10900],2024:[2000,12600],2025:[2300,14500],2026:[2700,16700]};
  function num(v, name, min=0, max=Infinity, integer=false) {
    if (v === '' || v == null || !Number.isFinite(Number(v)) || Number(v)<min || Number(v)>max || (integer && !Number.isInteger(Number(v)))) throw Error('راجع '+name+'؛ القيمة مطلوبة ويجب أن تكون ضمن الحدود الموضحة.');
    return Number(v);
  }
  function date(v) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v||'')) throw Error('أدخل التواريخ كاملة.');
    const d=new Date(v+'T00:00:00Z');
    if (!Number.isFinite(+d)||d.toISOString().slice(0,10)!==v) throw Error('تاريخ غير صحيح.');
    return d;
  }
  function ageAt(birth, event) {
    const b=date(birth), e=date(event);
    let a=e.getUTCFullYear()-b.getUTCFullYear();
    if(e.getUTCMonth()<b.getUTCMonth() || (e.getUTCMonth()===b.getUTCMonth() && e.getUTCDate()<b.getUTCDate())) a--;
    return a;
  }
  function monthIndex(v) {
    if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(v||'')) throw Error('أدخل شهر بداية ونهاية كل فترة.');
    const [y,m]=v.split('-').map(Number); return y*12+m-1;
  }
  function wages(rows,event,birth) {
    if(!Array.isArray(rows)||!rows.length) throw Error('أضف فترة أجور واحدة على الأقل.');
    let total=0, months=0, longest=0, run=0, previous=-1;
    const periods=rows.map(r=>({start:monthIndex(r.from),end:monthIndex(r.to),wage:num(r.wage,'أجر الاشتراك',0.01,1e8)})).sort((a,b)=>a.start-b.start);
    const startMin=Math.max(2020*12,monthIndex(birth.slice(0,7))+18*12);
    for(const p of periods) {
      if(p.start<startMin || p.end>monthIndex(event.slice(0,7)) || p.end<p.start) throw Error('فترات الأجور تبدأ من يناير ٢٠٢٠ وبعد بلوغ ١٨ سنة، وتنتهي بحد أقصى في شهر الواقعة.');
      if(p.start<=previous) throw Error('فترات الأجور متداخلة؛ لا يجوز حساب شهر مرتين.');
      // Recorded months are authoritative. Part-start months must be excluded by user.
      for(let month=p.start;month<=p.end;month++) { const l=limits[Math.floor(month/12)]; if(l && p.wage>l[1]) throw Error('أجر إحدى الفترات يتجاوز الحد الأقصى لأجر الاشتراك في سنة '+Math.floor(month/12)+'.'); }
      const n=p.end-p.start+1; total+=n*p.wage; months+=n;
      run=p.start===previous+1?run+n:n; longest=Math.max(longest,run); previous=p.end;
    }
    return {total,months,average:total/months,longest,periods};
  }
  function coefficient(age,retirementAge,kind) {
    if(!tables[retirementAge]) throw Error('سن الشيخوخة يجب أن يكون من ٦٠ إلى ٦٥.');
    if(kind!=='early') return 45;
    if(age>=retirementAge) throw Error('السن بلغ سن الشيخوخة المحدد؛ استخدم حساب بلوغ السن.');
    return tables[retirementAge][Math.max(0,Math.floor(age)-50)];
  }
  function estimate(d) {
    if(!['normal','early','disability','death'].includes(d.kind)) throw Error('اختر نوع الحساب.');
    date(d.event); const age=ageAt(d.birth,d.event);
    num(age,'السن',18,110,true);
    if(d.event<'2020-01-01') throw Error('هذه النسخة تحسب الوقائع من ١ يناير ٢٠٢٠.');
    const retirementAge=num(d.retirementAge,'سن الشيخوخة',60,65,true);
    const year=Number(d.event.slice(0,4));
    const minWage=num(d.minWage,'الحد الأدنى لأجر الاشتراك',1,1e8);
    const maxWage=num(d.maxWage,'الحد الأقصى لأجر الاشتراك',minWage,1e8);
    const preMonths=num(d.preMonths,'أشهر الاشتراك الفعلي قبل ٢٠٢٠',0,900,true);
    const preMax=Math.max(0,2020*12-(monthIndex(d.birth.slice(0,7))+18*12));
    if(preMonths>preMax) throw Error('مدة ما قبل ٢٠٢٠ تتجاوز المدة الممكنة بعد سن ١٨.');
    const prePension=preMonths?num(d.prePension,'المعاش عن المدد السابقة',0,1e8):0;
    const preWage=preMonths?num(d.preWage,'أكبر أجر تسوية محسن للمدد السابقة',0.01,maxWage):0;
    if(prePension>0.8*preWage+0.01) throw Error('قيمة المعاش السابقة تتجاوز ٨٠٪ من أكبر أجر تسوية مُدخل؛ راجع القيم.');
    let postMonths=0, average=null, total=null, settlement=0, wageInfo=null, inflation=null;
    if(d.wageMode==='periods') {
      wageInfo=wages(d.rows,d.event,d.birth); postMonths=wageInfo.months; average=wageInfo.average; total=wageInfo.total;
      inflation=num(d.inflation,'متوسط نسب التضخم السنوي %',0,200);
      settlement=Math.min(maxWage,average*(1+inflation/100*Math.floor(postMonths/12)));
    } else if(d.wageMode==='ready') {
      postMonths=num(d.postMonths,'أشهر الاشتراك الفعلي من ٢٠٢٠',0,900,true);
      settlement=postMonths?num(d.settlement,'أجر التسوية المحسن',0.01,maxWage):0;
    } else throw Error('اختر طريقة إدخال أجر التسوية.');
    const latestMonths=monthIndex(d.event.slice(0,7))-2020*12+1;
    const lifetimeMonths=monthIndex(d.event.slice(0,7))-monthIndex(d.birth.slice(0,7))-18*12+1;
    if(postMonths>Math.min(latestMonths,lifetimeMonths)) throw Error('مدة ما بعد ٢٠٢٠ أكبر من المدة الزمنية المتاحة.');
    const months=preMonths+postMonths;
    if(!months) throw Error('أدخل مدة اشتراك فعلية.');
    if(['disability','death'].includes(d.kind) && d.cause!=='injury' && ['within','after'].includes(d.timing)) {
      date(d.endDate);
      const available=Math.max(0,monthIndex(d.endDate.slice(0,7))-2020*12+1);
      if(postMonths>available || (wageInfo && wageInfo.periods.some(p=>p.end>monthIndex(d.endDate.slice(0,7))))) throw Error('مدة أو فترات الأجور تتجاوز تاريخ انتهاء الخدمة؛ راجع الأشهر الفعلية حتى انتهاء الخدمة.');
    }
    const highest=Math.max(preWage,settlement);
    const factor=coefficient(age,retirementAge,d.kind);
    const newPart=Math.min(0.8*settlement,settlement*(postMonths/12)/factor);
    const combined=prePension+newPart;
    const cap=Math.min(0.8*highest,0.8*maxWage);
    const base=Math.min(combined,cap);
    let amount=base, payment='monthly', specialFloor=0;
    const checks=[], notes=[];
    const check=(label,ok,detail)=>checks.push({label,ok:ok===null?null:Boolean(ok),detail});
    check('مراجعة سن الشيخوخة المناسب للحالة',d.ageConfirmed===true,'سن الشيخوخة المُدخل: '+retirementAge+' سنة؛ لا تختاره بناءً على السن الحالي فقط.');
    const needed=year>=2025?180:120;
    const isSpecial=['disability','death'].includes(d.kind);
    if(d.kind==='normal') {
      check('بلوغ سن الشيخوخة',age>=retirementAge,'السن في تاريخ الواقعة: '+age+' سنة.');
      check('الحد الأدنى لمدة الاشتراك الفعلي',months>=needed,'المطلوب '+needed+' شهرًا؛ المُدخل '+months+' شهرًا.');
      amount=Math.min(0.8*maxWage,Math.max(base,0.65*minWage));
    } else if(d.kind==='early') {
      check('مدة الاشتراك الفعلي للمعاش المبكر',months>=(year>=2025?300:240),'المطلوب '+(year>=2025?300:240)+' شهرًا؛ المُدخل '+months+' شهرًا. المدد المشتراة ليست مدة فعلية.');
      const lastSettlement=num(d.lastSettlement,'أجر التسوية الأخير لفحص المبكر',0.01,maxWage);
      check('بلوغ المعاش ٥٠٪ من أجر التسوية الأخير',base+1e-8>=0.5*lastSettlement,'المعاش المحسوب '+base.toFixed(2)+'؛ المطلوب '+(0.5*lastSettlement).toFixed(2)+' جنيه.');
      check('بلوغ المعاش ٦٥٪ من الحد الأدنى لأجر الاشتراك',base+1e-8>=0.65*minWage,'المطلوب '+(0.65*minWage).toFixed(2)+' جنيه. لا يُرفع معاش المبكر تلقائيًا لاستيفاء الشرط.');
      check('انتهاء الخدمة / العمل',d.ended===true,'يجب تحقق انتهاء الخدمة فعليًا.');
      check('عدم الخضوع للتأمين في تاريخ طلب الصرف',d.notInsured===true,'عدم استمرار أو بدء عمل خاضع لتأمين الشيخوخة والعجز والوفاة.');
      check('تقديم طلب الصرف',d.applied===true,'طلب الصرف لدى الهيئة.');
      check('تسوية المبالغ والأقساط المستحقة',d.dues===true,'يُراجع السداد والقيمة الحالية للأقساط مع الهيئة.');
    } else if(isSpecial && d.cause==='injury') {
      const rate=d.kind==='death'||d.disabilityType==='total'?100:num(d.disabilityRate,'نسبة العجز المعتمدة',0.01,99.99);
      if(!settlement) throw Error('حساب إصابة العمل يحتاج أجر تسوية عن المدة من ٢٠٢٠.');
      amount=0.8*settlement*rate/100;
      if(rate<35) {amount*=48;payment='lump';}
      check('اعتماد إصابة العمل والسببية',d.injuryApproved===true,'الإقرار هنا يعبر عن مستندات معتمدة، وليس تشخيصًا من الحاسبة.');
      check('اعتماد الوفاة أو درجة العجز',d.medical===true,'قرار الجهة الطبية / المستندات الرسمية.');
      notes.push('النتيجة تخص تعويض أو معاش إصابة العمل وحده عند نشأة الحق؛ لا تجمع تلقائيًا مع معاش الشيخوخة والعجز والوفاة، ولا تشمل إصابات سابقة أو الزيادات السنوية اللاحقة.');
      if(rate<35) notes.push('النسبة أقل من ٣٥٪: التعويض دفعة واحدة، ما لم تنطبق حالة إنهاء الخدمة للعجز الجزئي وعدم وجود عمل آخر؛ حينها تُراجع التسوية الخاصة لدى الهيئة.');
    } else {
      if(!['during','within','after'].includes(d.timing)) throw Error('اختر توقيت العجز أو الوفاة.');
      if(d.kind==='disability' && !['total','partial'].includes(d.disabilityType)) throw Error('اختر نوع العجز.');
      check('اعتماد واقعة الوفاة أو ثبوت العجز',d.medical===true,'تُراجع الشهادة وقرار الجهة المختصة.');
      if(d.kind==='disability' && d.disabilityType==='partial') {
        check('العجز الجزئي أثناء الخدمة',d.timing==='during','مسار ما بعد انتهاء الخدمة هنا للعجز الكلي أو الوفاة.');
        check('ثبوت عدم وجود عمل آخر لدى صاحب العمل',d.noAlternative===true,'بقرار اللجنة المختصة أو انطباق استثناء قانوني معتمد.');
      }
      if(d.timing==='during') {
        check('انتهاء الخدمة بسبب الواقعة',d.ended===true,'انتهاء الخدمة بسبب الوفاة أو العجز المعتمد.');
      } else {
        date(d.endDate);
        if(d.endDate>d.event) throw Error('تاريخ انتهاء الخدمة لا يجوز أن يلي الواقعة.');
        const end=date(d.endDate), anniversary=new Date(+end);anniversary.setUTCFullYear(end.getUTCFullYear()+1);
        const within=date(d.event)<=anniversary;
        check('تطابق توقيت الواقعة مع تاريخ انتهاء الخدمة',d.timing==='within'?within:!within,'خلال سنة أو بعد انقضاء سنة من انتهاء الخدمة.');
        check('عدم تجاوز سن الشيخوخة',age<retirementAge,'حالات ما بعد انتهاء الخدمة لها قيد السن.');
        check('عدم صرف تعويض الدفعة الواحدة',d.noLump===true,'يُراجع سجل الصرف لدى الهيئة.');
        if(d.timing==='after') check('مدة الاشتراك الفعلي بعد انقضاء سنة',months>=needed,'المطلوب '+needed+' شهرًا.');
      }
      if(d.timing!=='after') check('٣ أشهر متصلة أو ٦ متقطعة أو استثناء معتمد',d.shortQualifying===true || (wageInfo && wageInfo.longest>=3) || months>=6,'مدد فعلية؛ الاستثناء يحتاج مستندًا معتمدًا.');
      if(d.timing!=='after') specialFloor=0.65*highest;
      amount=Math.min(0.8*maxWage,Math.max(base,specialFloor,0.65*minWage));
    }
    if(d.kind==='death') notes.push('المبلغ هو أصل المعاش قبل توزيعه على المستحقين؛ ليس نصيب كل وريث. أنصبة المستحقين وشروطها تحتاج بيانات مستقلة.');
    if(preMonths) notes.push('جزء ما قبل ٢٠٢٠ وأكبر أجر تسوية محسن له قيم أدخلها المستخدم بعد مراجعتها لهذه الحالة وهذا التاريخ؛ لم تحسبها الأداة من الأجور القديمة.');
    if(d.wageMode==='periods') notes.push('تحسين المتوسط = المتوسط × (١ + متوسط نسب التضخم السنوي ÷ ١٠٠ × السنوات الفعلية الكاملة). النسبة مُدخلة يدويًا وليست معدل شهر أو معدل سنة واحدة.');
    notes.push('لا تشمل النسخة المدد المشتراة والمضافة أو تجبير كسر السنة لاستحقاق المعاش أو المعاش الإضافي أو الزيادات اللاحقة. أدخل مددًا فعلية فقط.');
    if(!limits[year]) notes.push('حدود أجر الاشتراك لهذه السنة أُدخلت يدويًا؛ لا تُعد توقعًا رسميًا أو حدودًا معتمدة من الحاسبة.');
    if(d.event>'2026-11-01') notes.push('تاريخ مستقبلي: النتيجة سيناريو بقواعد ومدخلات اليوم، وقد تتغير القواعد والحدود.');
    const eligible=checks.every(c=>c.ok===true);
    return {age,retirementAge,year,months,preMonths,postMonths,average,total,settlement,preWage,highest,prePension,factor,newPart,combined,cap,base,specialFloor,amount,payment,checks,notes,eligible,inflation};
  }
  const api={tables,limits,ageAt,wages,coefficient,estimate};
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.PensionEngine=api;
})(typeof window==='object'?window:globalThis);
