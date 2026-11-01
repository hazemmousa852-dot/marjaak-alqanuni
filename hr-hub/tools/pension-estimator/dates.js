(function(root){
  'use strict';
  const digits=s=>String(s??'').replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632)).replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776)).replace(/\s/g,'');
  function toISO(value){
    const text=digits(value);
    let m=text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if(!m && /^\d{8}$/.test(text))m=[text,text.slice(0,2),text.slice(2,4),text.slice(4)];
    if(!m)return '';
    const iso=m[3]+'-'+m[2].padStart(2,'0')+'-'+m[1].padStart(2,'0');
    const date=new Date(iso+'T00:00:00Z');
    return Number.isFinite(+date)&&date.toISOString().slice(0,10)===iso?iso:'';
  }
  function display(iso){const m=String(iso??'').match(/^(\d{4})-(\d{2})-(\d{2})$/);return m?m[3]+'/'+m[2]+'/'+m[1]:'';}
  const api={toISO,display};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.PensionDates=api;
})(typeof window==='object'?window:globalThis);
