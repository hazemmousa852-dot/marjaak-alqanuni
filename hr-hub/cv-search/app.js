'use strict';
(() => {
 const $=id=>document.getElementById(id), mailbox='hazem.mousa852@gmail.com', pageSize=12;
 const labels={job:'كل الوظائف',level:'كل المستويات',governorate:'كل المحافظات'};
 const demos=[
  {id:'demo-1',name:'مرشح تجريبي ١',job:'المحاسبة',level:'متوسط',governorate:'القاهرة',specialty:'الحسابات العامة',demo:true},
  {id:'demo-2',name:'مرشح تجريبي ٢',job:'الموارد البشرية',level:'متقدم / خبير',governorate:'الإسكندرية',specialty:'شئون العاملين والمرتبات',demo:true},
  {id:'demo-3',name:'مرشح تجريبي ٣',job:'الهندسة',level:'مبتدئ',governorate:'الجيزة',specialty:'الميكانيكا',demo:true},
  {id:'demo-4',name:'مرشح تجريبي ٤',job:'الموارد البشرية',level:'مدير',governorate:'القاهرة',specialty:'التوظيف والتطوير',demo:true}
 ];
 let publicRows=[],rows=[],filtered=[],page=1,isDemo=false,loadFailed=false;
 const normalize=s=>String(s||'').normalize('NFKD').replace(/[\u064b-\u065f\u0670\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/[^\p{L}\p{N}]+/gu,' ').trim().toLowerCase();
 const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
 function safeCvUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&u.hostname==='drive.google.com'&&!u.username&&!u.password?u.href:null;}catch{return null;}}
 function safeRequestLink(value){if(!value)return true;try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}}
 function setRows(){rows=(isDemo?demos:publicRows).map(r=>({...r,search:normalize([r.name,r.job,r.level,r.governorate,r.specialty].join(' '))}));
  for(const field of Object.keys(labels)){const select=$(field);select.replaceChildren(new Option(labels[field],''));for(const v of [...new Set(rows.map(r=>r[field]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'ar')))select.add(new Option(v,v));select.disabled=!rows.length;}
  $('demo-notice').hidden=!isDemo;$('demo-toggle').textContent=isDemo?'العودة للدليل العام':'جرّب البحث بأمثلة خيالية';$('demo-toggle').setAttribute('aria-pressed',String(isDemo));
  const publicDescription=loadFailed?'جرّب الأمثلة الخيالية لحد ما الدليل يرجع.':publicRows.length?'الدليل العام يعرض المشاركات التي تمت مراجعتها فقط.':'السير بتظهر هنا بعد المراجعة. تقدر تجرّب البحث دلوقتي بأمثلة خيالية.';
  $('mode-description').textContent=isDemo?'أمثلة خيالية لتجربة البحث فقط. لا تواصل ولا ملفات حقيقية.':publicDescription;
  $('index-status').textContent=isDemo?'عرض تجريبي':loadFailed?'تعذر تحميل الدليل':publicRows.length?`${publicRows.length.toLocaleString('ar-EG')} مشاركة`:'لا توجد سير منشورة حاليًا';
  filter();
 }
 function reset(){for(const id of ['query',...Object.keys(labels)])$(id).value='';filter();}
 function filter(){const tokens=normalize($('query').value).split(' ').filter(Boolean);filtered=rows.filter(r=>Object.keys(labels).every(k=>!$(k).value||r[k]===$(k).value)&&tokens.every(t=>r.search.includes(t)));page=1;render();}
 function render(){const result=$('results');result.replaceChildren();$('count').textContent=`${filtered.length.toLocaleString('ar-EG')} ${isDemo?'مثال تجريبي':'مشاركة'}${rows.length?` من ${rows.length.toLocaleString('ar-EG')}`:''}`;
  for(const r of filtered.slice((page-1)*pageSize,page*pageSize)){const card=el('article',undefined,'card');if(r.demo)card.append(el('span','مثال خيالي · ليس مرشحًا حقيقيًا','tag'));card.append(el('h3',r.name),el('p',r.job,'role'));const dl=el('dl');for(const [key,label]of [['level','المستوى'],['governorate','المحافظة'],['specialty','التخصص']])if(r[key])dl.append(el('dt',label),el('dd',r[key]));if(!r.demo&&r.contact)dl.append(el('dt','التواصل'),el('dd',r.contact));card.append(dl);
   const url=!r.demo&&safeCvUrl(r.cv_url);if(url){const a=el('a','عرض السيرة الذاتية ↗','button secondary');a.href=url;a.target='_blank';a.rel='noopener noreferrer';card.append(a);}else card.append(el('p',r.demo?'بيانات للعرض فقط. لا توجد سيرة أو وسيلة تواصل.':'ملف السيرة غير متاح حاليًا.','hint'));result.append(card);
  }
  $('empty').hidden=!!filtered.length;$('empty-title').textContent=rows.length?'مفيش نتائج بالشروط دي':loadFailed&&!isDemo?'الدليل غير متاح حاليًا':'البداية من هنا';$('empty-text').textContent=rows.length?'جرّب تقلل الفلاتر أو تغيّر كلمة البحث.':loadFailed&&!isDemo?'حاول تحديث الصفحة لاحقًا. تقدر تجرّب الأمثلة الخيالية أو تجهّز طلب المشاركة.':'الدليل لسه في بدايته. سجّل سيرتك لتكون ضمن المشاركات الأولى بعد المراجعة.';$('empty-cta').hidden=!!rows.length;
  const pages=Math.ceil(filtered.length/pageSize);$('pagination').hidden=pages<=1;$('previous').disabled=page<=1;$('next').disabled=page>=pages;$('page-label').textContent=`${page.toLocaleString('ar-EG')} / ${pages.toLocaleString('ar-EG')}`;
 }
 function showResults(){
  const heading=$('results-heading');
  heading.focus({preventScroll:true});
  heading.scrollIntoView({block:'start'});
 }
 $('filters').addEventListener('submit',e=>{e.preventDefault();showResults();});
 $('query').addEventListener('input',filter);
 for(const id of Object.keys(labels))$(id).addEventListener('change',filter);
 $('reset').addEventListener('click',reset);
 $('demo-toggle').addEventListener('click',()=>{
  isDemo=!isDemo;
  setRows();
  if(isDemo&&$('query').value.trim())showResults();
 });
 for(const [id,delta]of [['previous',-1],['next',1]])$(id).addEventListener('click',()=>{page+=delta;render();$('search-title').scrollIntoView({block:'start'});});
 async function load(){try{const response=await fetch('public-cvs.json',{cache:'no-store',credentials:'omit'});if(!response.ok)throw Error('load');const data=await response.json();if(data.schema_version!==1||!Array.isArray(data.records)||data.records.length>50000)throw Error('schema');
  if(!data.records.every(r=>r&&typeof r.id==='string'&&['name','job','level','governorate','contact','cv_url'].every(k=>typeof r[k]==='string'&&r[k].length<=1000)&&(r.specialty==null||typeof r.specialty==='string')&&r.publication_approved===true&&r.consent_scope==='public_web_cv_and_contact'&&safeCvUrl(r.cv_url)))throw Error('record');publicRows=data.records;
 }catch{loadFailed=true;$('load-error').textContent='تعذر تحميل الدليل. لن نعرض بيانات بديلة على أنها مشاركات حقيقية. جرّب لاحقًا، أو افتح الأمثلة الخيالية.';$('load-error').hidden=false;}setRows();}
 function invalidateDraft(){if(!$('request-preview').hidden){$('request-preview').hidden=true;$('email-body').value='';$('email-subject').value='';$('open-email').href=`mailto:${mailbox}`;}$('candidate-cv').setCustomValidity('');}
 $('registration').addEventListener('input',invalidateDraft);$('registration').addEventListener('change',invalidateDraft);
 $('registration').addEventListener('submit',e=>{e.preventDefault();const f=$('registration');if(!f.checkValidity()){f.reportValidity();return;}const name=$('candidate-name').value.trim(),job=$('candidate-job').value.trim(),level=$('candidate-level').value,governorate=$('candidate-governorate').value.trim(),contact=$('candidate-contact').value.trim(),cv=$('candidate-cv').value.trim();
  if(![name,job,governorate,contact].every(Boolean)){f.reportValidity();return;}if(!safeRequestLink(cv)){$('candidate-cv').setCustomValidity('استخدم رابط HTTPS صالحًا، أو اتركه فارغًا وأرفق PDF في البريد.');$('candidate-cv').reportValidity();return;}
  const subject='طلب مشاركة سيرة ذاتية للنشر العام';const body=[`طلب مشاركة في دليل السير الذاتية لحازم موسى`,'',`الاسم للنشر: ${name}`,`الوظيفة / المجال: ${job}`,`المستوى: ${level}`,`المحافظة: ${governorate}`,`وسيلة التواصل للنشر: ${contact}`,cv?`رابط نسخة السيرة المخصصة للنشر: ${cv}`:'السيرة المخصصة للنشر: سأرفق ملف PDF بهذه الرسالة قبل إرسالها.','','أؤكد أنني صاحب هذه البيانات والسيرة، وأوافق صراحةً على أن ينشر حازم موسى البيانات أعلاه ونسخة السيرة التي أرسلها في الدليل لأي شخص على الإنترنت، بعد المراجعة. أفهم أنها قد تظهر بمحركات البحث وأن الآخرين يمكنهم تنزيلها ونسخها. قرأت توضيح الخصوصية في صفحة التسجيل.','أفهم أن إرسال الطلب لا يعني النشر التلقائي أو ضمان التوظيف، وأنني أستطيع طلب تعديل أو حذف النسخة التي يديرها الموقع عبر هذا البريد، دون ضمان حذف نسخ الآخرين.','','نسخة نص الموافقة: public-cv-2026-11-21-v1'].join('\n');
  $('email-subject').value=subject;$('email-body').value=body;$('open-email').href=`mailto:${mailbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;$('request-preview').hidden=false;$('copy-status').textContent='';$('request-preview').focus();
 });
 async function copyField(id){const input=$(id);try{if(!navigator.clipboard)throw Error('unavailable');await navigator.clipboard.writeText(input.value);$('copy-status').textContent=id==='email-address'?'تم نسخ بريد الاستقبال.':'تم نسخ نص الطلب. انسخ الموضوع وأرفق سيرتك قبل الإرسال.';}catch{input.focus();input.select();$('copy-status').textContent='تم تحديد النص. استخدم أمر النسخ في جهازك، ثم الصقه في بريدك.';}}
 $('copy-address').addEventListener('click',()=>copyField('email-address'));$('copy-message').addEventListener('click',()=>copyField('email-body'));
 $('open-email').addEventListener('click',()=>{$('copy-status').textContent='لو فتح تطبيق البريد، راجع الرسالة وأرفق سيرتك ثم أرسلها بنفسك. الموقع لا يستطيع تأكيد فتح التطبيق أو إرسال الرسالة.';});
 $('registration-fields').disabled=false;
 load();
})();
