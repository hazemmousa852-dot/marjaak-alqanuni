(() => {
  'use strict';
  const D = window.InsuranceContent, C = window.InsuranceCore, X = window.InsuranceCertificate;
  const key = 'hazem-insurance-mission-v1';
  const $ = id => document.getElementById(id);
  const screen = $('screen'), panel = $('panel');
  const qmap = new Map(D.questions.map(q => [q.id, q]));
  const fmt = n => new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 2 }).format(n);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  let storageOK = true, progress;
  try { progress = C.read(localStorage.getItem(key), D.questions); } catch { progress = C.fresh(); storageOK = false; }
  let view = 'home', introLevel = 1, resultRun = null, timer = null, lastTick = 0, toastTimer = null, pendingStart = null, certificateBusy = false;
  const paths = {
    shield: '<path d="m12 3 8 4v6c0 5-8 9-8 9S4 18 4 13V7Z"/><path d="m8 12 3 3 5-6"/>',
    check: '<path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="10"/>',
    spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',
    file: '<path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v5h4M9 12h6M9 16h6"/>',
    calculator: '<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M8 6h8M8 10h1m6 0h1M8 14h1m6 0h1M8 18h1m6 0h1"/>',
    search: '<circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6M8 10h4m-2-2v4"/>',
    trophy: '<path d="M7 3h10v5a5 5 0 0 1-10 0ZM7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4M12 13v6m-4 2h8m-6-2h4"/>',
    arrow: '<path d="M20 12H4m6-6-6 6 6 6"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2"/>',
    star: '<path d="m12 2 3 6.5 7 .8-5.2 4.9 1.5 7-6.3-3.5-6.3 3.5 1.5-7L2 9.3l7-.8Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    bulb: '<path d="M9 18h6m-5 3h4M8 14a7 7 0 1 1 8 0l-1 3H9Z"/>',
    book: '<path d="M3 4h6l3 2 3-2h6v16h-6l-3 2-3-2H3Zm9 2v16"/>',
    replay: '<path d="M4 9a9 9 0 1 1 0 6m0-12v6h6"/>',
    warning: '<path d="m12 3 10 18H2Zm0 6v5m0 3v.5"/>',
    home: '<path d="m3 11 9-8 9 8M5 10v11h5v-7h4v7h5V10"/>',
    bolt: '<path d="m14 2-9 12h6l-1 8 9-12h-6Z"/>',
    save: '<path d="M4 3h13l4 4v14H4Zm4 0v7h8V3M8 21v-7h9v7"/>',
    medal: '<circle cx="12" cy="15" r="6"/><path d="m7 3 3 6m7-6-3 6M6 3h5l1 2 1-2h5M12 12v6m-3-3h6"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4m0 3v.5"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    print: '<path d="M6 8V3h12v5M6 17H3V9h18v8h-3M6 14h12v8H6Zm12-3h.5"/>'
  };
  function icon(name) { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.shield}</svg>`; }
  const colors = { mint:'var(--mint)', blue:'var(--blue)', gold:'var(--gold)', purple:'var(--purple)', coral:'var(--coral)' };
  const levelOf = id => D.levels.find(l => l.id === Number(id));
  const starHTML = (count, size = '') => `<span class="stars ${size}" aria-label="${fmt(count)} من 3 نجوم">${[1,2,3].map(i => `<span class="${i <= count ? 'on' : ''}" aria-hidden="true">★</span>`).join('')}</span>`;
  const button = (action, text, cls = 'secondary', extra = '', symbol = '') => `<button class="${cls}" data-action="${action}" ${extra}>${symbol ? icon(symbol) : ''}<span>${text}</span></button>`;
  function toast(text) { $('toast').textContent = text; $('toast').classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('show'), 3500); }
  function save() { try { localStorage.setItem(key, JSON.stringify(progress)); } catch { if (storageOK) { storageOK = false; toast('التقدم متاح في الجلسة الحالية؛ حفظه على الجهاز غير متاح.'); } } }
  function stopTimer() { clearInterval(timer); timer = null; document.body.classList.remove('print-certificate'); }
  function focusHeading(selector = 'h1') { const el = screen.querySelector(selector); if (el) { el.setAttribute('tabindex', '-1'); el.focus({ preventScroll:true }); } }
  function goTop() { window.scrollTo({ top:0, behavior:'instant' }); }
  function showPanel(title, body) { $('panel-title').textContent = title; $('panel-body').innerHTML = body; if (!panel.open) panel.showModal(); lastTick = Date.now(); }
  function closePanel() { panel.close(); lastTick = Date.now(); }
  function sourceLinks(q) {
    const keys = [q.source, ...(q.id === 'f1' ? ['leave'] : q.id === 'f5' ? ['join'] : [])];
    return `<div class="source-line"><span>${q.source === 'practice' ? 'تطبيق مهني ·' : 'مرجع القاعدة ·'}</span>${keys.map(k => `<a href="${esc(D.sources[k].url)}" target="_blank" rel="noopener noreferrer">${esc(D.sources[k].title)} ↗</a>`).join('')}</div>`;
  }
  function answerText(q, value = q.answer) { return q.type === 'calc' ? `${fmt(value)} ${q.unit}` : q.choices[value]; }
  function certificateCard(report) {
    return `<section class="certificate-promo ${report.eligible ? 'earned' : ''}" aria-labelledby="certificate-promo-title"><span class="certificate-promo-icon">${icon('medal')}</span><div class="certificate-promo-copy"><h2 id="certificate-promo-title">${report.eligible ? 'شهادة إنجازك في انتظارك' : 'كمّل المسار… واستلم شهادة إنجازك'}</h2><p>${report.eligible ? 'نجحت في المستويات الخمسة. اكتب اسمك واحفظ شهادتك PDF أو صورة.' : 'شهادة باسمك بعد النجاح في كل مستوى بـ٦ إجابات صحيحة على الأقل.'}</p><span>${fmt(report.completed)} من ٥ مستويات تم اجتيازها</span></div>${button('certificate',report.eligible ? progress.certificate ? 'عرض شهادتي' : 'استلم شهادتك' : 'شوف شكل الشهادة',report.eligible ? 'primary' : 'secondary','','medal')}</section>`;
  }
  function home() {
    stopTimer(); view = 'home';
    const next = C.nextLevel(progress,D.levels), active = progress.active;
    const completed = D.levels.filter(l => progress.best[l.id]?.stars > 0).length;
    const totalScore = Object.values(progress.best).reduce((a,b) => a+b.score,0);
    const totalStars = Object.values(progress.best).reduce((a,b) => a+b.stars,0);
    const missionTitle = active ? (active.kind === 'level' ? levelOf(active.level).title : active.kind === 'review' ? 'جولة مراجعة الأخطاء' : 'الجولة السريعة') : completed === 5 ? 'خبرتك تستحق جولة أخرى' : next.title;
    const missionDescription = active ? `لسه فيه جولة محفوظة. وصلت للمهمة ${fmt(active.index + 1)} من ${fmt(active.ids.length)}. كمّل من مكانك.` : completed === 5 ? 'أنهيت المسار بالكامل. حسّن نقاطك أو اختبر نفسك في جولة سريعة.' : next.subtitle + '. 8 مهمات في انتظارك.';
    screen.innerHTML = `<section class="hero" aria-labelledby="home-title"><div><div class="eyebrow">خبرة عملية… في شكل لعبة</div><h1 id="home-title">كل ملف حكاية.<br>وكل قرار صح <em>يفرق.</em></h1><p class="hero-copy">ادخل مكتب التأمينات، راجع الملفات، واحسب الاشتراكات.<br>مواقف من قلب الشغل تأخدك خطوة بخطوة من البداية لحد إقفال الشهر.</p><div class="hero-meta"><span class="pill mint">${icon('medal')} ٥ مستويات</span><span class="pill">${icon('file')} ٤٠ مهمة</span><span class="pill">${icon('calculator')} أسئلة · مواقف · حسابات</span></div></div><div class="hero-art" aria-hidden="true"><div class="orbit"></div><div class="hero-shield">${icon('shield')}</div><div class="floating-file file-one">${icon('file')}<div>ملف مؤمن عليه<span>كل معلومة في مكانها</span></div><div class="tick">✓</div></div><div class="floating-file file-two">${icon('calculator')}<div>اشتراكات الشهر<span>أرقام تستحق المراجعة</span></div></div><div class="floating-file file-three"><div class="tick">✓</div>قرار صح. ملف سليم.</div></div></section>
      <div class="dashboard"><section class="path-section" aria-labelledby="path-title"><div class="path-top"><div><h2 id="path-title" class="section-title">مسارك إلى الخبرة</h2><p class="section-sub">${progress.mode === 'free' ? 'اختار أي مستوى وتمرّن على اللي محتاجه.' : 'اجتاز كل مستوى علشان تفتح اللي بعده.'}</p></div><div class="segment" role="group" aria-label="وضع اللعب"><button data-action="mode" data-mode="path" aria-pressed="${progress.mode === 'path'}">المسار المهني</button><button data-action="mode" data-mode="free" aria-pressed="${progress.mode === 'free'}">تدريب حر</button></div></div><div class="level-list">${D.levels.map(l => {
        const open = C.accessible(progress,l.id), best = progress.best[l.id], current = next.id === l.id && open && !(best?.stars > 0);
        return `<button class="level-card ${!open ? 'locked' : ''} ${current ? 'current' : ''}" style="--level-color:${colors[l.color]}" data-action="intro" data-level="${l.id}" ${!open ? 'disabled' : ''} aria-label="${esc(l.title)}، ${open ? best?.stars > 0 ? 'مكتمل' : 'متاح' : 'مغلق؛ اجتز المستويات السابقة'}"><span class="level-icon">${icon(open ? l.icon : 'lock')}</span><span class="level-info"><span class="level-caption">المستوى ${fmt(l.id)} <span class="mini-dot"></span> ${current ? 'ابدأ من هنا' : best?.stars > 0 ? 'تم اجتيازه' : l.short}</span><h3>${l.title}</h3><p>${l.subtitle}</p></span><span class="level-end">${open && best ? starHTML(best.stars) : icon(open ? 'arrow' : 'lock')}<span class="level-best">${best ? fmt(best.right) + ' / ٨' : '٨ مهمات'}</span></span></button>`;
      }).join('')}</div><div class="play-preferences"><label class="switch-label"><input id="timed-setting" type="checkbox" ${progress.timed ? 'checked' : ''}><span>تحدّي الوقت</span></label><p class="preferences-copy">${progress.timed ? '45 ثانية للأسئلة، 75 للمواقف، و90 للحسابات. الوقت يتوقف عند مغادرة الصفحة.' : 'العب براحتك. فعّل الوقت لو عايز تحدّي أسرع في الجولات الجديدة.'}</p><button class="reset-button" data-action="reset">بداية جديدة</button></div></section>
      <aside class="side-stack"><section class="mission-panel"><div class="panel-label">${icon(active ? 'save' : 'bolt')} ${active ? 'الجولة مستنياك' : completed === 5 ? 'المسار مكتمل' : 'مهمتك القادمة'}</div><h2>${missionTitle}</h2><p>${missionDescription}</p>${button(active ? 'resume' : 'intro', active ? 'كمّل المهمة' : completed === 5 ? 'العب المستوى الأخير' : 'ابدأ المهمة','primary full',active ? '' : `data-level="${next.id}"`,'arrow')}${button('help','إزاي ألعب؟','subtle-button')}</section>
      <section class="stats-panel"><h3>سجل إنجازك</h3><div class="stats-grid"><div class="stat"><strong>${fmt(completed)}<span> / ٥</span></strong><span>مستويات مكتملة</span></div><div class="stat"><strong>${fmt(totalScore)}</strong><span>نقطة</span></div><div class="stat"><strong>${fmt(totalStars)}</strong><span>نجمة</span></div></div><div class="overall" role="progressbar" aria-label="المهمات التي جربتها" aria-valuemin="0" aria-valuemax="40" aria-valuenow="${progress.seen.length}"><span style="width:${progress.seen.length/40*100}%"></span></div><div class="save-caption">${icon('save')} ${storageOK ? 'التقدم محفوظ على نفس الجهاز' : 'التقدم متاح في الجلسة الحالية'}</div>${button('badges','شوف أوسمتك','subtle-button full')}</section>
      <section class="quick-card"><div class="quick-heading">${icon('bolt')}<h3>عندك وقت لجولة؟</h3></div><p>لحد ٨ مهمات من غير تكرار بين الجولات السريعة، لحد ما تخلص دورة بنك الأسئلة. أو ارجع لأخطائك للمراجعة.</p><div class="quick-actions">${button('quick','جولة سريعة','secondary','','bolt')}${button('review',`راجع أخطاءك ${progress.mistakes.length ? ' (' + fmt(progress.mistakes.length) + ')' : ''}`,'secondary',progress.mistakes.length ? '' : 'disabled','replay')}</div></section></aside></div>`;
    screen.insertAdjacentHTML('beforeend',certificateCard(C.achievement(progress)));
    goTop();
  }
  function intro(id) {
    const l = levelOf(id); if (!l || !C.accessible(progress,l.id)) return;
    stopTimer(); introLevel = l.id; view = 'intro';
    screen.innerHTML = `<div class="breadcrumbs">${button('home','الرئيسية','subtle-button','','home')}${icon('arrow')}<span>المستوى ${fmt(l.id)}</span></div><section class="level-intro" style="--level-color:${colors[l.color]}"><div class="intro-icon">${icon(l.icon)}</div><div class="eyebrow">المستوى ${fmt(l.id)} · ${l.short}</div><h1>${l.title}</h1><p>${l.intro}</p><div class="topics">${l.topics.map(t => `<span class="pill">${t}</span>`).join('')}</div><div class="brief-rules"><span>${icon('file')} ٨ مهمات متنوعة</span><span>${icon('star')} النجاح: ٦ من ٨</span><span>${icon(progress.timed ? 'clock' : 'book')} ${progress.timed ? 'تحدّي الوقت مفعّل' : 'خُد وقتك في التفكير'}</span></div><p class="section-sub">بعد كل إجابة هتشوف تفسيرها ومرجع القاعدة.<br>إعادة المستوى بتراجع نفس مهماته لتحسين نتيجتك.<br>استوفي المستوى وافتح وسام «${l.badge}».</p><div class="intro-buttons">${button('begin','يلا نبدأ','primary',`data-level="${l.id}"`,'arrow')}${button('home','ارجع للمسار','secondary')}</div></section>`;
    goTop(); focusHeading();
  }
  function start(kind, level = null, confirmed = false, replayIds = null) {
    if (progress.active && !confirmed) { pendingStart = { kind, level, replayIds }; showPanel('عندك جولة محفوظة',`<p class="dialog-lead">تقدر تكمل الجولة الحالية من مكانك، أو تبدأ جولة جديدة. نتائج المستويات المكتملة هتفضل محفوظة.</p><div class="dialog-actions">${button('resume-dialog','كمّل الجولة الحالية','primary','','arrow')}${button('confirm-start','ابدأ جولة جديدة','secondary')}</div>`); return; }
    let questions, quickSelection = null;
    if (kind === 'level') { if (!C.accessible(progress,level)) return; questions = D.questions.filter(q => q.level === level); }
    else if (kind === 'review') { questions = D.questions.filter(q => (replayIds || progress.mistakes).includes(q.id)); if (!questions.length) { toast('كل أخطائك اتراجعت. جرّب جولة جديدة.'); return; } }
    else { quickSelection = C.pickQuick(progress,D.questions); questions = quickSelection.questions; }
    progress.active = C.newRun(questions,level,kind,progress.timed);
    progress.active.restarted = quickSelection?.restarted === true;
    C.rememberQuestions(progress,progress.active.ids);
    save(); resultRun = null; renderQuestion(); goTop(); focusHeading();
  }
  function renderQuestion(focusFeedback = false) {
    stopTimer(); view = 'game'; const r = progress.active; if (!r) { home(); return; }
    const q = qmap.get(r.ids[r.index]), l = levelOf(q.level), a = r.answers[r.index];
    if (r.remaining === null) r.remaining = q.type === 'calc' ? 90 : q.type === 'case' ? 75 : 45;
    const currentScore = C.summary(r).score;
    const name = r.kind === 'level' ? levelOf(r.level).title : r.kind === 'review' ? 'جولة مراجعة الأخطاء' : 'جولة سريعة';
    const cycleNote = r.kind !== 'quick' ? '' : r.restarted ? 'بداية دورة مراجعة جديدة؛ كل أسئلة البنك اتحددت في جولاتك السابقة.' : r.ids.length < 8 ? `الجولة فيها آخر ${fmt(r.ids.length)} مهمات متبقية في الدورة، علشان ما نكررش سؤال قبل اكتمالها.` : '';
    const caseView = q.type === 'case' || q.type === 'calc';
    const facts = q.facts.length ? `<dl class="case-facts">${q.facts.map(f => `<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join('')}</dl>` : '';
    const answers = q.type === 'calc' ? `<div class="answer-label"><label for="numeric-answer">إجابتك بالجنيه</label><span>الأرقام العربية والإنجليزية مقبولة</span></div><div class="number-field"><span class="unit">${q.unit}</span><input id="numeric-answer" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="اكتب الرقم هنا" value="${esc(r.input)}" ${r.resolved ? 'disabled' : ''} aria-describedby="input-error"></div><p class="input-error" id="input-error" role="status"></p>` : `<div class="answer-label"><span>${r.resolved ? 'الإجابة الصحيحة موضحة باللون الأخضر' : 'اختار قرارك، وبعدين ثبّت الإجابة'}</span><span>${r.resolved ? '' : 'اختيار واحد'}</span></div><div class="answer-grid">${r.orders[q.id].map((value,i) => `<button class="answer-option ${r.selection === value ? 'selected' : ''} ${r.resolved && value === q.answer ? 'right' : r.resolved && r.selection === value ? 'wrong' : ''}" data-action="choose" data-choice="${value}" aria-pressed="${r.selection === value}" ${r.resolved ? 'disabled' : ''}><span class="option-number">${r.resolved && value === q.answer ? '✓' : r.resolved && r.selection === value ? '×' : fmt(i+1)}</span><span>${esc(q.choices[value])}</span></button>`).join('')}</div>`;
    const usedHint = r.hints.includes(q.id);
    screen.innerHTML = `<div class="game-wrap"><div class="breadcrumbs">${button('home','المسار','subtle-button','','home')}${icon('arrow')}<span>${esc(name)}</span></div><div class="game-heading"><div><div class="game-type">${icon(q.type === 'calc' ? 'calculator' : q.type === 'case' ? 'file' : 'question')}${q.type === 'calc' ? 'مهمة حساب' : q.type === 'case' ? 'موقف عملي' : 'سؤال سريع'} · ${esc(l.short)}</div><h1>${esc(q.title)}</h1></div><div class="run-stats"><span class="run-points">${icon('star')} ${fmt(currentScore)} نقطة</span>${r.timed ? `<span id="timer" class="timer" aria-label="الوقت المتبقي">${icon('clock')}<span>${Math.ceil(r.remaining)}</span></span>` : ''}</div></div><div class="progress-track"><div class="run-progress" role="progressbar" aria-label="تقدم الجولة" aria-valuemin="0" aria-valuemax="${r.ids.length}" aria-valuenow="${r.index + (r.resolved ? 1 : 0)}"><span style="width:${(r.index+(r.resolved?1:0))/r.ids.length*100}%"></span></div><span class="question-count">مهمة ${fmt(r.index+1)} من ${fmt(r.ids.length)}</span></div>
      ${cycleNote ? `<p class="note">${cycleNote}</p>` : ''}${caseView ? `<article class="case-file"><div class="case-file-header"><span>${icon('file')} ملف تدريب · بيانات افتراضية</span><b>CASE / ${String(r.index+1).padStart(2,'0')}</b></div><div class="case-file-content"><h2>اقرأ التفاصيل… قبل القرار</h2><p>${esc(q.prompt)}</p>${facts}</div></article>` : `<section class="question-block"><h2>اختبر فهمك</h2><p>${esc(q.prompt)}</p></section>`}${answers}
      ${q.source === 'rates' ? '<p class="assumptions">فروض الحالة: قطاع خاص، شهر كامل، خارج التأمين الصحي الشامل، ونسب معتادة دون تخفيضات أو إعفاءات.</p>' : ''}
      ${!r.resolved ? `<div class="game-actions">${button('hint',usedHint ? 'التلميح ظاهر' : 'تلميح · −٢٥ نقطة','hint-button',usedHint ? 'disabled' : '','bulb')}${button('submit','ثبّت الإجابة','primary','','check')}</div>${usedHint ? `<div class="hint-box">${icon('bulb')} ${esc(q.hint)}</div>` : ''}` : `<section class="feedback ${a.correct ? '' : 'incorrect'}" aria-labelledby="feedback-title"><div class="feedback-heading">${icon(a.correct ? 'check' : 'warning')}<h2 id="feedback-title">${a.timeout ? 'انتهى الوقت… نراجع الإجابة' : a.correct ? 'قرار موفق!' : 'نراجع النقطة دي مع بعض'}</h2></div><strong class="correct-answer">الإجابة: ${esc(answerText(q))}</strong><p>${esc(q.explanation)}</p>${q.formula ? `<div class="formula">${esc(q.formula)}</div>` : ''}${sourceLinks(q)}<div class="next-action">${button('next',r.index === r.ids.length-1 ? 'شوف نتيجة الجولة' : 'المهمة التالية','primary','','arrow')}</div></section>`}</div>`;
    save();
    if (r.timed && !r.resolved) startTimer();
    if (focusFeedback) { focusHeading('#feedback-title'); screen.querySelector('.feedback')?.scrollIntoView({behavior:'smooth',block:'nearest'}); }
  }
  function choose(value) {
    const r = progress.active; if (view !== 'game' || !r || r.resolved) return;
    const q = qmap.get(r.ids[r.index]); if (!q.choices || !Number.isInteger(value) || value < 0 || value >= q.choices.length) return;
    r.selection = value; save();
    screen.querySelectorAll('.answer-option').forEach(el => { const selected = Number(el.dataset.choice) === value; el.classList.toggle('selected',selected); el.setAttribute('aria-pressed',String(selected)); });
  }
  function submit(timeout = false) {
    const r = progress.active; if (view !== 'game' || !r || r.resolved) return;
    const q = qmap.get(r.ids[r.index]); let value;
    if (q.type === 'calc') { const input = $('numeric-answer'); r.input = input ? input.value : r.input; value = C.number(r.input); if (!timeout && value === null) { $('input-error').textContent = 'اكتب رقمًا صحيحًا علشان تثبّت الإجابة.'; input?.focus(); return; } }
    else { value = r.selection; if (!timeout && !Number.isInteger(value)) { toast('اختار إجابة الأول.'); return; } }
    stopTimer(); const right = !timeout && C.correct(q,value);
    r.answers.push({id:q.id,value,correct:right,hint:r.hints.includes(q.id),timeout}); r.resolved = true;
    if (!progress.seen.includes(q.id)) progress.seen.push(q.id);
    if (right) progress.mistakes = progress.mistakes.filter(id => id !== q.id);
    else if (!progress.mistakes.includes(q.id)) progress.mistakes.push(q.id);
    save(); renderQuestion(true);
  }
  function startTimer() {
    lastTick = Date.now();
    timer = setInterval(() => {
      const r = progress.active, now = Date.now();
      if (!r || r.resolved || view !== 'game') { stopTimer(); return; }
      if (document.hidden || panel.open) { lastTick = now; return; }
      r.remaining = Math.max(0,r.remaining-(now-lastTick)/1000); lastTick = now;
      const display = $('timer'); if (display) { const value = display.querySelector('span'); if (value) value.textContent = Math.ceil(r.remaining); display.classList.toggle('urgent',r.remaining <= 10); }
      save(); if (r.remaining <= 0) submit(true);
    },250);
  }
  function next() {
    const r = progress.active; if (!r || !r.resolved) return;
    if (r.index >= r.ids.length-1) { resultRun = JSON.parse(JSON.stringify(r)); C.record(progress,r); save(); renderResult(); }
    else { r.index++; r.input = ''; r.selection = null; r.resolved = false; r.remaining = null; save(); renderQuestion(); goTop(); focusHeading(); }
  }
  function renderResult() {
    stopTimer(); view = 'result'; const r = resultRun; if (!r) { home(); return; }
    const s = C.summary(r), l = r.kind === 'level' ? levelOf(r.level) : null, passed = s.stars > 0;
    const confetti = passed ? `<div class="confetti" aria-hidden="true">${Array.from({length:23},(_,i) => `<i style="left:${(i*37)%100}%;animation-delay:${i%5*.15}s"></i>`).join('')}</div>` : '';
    const title = s.right === s.total ? 'ملفك سليم… شغل ممتاز!' : passed ? l ? 'المستوى اتقفل صح!' : 'جولة موفقة!' : 'نراجع… ونرجع أقوى';
    const copy = l ? passed ? `اجتزت «${l.title}». ${l.id < 5 ? progress.mode === 'free' && !C.accessible({...progress,mode:'path'},l.id+1) ? 'تقدر تكمّل التدريب الحر أو ترجع للمستويات السابقة.' : 'المستوى التالي في انتظارك.' : 'أنهيت التحدّي النهائي. ارجع لأي مستوى علشان تحسّن نقاطك.'}` : 'للنجاح تحتاج ٦ إجابات صحيحة من ٨. راجع التفسيرات وجرّب مرة تانية؛ أعلى نتيجة هتفضل محفوظة.' : 'الجولة دي للتدريب والمراجعة. التقدم في المستويات يُحسب من جولات المستويات نفسها.';
    screen.innerHTML = `<div class="result"><div class="breadcrumbs">${button('home','المسار','subtle-button','','home')}${icon('arrow')}<span>نتيجة الجولة</span></div><section class="result-hero">${confetti}<div class="result-medal">${icon(passed ? 'trophy' : 'book')}</div>${starHTML(s.stars)}<h1>${title}</h1><p>${copy}</p>${l && passed ? `<span class="badge-earned">${icon('medal')} وسام ${l.badge}</span>` : ''}</section><section class="result-stats" aria-label="إحصاءات الجولة"><div class="stat"><strong>${fmt(s.right)} / ${fmt(s.total)}</strong><span>إجابات صحيحة</span></div><div class="stat"><strong>${fmt(s.score)}</strong><span>نقطة في الجولة</span></div><div class="stat"><strong>${fmt(s.bestCombo)}</strong><span>أطول سلسلة صحيحة</span></div></section><div class="result-buttons">${l && passed && l.id < 5 ? button('intro','المستوى التالي','primary',`data-level="${l.id+1}"`,'arrow') : button('retry',r.kind === 'quick' ? 'جولة سريعة جديدة' : 'جرّب الجولة تاني','primary','','replay')}${progress.mistakes.length ? button('review','راجع أخطاءك','secondary','','book') : ''}${l && passed && l.id < 5 ? button('retry','حسّن نتيجتك','secondary','','replay') : ''}${button('home','ارجع للمسار','secondary','','home')}</div><div class="review-title"><h2>قراراتك في الجولة</h2><span>افتح أي مهمة وراجع تفسيرها</span></div>${r.answers.map(a => { const q = qmap.get(a.id); return `<details class="review-row ${a.correct ? '' : 'missed'}"><summary><span>${icon(a.correct ? 'check' : 'warning')}${esc(q.title)}</span><span class="review-state">${a.correct ? 'صحيحة' : a.timeout ? 'انتهى الوقت' : 'تحتاج مراجعة'} ＋</span></summary><div class="review-detail"><p>${esc(q.prompt)}</p><p><strong>الإجابة الصحيحة: ${esc(answerText(q))}</strong></p><p>${esc(q.explanation)}</p>${q.formula ? `<div class="formula">${esc(q.formula)}</div>` : ''}${sourceLinks(q)}</div></details>`; }).join('')}</div>`;
    if (C.achievement(progress).eligible) screen.querySelector('.result-buttons').insertAdjacentHTML('afterbegin',button('certificate','استلم شهادة إنجازك','primary','','medal'));
    goTop(); focusHeading();
  }
  function certificateID() {
    const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789', bytes=new Uint8Array(8);
    if(window.crypto?.getRandomValues)window.crypto.getRandomValues(bytes);else for(let i=0;i<bytes.length;i++)bytes[i]=Math.floor(Math.random()*256);
    const year=new Intl.DateTimeFormat('en',{year:'numeric',timeZone:'Africa/Cairo'}).format(Date.now());
    return 'MTA-'+year+'-'+Array.from(bytes,b=>alphabet[b%alphabet.length]).join('');
  }
  function issueCertificate() {
    if (!C.achievement(progress).eligible) return null;
    const input=$('certificate-name'), name=C.certificateName(input?.value || progress.certificate?.name || '');
    if(!name){if($('certificate-error'))$('certificate-error').textContent='اكتب اسمًا من ٣ إلى ٨٠ حرفًا، زي ما تحب يظهر على الشهادة.';input?.focus();return null;}
    const certificate=C.issueCertificate(progress,name,progress.certificate?.id || certificateID(),Date.now());
    if(certificate)save();return certificate;
  }
  function renderCertificate(moveToTop = true) {
    stopTimer();view='certificate';const report=C.achievement(progress);
    if(progress.certificate && (progress.certificate.right !== report.right || progress.certificate.score !== report.score)){C.issueCertificate(progress,progress.certificate.name,progress.certificate.id,Date.now());save();}
    const certificate=progress.certificate, sample=!certificate;
    screen.innerHTML=`<section class="certificate-page"><div class="breadcrumbs">${button('home','المسار','subtle-button','','home')}${icon('arrow')}<span>شهادة الإنجاز</span></div><div class="certificate-page-heading"><div class="eyebrow">إنجاز يستحق التقدير</div><h1>${certificate ? 'شهادتك جاهزة باسمك' : report.eligible ? 'أتممت المسار… استلم شهادتك' : 'شهادتك في نهاية المسار'}</h1><p>${report.eligible ? 'الشهادة تعتمد على أفضل نتيجة محفوظة لكل مستوى، وتفضل متاحة من الصفحة الرئيسية.' : 'اجتز المستويات الخمسة بـ٦ إجابات صحيحة على الأقل في كل مستوى. تقدر تشوف التصميم من دلوقتي.'}</p></div>
      ${report.eligible ? `<div class="certificate-form"><label for="certificate-name">اسم صاحب الشهادة</label><div class="certificate-name-row"><input id="certificate-name" type="text" autocomplete="name" maxlength="80" placeholder="اكتب اسمك زي ما تحب يظهر على الشهادة" value="${esc(certificate?.name || '')}" aria-describedby="certificate-error">${button('certificate-issue',certificate ? 'حدّث الشهادة' : 'إصدار الشهادة','primary','','medal')}</div><p id="certificate-error" class="input-error" role="status"></p></div>` : `<div class="certificate-locked"><div>${icon('lock')} تم اجتياز ${fmt(report.completed)} من ٥ مستويات</div>${button('intro','كمّل مسارك','primary',`data-level="${C.nextLevel(progress,D.levels).id}"`,'arrow')}</div>`}
      <div class="certificate-preview ${sample ? 'sample' : ''}" id="achievement-certificate">${X.renderSVG(certificate || {},{sample})}</div>
      <div class="certificate-file-actions">${button('certificate-export','تحميل PDF','primary',`data-format="pdf" ${certificate && !certificateBusy ? '' : 'disabled'}`,'download')}${button('certificate-export','تحميل صورة','secondary',`data-format="png" ${certificate && !certificateBusy ? '' : 'disabled'}`,'download')}${button('certificate-print','طباعة الشهادة','secondary',certificate && !certificateBusy ? '' : 'disabled','print')}</div><p class="certificate-caption">${certificate ? 'شهادة إنجاز تعليمية من مرجعك القانوني · الاسم والشهادة محفوظان على نفس الجهاز.' : report.eligible ? 'اكتب اسمك واضغط «إصدار الشهادة» لعرض بيانات إنجازك وإتاحة التحميل.' : 'ده نموذج للمعاينة؛ التحميل والإصدار يتاحان بعد اجتياز المسار.'}</p>${certificateBusy ? '<p class="certificate-export-status" role="status">جاري تجهيز ملف الشهادة…</p>' : ''}</section>`;
    if(moveToTop){goTop();focusHeading();}
  }
  async function exportCertificate(type) {
    if(certificateBusy || view!=='certificate')return;
    const certificate=issueCertificate();if(!certificate)return;
    certificateBusy=true;renderCertificate(false);
    try { await X.exportCertificate(certificate,type==='png'?'png':'pdf');toast(type==='png'?'تم تجهيز صورة الشهادة.':'تم تجهيز ملف PDF للشهادة.'); }
    catch { toast('تعذّر تحميل الملف هنا. تقدر تستخدم طباعة الشهادة أو تفتح اللعبة في المتصفح.'); }
    finally { certificateBusy=false;if(view==='certificate')renderCertificate(false); }
  }
  function printCertificate() {
    if(view!=='certificate' || certificateBusy || !issueCertificate())return;
    renderCertificate(false);
    if(typeof window.print!=='function'){toast('افتح اللعبة في متصفح يدعم الطباعة، أو استخدم تحميل PDF.');return;}
    document.body.classList.add('print-certificate');window.print();
  }
  function help() { showPanel('إزاي تلعب مغامرة التأمينات؟', `<p class="dialog-lead">أنت مسؤول التأمينات. كل مستوى فيه ملفات وقرارات وحسابات؛ اقرأ التفاصيل قبل ما تختار.</p><ol class="help-list"><li><strong>اختار وضعك:</strong> المسار المهني يفتح المستويات بالتدريج. التدريب الحر يتيح لك أي مستوى.</li><li><strong>اقرأ وجاوب:</strong> اختار إجابة واحدة أو اكتب ناتج الحساب، ثم اضغط «ثبّت الإجابة».</li><li><strong>اتعلم من القرار:</strong> بعد كل إجابة يظهر التفسير ورابط المرجع. الأخطاء تتجمع في جولة مراجعة.</li><li><strong>اكسب النقاط:</strong> 100 نقطة للإجابة الصحيحة، ومكافأة سلسلة تصل إلى 40 نقطة إضافية. التلميح يقلل نقاط الإجابة 25 نقطة.</li><li><strong>افتح المستوى التالي:</strong> 6 من 8 = نجمة؛ 7 = نجمتان؛ 8 = ثلاث نجوم. التلميح يؤثر على النقاط فقط.</li><li><strong>أسئلة من غير تكرار:</strong> الجولة السريعة تختار من المهمات اللي لسه ما اتحددتش في جولاتك. لو المتبقي أقل من ٨، الجولة تستخدم المتبقي فقط. بعد اكتمال البنك تبدأ دورة مراجعة جديدة. إعادة المستوى ومراجعة الأخطاء ترجع للمهمات نفسها للتدريب.</li><li><strong>كمّل وقت ما تحب:</strong> الجولة والتقدم يُحفظان على نفس الجهاز والمتصفح. تحدّي الوقت اختياري، ويتوقف عندما تخفي الصفحة أو تفتح نافذة المساعدة.</li></ol><div class="note">الحالات ببيانات افتراضية. موضوعات النسخة مركزة على العاملين بالقطاع الخاص. فروض الحسابات موضحة مع كل حالة، ومرجع القواعد متاح للمراجعة.</div><p class="section-sub">على الكمبيوتر: أزرار 1–4 لاختيار إجابة. داخل خانة الحساب: Enter لتثبيت الإجابة.</p>`); }
  function sources() { showPanel('مرجع القواعد · نسخة 2026', `<p class="dialog-lead">القواعد اللي مبنية عليها المهمات، مع روابط الهيئة القومية للتأمين الاجتماعي. تمت مراجعة المصادر في ٩ أكتوبر ٢٠٢٦.</p><div class="reference-grid"><div class="reference-item"><strong>2,700</strong><span>الحد الأدنى لأجر الاشتراك</span></div><div class="reference-item"><strong>16,700</strong><span>الحد الأقصى لأجر الاشتراك</span></div><div class="reference-item"><strong>11%</strong><span>حصة العامل في فروض الحسابات</span></div><div class="reference-item"><strong>18.75%</strong><span>حصة الشركة في فروض الحسابات</span></div></div><div class="note">الحسابات هنا لشهر كامل بالقطاع الخاص، خاضع للفروع المعتادة بقانون 148، خارج التأمين الصحي الشامل ودون تخفيضات أو إعفاءات. الحالات الخاصة تحتاج تحديد نظامها قبل الحساب. الحد الأدنى لأجر الاشتراك مختلف عن الحد الأدنى للأجور.</div>${Object.entries(D.sources).filter(([k]) => k !== 'practice').map(([,s]) => `<article class="source-card"><h3>${esc(s.title)}</h3><p>${esc(s.note)}</p><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">افتح المصدر الرسمي ↗</a></article>`).join('')}<div class="note">أسئلة مطابقة البيانات وتوثيق المراجعة هي تطبيقات مهنية. لا تضيف مواعيد قانونية أو قواعد تشريعية مستقلة.</div>`); }
  function badges() { showPanel('أوسمتك في التأمينات', `<p class="dialog-lead">كل مستوى تجتازه يضيف وسامًا جديدًا لسجل خبرتك.</p>${D.levels.map(l => `<article class="source-card"><h3>${icon(l.icon)} ${l.badge}</h3><p>${l.title} · ${progress.best[l.id]?.stars > 0 ? 'تم الحصول عليه ' + '★'.repeat(progress.best[l.id].stars) : 'اجتز المستوى بـ6 إجابات صحيحة على الأقل'}</p></article>`).join('')}`); }
  document.addEventListener('click', event => {
    const target = event.target.closest('button[data-action]'); if (!target || target.disabled) return;
    const action = target.dataset.action;
    if (action === 'home') { home(); focusHeading(); }
    else if (action === 'help') help();
    else if (action === 'sources') sources();
    else if (action === 'badges') badges();
    else if (action === 'certificate') renderCertificate();
    else if (action === 'certificate-issue') { if(issueCertificate())renderCertificate(false); }
    else if (action === 'certificate-export') exportCertificate(target.dataset.format);
    else if (action === 'certificate-print') printCertificate();
    else if (action === 'close-panel') closePanel();
    else if (action === 'intro') intro(Number(target.dataset.level));
    else if (action === 'mode') { progress.mode = target.dataset.mode === 'free' ? 'free' : 'path'; save(); home(); }
    else if (action === 'begin') start('level',Number(target.dataset.level));
    else if (action === 'quick') start('quick');
    else if (action === 'review') start('review');
    else if (action === 'resume') { renderQuestion(); goTop(); focusHeading(); }
    else if (action === 'resume-dialog') { closePanel(); pendingStart = null; renderQuestion(); goTop(); focusHeading(); }
    else if (action === 'confirm-start' && pendingStart) { const p = pendingStart; pendingStart = null; closePanel(); start(p.kind,p.level,true,p.replayIds); }
    else if (action === 'choose') choose(Number(target.dataset.choice));
    else if (action === 'submit') submit();
    else if (action === 'hint') { const r = progress.active; if (!r || r.resolved) return; const id = r.ids[r.index]; if (!r.hints.includes(id)) { r.hints.push(id); save(); renderQuestion(); } }
    else if (action === 'next') next();
    else if (action === 'retry' && resultRun) start(resultRun.kind,resultRun.level,false,resultRun.kind === 'review' ? resultRun.ids : null);
    else if (action === 'reset') showPanel('بداية جديدة؟', `<p class="dialog-lead">ده هيمسح تقدم اللعبة والجولة الحالية على الجهاز ده، وتبدأ المستويات من الأول.</p><div class="dialog-actions">${button('close-panel','خلّي تقدمي','primary')}${button('confirm-reset','ابدأ من الأول','secondary danger')}</div>`);
    else if (action === 'confirm-reset') { stopTimer(); progress = C.fresh(); resultRun = null; pendingStart = null; save(); closePanel(); home(); toast('جاهز لبداية جديدة.'); }
  });
  document.addEventListener('change', event => { if (event.target.id === 'timed-setting') { progress.timed = event.target.checked; save(); home(); } });
  document.addEventListener('input', event => { if (event.target.id === 'numeric-answer' && progress.active && !progress.active.resolved) { progress.active.input = event.target.value; save(); if ($('input-error')) $('input-error').textContent = ''; } else if(event.target.id==='certificate-name' && $('certificate-error'))$('certificate-error').textContent=''; });
  document.addEventListener('keydown', event => {
    if(!panel.open && view==='certificate' && event.target.id==='certificate-name' && event.key==='Enter'){event.preventDefault();if(issueCertificate())renderCertificate(false);return;}
    if (panel.open || view !== 'game' || !progress.active) return;
    const input = event.target.tagName === 'INPUT', r = progress.active, q = qmap.get(r.ids[r.index]);
    if (input && event.key === 'Enter' && !r.resolved) { event.preventDefault(); submit(); }
    else if (!input && !event.ctrlKey && !event.metaKey && !event.altKey && /^[1-4]$/.test(event.key) && !r.resolved && q.choices) { event.preventDefault(); const index = Number(event.key)-1; if (index < r.orders[q.id].length) choose(r.orders[q.id][index]); }
  });
  document.addEventListener('visibilitychange', () => { lastTick = Date.now(); save(); });
  window.addEventListener('pagehide', save);
  window.addEventListener('afterprint',()=>document.body.classList.remove('print-certificate'));
  panel.addEventListener('close', () => { lastTick = Date.now(); });
  panel.addEventListener('click', event => { if (event.target === panel) { const box = panel.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closePanel(); } });
  home();
})();
