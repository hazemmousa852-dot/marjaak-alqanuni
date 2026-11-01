const $=id=>document.getElementById(id);
let step=0;
const employees=[];
const items=[['حوافز','earn',true],['عمولات','earn',false],['إضافي نهاري بالساعات','overtime',true],['إضافي ليلي بالساعات','overtimeNight',true],['غياب بالأيام','absence',true],['تأخير بالساعات','late',true],['صندوق تكريم الشهداء','deduct',true],['سلف','deduct',true],['جزاءات بالقيمة','deduct',false]].map(([name,type,on])=>({name,type,on}));

function showItems(){ $('items').replaceChildren();
items.forEach((a,i)=>{let row=document.createElement('label');
row.className='item';
let span=document.createElement('span'),check=document.createElement('input');
check.type='checkbox';
check.checked=a.on;
check.onchange=()=>a.on=check.checked;
span.append(check,document.createTextNode(a.name));
let small=document.createElement('small');
small.textContent=a.type==='earn'?'استحقاق':['overtime','overtimeNight'].includes(a.type)?'حساب آلي':'استقطاع';
row.append(span,small);
$('items').append(row)})}showItems();

$('addItem').onclick=()=>{const name=$('customName').value.trim();
if(!name)return;
if(items.some(x=>x.name===name)){alert('البند موجود بالفعل');
return}items.push({name,type:$('customType').value,on:true});
$('customName').value='';
showItems()};

function addEmployee(e={code:'',name:'',dept:'',basic:0,fixed:0}){employees.push(e);
renderEmployees()}
function renderEmployees(){ $('employees').replaceChildren();
employees.forEach((e,i)=>{let tr=document.createElement('tr');
['code','name','dept','basic','fixed'].forEach(k=>{let td=document.createElement('td'),input=document.createElement('input');
input.value=e[k];
input.setAttribute('aria-label',k+' '+(i+1));
if(['basic','fixed'].includes(k)){input.type='number';
input.min=0;
input.step='.01'}input.oninput=()=>e[k]=input.type==='number'?Number(input.value):input.value;
td.append(input);
tr.append(td)});
let td=document.createElement('td'),b=document.createElement('button');
b.type='button';
b.className='delete';
b.textContent='حذف';
b.onclick=()=>{employees.splice(i,1);
renderEmployees()};
td.append(b);
tr.append(td);
$('employees').append(tr)})}
$('addEmployee').onclick=()=>addEmployee();
$('sample').onclick=()=>{if(employees.length&&!confirm('استبدال البيانات الحالية ببيانات افتراضية؟'))return;
employees.splice(0,employees.length,{code:'E001',name:'موظف تجريبي ١',dept:'الإدارة',basic:10000,fixed:1500},{code:'E002',name:'موظف تجريبي ٢',dept:'الإنتاج',basic:8500,fixed:1000});
renderEmployees()};

function parseCSV(text){let rows=[],row=[],v='',quote=false;
for(let i=0;
i<text.length;
i++){let c=text[i];
if(c==='"'){if(quote&&text[i+1]==='"'){v+='"';
i++}else quote=!quote}else if(c===','&&!quote){row.push(v);
v=''}else if((c==='\n'||c==='\r')&&!quote){if(c==='\r'&&text[i+1]==='\n')i++;
row.push(v);
if(row.some(x=>x.trim()))rows.push(row);
row=[];
v=''}else v+=c}if(quote)throw Error('علامات التنصيص غير مكتملة');
row.push(v);
if(row.some(x=>x.trim()))rows.push(row);
return rows}
$('import').onchange=async e=>{try{const f=e.target.files[0];
if(!f)return;
if(f.size>2000000)throw Error('الحد الأقصى ٢ ميجابايت');
let rows=parseCSV((await f.text()).replace(/^\uFEFF/,''));
if(rows[0]&&/الكود|code/i.test(rows[0][0]))rows.shift();
if(!rows.length||rows.length>500)throw Error('استورد من ١ إلى ٥٠٠ موظف');
let data=rows.map((r,i)=>{if(r.length!==5||!r[0].trim()||!r[1].trim()||r.slice(3).some(v=>v.trim()===''||!Number.isFinite(Number(v))||Number(v)<0))throw Error('راجع بيانات الصف '+(i+1)+'؛ مطلوب ٥ أعمدة وأجور غير سالبة');
return{code:r[0].trim(),name:r[1].trim(),dept:r[2],basic:Number(r[3]),fixed:Number(r[4])}});
if(new Set(data.map(x=>x.code)).size!==data.length)throw Error('توجد أكواد مكررة');
if(employees.length&&!confirm('استبدال الموظفين الحاليين ببيانات الملف؟'))return;
employees.splice(0,employees.length,...data);
renderEmployees();
$('importStatus').textContent='تم استيراد '+data.length+' موظف'}catch(err){$('importStatus').textContent=err.message}e.target.value=''};

