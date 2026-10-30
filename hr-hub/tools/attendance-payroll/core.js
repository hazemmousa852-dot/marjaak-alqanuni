/* Shared, deterministic attendance-to-payroll calculations. No storage or network. */
(function(root){
  'use strict';
  const round=v=>Math.round((v+Number.EPSILON)*100)/100;
  function splitOvertime(start,end,nightStart=1320,nightEnd=360){
    if(!start||!end||end<=start)return{day:0,night:0};
    let night=0,cursor=new Date(start.getFullYear(),start.getMonth(),start.getDate());
    const overlap=(a,b)=>Math.max(0,(Math.min(+end,+b)-Math.max(+start,+a))/60000);
    while(cursor<end){const midnight=+cursor,next=new Date(cursor);next.setDate(next.getDate()+1);
      if(nightStart>nightEnd){night+=overlap(new Date(midnight+nightStart*60000),next);night+=overlap(cursor,new Date(midnight+nightEnd*60000));}
      else if(nightStart<nightEnd)night+=overlap(new Date(midnight+nightStart*60000),new Date(midnight+nightEnd*60000));
      cursor=next;
    }
    const total=(end-start)/60000;return{day:Math.max(0,total-night),night};
  }
  function issue(row){
    if(row.isMissing)return'بصمة ناقصة';
    if(row.actualIn&&row.actualOut&&row.actualOut<=row.actualIn)return'ترتيب أوقات غير صحيح';
    if(row.isAbsent)return'غياب يحتاج اعتماد';
    if(row.dayType==='leave'&&row.leave?.type==='unpaid')return'إجازة بدون أجر';
    if(row.dayType==='leave'&&row.leave?.type==='sick')return'إجازة مرضية — تسوية يدوية';
    if(row.dayType==='leave'&&row.isWorkedShiftDay)return'عمل أثناء إجازة';
    if(['rest','holiday'].includes(row.dayType)&&row.isWorkedShiftDay)return'عمل راحة أو عطلة — تسوية مستقلة';
    if(row.sourcePunches>2)return'أكثر من بصمتين';
    return'';
  }
  function aggregate(rows,decisions,settings){
    let out={absence:0,late:0,early:0,day:0,night:0,rest:0,holiday:0,excluded:0};
    for(const r of rows){const reason=issue(r),d=decisions[r.id];if(reason&&(!d||!d.reason?.trim()))throw Error('راجع الحالة '+r.id);
      if(r.isMissing||(r.actualIn&&r.actualOut&&r.actualOut<=r.actualIn)){if(d?.action!=='exclude')throw Error('صحّح البصمة أو استبعد أثرها المالي');out.excluded++;continue;}
      if(reason&&d.action==='exclude'){out.excluded++;continue;}
      if(r.dayType==='rest'){out.rest+=r.workMinutes||0;continue;}
      if(r.dayType==='holiday'){out.holiday+=r.workMinutes||0;continue;}
      if(r.dayType==='leave'){if(r.leave?.type==='unpaid'&&d?.action==='include')out.absence++;continue;}
      if(r.isAbsent){if(d?.action==='include')out.absence++;continue;}
      if(!r.actualIn||!r.actualOut)continue;
      out.late+=r.lateMinutes||0;out.early+=r.earlyMinutes||0;
      const minutes=r.regularOvertimeMinutes||0;
      if(minutes>0){const end=r.actualOut,start=new Date(Math.max(+r.actualIn,+end-minutes*60000));const split=splitOvertime(start,end,settings.nightStart,settings.nightEnd);out.day+=split.day;out.night+=split.night;}
    }return out;
  }
  function calculate(p,a,s){
    const fixed=round((p.basic+p.allowance)*p.fraction),dayRate=(s.basis==='basic'?p.basic:p.basic+p.allowance)/s.days,hour=dayRate/s.hours;
    const dayPay=round(a.day/60*hour*s.dayFactor),nightPay=round(a.night/60*hour*s.nightFactor),absencePay=round(a.absence*dayRate),latePay=round(a.late/60*hour*(s.deductLate?1:0)),earlyPay=round(a.early/60*hour*(s.deductEarly?1:0));
    const gross=round(fixed+dayPay+nightPay+p.incentive+p.special),deductions=round(absencePay+latePay+earlyPay+p.insurance+p.tax+p.fund+p.loan+p.other);
    return{fixed,dayPay,nightPay,absencePay,latePay,earlyPay,gross,deductions,net:round(gross-deductions)};
  }
  const api={splitOvertime,issue,aggregate,calculate,round};root.PayrollCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
