const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('./engine.js');
const base={kind:'early',birth:'1971-11-01',event:'2026-11-01',retirementAge:60,ageConfirmed:true,minWage:2700,maxWage:16700,preMonths:240,prePension:3000,preWage:7000,wageMode:'ready',postMonths:82,settlement:10000,lastSettlement:10000,ended:true,notInsured:true,applied:true,dues:true};
const calc=x=>E.estimate({...base,...x});
test('official table coefficients, six retirement ages and floor age',()=>{
  assert.equal(E.coefficient(54,60,'early'),63.4);
  assert.equal(E.coefficient(52,62,'early'),84.9);
  assert.equal(E.coefficient(58,65,'early'),69.2);
  assert.equal(E.coefficient(35,65,'early'),150);
  for(let a=60;a<=65;a++) assert.equal(E.coefficient(40,a,'disability'),45);
  assert.throws(()=>E.coefficient(60,60,'early'));
});
test('early pension fails monetary condition despite 300+ actual months',()=>{
  const r=calc({}); assert.equal(r.months,322);assert.equal(r.factor,60);
  assert.ok(Math.abs(r.amount-4138.88888889)<1e-7);assert.equal(r.eligible,false);
  assert.equal(r.checks.find(c=>c.label.includes('٥٠٪')).ok,false);
});
test('early pension passes once all financial and procedural conditions hold',()=>{
  const r=calc({prePension:4500});assert.equal(r.eligible,true);
  assert.equal(calc({prePension:4500,notInsured:false}).eligible,false);
});
test('300 actual months boundary and strict pre-2020 duration validation',()=>{
  assert.equal(calc({prePension:5000,preMonths:218}).checks[1].ok,true);
  assert.equal(calc({prePension:5000,preMonths:217}).checks[1].ok,false);
  assert.throws(()=>calc({preMonths:900}),/مدة ما قبل/);
});
test('minimum for normal pension and actual service requirement are separate',()=>{
  const r=calc({kind:'normal',birth:'1966-11-01',preMonths:0,postMonths:12,settlement:2700});
  assert.equal(r.amount,1755);assert.equal(r.eligible,false);
});
test('disability/death 65% settlement floor applies during/within year, not after',()=>{
  const d={kind:'disability',birth:'1980-11-01',cause:'natural',disabilityType:'total',medical:true,timing:'during',preMonths:0,postMonths:6,settlement:10000};
  assert.equal(calc(d).amount,6500);assert.equal(calc(d).eligible,true);
  const after=calc({...d,timing:'after',endDate:'2024-01-01',noLump:true});
  assert.equal(after.amount,1755);assert.equal(after.eligible,false);
  const within=calc({...d,timing:'within',endDate:'2026-05-01',noLump:true});assert.equal(within.amount,6500);
});
test('partial natural disability needs alternative job decision and during service',()=>{
  const d={kind:'disability',cause:'natural',disabilityType:'partial',medical:true,timing:'during',noAlternative:true};
  assert.equal(calc(d).eligible,true);assert.equal(calc({...d,noAlternative:false}).eligible,false);
  assert.equal(calc({...d,timing:'after',endDate:'2024-01-01',postMonths:48,noLump:true}).eligible,false);
});
test('work injury 34.99% is lump sum, 35% becomes monthly; death 80%',()=>{
  const d={kind:'disability',cause:'injury',disabilityType:'partial',medical:true,injuryApproved:true,disabilityRate:30};
  assert.equal(calc(d).payment,'lump');assert.equal(calc(d).amount,115200);
  const monthly=calc({...d,disabilityRate:35});assert.equal(monthly.payment,'monthly');assert.equal(monthly.amount,2800);
  assert.equal(calc({...d,kind:'death'}).amount,8000);
});
test('weighted wage average and simple inflation improvement with complete years',()=>{
  const r=calc({kind:'normal',birth:'1966-11-01',preMonths:180,wageMode:'periods',rows:[{from:'2020-01',to:'2020-12',wage:4000},{from:'2021-01',to:'2021-06',wage:6000}],inflation:10});
  assert.equal(r.total,84000);assert.equal(r.postMonths,18);assert.ok(Math.abs(r.settlement-5133.333333333)<1e-6);
  assert.throws(()=>calc({wageMode:'periods',rows:[{from:'2020-01',to:'2020-12',wage:4000},{from:'2020-12',to:'2021-06',wage:6000}],inflation:10}),/متداخلة/);
});
test('reject missing input, impossible dates/months, negative values and excess settlement',()=>{
  assert.throws(()=>calc({event:'2026-02-30'}));assert.throws(()=>calc({postMonths:84}),/الزمنية/);
  assert.throws(()=>calc({settlement:''}));assert.throws(()=>calc({settlement:20000}));
  assert.throws(()=>calc({prePension:-1}));assert.throws(()=>calc({postMonths:1.5}));
  assert.throws(()=>calc({wageMode:'periods',rows:[],inflation:10}));
});
test('caps are applied and year-dependent duration transitions are observed',()=>{
  const r=calc({kind:'normal',birth:'1966-11-01',preMonths:420,preWage:16700,prePension:13360});assert.equal(r.amount,13360);
  const d={event:'2024-12-01',minWage:2000,maxWage:12600,postMonths:60,preMonths:180,prePension:5000};
  assert.equal(calc(d).checks[1].ok,true);
  assert.equal(calc({...d,event:'2025-01-01',postMonths:61,minWage:2300,maxWage:14500}).checks[1].ok,false);
});
