'use strict';

const $ = (id) => document.getElementById(id);
const fields = {
  employee: ['اسم الموظف', 'Employee name'],
  code: ['الرقم الوظيفي', 'Employee ID'],
  role: ['المسمى الوظيفي', 'Job title'],
  department: ['القسم', 'Department'],
  date: ['تاريخ المستند', 'Document date', 'date'],
  start: ['من تاريخ', 'Start date', 'date'],
  end: ['إلى تاريخ', 'End date', 'date'],
  joined: ['تاريخ مباشرة العمل', 'Work start date', 'date'],
  last: ['آخر يوم عمل', 'Last working day', 'date'],
  leave: ['نوع الإجازة', 'Leave type'],
  bank: ['اسم البنك أو الفرع', 'Bank or branch'],
  salary: ['الراتب الشهري والعملة (اختياري)', 'Monthly salary and currency (optional)'],
  items: ['وصف العهدة والأرقام المسلسلة', 'Assets and serial numbers', 'textarea'],
  notes: ['ملاحظات (اختياري)', 'Notes (optional)', 'textarea']
};

const templates = [
  {
    id:'leave', title:['طلب إجازة','Leave Request'], tags:'اجازه سنوية عارضة leave vacation annual',
    fields:['employee','code','department','leave','start','end','notes'],
    body:['أرجو الموافقة على الإجازة الموضّحة بياناتها أدناه.','I request approval for the leave described below.'],
    signatures:[['مقدم الطلب','Employee'],['المدير المباشر','Line manager'],['شؤون العاملين','Personnel']]
  },
  {
    id:'joining', title:['إقرار مباشرة عمل','Work Commencement Record'], tags:'تعيين التحاق استلام العمل onboarding joining hire',
    fields:['employee','code','role','department','joined','notes'],
    body:['يُثبت هذا النموذج مباشرة الموظف لمهام الوظيفة الموضّحة أدناه في التاريخ المسجّل.','This record confirms that the employee started the duties listed below on the recorded date.'],
    signatures:[['الموظف','Employee'],['المدير المباشر','Line manager'],['شؤون العاملين','Personnel']]
  },
  {
    id:'clearance', title:['نموذج إخلاء طرف','Employee Clearance Form'], tags:'اخلاء اخلاء طرف انتهاء خدمة clearance exit offboarding',
    fields:['employee','code','role','department','last','notes'],
    body:['يُستكمل هذا النموذج بعد مراجعة العهد والمستندات وأي بنود معلّقة مع الإدارات المختصة.','Complete this form after the relevant departments review assets, documents and any outstanding items.'],
    signatures:[['الإدارة المباشرة','Line department'],['المالية','Finance'],['تقنية المعلومات','IT'],['شؤون العاملين','Personnel']]
  },
  {
    id:'experience', title:['شهادة خبرة','Experience Certificate'], tags:'خبره خطاب شهادة عمل employment reference certificate',
    fields:['employee','role','department','start','end','notes'],
    body:['تشهد الشركة بأن الموظف المذكور أدناه عمل لديها بالمسمى الوظيفي وخلال الفترة الموضّحة.','The company certifies that the employee named below worked in the position and during the period shown.'],
    signatures:[['المفوّض بالتوقيع','Authorized signatory'],['ختم الشركة','Company stamp']]
  },
  {
    id:'bank', title:['خطاب HR للبنك','Employment Letter to a Bank'], tags:'بنك مفردات مرتب شهادة راتب خطاب hr letter salary bank',
    fields:['employee','code','role','joined','salary','notes'],
    body:['تحية طيبة وبعد، نفيدكم بأن الموظف المذكور أدناه يعمل لدى شركتنا، وفيما يلي بياناته بناءً على طلبه.','Dear Sir or Madam, this letter confirms that the employee listed below works for our company. Their details are provided at their request.'],
    signatures:[['المفوّض بالتوقيع','Authorized signatory'],['ختم الشركة','Company stamp']]
  },
  {
    id:'assets', title:['إقرار استلام عهدة','Asset Receipt Acknowledgment'], tags:'عهده معدات جهاز لابتوب تسليم استلام asset equipment laptop',
    fields:['employee','code','department','items','notes'],
    body:['أقرّ باستلام العهدة المبيّنة أدناه وبأنني راجعت وصفها وحالتها عند الاستلام.','I acknowledge receiving the assets listed below and that I checked their description and condition on receipt.'],
    signatures:[['المستلم','Recipient'],['مسؤول تسليم العهدة','Issued by']]
  }
];