function settings(){return{company:$('company').value.trim(),month:$('month').value,days:+$('days').value,hours:+$('hours').value,factor:+$('factor').value,nightFactor:+$('nightFactor').value,basis:$('basis').value,round:+$('round').value,blank:+$('blank').value}}
function validate(){for(const id of ['company','month','days','hours','factor','nightFactor','blank'])if(!$(id).checkValidity()){go(0);
$(id).reportValidity();
return false}if(!$('company').value.trim()){alert('اكتب اسم المنشأة');
return false}if(employees.some(e=>!e.code.trim()||!e.name.trim()||!Number.isFinite(e.basic)||!Number.isFinite(e.fixed)||e.basic<0||e.fixed<0)){alert('أكمل اسم وكود كل موظف وأدخل أجورًا صحيحة غير سالبة');
return false}if(new Set(employees.map(e=>e.code.trim())).size!==employees.length){alert('أكواد الموظفين يجب ألا تتكرر');
return false}if(!employees.length&&!+$('blank').value){alert('أضف موظفًا أو صفوفًا فارغة');
return false}return true}
function go(n){step=n;
document.querySelectorAll('[data-page]').forEach(e=>e.hidden=+e.dataset.page!==n);
document.querySelectorAll('[data-step]').forEach(e=>e.classList.toggle('active',+e.dataset.step===n));
$('prev').disabled=n===0;
$('next').hidden=n===3;
$('stepCount').textContent=(n+1)+' / 4';
if(n===3)preview()}
$('next').onclick=()=>{if(step===0&&!validate())return;
if(step===2&&!validate())return;
go(Math.min(3,step+1))};
$('prev').onclick=()=>go(Math.max(0,step-1));
document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{if(+b.dataset.step===3&&!validate())return;
go(+b.dataset.step)});
$('builder').onsubmit=e=>e.preventDefault();
$('dayMode').onchange=()=>{let calendar=$('dayMode').value==='calendar';
$('days').readOnly=calendar;
if(calendar){let[y,m]=$('month').value.split('-').map(Number);
$('days').value=new Date(y,m,0).getDate()}};
$('month').onchange=()=>$('dayMode').onchange();

