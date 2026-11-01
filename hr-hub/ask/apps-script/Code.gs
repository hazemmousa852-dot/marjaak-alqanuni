/** اسأل حازم — attach to the private management spreadsheet. */
function sheetId_(){const id=PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');if(!id)throw new Error('يجب تشغيل التهيئة أولًا.');return id;}
const TAB_ = 'الأسئلة';
function ownerEmail_(){return PropertiesService.getScriptProperties().getProperty('OWNER_EMAIL')||'';}
const CATEGORIES_ = ['شؤون العاملين','المرتبات والضرائب','التأمينات الاجتماعية','الإجازات والحضور','العقود وإنهاء الخدمة','موارد بشرية عامة'];
function doGet(){return HtmlService.createHtmlOutputFromFile('Index').setTitle('اسأل حازم | شؤون العاملين والمرتبات').addMetaTag('viewport','width=device-width, initial-scale=1');}
function onOpen(){SpreadsheetApp.getUi().createMenu('اسأل حازم').addItem('تهيئة الربط والتحقق من الصلاحيات','setup_').addItem('إرسال إجابة الصف المحدد بالإيميل','sendSelectedEmail_').addItem('تجهيز واتساب للصف المحدد','prepareWhatsApp_').addItem('تحديث رابط متابعة الصف المحدد','updateSelectedTracking_').addToUi();}
function sheet_(){return SpreadsheetApp.openById(sheetId_()).getSheetByName(TAB_);}
function owner_(){if(Session.getActiveUser().getEmail().toLowerCase()!==ownerEmail_().toLowerCase())throw new Error('هذه العملية متاحة لحازم موسى فقط.');}
function setup_(){const book=SpreadsheetApp.getActiveSpreadsheet();if(!book)throw new Error('افتح السكربت من داخل الشيت.');const owner=book.getOwner().getEmail();if(!owner||Session.getActiveUser().getEmail().toLowerCase()!==owner.toLowerCase())throw new Error('التهيئة متاحة لمالك الشيت فقط.');PropertiesService.getScriptProperties().setProperties({SPREADSHEET_ID:book.getId(),OWNER_EMAIL:owner});const s=sheet_();if(!s)throw new Error('تبويب الأسئلة غير موجود');s.setRightToLeft(true);s.setFrozenRows(1);s.hideColumns(16);const quota=MailApp.getRemainingDailyQuota();SpreadsheetApp.getUi().alert('الشيت جاهز. رصيد مستلمي البريد اليوم: '+quota+'\nانشره كتطبيق ويب يعمل باسمك ومتاح لأي شخص.');}
function literal_(v){const s=String(v==null?'':v);return /^[=+\-@]/.test(s)?"'"+s:s;}
function submitQuestion(b){
 b=b||{};if(b.website)throw new Error('تعذر تسجيل السؤال.');
 const name=String(b.name||'').trim(),category=String(b.category||''),body=String(b.body||'').trim(),channel=String(b.channel||''),contact=String(b.contact||'').trim();
 if(name.length<2||name.length>100||body.length<15||body.length>6000||CATEGORIES_.indexOf(category)<0||['إيميل','واتساب'].indexOf(channel)<0||contact.length>180)throw new Error('راجع البيانات؛ السؤال من 15 إلى 6000 حرف.');
 if(channel==='إيميل'?!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact):!/^\+[1-9][0-9]{7,14}$/.test(contact))throw new Error('اكتب وسيلة تواصل صحيحة. رقم واتساب يجب أن يبدأ بكود الدولة مثل +20.');
 const lock=LockService.getScriptLock();if(!lock.tryLock(10000))throw new Error('الخدمة مشغولة. حاول مجددًا بعد قليل.');
 try{const s=sheet_(),rows=s.getDataRange().getValues(),today=Utilities.formatDate(new Date(),'Africa/Cairo','yyyy-MM-dd');let total=0,same=0;
 rows.slice(1).forEach(r=>{const date=r[1] instanceof Date?r[1]:new Date(String(r[1]));const day=isNaN(date.getTime())?'':Utilities.formatDate(date,'Africa/Cairo','yyyy-MM-dd');if(day===today){total++;if(String(r[6]).toLowerCase()===contact.toLowerCase())same++;}});
 if(same>=3||total>=200)throw new Error('تم الوصول لحد استقبال الأسئلة اليوم. حاول غدًا.');
 const id='HM-'+Utilities.getUuid().slice(0,8).toUpperCase(),token=Utilities.getUuid()+Utilities.getUuid().replace(/-/g,''),now=new Date().toISOString();
 const url=trackingUrl_(token);
 s.appendRow([id,now,literal_(name),category,literal_(body),channel,literal_(contact),b.consent===true?'نعم':'لا','','جديد','لم يتم الإرسال','','','لا',now,token,url,'']);
 return {id:id,token:token,url:url};
 }finally{lock.releaseLock();}
}
function getAnswer(token){if(typeof token!=='string'||!/^[-a-f0-9]{68}$/.test(token))throw new Error('رابط المتابعة غير صحيح.');const rows=sheet_().getDataRange().getValues();for(let i=1;i<rows.length;i++){if(rows[i][15]===token)return {id:String(rows[i][0]),answer:String(rows[i][8]||''),status:String(rows[i][9]||'جديد')};}throw new Error('السؤال غير موجود.');}
function getPublicAnswers(){return sheet_().getDataRange().getValues().slice(1).filter(r=>r[7]==='نعم'&&r[13]==='نعم'&&String(r[11]).trim()&&String(r[12]).trim()).slice(-100).reverse().map(r=>({question:String(r[11]),answer:String(r[12]),category:String(r[3])}));}
function selected_(){owner_();const active=SpreadsheetApp.getActiveSpreadsheet();if(!active||active.getId()!==sheetId_())throw new Error('افتح شيت اسأل حازم.');const s=active.getActiveSheet(),row=s.getActiveCell().getRow();if(s.getName()!==TAB_||row<2)throw new Error('حدد خلية في صف السؤال أولًا.');const v=s.getRange(row,1,1,18).getValues()[0];if(!v[0])throw new Error('هذا الصف فارغ.');return {sheet:s,row:row,v:v};}
function sendSelectedEmail_(){const x=selected_(),v=x.v,ui=SpreadsheetApp.getUi();if(v[5]!=='إيميل')throw new Error('السائل اختار واتساب.');if(!String(v[8]).trim())throw new Error('اكتب الإجابة الخاصة في العمود I أولًا.');if(v[10]==='أُرسل الإيميل'||v[10]==='جارٍ الإرسال')throw new Error('سبق إرسال هذا الصف أو توجد محاولة إرسال معلقة. راجع بريدك قبل تكراره.');if(ui.alert('إرسال إجابة حازم','إرسال الإجابة المكتوبة إلى '+v[6]+'؟',ui.ButtonSet.YES_NO)!==ui.Button.YES)return;
 const lock=LockService.getScriptLock();lock.waitLock(10000);
 try{const current=x.sheet.getRange(x.row,1,1,18).getValues()[0];if(current[10]==='أُرسل الإيميل'||current[10]==='جارٍ الإرسال')throw new Error('الإجابة أُرسلت أو يجري إرسالها.');if(String(current[8])!==String(v[8])||String(current[6])!==String(v[6]))throw new Error('تغيّر الرد أو عنوان البريد. راجعه وأعد المحاولة.');if(MailApp.getRemainingDailyQuota()<1)throw new Error('انتهى رصيد الإرسال اليومي.');x.sheet.getRange(x.row,11).setValue('جارٍ الإرسال');SpreadsheetApp.flush();
 try{MailApp.sendEmail({to:String(v[6]),subject:'إجابة حازم موسى عن سؤالك '+v[0],body:'مرحبًا '+v[2]+'\n\nسؤالك:\n'+v[4]+'\n\nإجابة حازم موسى:\n'+v[8]+'\n\nHR & Payroll Hub',name:'اسأل حازم | حازم موسى'});x.sheet.getRange(x.row,10,1,2).setValues([['تم الرد','أُرسل الإيميل']]);x.sheet.getRange(x.row,15).setValue(new Date().toISOString());}catch(err){x.sheet.getRange(x.row,11).setValue('تحقق من بريدك قبل إعادة المحاولة');throw err;}
 }finally{lock.releaseLock();}ui.alert('أُرسلت الرسالة إلى خدمة البريد بنجاح.');}
