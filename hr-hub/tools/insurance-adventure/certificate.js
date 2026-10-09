(function (root) {
  'use strict';
  const WIDTH = 1123, HEIGHT = 794;
  const font = 'Tahoma, Arial, DejaVu Sans, sans-serif';
  const escape = value => String(value ?? '').replace(/[&<>"']/g,c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const format = n => new Intl.NumberFormat('ar-EG').format(n);
  function nameLayout(name, measure) {
    const estimated = text => Array.from(text).reduce((sum,c) => sum + (/\s/.test(c) ? .34 : /[WMwm@]/.test(c) ? 1.08 : /[\u0600-\u06ff]/.test(c) ? 1.02 : .72),0) * 52;
    const width = text => measure ? measure(text,52) : estimated(text);
    let lines = [name];
    if (width(name) > 930) {
      const chars = Array.from(name), spaces = chars.map((c,i) => c === ' ' ? i : -1).filter(i => i > 0);
      let split = Math.ceil(chars.length / 2), best = Infinity;
      for (const at of spaces) { const largest = Math.max(width(chars.slice(0,at).join('')),width(chars.slice(at+1).join(''))); if (largest < best) { best=largest;split=at; } }
      if (best === Infinity || best > 2000) split = Math.ceil(chars.length / 2);
      lines = [chars.slice(0,split).join('').trim(),chars.slice(split).join('').trim()];
    }
    const widest = Math.max(...lines.map(width));
    const size = Math.min(52,Math.floor(930 / Math.max(1,widest) * 52));
    return { lines, size: Math.max(18,size) };
  }
  function renderSVG(certificate, options = {}) {
    const sample = !!options.sample;
    const name = sample ? 'اسم اللاعب' : certificate.name;
    const layout = nameLayout(name,options.measure);
    const date = sample ? 'بعد اجتياز المسار' : new Intl.DateTimeFormat('ar-EG',{day:'numeric',month:'long',year:'numeric',timeZone:'Africa/Cairo'}).format(certificate.completedAt);
    const percent = sample ? '—' : format(certificate.percent) + '٪';
    const right = sample ? '— / ٤٠' : format(certificate.right) + ' / ٤٠';
    const score = sample ? '—' : format(certificate.score);
    const id = sample ? 'نموذج للمعاينة' : certificate.id;
    const text = (x,y,value,size=18,color='#253247',extra='') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="middle" direction="rtl" unicode-bidi="plaintext" ${extra}>${escape(value)}</text>`;
    const leaves = Array.from({length:6},(_,i) => `<ellipse cx="${502-i*3}" cy="${100+i*8}" rx="4" ry="9" transform="rotate(${-42+i*3} ${502-i*3} ${100+i*8})"/><ellipse cx="${621+i*3}" cy="${100+i*8}" rx="4" ry="9" transform="rotate(${42-i*3} ${621+i*3} ${100+i*8})"/>`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="certificate-title certificate-description"><title id="certificate-title">شهادة إنجاز ${escape(name)}</title><desc id="certificate-description">${sample ? 'نموذج للمعاينة، وليس شهادة صادرة.' : escape('شهادة إنجاز المستويات الخمسة في مغامرة التأمينات. النتيجة '+certificate.percent+'%، '+certificate.right+' إجابة صحيحة من 40.')}</desc><defs><linearGradient id="cert-paper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffefb"/><stop offset="1" stop-color="#f8f5eb"/></linearGradient></defs><rect width="1123" height="794" fill="#102034"/><rect x="15" y="15" width="1093" height="764" fill="url(#cert-paper)"/><rect x="29" y="29" width="1065" height="736" fill="none" stroke="#c5a365" stroke-width="1.5"/><rect x="36" y="36" width="1051" height="722" fill="none" stroke="#c5a365" stroke-width=".6"/><path d="M29 112V29h83M1011 29h83v83M29 682v83h83M1011 765h83v-83" fill="none" stroke="#c5a365" stroke-width="4"/><g font-family="${font}">${text(931,86,'مرجعك القانوني',25,'#182b43','font-weight="700"')}${text(931,113,'مبادرة حازم موسى',13,'#68717d')}${text(187,86,'مغامرة التأمينات',20,'#182b43','font-weight="700"')}${text(187,113,'٥ مستويات · ٤٠ مهمة',13,'#68717d')}<g fill="#c5a365">${leaves}</g><circle cx="561.5" cy="112" r="39" fill="#14273d" stroke="#c5a365" stroke-width="2"/><path d="m561.5 89 17 7v14c0 13-17 24-17 24s-17-11-17-24V96Z" fill="none" stroke="#e6c68c" stroke-width="2"/><path d="m552 111 7 7 14-16" fill="none" stroke="#e6c68c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${text(561.5,209,'شهادة إنجاز',53,'#162a43','font-weight="700"')}<text x="561.5" y="243" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" letter-spacing="3.5" fill="#9b7c48">CERTIFICATE OF ACHIEVEMENT</text>${text(561.5,287,'تُمنح هذه الشهادة إلى',18,'#747777')}${layout.lines.map((line,i) => text(561.5,layout.lines.length===1 ? 353 : 328+i*53,line,layout.size,'#162a43','font-weight="700"')).join('')}<path d="M216 397h280m131 0h280" stroke="#c5a365" stroke-width="1"/><path d="m561.5 389 8 8-8 8-8-8Z" fill="#c5a365"/>${text(561.5,444,'لاجتيازه المستويات الخمسة في تجربة «مغامرة التأمينات» التعليمية',21,'#27384b')}${text(561.5,478,'النماذج والإجراءات · الأجور والاشتراكات · مراجعة الأخطاء',16,'#68717d')}<rect x="196" y="508" width="731" height="95" rx="10" fill="#162a4306" stroke="#c5a365" stroke-opacity=".25"/><path d="M438 524v61m247-61v61" stroke="#c5a365" stroke-opacity=".35"/>${text(807,549,percent,28,'#162a43','font-weight="700"')}${text(807,581,'نتيجة الاجتياز',12,'#68717d')}${text(561.5,549,right,27,'#162a43','font-weight="700"')}${text(561.5,581,'إجابات صحيحة',12,'#68717d')}${text(316,549,score,28,'#162a43','font-weight="700"')}${text(316,581,'نقاط المسار',12,'#68717d')}${text(561.5,628,'تُحسب النتيجة من أفضل نتيجة محفوظة لكل مستوى',11,'#868477')}${text(869,675,'حازم موسى',25,'#182b43','font-weight="700"')}<path d="M774 691h190" stroke="#c5a365" stroke-width="1"/>${text(869,719,'مؤسس مرجعك القانوني',13,'#68717d')}${text(254,674,date,18,'#182b43')}${text(254,702,'تاريخ الإنجاز',12,'#68717d')}<text x="254" y="728" text-anchor="middle" font-size="10" fill="#868477" font-family="Arial, sans-serif">${escape(id)}</text>${text(561.5,721,'إنجاز يستحق التقدير',15,'#9b7c48')}${text(561.5,742,'شهادة إنجاز لمسار تعليمي',10,'#868477')}${sample ? `<rect x="366" y="91" width="391" height="32" rx="16" fill="#fff5d8" stroke="#c5a365"/>${text(561.5,113,'نموذج للمعاينة · لم يصدر',14,'#73572d')}` : ''}</g></svg>`;
  }
  function pdfFromJPEG(jpeg, width, height) {
    if (!(jpeg instanceof Uint8Array) || !jpeg.length || !Number.isInteger(width) || !Number.isInteger(height) || width<1 || height<1) throw new Error('Invalid certificate image');
    const encoder = new TextEncoder(), parts = [], offsets = [0]; let length = 0;
    const append = value => { const bytes = typeof value === 'string' ? encoder.encode(value) : value; parts.push(bytes); length += bytes.length; };
    const object = (id,body) => { offsets[id] = length; append(`${id} 0 obj\n${body}\nendobj\n`); };
    append('%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n');
    object(1,'<< /Type /Catalog /Pages 2 0 R >>');
    object(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    object(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 841.8898 595.2756] /Resources << /XObject << /Cert 4 0 R >> >> /Contents 5 0 R >>');
    offsets[4] = length; append(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`); append(jpeg); append('\nendstream\nendobj\n');
    const stream = 'q\n841.8898 0 0 595.2756 0 0 cm\n/Cert Do\nQ\n';
    object(5,`<< /Length ${encoder.encode(stream).length} >>\nstream\n${stream}endstream`);
    object(6,'<< /Title (Insurance Mission - Achievement Certificate) /Author (Hazem Moussa - Marjaak Alqanuni) /Creator (Insurance Mission) >>');
    const xref = length; append('xref\n0 7\n0000000000 65535 f \n'); for(let i=1;i<=6;i++)append(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);
    append(`trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
    const output = new Uint8Array(length); let position=0; for(const part of parts){output.set(part,position);position+=part.length;} return output;
  }
  async function canvasFor(certificate) {
    if (document.fonts?.ready) await document.fonts.ready;
    const canvas=document.createElement('canvas');canvas.width=WIDTH*2;canvas.height=HEIGHT*2;
    const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');
    const measure=(text,size)=>{ctx.font=`700 ${size}px ${font}`;return ctx.measureText(text).width;};
    const svg=renderSVG(certificate,{measure}), blob=new Blob([svg],{type:'image/svg+xml;charset=utf-8'}), url=URL.createObjectURL(blob);
    try { const img=new Image(); await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=url;});ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);return canvas; }
    finally { URL.revokeObjectURL(url); }
  }
  function download(blob,filename) { const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000); }
  async function exportCertificate(certificate,type) {
    const canvas=await canvasFor(certificate);
    if(type==='pdf') { const jpeg=await new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('JPEG export failed')),'image/jpeg',.96));const bytes=new Uint8Array(await jpeg.arrayBuffer());download(new Blob([pdfFromJPEG(bytes,canvas.width,canvas.height)],{type:'application/pdf'}),certificate.id+'.pdf'); }
    else { const png=await new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('PNG export failed')),'image/png'));download(png,certificate.id+'.png'); }
  }
  const api={WIDTH,HEIGHT,nameLayout,renderSVG,pdfFromJPEG,exportCertificate};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.InsuranceCertificate=api;
})(typeof window!=='undefined'?window:globalThis);
