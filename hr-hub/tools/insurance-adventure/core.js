(function (root) {
  'use strict';
  const fresh = () => ({ version: 1, best: {}, seen: [], questionCycle: [], mistakes: [], active: null, lastRun: null, mode: 'path', timed: false, completedAt: null, certificate: null });
  function number(value) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : null;
    if (typeof value !== 'string' || !value.trim()) return null;
    const s = value.trim().replace(/[٠-٩]/g, c => '٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace(/[۰-۹]/g, c => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/[٬,\s]/g, '').replace(/٫/g, '.');
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)) return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }
  function correct(q, value) { return q.type === 'calc' ? number(value) !== null && Math.abs(number(value) - q.answer) <= 0.01 : Number.isInteger(value) && value === q.answer; }
  const stars = (right, total) => !total || right / total < 0.75 ? 0 : right === total ? 3 : right / total >= 0.875 ? 2 : 1;
  function accessible(progress, level) { return progress.mode === 'free' || level === 1 || Array.from({ length: level - 1 }, (_, i) => (progress.best[i + 1]?.stars || 0) > 0).every(Boolean); }
  function nextLevel(progress, levels) { return levels.find(l => !(progress.best[l.id]?.stars > 0)) || levels[levels.length - 1]; }
  function shuffle(items, rng = Math.random) { const a = items.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function questionKey(q) { return q.prompt.normalize('NFKC').toLowerCase().replace(/[\u064b-\u065f\u0670\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/[^\p{L}\p{N}]/gu,''); }
  function uniqueQuestions(questions) {
    const ids = new Set(), prompts = new Set();
    return questions.filter(q => { const key = questionKey(q); if (ids.has(q.id) || prompts.has(key)) return false; ids.add(q.id); prompts.add(key); return true; });
  }
  function rememberQuestions(progress, ids) { progress.questionCycle = [...new Set([...(progress.questionCycle || []), ...ids])]; }
  function pickQuick(progress, questions, count = 8, rng = Math.random) {
    const bank = uniqueQuestions(questions), used = new Set(progress.questionCycle || []);
    let available = bank.filter(q => !used.has(q.id));
    const restarted = bank.length > 0 && available.length === 0;
    if (restarted) { progress.questionCycle = []; available = bank; }
    const picked = shuffle(available,rng).slice(0,count);
    rememberQuestions(progress,picked.map(q => q.id));
    return { questions: picked, restarted };
  }
  function newRun(questions, level, kind, timed) {
    const items = shuffle(uniqueQuestions(questions));
    return { kind, level, ids: items.map(q => q.id), orders: Object.fromEntries(items.map(q => [q.id, shuffle((q.choices || []).map((_, i) => i))])), index: 0, answers: [], hints: [], input: '', selection: null, resolved: false, timed: !!timed, remaining: null, started: Date.now() };
  }
  function summary(run) {
    let score = 0, combo = 0, bestCombo = 0;
    for (const a of run.answers) { if (a.correct) { combo++; score += 100 + Math.min(Math.max(combo - 1, 0), 4) * 10 - (a.hint ? 25 : 0); bestCombo = Math.max(bestCombo, combo); } else combo = 0; }
    const right = run.answers.filter(a => a.correct).length;
    return { right, total: run.ids.length, percent: Math.round(right / run.ids.length * 100), stars: stars(right, run.ids.length), score, bestCombo, kind: run.kind, level: run.level, date: Date.now() };
  }
  function record(progress, run) {
    const s = summary(run);
    if (run.kind === 'level') { const old = progress.best[run.level]; if (!old || s.right > old.right || (s.right === old.right && s.score > old.score)) progress.best[run.level] = s; }
    progress.lastRun = s; progress.active = null;
    if (achievement(progress).eligible && !progress.completedAt) progress.completedAt = s.date;
    return s;
  }
  function achievement(progress) {
    const best = Array.from({ length: 5 }, (_, i) => progress.best[i + 1]);
    const passed = b => b && b.total === 8 && Number.isInteger(b.right) && b.right >= 6 && b.right <= 8 && Number.isFinite(b.score) && b.score >= 0;
    const completed = best.filter(passed).length;
    const right = best.reduce((sum,b) => sum + (passed(b) ? b.right : 0),0);
    const score = best.reduce((sum,b) => sum + (passed(b) ? b.score : 0),0);
    const dates = best.filter(passed).map(b => b.date).filter(d => Number.isFinite(d) && d > 0);
    return { eligible: completed === 5, completed, right, total: 40, percent: Math.round(right / 40 * 100), score, completedAt: Number.isFinite(progress.completedAt) && progress.completedAt > 0 ? progress.completedAt : dates.length === 5 ? Math.max(...dates) : null };
  }
  function certificateName(value) {
    if (typeof value !== 'string') return null;
    const name = value.normalize('NFC').replace(/[\u0000-\u001f\u007f\u200b-\u200f\u202a-\u202e\u2066-\u2069]/g,'').trim().replace(/\s+/g,' ');
    return Array.from(name).length >= 3 && Array.from(name).length <= 80 && /\p{L}/u.test(name) ? name : null;
  }
  function issueCertificate(progress, name, id, now = Date.now()) {
    const report = achievement(progress), normalized = certificateName(name);
    if (!report.eligible || !normalized || !Number.isFinite(now) || now <= 0) return null;
    if (progress.certificate) id = progress.certificate.id;
    if (typeof id !== 'string' || !/^MTA-\d{4}-[A-Z0-9]{8}$/.test(id)) return null;
    progress.completedAt = report.completedAt || now;
    const certificate = { version: 1, id, name: normalized, issuedAt: progress.certificate?.issuedAt || now, updatedAt: now, completedAt: progress.completedAt, right: report.right, total: report.total, percent: report.percent, score: report.score };
    progress.certificate = certificate;
    return certificate;
  }
  function read(raw, questions) {
    const p = fresh(), ids = new Set(questions.map(q => q.id));
    let saved; try { saved = JSON.parse(raw || 'null'); } catch { return p; }
    if (!saved || saved.version !== 1) return p;
    p.mode = saved.mode === 'free' ? 'free' : 'path'; p.timed = saved.timed === true;
    p.seen = Array.isArray(saved.seen) ? [...new Set(saved.seen.filter(x => ids.has(x)))] : [];
    p.questionCycle = Array.isArray(saved.questionCycle) ? [...new Set(saved.questionCycle.filter(x => ids.has(x)))] : p.seen.slice();
    p.mistakes = Array.isArray(saved.mistakes) ? [...new Set(saved.mistakes.filter(x => ids.has(x)))] : [];
    for (let l = 1; l <= 5; l++) { const b = saved.best?.[l]; if (b && Number.isInteger(b.right) && b.right >= 0 && b.right <= 8 && b.total === 8 && Number.isFinite(b.score) && b.score >= 0) p.best[l] = { ...b, stars: stars(b.right, b.total) }; }
    if (Number.isFinite(saved.completedAt) && saved.completedAt > 0) p.completedAt = saved.completedAt;
    const report = achievement(p);
    if (report.eligible) {
      p.completedAt = report.completedAt;
      const c = saved.certificate;
      if (c?.version === 1 && certificateName(c.name) && typeof c.id === 'string' && /^MTA-\d{4}-[A-Z0-9]{8}$/.test(c.id) && Number.isFinite(c.issuedAt) && c.issuedAt > 0 && Number.isFinite(c.completedAt) && c.completedAt > 0 && c.total === 40 && Number.isInteger(c.right) && c.right >= 30 && c.right <= report.right && c.percent === Math.round(c.right / 40 * 100) && Number.isFinite(c.score) && c.score >= 0 && c.score <= report.score) p.certificate = { ...c, name: certificateName(c.name) };
    } else p.completedAt = null;
    const a = saved.active;
    if (a && ['level','quick','review'].includes(a.kind) && Array.isArray(a.ids) && a.ids.length > 0 && a.ids.length <= 40 && new Set(a.ids).size === a.ids.length && a.ids.every(id => ids.has(id)) && Number.isInteger(a.index) && a.index >= 0 && a.index < a.ids.length && Array.isArray(a.answers) && a.answers.length === a.index + (a.resolved ? 1 : 0) && Array.isArray(a.hints) && a.hints.every(id => ids.has(id)) && a.orders && a.ids.every(id => { const q = questions.find(q => q.id === id), order = a.orders[id]; return Array.isArray(order) && order.length === (q.choices || []).length && order.every((v,i,arr) => Number.isInteger(v) && v >= 0 && v < order.length && arr.indexOf(v) === i); }) && a.answers.every((v,i) => v && v.id === a.ids[i] && typeof v.correct === 'boolean') && (a.kind !== 'level' || (a.level >= 1 && a.level <= 5 && a.ids.length === 8 && a.ids.every(id => questions.find(q => q.id === id).level === a.level)))) {
      p.active = { ...a, input: typeof a.input === 'string' ? a.input : '', selection: Number.isInteger(a.selection) ? a.selection : null, timed: a.timed === true, remaining: Number.isFinite(a.remaining) ? Math.min(90, Math.max(0, a.remaining)) : null };
      rememberQuestions(p,p.active.ids);
    }
    return p;
  }
  const core = { fresh, number, correct, stars, accessible, nextLevel, shuffle, questionKey, uniqueQuestions, rememberQuestions, pickQuick, newRun, summary, record, achievement, certificateName, issueCertificate, read };
  if (typeof module !== 'undefined' && module.exports) module.exports = core;
  else root.InsuranceCore = core;
})(typeof window !== 'undefined' ? window : globalThis);