function prepareWhatsApp_(){const x=selected_(),v=x.v;if(v[5]!=='واتساب')throw new Error('السائل اختار الإيميل.');if(!String(v[8]).trim())throw new Error('اكتب الإجابة الخاصة في العمود I أولًا.');const text='مرحبًا '+v[2]+'\nإجابة حازم موسى عن سؤالك '+v[0]+'\n\n'+v[8]+'\n\nHR & Payroll Hub',url='https://wa.me/'+String(v[6]).replace(/\D/g,'')+'?text='+encodeURIComponent(text);x.sheet.getRange(x.row,18).setValue(url);x.sheet.getRange(x.row,10).setValue('تم الرد');const html='<div dir="rtl" style="font:16px Tahoma;padding:20px"><p>افتح الرسالة وراجعها، ثم اضغط إرسال في واتساب.</p><a target="_blank" rel="noopener noreferrer" href="'+url+'">فتح واتساب</a><p>تجهيز الرسالة لا يؤكد إرسالها.</p></div>';SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html).setWidth(380).setHeight(220),'الرد عبر واتساب');}
function updateSelectedTracking_(){const x=selected_();x.sheet.getRange(x.row,17).setValue(trackingUrl_(x.v[15]));}

// The website owns the UI; this endpoint only transports bounded public API calls.
function trackingUrl_(token){return 'https://hazemmousa852-dot.github.io/marjaak-alqanuni/hr-hub/ask/?token='+encodeURIComponent(token);}
function doPost(e){
 const p=e&&e.parameter||{};let response={type:'ask-hazem-response',requestId:String(p.requestId||''),ok:false};
 try{
  if(!/^[a-zA-Z0-9-]{20,80}$/.test(response.requestId))throw new Error('طلب غير صحيح.');
  const raw=String(p.payload||'{}');if(raw.length>14000)throw new Error('حجم الطلب أكبر من المسموح.');
  const b=JSON.parse(raw);
  switch(p.action){
   case 'submitQuestion': response.result=submitQuestion(b);break;
   case 'getAnswer':response.result=getAnswer(b.token);break;
   case 'getPublicAnswers':response.result=getPublicAnswers();break;
   default:throw new Error('طلب غير صحيح.');
  }
  response.ok=true;
 }catch(err){response.error=String(err.message||'تعذر تنفيذ الطلب.');}
 const json=JSON.stringify(response).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
 return HtmlService.createHtmlOutput('<!doctype html><html><body><script>window.top.postMessage('+json+',"https://hazemmousa852-dot.github.io");<\/script></body></html>').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