function preview(){const s=settings(),total=employees.reduce((a,e)=>a+e.basic+e.fixed,0);
$('summary').innerHTML='<div class="stat">الموظفون<b>'+employees.length+'</b></div><div class="stat">بنود متغيرة<b>'+items.filter(x=>x.on).length+'</b></div><div class="stat">إجمالي الأجر الثابت<b>'+total.toLocaleString('ar-EG')+' ج.م</b></div>';
$('preview').replaceChildren();
let t=document.createElement('table');
let r=t.insertRow();
['الكود','الموظف','القسم','الأجر الثابت'].forEach(x=>{let th=document.createElement('th');
th.textContent=x;
r.append(th)});
employees.forEach(e=>{let r=t.insertRow();
[e.code,e.name,e.dept,(e.basic+e.fixed).toFixed(s.round)].forEach(v=>r.insertCell().textContent=v)});
$('preview').append(t)}
// Browser-only XLSX exporter: XML strings remain literal text, never executable formulas.
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const col=n=>{let s='';
for(n++;
n;
n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;
return s};
const formula=f=>({f});

function makeWorkbook(){
let s=settings(),active=items.filter(x=>x.on),count=Math.max(1,employees.length+s.blank),end=count+1,year=Number(s.month.slice(0,4));

const limits={2024:[2000,12600],2025:[2300,14500],2026:[2700,16700],2027:[3200,19300]}[year]||[2700,16700],workerRate=year>=2027?.115:.11,employerRate=year>=2027?.1925:.1875;

const ref=(sheet,c,r)=>`'${sheet}'!${col(c)}${r}`,taxCalc=x=>`IF(${x}<=600000,MAX(MIN(${x},55000)-40000,0)*10%+MAX(MIN(${x},70000)-55000,0)*15%+MAX(MIN(${x},200000)-70000,0)*20%+MAX(MIN(${x},400000)-200000,0)*22.5%+MAX(${x}-400000,0)*25%,IF(${x}<=700000,MIN(${x},55000)*10%+MAX(MIN(${x},70000)-55000,0)*15%+MAX(MIN(${x},200000)-70000,0)*20%+MAX(MIN(${x},400000)-200000,0)*22.5%+MAX(${x}-400000,0)*25%,IF(${x}<=800000,MIN(${x},70000)*15%+MAX(MIN(${x},200000)-70000,0)*20%+MAX(MIN(${x},400000)-200000,0)*22.5%+MAX(${x}-400000,0)*25%,IF(${x}<=900000,MIN(${x},200000)*20%+MAX(MIN(${x},400000)-200000,0)*22.5%+MAX(${x}-400000,0)*25%,IF(${x}<=1200000,MIN(${x},400000)*22.5%+MAX(${x}-400000,0)*25%,MIN(${x},1200000)*25%+MAX(${x}-1200000,0)*27.5%)))))`;

let sheets=[];
function sheet(name,rows,editable=false){sheets.push({name,rows,editable})}
sheet('دليل الاستخدام',[
[s.company+' — صانع شيت الرواتب'],['الشهر',s.month],
['١. عدّل الإعدادات وبيانات الموظفين؛ الخلايا الزرقاء للإدخال.'],
['٢. أدخل المتغيرات الشهرية ولا تغيّر ترتيب الأكواد بين الأوراق.'],
['٣. راجع كشف الرواتب والملخص ثم اختر رقم الموظف في قسيمة الراتب.'],
['٤. تأمينات العامل وصاحب العمل تُحسب من أجر الاشتراك المسجل وحدود السنة ونسب الإعدادات.'],
['٥. ضريبة المرتبات تُحسب تراكميًا وفق قانون 7 لسنة 2024؛ أدخل الأشهر والدخل والضريبة السابقة عند وجودها.'],
['٦. يمكن ترك خانات تجاوز التأمين والضريبة فارغة للحساب الآلي، أو إدخال قيمة مراجَعة للحالات الخاصة.'],
['٧. الأجر الثابت مستحق كاملًا؛ أدخل الغياب والتأخير وفق سياسة المنشأة.'],
['٨. المعادلات لا تغني عن المراجعة القانونية والضريبية قبل الصرف.'],
['الإضافي النهاري والليلي: ساعات مستقلة × أجر الساعة × المعامل المختار.'],
['مصدر ضريبة المرتبات','https://www.eta.gov.eg/sites/default/files/2024-03/law_no.7-2024.pdf'],
['مصدر حدود التأمينات 2026','https://www.nosi.gov.eg/ar/News/Pages/2025-11-30.aspx'],
['إعداد وتطوير: حازم موسى | HR & Payroll HUB']
]);

sheet('الإعدادات',[
['الإعداد','القيمة'],['اسم المنشأة',s.company],['شهر الرواتب',s.month],['أيام أساس الحساب',s.days],
['ساعات العمل اليومية',s.hours],['معامل الإضافي النهاري',s.factor],
['إدراج البدلات في أساس اليوم والساعة (١ نعم / ٠ لا)',s.basis==='fixed'?1:0],['منازل التقريب',s.round],
['معامل الإضافي الليلي',s.nightFactor],['نسبة تأمينات العامل',workerRate],['نسبة تأمينات صاحب العمل',employerRate],
['الحد الأدنى لأجر الاشتراك التأميني',limits[0]],['الحد الأقصى لأجر الاشتراك التأميني',limits[1]],
['الإعفاء الشخصي السنوي',20000],['قانون الضريبة','قانون 7 لسنة 2024'],
['مصدر الضريبة','https://www.eta.gov.eg/sites/default/files/2024-03/law_no.7-2024.pdf'],
['مصدر التأمينات','https://www.nosi.gov.eg/ar/News/Pages/2025-11-30.aspx']
],true);

sheet('الموظفون',[
['الكود','الاسم','القسم','الأساسي','بدلات ثابتة','خاضع للتأمين (١/٠)','أجر الاشتراك المسجل','خاضع للضريبة (١/٠)','أشهر ضريبية سابقة','دخل خاضع سابق','ضريبة مسددة سابقة'],
...Array.from({length:count},(_,i)=>{let e=employees[i];
return e?[e.code,e.name,e.dept,e.basic,e.fixed,1,e.basic+e.fixed,1,0,0,0]:['','','',0,0,1,0,1,0,0,0]})
],true);

sheet('المتغيرات',[
['كود الموظف','اسم الموظف',...active.map(x=>x.name),'تأمينات العامل — تجاوز اختياري','ضريبة المرتبات — تجاوز اختياري'],
...Array.from({length:count},(_,i)=>{let r=i+2;
return[formula(`IF('الموظفون'!A${r}="","",'الموظفون'!A${r})`),formula(`IF('الموظفون'!A${r}="","",'الموظفون'!B${r})`),...active.map(()=>0),'','']})
],true);

let heads=['الكود','الاسم','القسم','الأساسي','بدلات ثابتة',...active.map(x=>x.name+(['overtime','overtimeNight'].includes(x.type)||x.type==='absence'||x.type==='late'?' — القيمة':'')),'إجمالي الاستحقاقات','تخفيضات الأجر','أجر الاشتراك التأميني','تأمينات العامل','تأمينات صاحب العمل','الوعاء الضريبي السنوي','الضريبة السنوية المحسوبة','ضريبة المرتبات','إجمالي الاستقطاعات','صافي الصرف','تكلفة المنشأة','مراجعة'];

let gross=5+active.length,wageReduction=gross+1,insWage=gross+2,workerIns=gross+3,employerIns=gross+4,annualTaxBase=gross+5,annualTax=gross+6,payrollTax=gross+7,deduct=gross+8,net=gross+9,employerCost=gross+10;

sheet('كشف الرواتب',[heads,...Array.from({length:count},(_,i)=>{
let r=i+2,has=`'الموظفون'!A${r}=""`,wrap=f=>formula(`IF(${has},"",${f})`),basis=`('الموظفون'!D${r}+'الموظفون'!E${r}*'الإعدادات'!$B$7)`,day=`${basis}/'الإعدادات'!$B$4`,hour=`${day}/'الإعدادات'!$B$5`;

let vals=active.map((a,j)=>{let v=ref('المتغيرات',j+2,r);
if(a.type==='overtime')v=`${v}*${hour}*'الإعدادات'!$B$6`;
if(a.type==='overtimeNight')v=`${v}*${hour}*'الإعدادات'!$B$9`;
if(a.type==='absence')v=`${v}*${day}`;
if(a.type==='late')v=`${v}*${hour}`;
return wrap(`ROUND(${v},'الإعدادات'!$B$8)`)});

let earn=active.flatMap((a,j)=>['earn','overtime','overtimeNight'].includes(a.type)?[col(j+5)+r]:[]),reductions=active.flatMap((a,j)=>['absence','late'].includes(a.type)?[col(j+5)+r]:[]),otherDed=active.flatMap((a,j)=>!['earn','overtime','overtimeNight'].includes(a.type)?[col(j+5)+r]:[]);

let workerOverride=ref('المتغيرات',2+active.length,r),taxOverride=ref('المتغيرات',3+active.length,r),annualCell=`${col(annualTaxBase)}${r}`,annualTaxFormula=taxCalc(annualCell);

let grossF=`ROUND(SUM(D${r}:E${r}${earn.length?','+earn.join(','):''}),'الإعدادات'!$B$8)`,reductionF=`ROUND(SUM(${reductions.length?reductions.join(','):'0'}),'الإعدادات'!$B$8)`,insWageF=`IF('الموظفون'!F${r}=0,0,MIN(MAX('الموظفون'!G${r},'الإعدادات'!$B$12),'الإعدادات'!$B$13))`;

let workerF=`ROUND(IF(${workerOverride}="",${col(insWage)}${r}*'الإعدادات'!$B$10,${workerOverride}),'الإعدادات'!$B$8)`,employerF=`ROUND(${col(insWage)}${r}*'الإعدادات'!$B$11,'الإعدادات'!$B$8)`;

let currentTaxable=`MAX(0,${col(gross)}${r}-${col(wageReduction)}${r}-${col(workerIns)}${r})`,taxBaseF=`IF('الموظفون'!H${r}=0,0,ROUNDDOWN(MAX(0,(('الموظفون'!J${r}+${currentTaxable})/('الموظفون'!I${r}+1))*12-'الإعدادات'!$B$14)/10,0)*10)`;

let payrollTaxF=`ROUND(IF('الموظفون'!H${r}=0,0,IF(${taxOverride}="",MAX(0,${col(annualTax)}${r}*('الموظفون'!I${r}+1)/12-'الموظفون'!K${r}),${taxOverride})),'الإعدادات'!$B$8)`;

let deductF=`ROUND(SUM(${otherDed.length?otherDed.join(','):'0'},${col(workerIns)}${r},${col(payrollTax)}${r}),'الإعدادات'!$B$8)`,netF=`ROUND(${col(gross)}${r}-${col(deduct)}${r},'الإعدادات'!$B$8)`,costF=`ROUND(${col(gross)}${r}-${col(wageReduction)}${r}+${col(employerIns)}${r},'الإعدادات'!$B$8)`;

let reviewF=`IF(COUNTIF('الموظفون'!$A$2:$A$${end},A${r})>1,"كود مكرر",IF(AND('الموظفون'!F${r}=1,'الموظفون'!G${r}<=0),"أدخل أجر الاشتراك",IF('الموظفون'!I${r}>11,"راجع الأشهر السابقة",IF('الموظفون'!K${r}>${col(annualTax)}${r}*('الموظفون'!I${r}+1)/12,"راجع تسوية الضريبة",IF(${col(net)}${r}<0,"صافي سالب","")))))`;

return[...Array.from({length:5},(_,c)=>wrap(ref('الموظفون',c,r))),...vals,wrap(grossF),wrap(reductionF),wrap(insWageF),wrap(workerF),wrap(employerF),wrap(taxBaseF),wrap(`ROUND(${annualTaxFormula},'الإعدادات'!$B$8)`),wrap(payrollTaxF),wrap(deductF),wrap(netF),wrap(costF),wrap(reviewF)]
})]);

sheet('الملخص',[
['المؤشر','القيمة'],
['عدد الموظفين',formula(`COUNTIF('الموظفون'!A2:A${end},"<>")`)],
['إجمالي الاستحقاقات',formula(`SUM('كشف الرواتب'!${col(gross)}2:${col(gross)}${end})`)],
['تأمينات العامل',formula(`SUM('كشف الرواتب'!${col(workerIns)}2:${col(workerIns)}${end})`)],
['تأمينات صاحب العمل',formula(`SUM('كشف الرواتب'!${col(employerIns)}2:${col(employerIns)}${end})`)],
['ضريبة المرتبات',formula(`SUM('كشف الرواتب'!${col(payrollTax)}2:${col(payrollTax)}${end})`)],
['إجمالي الاستقطاعات',formula(`SUM('كشف الرواتب'!${col(deduct)}2:${col(deduct)}${end})`)],
['صافي الصرف',formula(`SUM('كشف الرواتب'!${col(net)}2:${col(net)}${end})`)],
['تكلفة المنشأة',formula(`SUM('كشف الرواتب'!${col(employerCost)}2:${col(employerCost)}${end})`)],
['فرق التسوية — يجب أن يساوي صفرًا',formula('ROUND(B3-B7-B8,2)')],
['ملاحظة','تكلفة المنشأة تشمل الأجر المستحق بعد تخفيضات الغياب والتأخير وحصة صاحب العمل في التأمينات.']
]);

sheet('قسيمة الراتب',[['قسيمة راتب',s.company],['رقم الموظف في ورقة الموظفين — يبدأ من ١',1],['الشهر',s.month],...heads.slice(0,-1).map((h,c)=>[h,formula(`IFERROR(IF(INDEX('كشف الرواتب'!${col(c)}2:${col(c)}${end},$B$2)="","",INDEX('كشف الرواتب'!${col(c)}2:${col(c)}${end},$B$2)),"")`)])],true);

return{sheets,count,s}
}
function buildXlsx(model){const {sheets,count}=model,files={};
let styles=`<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="3"><font><sz val="11"/><name val="Arial"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Arial"/></font><font><color rgb="FF1670A5"/><sz val="11"/><name val="Arial"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF0B2334"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="5"><xf fontId="0" fillId="0" borderId="0" numFmtId="0" applyAlignment="1"><alignment horizontal="right"/></xf><xf fontId="1" fillId="2" borderId="0" numFmtId="0" applyAlignment="1"><alignment horizontal="right"/></xf><xf fontId="2" fillId="0" borderId="0" numFmtId="0" applyProtection="1" applyAlignment="1"><alignment horizontal="right"/><protection locked="0"/></xf><xf fontId="0" fillId="0" borderId="0" numFmtId="4" applyNumberFormat="1" applyAlignment="1"><alignment horizontal="right"/></xf><xf fontId="2" fillId="0" borderId="0" numFmtId="10" applyNumberFormat="1" applyProtection="1" applyAlignment="1"><alignment horizontal="right"/><protection locked="0"/></xf></cellXfs></styleSheet>`;

files['xl/styles.xml']=styles;
files['_rels/.rels']='<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>';
files['xl/workbook.xml']='<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>'+sheets.map((s,i)=>`<sheet name="${esc(s.name)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')+'</sheets><calcPr calcId="191029" fullCalcOnLoad="1" forceFullCalc="1"/></workbook>';
files['xl/_rels/workbook.xml.rels']='<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+sheets.map((s,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')+`<Relationship Id="rId${sheets.length+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;

sheets.forEach((s,i)=>{let cols=Math.max(...s.rows.map(r=>r.length));
let xml='<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0" rightToLeft="1"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="25"/><cols>'+Array.from({length:cols},(_,c)=>`<col min="${c+1}" max="${c+1}" width="${i===0?100:c===1?30:24}" customWidth="1"/>`).join('')+'</cols><sheetData>';
s.rows.forEach((row,r)=>{xml+=`<row r="${r+1}">`;
row.forEach((v,c)=>{let input=s.editable&&r>0&&!(v&&typeof v==='object')&&(i!==6||(r===1&&c===1))&&(i!==1||c===1),style=r===0?1:input&&i===1&&c===1&&[9,10].includes(r)?4:input?2:typeof v==='number'||v&&v.f?3:0,pos=col(c)+(r+1);
xml+=v&&v.f?`<c r="${pos}" s="${style}"><f>${esc(v.f)}</f></c>`:typeof v==='number'?`<c r="${pos}" s="${style}"><v>${v}</v></c>`:`<c r="${pos}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${esc(v??'')}</t></is></c>`});
xml+='</row>'});
xml+='</sheetData>';
if(i!==0)xml+='<sheetProtection sheet="1" objects="1" scenarios="1" selectLockedCells="0" selectUnlockedCells="0"/>';
if([2,3,4].includes(i))xml+=`<autoFilter ref="A1:${col(cols-1)}${s.rows.length}"/>`;
let rules=[];
const rule=(range,min,max,whole=false)=>rules.push(`<dataValidation type="${whole?'whole':'decimal'}" operator="between" allowBlank="1" showErrorMessage="1" errorStyle="stop" errorTitle="قيمة غير صحيحة" error="أدخل قيمة داخل النطاق المسموح" sqref="${range}"><formula1>${min}</formula1><formula2>${max}</formula2></dataValidation>`);
if(i===1){rule('B4',1,31,true);
rule('B5',1,24);
rule('B6',1.35,10);
rule('B9',1.70,10);
rule('B7',0,1,true);
rule('B8',0,2,true);
rule('B10:B11',0,1);
rule('B12:B14',0,1000000000)}
if(i===2){
rule(`D2:E${count+1}`,0,1000000000);
rule(`F2:F${count+1}`,0,1,true);
rule(`G2:G${count+1}`,0,1000000000);
rule(`H2:H${count+1}`,0,1,true);
rule(`I2:I${count+1}`,0,11,true);
rule(`J2:K${count+1}`,0,1000000000)}
if(i===3&&cols>2)rule(`C2:${col(cols-1)}${count+1}`,0,1000000000);
if(i===6)rule('B2',1,count,true);
if(rules.length)xml+=`<dataValidations count="${rules.length}">${rules.join('')}</dataValidations>`;
xml+='<pageSetup orientation="landscape" paperSize="9"/></worksheet>';
files[`xl/worksheets/sheet${i+1}.xml`]=xml});
files['[Content_Types].xml']='<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'+sheets.map((_,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')+'</Types>';
return zip(files)}
function zip(files){let chunks=[],central=[],offset=0;
const enc=new TextEncoder(),u16=(v,n,x)=>v.setUint16(n,x,true),u32=(v,n,x)=>v.setUint32(n,x,true);
const crc=b=>{let c=~0;
for(let x of b){c^=x;
for(let k=0;
k<8;
k++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^~0)>>>0};
for(const[name,text]of Object.entries(files)){let n=enc.encode(name),b=enc.encode(text),c=crc(b),h=new Uint8Array(30+n.length),v=new DataView(h.buffer);
u32(v,0,0x04034b50);
u16(v,4,20);
u32(v,14,c);
u32(v,18,b.length);
u32(v,22,b.length);
u16(v,26,n.length);
h.set(n,30);
chunks.push(h,b);
let d=new Uint8Array(46+n.length),w=new DataView(d.buffer);
u32(w,0,0x02014b50);
u16(w,4,20);
u16(w,6,20);
u32(w,16,c);
u32(w,20,b.length);
u32(w,24,b.length);
u16(w,28,n.length);
u32(w,42,offset);
d.set(n,46);
central.push(d);
offset+=h.length+b.length}let len=central.reduce((a,b)=>a+b.length,0),end=new Uint8Array(22),v=new DataView(end.buffer);
u32(v,0,0x06054b50);
u16(v,8,central.length);
u16(v,10,central.length);
u32(v,12,len);
u32(v,16,offset);
return new Blob([...chunks,...central,end],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})}
$('download').onclick=()=>{try{if(!validate())return;
$('status').textContent='جارٍ إنشاء الملف…';
const blob=buildXlsx(makeWorkbook()),url=URL.createObjectURL(blob),a=document.createElement('a');
a.href=url;
a.download='Payroll-'+$('month').value+'.xlsx';
document.body.append(a);
a.click();
a.remove();
setTimeout(()=>URL.revokeObjectURL(url),60000);
$('status').textContent='تم إنشاء الملف. افتحه في Excel لتحديث نتائج المعادلات.'}catch(e){$('status').textContent='تعذر إنشاء الملف: '+e.message}};
go(0);