const root = document.documentElement;
const frameTitle = ['أداة نموذجي لتجهيز نماذج التأمينات','Namozagy social insurance forms generator'];

function preference(key, value) {
  try {
    if (value !== undefined) localStorage.setItem(key, value);
    return localStorage.getItem(key);
  } catch { return null; }
}

const suppliedLanguage = new URLSearchParams(location.search).get('lang');
let language = suppliedLanguage === 'ar' || suppliedLanguage === 'en'
  ? suppliedLanguage : preference('hazem-site-language') === 'en' ? 'en' : 'ar';
let documentLanguage = language;
let followsInterface = true;
let theme = preference('hazem-site-theme') === 'light' ? 'light' : 'dark';
let active = templates[0];
let logoUrl = '';
const shared = {};
const entries = Object.fromEntries(templates.map(({id}) => [id, {}]));
const tr = (pair, lang = language) => pair[lang === 'en' ? 1 : 0];

function normalize(text) {
  return text.toLowerCase().replace(/[أإآ]/g,'ا').replace(/[ى]/g,'ي')
    .replace(/[ة]/g,'ه').replace(/[ً-ٟـ]/g,'').trim();
}

function create(tag, content, parent) {
  const node = document.createElement(tag);
  if (content !== '') node.textContent = content;
  parent.append(node);
  return node;
}

function renderCatalog() {
  const terms = normalize($('search').value).split(/\s+/);
  const list = $('catalog');
  list.replaceChildren();
  for (const template of templates) {
    const text = normalize([...template.title, template.tags].join(' '));
    if (!terms.every((term) => text.includes(term))) continue;
    const button = create('button', tr(template.title), list);
    button.type = 'button';
    button.dataset.template = template.id;
    button.setAttribute('aria-pressed', String(template === active));
    button.addEventListener('click', () => {
      active = template;
      for (const option of list.children) {
        option.setAttribute('aria-pressed', String(option === button));
      }
      renderFields();
      renderPaper();
    });
  }
  $('empty').hidden = list.childElementCount > 0;
}

function stateFor(key) {
  return ['employee','code','role','department','joined'].includes(key) ? shared : entries[active.id];
}

function renderFields() {
  $('editor-title').textContent = tr(active.title);
  $('fields').replaceChildren();
  const keys = active.id === 'bank' ? ['date','bank',...active.fields] : ['date',...active.fields];
  for (const key of keys) {
    const field = fields[key];
    const label = create('label', '', $('fields'));
    create('span', tr(field), label);
    const type = field[2] || 'text';
    const input = create(type === 'textarea' ? 'textarea' : 'input', '', label);
    input.id = 'field-' + key;
    input.dir = 'auto';
    input.autocomplete = 'off';
    if (type === 'textarea') {
      label.className = 'wide';
      input.rows = 3;
      input.maxLength = 650;
    } else {
      input.type = type;
      if (type === 'text') input.maxLength = 140;
    }
    input.value = stateFor(key)[key] || '';
    input.addEventListener('input', () => {
      stateFor(key)[key] = input.value;
      renderPaper();
    });
  }
}

function shownValue(key) {
  const value = (stateFor(key)[key] || '').trim();
  if (!value || fields[key][2] !== 'date') return value;
  const date = new Date(value + 'T12:00:00Z');
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(
    documentLanguage === 'ar' ? 'ar-EG' : 'en-GB',
    {timeZone:'UTC', day:'numeric', month:'long', year:'numeric'}
  ).format(date);
}

function renderPaper() {
  const text = (pair) => tr(pair, documentLanguage);
  const paper = $('document');
  paper.lang = documentLanguage;
  paper.dir = documentLanguage === 'ar' ? 'rtl' : 'ltr';
  const company = $('company-' + documentLanguage).value.trim();
  const otherCompany = $('company-' + (documentLanguage === 'ar' ? 'en' : 'ar')).value.trim();
  $('paper-company').textContent = company || otherCompany || text(['اسم الشركة','Company name']);
  $('paper-company').dir = 'auto';
  $('paper-logo').hidden = !logoUrl;
  $('paper-title').textContent = text(active.title);
  $('paper-date').textContent = text(fields.date) + ' · ' + (shownValue('date') || '………');
  const body = $('paper-content');
  body.replaceChildren();
  if (active.id === 'bank') {
    create('p', text(['السادة / ','To: ']) + (shownValue('bank') || '………'), body);
  }
  create('p', text(active.body), body);
  const list = create('dl', '', body);
  for (const key of active.fields) {
    const value = shownValue(key);
    if (!value && ['salary','notes'].includes(key)) continue;
    create('dt', text(fields[key]), list);
    create('dd', value || '………', list).dir = 'auto';
  }
  const signatures = $('paper-signatures');
  signatures.replaceChildren();
  for (const signature of active.signatures) create('div', text(signature), signatures);
}

function renderTheme() {
  root.dataset.theme = theme;
  const button = $('theme');
  button.textContent = tr(theme === 'dark' ? ['الوضع الفاتح','Light mode'] : ['الوضع الداكن','Dark mode']);
}

function renderLanguage() {
  root.lang = language;
  root.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.title = tr(['نموذجي | مكتبة نماذج شؤون العاملين — حازم موسى','Namozagy | Personnel Forms Library — Hazem Moussa']);
  for (const node of document.querySelectorAll('[data-ar][data-en]')) node.textContent = node.dataset[language];
  $('language').textContent = tr(['English','العربية']);
  $('language').lang = language === 'ar' ? 'en' : 'ar';
  $('search').placeholder = tr(['ابحث عن نموذج أو خطاب','Search for a form or letter']);
  $('sections').setAttribute('aria-label', tr(['أقسام المكتبة','Library sections']));
  $('insurance-frame').title = tr(frameTitle);
  $('document-language').value = documentLanguage;
  renderTheme();
  renderCatalog();
  renderFields();
  renderPaper();
}

function renderSection() {
  const insuranceActive = location.hash === '#insurance';
  $('insurance').hidden = !insuranceActive;
  $('personnel').hidden = insuranceActive;
  for (const link of $('sections').querySelectorAll('a')) {
    if (link.hash === (insuranceActive ? '#insurance' : '#personnel')) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  }
  if (insuranceActive && !$('insurance-frame').hasAttribute('src')) {
    $('insurance-frame').src = $('insurance-launch').href;
  }
}

function replaceLogo(url) {
  if (logoUrl) URL.revokeObjectURL(logoUrl);
  logoUrl = url;
  const logo = $('paper-logo');
  if (url) logo.src = url;
  else logo.removeAttribute('src');
  $('remove-logo').hidden = !url;
  renderPaper();
}

$('search').addEventListener('input', renderCatalog);
$('language').addEventListener('click', () => {
  language = language === 'ar' ? 'en' : 'ar';
  if (followsInterface) documentLanguage = language;
  preference('hazem-site-language', language);
  const url = new URL(location.href);
  url.searchParams.delete('lang');
  history.replaceState(null, '', url);
  renderLanguage();
});
$('theme').addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  preference('hazem-site-theme', theme);
  renderTheme();
});
$('document-language').addEventListener('change', (event) => {
  documentLanguage = event.target.value;
  followsInterface = false;
  renderPaper();
});
for (const id of ['company-ar','company-en']) $(id).addEventListener('input', renderPaper);
$('logo').addEventListener('change', (event) => {
  const [file] = event.target.files;
  if (!file) return;
  if (!['image/png','image/jpeg','image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
    event.target.value = '';
    $('logo-error').hidden = false;
    return;
  }
  $('logo-error').hidden = true;
  replaceLogo(URL.createObjectURL(file));
});
$('paper-logo').addEventListener('error', () => {
  $('logo').value = '';
  $('logo-error').hidden = false;
  replaceLogo('');
});
$('remove-logo').addEventListener('click', () => {
  $('logo').value = '';
  $('logo-error').hidden = true;
  replaceLogo('');
  $('logo').focus();
});
$('clear').addEventListener('click', () => {
  for (const key of Object.keys(shared)) delete shared[key];
  entries[active.id] = {};
  renderFields();
  renderPaper();
});
$('print').addEventListener('click', () => window.print());
window.addEventListener('hashchange', renderSection);
renderLanguage();
renderSection();
