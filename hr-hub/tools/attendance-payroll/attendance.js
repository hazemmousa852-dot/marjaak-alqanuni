/* Hazem Moussa Attendance Hub - all processing is browser-local. */
(function () {
  "use strict";

  const I18N = {
    ar: {
      appTitle: "من البصمة للراتب", navSetup: "الإعداد والاستيراد", navDashboard: "لوحة النتائج",
      navDaily: "التقرير اليومي", navSummary: "ملخص الموظفين", localOnly: "يعمل محليًا",
      privacyText: "لا يتم رفع بيانات الموظفين إلى أي خادم.", productName: "Attendance → Payroll",
      setupTitle: "إعداد التقرير", dashboardTitle: "لوحة النتائج", dailyTitle: "التقرير اليومي",
      summaryTitle: "ملخص الموظفين", payrollTitle: "المراجعة والمرتبات", exportExcel: "تصدير الحضور فقط", localWorkspace: "مساحة عمل محلية وآمنة",
      heroTitle: "دورة شهرية واحدة: بصمة، مراجعة، ثم راتب.",
      heroText: "استورد الحضور والموظفين، راجع الاستثناءات، ثم اعتمد ترحيل النتائج لمسير رواتب بالمعادلات. المعالجة على جهازك، والتنزيل متاح بعد الاعتماد.",
      punchFileTitle: "ملف جهاز البصمة", punchFileHelp: "يدعم XLS وXLSX وCSV ويكتشف الأعمدة العربية أو الإنجليزية.",
      choosePunchFile: "اختر ملف الحركات", orDrop: "أو اسحبه إلى هنا", employeesFileTitle: "قالب الموظفين والمؤثرات",
      employeesFileHelp: "قالب واحد للموظفين وجدول الورديات والإجازات والأذونات والإجازات الرسمية.", downloadTemplate: "تنزيل القالب",
      uploadEmployees: "رفع القالب المكتمل", noFile: "لم يتم اختيار ملف", settingsTitle: "إعدادات الحساب",
      settingsHelp: "يمكن تعديل هذه القيم في كل مرة قبل إنشاء التقرير.", periodStart: "بداية الفترة", periodEnd: "نهاية الفترة",
      lateGrace: "سماح التأخير (دقيقة)", earlyGrace: "سماح الانصراف المبكر (دقيقة)",
      overtimeAfter: "بدء الإضافي بعد نهاية الوردية (دقيقة)", weekendOvertime: "عمل يوم الراحة",
      allHoursOvertime: "كل الوقت إضافي", afterShiftOnly: "بعد نهاية الوردية فقط",
      readyHint: "ارفع الملفين لإتاحة إنشاء التقرير.", ready: "الملفات جاهزة. راجع الفترة ثم أنشئ التقرير.",
      generateReport: "إنشاء التقرير", analysis: "تحليل", topLate: "أعلى الموظفين تأخيرًا",
      dataQuality: "جودة البيانات", attentionRequired: "حالات تحتاج مراجعة", details: "التفاصيل",
      dailyAttendance: "الحضور اليومي", searchEmployee: "بحث بالكود أو الاسم", allStatuses: "كل الحالات",
      absence: "غياب", missingPunch: "بصمة ناقصة", late: "تأخير", overtime: "إضافي",
      editHint: "يمكن تعديل وقت الدخول والخروج والملاحظات مباشرة من الجدول، وسيُعاد حساب الملخص تلقائيًا.",
      previous: "السابق", next: "التالي", monthlyView: "نظرة مجمعة", employeesSummary: "ملخص الموظفين",
      importedPunches: "تم استيراد {count} حركة لـ {employees} موظف.", importedEmployees: "تم استيراد {count} موظف، {shifts} فترة وردية، {leaves} إجازة، {permissions} إذن، و{holidays} إجازة رسمية.",
      invalidPunchFile: "تعذر اكتشاف الكود أو التاريخ والوقت في ملف الحركات.",
      invalidEmployeesFile: "تعذر اكتشاف الكود أو بداية ونهاية الوردية في قالب الموظفين.",
      invalidShiftSchedule: "يوجد صف غير مكتمل أو فترات ورديات متداخلة لنفس الموظف في شيت Shift_Schedule.",
      invalidPeriod: "تأكد من صحة بداية ونهاية الفترة.", reportReady: "تم إنشاء التقرير بنجاح.",
      exportDone: "تم تجهيز ملف Excel.", templateDone: "تم تنزيل قالب الموظفين.",
      totalEmployees: "الموظفون", attendanceDays: "أيام العمل الفعلية", absenceDays: "أيام الغياب",
      lateMinutes: "دقائق التأخير", overtimeMinutes: "دقائق الإضافي", missingDays: "أيام البصمة الناقصة",
      earlyMinutes: "دقائق الخروج المبكر", workHours: "ساعات العمل", rows: "سجل يومي",
      code: "الكود", name: "الموظف", job: "الوظيفة", department: "القسم", hireDate: "تاريخ التعيين", date: "التاريخ", day: "اليوم",
      dayType: "نوع اليوم", shift: "الوردية", officialIn: "الدخول الرسمي", officialOut: "الخروج الرسمي",
      actualIn: "الدخول الفعلي", actualOut: "الخروج الفعلي", inMovement: "حركة الدخول", outMovement: "حركة الخروج", workMins: "دقائق العمل", earlyMins: "خروج مبكر",
      notes: "الملاحظات", actions: "", present: "يوم عمل", rest: "راحة أسبوعية", officialHoliday: "إجازة رسمية", leave: "إجازة", permission: "إذن",
      missingOut: "لا توجد حركة خروج", missingIn: "لا توجد حركة دخول", noMovements: "لا توجد حركة دخول أو خروج",
      workedHoliday: "عمل في إجازة رسمية", workedRest: "عمل في الراحة الأسبوعية", workedLeave: "عمل أثناء الإجازة",
      attendanceMovement: "حضور", departureMovement: "انصراف", leaveType: "نوع الإجازة", leaveDays: "أيام الإجازة",
      annualLeaveDays: "إجازة سنوية", unpaidLeaveDays: "إجازة بدون أجر", sickLeaveDays: "إجازة مرضية", otherLeaveDays: "إجازات أخرى",
      permissionType: "نوع الإذن", permissionFrom: "الإذن من", permissionTo: "الإذن إلى", permissionHours: "ساعات الإذن", permissionDays: "أيام الأذونات",
      regularOvertime: "إضافي بعد العمل", restOvertime: "إضافي الراحة الأسبوعية", holidayOvertime: "إضافي الإجازة الرسمية",
      totalOvertime: "إجمالي الإضافي", holidayName: "اسم الإجازة الرسمية",
      completeDays: "أيام مكتملة", lateDays: "أيام التأخير", earlyDays: "أيام الخروج المبكر",
      overtimeDays: "أيام الإضافي", page: "صفحة {current} من {total}", noResults: "لا توجد نتائج مطابقة.",
      unmatchedPunches: "حركات لأكواد غير موجودة بالقالب", singlePunches: "أيام ببصمة واحدة", multiplePunches: "أيام بأكثر من حركتين",
      unmatchedCount: "غير مطابق", sourceRows: "حركات المصدر", firstPunch: "أول بصمة", lastPunch: "آخر بصمة",
      review: "مراجعة", languageName: "English"
    },
    en: {
      appTitle: "Attendance Management", navSetup: "Import & setup", navDashboard: "Results dashboard",
      navDaily: "Daily report", navSummary: "Employee summary", localOnly: "Local processing",
      privacyText: "Employee data never leaves this browser.", productName: "Attendance → Payroll",
      setupTitle: "Report setup", dashboardTitle: "Results dashboard", dailyTitle: "Daily attendance",
      summaryTitle: "Employee summary", exportExcel: "Export Excel", localWorkspace: "Private local workspace",
      heroTitle: "Turn fingerprint device exports into a clear attendance report.",
      heroText: "Upload punch transactions and the employee template, review settings, then generate the report. Processing stays in your browser.",
      punchFileTitle: "Fingerprint transactions", punchFileHelp: "Supports XLS, XLSX and CSV with Arabic or English headers.",
      choosePunchFile: "Choose transactions file", orDrop: "or drop it here", employeesFileTitle: "Employees and attendance inputs",
      employeesFileHelp: "One workbook for employees, shift schedules, leaves, permissions and official holidays.", downloadTemplate: "Download template",
      uploadEmployees: "Upload completed template", noFile: "No file selected", settingsTitle: "Calculation settings",
      settingsHelp: "You can adjust these values before each report.", periodStart: "Period start", periodEnd: "Period end",
      lateGrace: "Late grace (minutes)", earlyGrace: "Early-leave grace (minutes)",
      overtimeAfter: "Overtime starts after shift end (minutes)", weekendOvertime: "Rest-day work",
      allHoursOvertime: "All time is overtime", afterShiftOnly: "Only after shift end",
      readyHint: "Upload both files to enable report generation.", ready: "Files are ready. Review the period and generate the report.",
      generateReport: "Generate report", analysis: "Analysis", topLate: "Employees with most late minutes",
      dataQuality: "Data quality", attentionRequired: "Items requiring review", details: "Details",
      dailyAttendance: "Daily attendance", searchEmployee: "Search code or name", allStatuses: "All statuses",
      absence: "Absence", missingPunch: "Missing punch", late: "Late", overtime: "Overtime",
      editHint: "Edit actual in, actual out or notes directly. The summary recalculates automatically.",
      previous: "Previous", next: "Next", monthlyView: "Aggregated view", employeesSummary: "Employee summary",
      importedPunches: "Imported {count} transactions for {employees} employees.", importedEmployees: "Imported {count} employees, {shifts} shift periods, {leaves} leaves, {permissions} permissions and {holidays} official holidays.",
      invalidPunchFile: "Could not detect employee code or date/time columns in the transactions file.",
      invalidEmployeesFile: "Could not detect employee code, shift start or shift end in the employee template.",
      invalidShiftSchedule: "Shift_Schedule contains an incomplete row or overlapping periods for the same employee.",
      invalidPeriod: "Check the start and end dates.", reportReady: "Report generated successfully.",
      exportDone: "Excel report is ready.", templateDone: "Employee template downloaded.",
      totalEmployees: "Employees", attendanceDays: "Worked shift days", absenceDays: "Absence days",
      lateMinutes: "Late minutes", overtimeMinutes: "Overtime minutes", missingDays: "Missing-punch days",
      earlyMinutes: "Early-leave minutes", workHours: "Work hours", rows: "daily records",
      code: "Code", name: "Employee", job: "Job title", department: "Department", hireDate: "Hire date", date: "Date", day: "Day",
      dayType: "Day type", shift: "Shift", officialIn: "Official in", officialOut: "Official out",
      actualIn: "Actual in", actualOut: "Actual out", inMovement: "In movement", outMovement: "Out movement", workMins: "Work minutes", earlyMins: "Early leave",
      notes: "Notes", actions: "", present: "Work Day", rest: "Weekly Rest", officialHoliday: "Official Holiday", leave: "Leave", permission: "Permission",
      missingOut: "No Out Movement", missingIn: "No In Movement", noMovements: "No In or Out Movements",
      workedHoliday: "Worked on Official Holiday", workedRest: "Worked on Weekly Rest", workedLeave: "Worked During Leave",
      attendanceMovement: "Attendance", departureMovement: "Departure", leaveType: "Leave type", leaveDays: "Leave days",
      annualLeaveDays: "Annual leave", unpaidLeaveDays: "Unpaid leave", sickLeaveDays: "Sick leave", otherLeaveDays: "Other leave",
      permissionType: "Permission type", permissionFrom: "Permission from", permissionTo: "Permission to", permissionHours: "Permission hours", permissionDays: "Permission days",
      regularOvertime: "After-work overtime", restOvertime: "Weekly-rest overtime", holidayOvertime: "Official-holiday overtime",
      totalOvertime: "Total overtime", holidayName: "Official holiday name",
      completeDays: "Complete days", lateDays: "Late days", earlyDays: "Early-leave days",
      overtimeDays: "Overtime days", page: "Page {current} of {total}", noResults: "No matching results.",
      unmatchedPunches: "Transactions for codes missing from template", singlePunches: "Single-punch days", multiplePunches: "Days with more than two punches",
      unmatchedCount: "Unmatched", sourceRows: "Source punches", firstPunch: "First punch", lastPunch: "Last punch",
      review: "Review", languageName: "العربية"
    }
  };

  const HEADER_ALIASES = {
    punchCode: ["رقمالبصمه", "رقمالبصمة", "كودالموظف", "الكود", "employeecode", "employeeid", "employeeno", "employeenumber", "code", "punchid", "no", "number"],
    punchName: ["الاسم", "الإسم", "اسمالموظف", "employeename", "name"],
    punchDept: ["الاداره", "الإداره", "الادارة", "الإدارة", "القسم", "department", "section", "management"],
    punchDateTime: ["التاريخوالوقت", "التاريخوالزمن", "datetime", "dateandtime", "punchtime", "timestamp"],
    punchMovement: ["نوعالحركه", "نوعالحركة", "movementtype", "movement", "status", "direction"],
    employeeCode: ["كودالموظف", "الكود", "رقمالبصمه", "رقمالبصمة", "employeecode", "employeeid", "code"],
    employeeName: ["اسمالموظف", "الاسم", "الإسم", "employeename", "name"],
    employeeJob: ["الوظيفه", "الوظيفة", "المسمىالوظيفي", "jobtitle", "job"],
    employeeDept: ["القسم", "الاداره", "الإدارة", "department", "section"],
    employeeHireDate: ["تاريخالتعيين", "تاريخالتوظيف", "تاريخالالتحاق", "hiredate", "dateofhire", "employmentdate", "joiningdate"],
    employeeShift: ["الورديه", "الوردية", "اسمالورديه", "shift", "shiftname"],
    employeeStart: ["بدايهالورديه", "بدايةالوردية", "وقتالدخول", "shiftstart", "starttime"],
    employeeEnd: ["نهايهالورديه", "نهايةالوردية", "وقتالخروج", "shiftend", "endtime"],
    employeeRest: ["ايامالراحه", "أيامالراحة", "الراحهالاسبوعيه", "restdays", "weeklyrest", "weekend"],
    scheduleCode: ["كودالموظف", "الكود", "employeecode", "employeeid", "code"],
    scheduleFrom: ["منتاريخ", "تاريخالبدايه", "تاريخالبداية", "startdate", "fromdate", "effectivefrom"],
    scheduleTo: ["اليتاريخ", "إلىتاريخ", "تاريخالنهايه", "تاريخالنهاية", "enddate", "todate", "effectiveto"],
    scheduleShift: ["الورديه", "الوردية", "اسمالورديه", "shift", "shiftname"],
    scheduleStart: ["بدايهالورديه", "بدايةالوردية", "وقتالدخول", "shiftstart", "starttime"],
    scheduleEnd: ["نهايهالورديه", "نهايةالوردية", "وقتالخروج", "shiftend", "endtime"],
    scheduleRest: ["ايامالراحه", "أيامالراحة", "الراحهالاسبوعيه", "restdays", "weeklyrest", "weekend"],
    leaveCode: ["كودالموظف", "الكود", "employeecode", "employeeid", "code"],
    leaveType: ["نوعالاجازه", "نوعالإجازة", "leavetype", "type"],
    leaveStart: ["تاريخالبدايه", "تاريخالبداية", "من", "startdate", "fromdate"],
    leaveEnd: ["تاريخالنهايه", "تاريخالنهاية", "الي", "إلى", "enddate", "todate"],
    leaveDays: ["عددالايام", "عددالأيام", "days", "numberofdays"],
    leaveNotes: ["ملاحظات", "notes", "remarks"],
    permissionCode: ["كودالموظف", "الكود", "employeecode", "employeeid", "code"],
    permissionDate: ["التاريخ", "date"],
    permissionType: ["نوعالاذن", "نوعالإذن", "permissiontype", "type"],
    permissionFrom: ["منالساعه", "منالساعة", "من", "from", "starttime"],
    permissionTo: ["اليالساعه", "إلىالساعة", "الي", "إلى", "to", "endtime"],
    permissionHours: ["اجماليالساعات", "إجماليالساعات", "totalhours", "hours"],
    permissionNotes: ["ملاحظات", "notes", "remarks"],
    holidayDate: ["التاريخ", "date", "holidaydate"],
    holidayName: ["اسمالاجازهالرسميه", "اسمالإجازةالرسمية", "holidayname", "name"],
    holidayNotes: ["ملاحظات", "notes", "remarks"]
  };

  const DAY_NAMES = {
    ar: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  };

  const state = {
    lang: "ar",
    punches: [], employees: [], shiftSchedules: [], leaves: [], permissions: [], holidays: [], results: [], summary: [], currentView: "setup", page: 1, pageSize: 100,
    diagnostics: { unmatched: 0, singles: 0, multiples: 0 }, settings: {}
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const t = (key, values = {}) => {
    let text = (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;
    Object.entries(values).forEach(([name, value]) => { text = text.replace(`{${name}}`, value); });
    return text;
  };

  function normalizeHeader(value) {
    return String(value || "").trim().toLowerCase()
      .replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي")
      .replace(/[\s_\-\/\\().،,:]+/g, "");
  }

  function normalizeDigits(value) {
    const ar = "٠١٢٣٤٥٦٧٨٩";
    return String(value || "").replace(/[٠-٩]/g, d => ar.indexOf(d));
  }

  function findField(row, aliases) {
    const keys = Object.keys(row);
    const key = keys.find(k => aliases.includes(normalizeHeader(k)));
    return key === undefined ? undefined : row[key];
  }

  function excelDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return new Date(value.getTime());
    if (typeof value === "number" && window.XLSX) {
      const parsed = XLSX.SSF.parse_date_code(value);
      if (parsed) return new Date(parsed.y, parsed.m - 1, parsed.d, parsed.H, parsed.M, Math.floor(parsed.S || 0));
    }
    let raw = normalizeDigits(value).trim();
    if (!raw) return null;
    const pm = /(?:\s|^)(م|pm)$/i.test(raw);
    const am = /(?:\s|^)(ص|am)$/i.test(raw);
    raw = raw.replace(/\s*(ص|م|am|pm)\s*$/i, "").trim();
    const match = raw.match(/^(\d{1,4})[\/\-.](\d{1,2})[\/\-.](\d{1,4})(?:[ T]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
    if (match) {
      let a = +match[1], b = +match[2], c = +match[3];
      let year, month, day;
      if (a > 999) { year = a; month = b; day = c; } else { day = a; month = b; year = c; }
      let hour = +(match[4] || 0);
      if (pm && hour < 12) hour += 12;
      if (am && hour === 12) hour = 0;
      const result = new Date(year, month - 1, day, hour, +(match[5] || 0), +(match[6] || 0));
      return Number.isNaN(result.getTime())||result.getFullYear()!==year||result.getMonth()!==month-1||result.getDate()!==day||hour>23||+(match[5]||0)>59 ? null : result;
    }
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function parseTime(value) {
    if (value instanceof Date) return value.getHours() * 60 + value.getMinutes();
    if (typeof value === "number") return Math.round((value % 1) * 1440) % 1440;
    let raw = normalizeDigits(value).trim();
    if (!raw) return null;
    const pm = /(?:\s|^)(م|pm)$/i.test(raw);
    const am = /(?:\s|^)(ص|am)$/i.test(raw);
    const match = raw.match(/(\d{1,2}):(\d{2})/);
    if (!match) return null;
    let hour = +match[1];
    if (pm && hour < 12) hour += 12;
    if (am && hour === 12) hour = 0;
    return hour>=0&&hour<24&&+match[2]<60 ? hour * 60 + +match[2] : null;
  }

  function dateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function formatInputDate(date) {
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  }

  function parseInputDate(value) {
    const match = normalizeDigits(value).trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return null;
    const day = +match[1], month = +match[2], year = +match[3];
    const result = new Date(year, month - 1, day);
    return result.getFullYear() === year && result.getMonth() === month - 1 && result.getDate() === day ? result : null;
  }

  function maskDateInput(value) {
    const digits = normalizeDigits(value).replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  }

  function startOfDay(date) { return new Date(date.getFullYear(), date.getMonth(), date.getDate()); }
  function employeeStartedByDate(employee, date) { return (!employee.hireDate || startOfDay(date) >= employee.hireDate)&&(!employee.endDate||startOfDay(date)<=employee.endDate); }
  function addMinutes(date, minutes) { return new Date(date.getTime() + minutes * 60000); }
  function formatTime(date) { return date ? `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}` : ""; }
  function formatMinutes(value) { return `${Math.floor(value / 60)}:${String(Math.round(value % 60)).padStart(2, "0")}`; }

  function movementKind(value) {
    const n = normalizeHeader(value);
    if (/انصراف|خروج|نهايه|out|checkout|exit/.test(n)) return "out";
    if (/حضور|دخول|بدايه|in|checkin|entry/.test(n)) return "in";
    return "unknown";
  }

  function punchRoleForShift(punch, officialIn, officialOut) {
    const explicitRole = movementKind(punch.movement);
    if (explicitRole !== "unknown") return explicitRole;
    const distanceFromIn = Math.abs(punch.dt - officialIn);
    const distanceFromOut = Math.abs(punch.dt - officialOut);
    return distanceFromIn <= distanceFromOut ? "in" : "out";
  }

  function selectShiftPunches(candidates, officialIn, officialOut) {
    const inMoves = candidates.filter(p => punchRoleForShift(p, officialIn, officialOut) === "in");
    const outMoves = candidates.filter(p => punchRoleForShift(p, officialIn, officialOut) === "out");
    const actualInPunch = inMoves.length ? inMoves[0] : null;
    const eligibleOut = outMoves.filter(p => !actualInPunch || p.dt > actualInPunch.dt);
    const actualOutPunch = eligibleOut.length ? eligibleOut[eligibleOut.length - 1] : null;
    return { actualInPunch, actualOutPunch };
  }

  function normalizeLeaveType(value) {
    const raw = normalizeHeader(value);
    if (/بدوناجر|unpaid/.test(raw)) return "unpaid";
    if (/مرضي|مرضى|sick|medical/.test(raw)) return "sick";
    if (/سنوي|سنوى|annual/.test(raw)) return "annual";
    return "other";
  }

  function normalizePermissionType(value) {
    const raw = normalizeHeader(value);
    if (/تاخير|تأخير|حضور|late|arrival/.test(raw)) return "arrival";
    if (/خروج|انصراف|early|departure/.test(raw)) return "early";
    return "during";
  }

  function permissionDuration(from, to) {
    if (from === null || to === null) return 0;
    return to >= from ? to - from : 1440 - from + to;
  }

  function restDaySet(value) {
    const raw = normalizeHeader(value);
    const aliases = [
      [0, ["الاحد", "sunday", "sun"]], [1, ["الاثنين", "monday", "mon"]],
      [2, ["الثلاثاء", "tuesday", "tue"]], [3, ["الاربعاء", "wednesday", "wed"]],
      [4, ["الخميس", "thursday", "thu"]], [5, ["الجمعه", "friday", "fri"]],
      [6, ["السبت", "saturday", "sat"]]
    ];
    return new Set(aliases.filter(([, names]) => names.some(name => raw.includes(name))).map(([day]) => day));
  }

  function validateShiftSchedules(items) {
    const byEmployee = new Map();
    items.forEach(item => {
      if (!byEmployee.has(item.code)) byEmployee.set(item.code, []);
      byEmployee.get(item.code).push(item);
    });
    byEmployee.forEach(periods => {
      periods.sort((a, b) => a.from - b.from || a.to - b.to);
      for (let index = 1; index < periods.length; index += 1) {
        if (periods[index].from <= periods[index - 1].to) throw new Error(t("invalidShiftSchedule"));
      }
    });
  }

  function effectiveShiftForDate(employee, date) {
    const day = startOfDay(date).getTime();
    const scheduled = state.shiftSchedules.find(item => item.code === employee.code && day >= item.from.getTime() && day <= item.to.getTime());
    return scheduled ? {
      shift: scheduled.shift || employee.shift,
      start: scheduled.start,
      end: scheduled.end,
      restRaw: scheduled.restRaw || employee.restRaw,
      scheduled: true
    } : {
      shift: employee.shift,
      start: employee.start,
      end: employee.end,
      restRaw: employee.restRaw,
      scheduled: false
    };
  }

  async function readWorkbookSheets(file) {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array", cellDates: true, codepage: 1256, raw:true });
    return workbook.SheetNames.map(name => {
      const sheet=workbook.Sheets[name],rows=XLSX.utils.sheet_to_json(sheet,{defval:"",raw:true}),formatted=XLSX.utils.sheet_to_json(sheet,{defval:"",raw:false});
      const aliases=[...HEADER_ALIASES.employeeCode,...HEADER_ALIASES.punchCode,...HEADER_ALIASES.scheduleCode];
      rows.forEach((row,i)=>Object.keys(row).forEach(key=>{if(aliases.includes(normalizeHeader(key)))row[key]=String(formatted[i]?.[key]??row[key]).trim()}));
      return{name,rows};
    });
  }

  function sheetRows(sheets, names, fallback = false) {
    const normalized = names.map(normalizeHeader);
    const found = sheets.find(sheet => normalized.includes(normalizeHeader(sheet.name)));
    return found ? found.rows : (fallback && sheets[0] ? sheets[0].rows : []);
  }

  async function importPunches(file) {
    window.HMPipeline?.invalidate(true);
    try {
      if(file.size>15000000)throw new Error("الحد الأقصى لملف البصمة ١٥ ميجابايت");
      const sheets = await readWorkbookSheets(file);
      const rows = sheets[0] ? sheets[0].rows : [];
      const punches = rows.map((row, index) => {
        const code = String(findField(row, HEADER_ALIASES.punchCode) ?? "").trim();
        const dt = excelDate(findField(row, HEADER_ALIASES.punchDateTime));
        return {
          id: index, code, name: String(findField(row, HEADER_ALIASES.punchName) ?? "").trim(),
          department: String(findField(row, HEADER_ALIASES.punchDept) ?? "").trim(), dt,
          movement: String(findField(row, HEADER_ALIASES.punchMovement) ?? "").trim()
        };
      }).filter(row => row.code && row.dt);
      if (!punches.length || punches.length !== rows.length) throw new Error("يوجد صف غير صالح في ملف البصمة. راجع الكود والتاريخ والوقت؛ لم يُستورد الملف.");
      if(punches.length>100000)throw new Error("الحد الأقصى ١٠٠ ألف حركة");
      const unique=new Map();for(const p of punches){const key=p.code+'|'+(+p.dt)+'|'+movementKind(p.movement);if(!unique.has(key))unique.set(key,p)}
      window.HMPipeline?.noteImport(punches.length-unique.size, "");
      state.punches = [...unique.values()].sort((a, b) => a.dt - b.dt);
      const min = state.punches[0].dt;
      const max = state.punches[state.punches.length - 1].dt;
      $("#period-start").value = formatInputDate(min);
      $("#period-end").value = formatInputDate(max);
      const employees = new Set(state.punches.map(p => p.code)).size;
      setFileStatus("#punch-status", t("importedPunches", { count: punches.length.toLocaleString(), employees }), "success");
      validateSetup();
    } catch (error) {
      state.punches = [];
      setFileStatus("#punch-status", error.message || t("invalidPunchFile"), "error");
      validateSetup();
    }
  }

  async function importEmployees(file) {
    window.HMPipeline?.invalidate(true);window.HMPipeline?.resetPay();
    try {
      if(file.size>10000000)throw new Error("الحد الأقصى لقالب الموظفين ١٠ ميجابايت");
      const sheets = await readWorkbookSheets(file);
      const rows = sheetRows(sheets, ["Employees", "الموظفين", "الموظفون"], true);
      const employees = rows.map(row => {
        const hireRaw=findField(row, HEADER_ALIASES.employeeHireDate),hireDate = excelDate(hireRaw);
        const endRaw=findField(row,['enddate','terminationdate','تاريخانتهاءالخدمه']),endDate=excelDate(endRaw);
        if((hireRaw&&!hireDate)||(endRaw&&!endDate))throw new Error("تاريخ تعيين أو نهاية خدمة غير صحيح");
        const basicRaw=findField(row,['basicsalary','basic','الاساسي','الراتبالاساسي'])??0,allowanceRaw=findField(row,['fixedallowance','allowance','بدلاتثابته','البدلات'])??0;
        const basic=Number(basicRaw),allowance=Number(allowanceRaw);
        if(!Number.isFinite(basic)||!Number.isFinite(allowance)||basic<0||allowance<0)throw new Error("قيمة أجر غير صحيحة");
        return {
          code: String(findField(row, HEADER_ALIASES.employeeCode) ?? "").trim(),
          name: String(findField(row, HEADER_ALIASES.employeeName) ?? "").trim(),
          job: String(findField(row, HEADER_ALIASES.employeeJob) ?? "").trim(),
          department: String(findField(row, HEADER_ALIASES.employeeDept) ?? "").trim(),
          hireDate: hireDate ? startOfDay(hireDate) : null, endDate:endDate?startOfDay(endDate):null,basic,allowance,
          shift: String(findField(row, HEADER_ALIASES.employeeShift) ?? "").trim(),
          start: parseTime(findField(row, HEADER_ALIASES.employeeStart)),
          end: parseTime(findField(row, HEADER_ALIASES.employeeEnd)),
          restRaw: String(findField(row, HEADER_ALIASES.employeeRest) ?? "").trim()
        };
      }).filter(row => row.code);
      if (!employees.length || employees.length!==rows.length || employees.length>1000 || employees.some(e => !e.name || e.start === null || e.end === null || (e.hireDate&&e.endDate&&e.endDate<e.hireDate))) throw new Error(t("invalidEmployeesFile"));
      if(new Set(employees.map(e=>e.code)).size!==employees.length)throw new Error("أكواد موظفين مكررة؛ لم يُستورد الملف.");
      state.employees = employees;

      state.shiftSchedules = sheetRows(sheets, ["Shift_Schedule", "Shift Schedule", "جدول الورديات", "مواعيد الورديات"]).map(row => {
        const code = String(findField(row, HEADER_ALIASES.scheduleCode) ?? "").trim();
        const from = excelDate(findField(row, HEADER_ALIASES.scheduleFrom));
        const to = excelDate(findField(row, HEADER_ALIASES.scheduleTo)) || from;
        const shift = String(findField(row, HEADER_ALIASES.scheduleShift) ?? "").trim();
        const start = parseTime(findField(row, HEADER_ALIASES.scheduleStart));
        const end = parseTime(findField(row, HEADER_ALIASES.scheduleEnd));
        const restRaw = String(findField(row, HEADER_ALIASES.scheduleRest) ?? "").trim();
        return { code, from: from ? startOfDay(from) : null, to: to ? startOfDay(to) : null, shift, start, end, restRaw };
      }).filter(item => item.code || item.from || item.to || item.shift || item.start !== null || item.end !== null || item.restRaw);
      if (state.shiftSchedules.some(item => !item.code || !item.from || !item.to || item.start === null || item.end === null || item.to < item.from)) {
        throw new Error(t("invalidShiftSchedule"));
      }
      validateShiftSchedules(state.shiftSchedules);

      state.leaves = sheetRows(sheets, ["Leaves", "الإجازات", "الاجازات"]).map(row => {
        const start = excelDate(findField(row, HEADER_ALIASES.leaveStart));
        const end = excelDate(findField(row, HEADER_ALIASES.leaveEnd)) || start;
        return {
          code: String(findField(row, HEADER_ALIASES.leaveCode) ?? "").trim(),
          type: normalizeLeaveType(findField(row, HEADER_ALIASES.leaveType)), start, end,
          days: Number(findField(row, HEADER_ALIASES.leaveDays)) || (start && end ? Math.floor((startOfDay(end) - startOfDay(start)) / 86400000) + 1 : 0),
          notes: String(findField(row, HEADER_ALIASES.leaveNotes) ?? "").trim()
        };
      }).filter(item => item.code && item.start && item.end);

      state.permissions = sheetRows(sheets, ["Permissions", "الأذونات", "الاذونات"]).map(row => {
        const from = parseTime(findField(row, HEADER_ALIASES.permissionFrom));
        const to = parseTime(findField(row, HEADER_ALIASES.permissionTo));
        let minutes = Number(findField(row, HEADER_ALIASES.permissionHours));
        minutes = Number.isFinite(minutes) && minutes > 0 ? Math.round(minutes * 60) : permissionDuration(from, to);
        return {
          code: String(findField(row, HEADER_ALIASES.permissionCode) ?? "").trim(),
          date: excelDate(findField(row, HEADER_ALIASES.permissionDate)),
          type: normalizePermissionType(findField(row, HEADER_ALIASES.permissionType)),
          rawType: String(findField(row, HEADER_ALIASES.permissionType) ?? "").trim(),
          from, to, minutes,
          notes: String(findField(row, HEADER_ALIASES.permissionNotes) ?? "").trim()
        };
      }).filter(item => item.code && item.date);

      state.holidays = sheetRows(sheets, ["Official_Holidays", "Official Holidays", "الإجازات الرسمية", "الاجازات الرسمية"]).map(row => ({
        date: excelDate(findField(row, HEADER_ALIASES.holidayDate)),
        name: String(findField(row, HEADER_ALIASES.holidayName) ?? "").trim() || t("officialHoliday"),
        notes: String(findField(row, HEADER_ALIASES.holidayNotes) ?? "").trim()
      })).filter(item => item.date);

      const codes=new Set(state.employees.map(e=>e.code));
      if(state.shiftSchedules.some(x=>!codes.has(x.code))||state.leaves.some(x=>!codes.has(x.code)||x.end<x.start)||state.permissions.some(x=>!codes.has(x.code)||x.minutes<0))throw new Error("كود غير مطابق أو فترة غير صحيحة في المؤثرات");
      for(const [names,parsed] of [ [["Leaves","الإجازات","الاجازات"],state.leaves], [["Permissions","الأذونات","الاذونات"],state.permissions], [["Official_Holidays","Official Holidays","الإجازات الرسمية","الاجازات الرسمية"],state.holidays] ]){
        if(sheetRows(sheets,names).length!==parsed.length)throw new Error("يوجد صف غير مكتمل في الإجازات أو الأذونات أو العطلات؛ راجع القالب");
      }
      const leavesSorted=[...state.leaves].sort((a,b)=>a.code.localeCompare(b.code)||a.start-b.start);
      for(let i=1;i<leavesSorted.length;i++){const prev=leavesSorted[i-1],curr=leavesSorted[i];if(prev.code===curr.code&&startOfDay(curr.start)<=startOfDay(prev.end))throw new Error("فترات إجازات متداخلة لنفس الموظف");}
      setFileStatus("#employees-status", t("importedEmployees", {
        count: state.employees.length.toLocaleString(), shifts: state.shiftSchedules.length.toLocaleString(), leaves: state.leaves.length.toLocaleString(),
        permissions: state.permissions.length.toLocaleString(), holidays: state.holidays.length.toLocaleString()
      }), "success");
      validateSetup();
    } catch (error) {
      state.employees = [];
      state.shiftSchedules = [];
      state.leaves = [];
      state.permissions = [];
      state.holidays = [];
      setFileStatus("#employees-status", error.message || t("invalidEmployeesFile"), "error");
      validateSetup();
    }
  }

  function setFileStatus(selector, text, status) {
    const element = $(selector);
    element.textContent = text;
    element.dataset.state = status;
  }

  function validateSetup() {
    const valid = state.punches.length > 0 && state.employees.length > 0;
    $("#generate-report").disabled = !valid;
    $("#validation-message").textContent = valid ? t("ready") : t("readyHint");
  }

  function getSettings() {
    return {
      start: parseInputDate($("#period-start").value),
      end: parseInputDate($("#period-end").value),
      lateGrace: Math.max(0, +$("#late-grace").value || 0),
      earlyGrace: Math.max(0, +$("#early-grace").value || 0),
      overtimeAfter: Math.max(0, +$("#overtime-after").value || 0),
      restOvertime: $("#rest-overtime").value
    };
  }

  function calculateReports() {
    const settings = getSettings();
    if (!settings.start || !settings.end || settings.end < settings.start) return toast(t("invalidPeriod"));
    if((settings.end-settings.start)/86400000>366)return toast("الفترة تتجاوز سنة؛ اختر شهر الرواتب");
    state.settings = settings;
    const employeeCodes = new Set(state.employees.map(e => e.code));
    state.diagnostics.unmatched = state.punches.filter(p => !employeeCodes.has(p.code)).length;
    state.diagnostics.singles = 0;
    state.diagnostics.multiples = 0;
    const leaveByKey = new Map();
    state.leaves.forEach(leave => {
      for (let date = startOfDay(leave.start); date <= startOfDay(leave.end); date.setDate(date.getDate() + 1)) {
        leaveByKey.set(`${leave.code}|${dateKey(date)}`, leave);
      }
    });
    const permissionsByKey = new Map();
    state.permissions.forEach(permission => {
      const key = `${permission.code}|${dateKey(permission.date)}`;
      if (!permissionsByKey.has(key)) permissionsByKey.set(key, []);
      permissionsByKey.get(key).push(permission);
    });
    const holidayByDate = new Map(state.holidays.map(holiday => [dateKey(holiday.date), holiday]));
    const punchesByEmployee = new Map();
    state.punches.forEach(punch => {
      if (!punchesByEmployee.has(punch.code)) punchesByEmployee.set(punch.code, []);
      punchesByEmployee.get(punch.code).push(punch);
    });
    const results = [];
    state.employees.forEach(employee => {
      const empPunches = punchesByEmployee.get(employee.code) || [];
      const used = new Set();
      for (let cursor = new Date(settings.start); cursor <= settings.end; cursor.setDate(cursor.getDate() + 1)) {
        const date = new Date(cursor);
        if (!employeeStartedByDate(employee, date)) continue;
        const effectiveShift = effectiveShiftForDate(employee, date);
        const rests = restDaySet(effectiveShift.restRaw);
        const officialIn = addMinutes(startOfDay(date), effectiveShift.start);
        let officialOut = addMinutes(startOfDay(date), effectiveShift.end);
        if (effectiveShift.end <= effectiveShift.start) officialOut.setDate(officialOut.getDate() + 1);
        const windowStart = addMinutes(officialIn, -240);
        const windowEnd = addMinutes(officialOut, 480);
        const candidates = empPunches.filter(p => !used.has(p.id) && p.dt >= windowStart && p.dt <= windowEnd);
        candidates.forEach(p => used.add(p.id));
        if (candidates.length === 1) state.diagnostics.singles += 1;
        if (candidates.length > 2) state.diagnostics.multiples += 1;
        const { actualInPunch, actualOutPunch } = selectShiftPunches(candidates, officialIn, officialOut);
        const actualIn = actualInPunch ? actualInPunch.dt : null;
        const actualOut = actualOutPunch ? actualOutPunch.dt : null;
        const isRest = rests.has(date.getDay());
        const holiday = holidayByDate.get(dateKey(date)) || null;
        const leave = leaveByKey.get(`${employee.code}|${dateKey(date)}`) || null;
        const permissions = permissionsByKey.get(`${employee.code}|${dateKey(date)}`) || [];
        const row = {
          id: `${employee.code}|${dateKey(date)}`, employee, code: employee.code, name: employee.name,
          job: employee.job, department: employee.department, shift: effectiveShift.shift, date,
          shiftScheduled: effectiveShift.scheduled,
          officialIn, officialOut, actualIn, actualOut,
          actualInMovement: actualInPunch ? actualInPunch.movement : "",
          actualOutMovement: actualOutPunch ? actualOutPunch.movement : "",
          isRest, holiday, leave, permissions, sourcePunches: candidates.length,
          sourceFirst: candidates.length ? candidates[0].dt : null,
          sourceLast: candidates.length ? candidates[candidates.length - 1].dt : null,
          manualNote: "",punchIds:candidates.map(p=>p.id)
        };
        recalculateRow(row);
        results.push(row);
      }
    });
    state.results = results;
    buildSummary();
    state.page = 1;
    enableReports();
    renderAll();
    showView("dashboard");
    toast(t("reportReady"));
  }

  function calculateLateMinutes(actualIn, officialIn, graceMinutes, permissionMinutes) {
    if (!actualIn || !officialIn) return 0;
    const delayAfterPermission = Math.max(0, Math.round((actualIn - officialIn) / 60000) - permissionMinutes);
    return delayAfterPermission > graceMinutes ? delayAfterPermission : 0;
  }

  function recalculateRow(row) {
    const s = state.settings;
    row.dayType = row.holiday ? "holiday" : row.leave ? "leave" : row.isRest ? "rest" : "work";
    row.permissionMinutes = row.permissions.reduce((sum, item) => sum + item.minutes, 0);
    row.permissionArrivalMinutes = row.permissions.filter(item => item.type === "arrival").reduce((sum, item) => sum + item.minutes, 0);
    row.permissionEarlyMinutes = row.permissions.filter(item => item.type === "early").reduce((sum, item) => sum + item.minutes, 0);
    row.workMinutes = row.actualIn && row.actualOut ? Math.max(0, Math.round((row.actualOut - row.actualIn) / 60000)) : 0;
    row.isWorkedShiftDay = !!row.actualIn || !!row.actualOut;
    row.lateMinutes = row.dayType === "work"
      ? calculateLateMinutes(row.actualIn, row.officialIn, s.lateGrace, row.permissionArrivalMinutes)
      : 0;
    row.earlyMinutes = (row.dayType === "work" && row.actualOut) ? Math.max(0, Math.round((row.officialOut - row.actualOut) / 60000) - s.earlyGrace - row.permissionEarlyMinutes) : 0;
    row.regularOvertimeMinutes = (row.dayType === "work" || row.dayType === "leave") && row.actualOut ? Math.max(0, Math.round((row.actualOut - row.officialOut) / 60000) - s.overtimeAfter) : 0;
    row.restOvertimeMinutes = row.dayType === "rest" && row.actualIn && row.actualOut ? (s.restOvertime === "all" ? row.workMinutes : Math.max(0, Math.round((row.actualOut - row.officialOut) / 60000) - s.overtimeAfter)) : 0;
    row.holidayOvertimeMinutes = row.dayType === "holiday" && row.actualIn && row.actualOut ? row.workMinutes : 0;
    row.overtimeMinutes = row.regularOvertimeMinutes + row.restOvertimeMinutes + row.holidayOvertimeMinutes;
    row.isAbsent = row.dayType === "work" && !row.actualIn && !row.actualOut;
    row.isMissing = (!!row.actualIn !== !!row.actualOut);
    if (row.manualNote) row.note = row.manualNote;
    else if (!row.actualIn && !row.actualOut && row.dayType === "work") row.note = "noMovements";
    else if (!row.actualIn && row.actualOut) row.note = "missingIn";
    else if (row.actualIn && !row.actualOut) row.note = "missingOut";
    else if (row.actualIn && row.actualOut && row.dayType === "holiday") row.note = "workedHoliday";
    else if (row.actualIn && row.actualOut && row.dayType === "rest") row.note = "workedRest";
    else if (row.actualIn && row.actualOut && row.dayType === "leave") row.note = "workedLeave";
    else row.note = "";
  }

  function buildSummary() {
    state.summary = state.employees.map(employee => {
      const rows = state.results.filter(row => row.code === employee.code);
      const count = predicate => rows.filter(predicate).length;
      return {
        code: employee.code, name: employee.name, job: employee.job, department: employee.department,
        attendanceDays: count(r => r.isWorkedShiftDay), completeDays: count(r => !!r.actualIn && !!r.actualOut),
        absenceDays: count(r => r.isAbsent), missingDays: count(r => r.isMissing),
        annualLeaveDays: count(r => r.dayType === "leave" && r.leave.type === "annual"),
        unpaidLeaveDays: count(r => r.dayType === "leave" && r.leave.type === "unpaid"),
        sickLeaveDays: count(r => r.dayType === "leave" && r.leave.type === "sick"),
        otherLeaveDays: count(r => r.dayType === "leave" && r.leave.type === "other"),
        leaveDays: count(r => r.dayType === "leave"),
        permissionDays: count(r => r.permissions.length > 0),
        permissionMinutes: rows.reduce((sum, r) => sum + r.permissionMinutes, 0),
        lateDays: count(r => r.lateMinutes > 0), lateMinutes: rows.reduce((sum, r) => sum + r.lateMinutes, 0),
        earlyDays: count(r => r.earlyMinutes > 0), earlyMinutes: rows.reduce((sum, r) => sum + r.earlyMinutes, 0),
        overtimeDays: count(r => r.overtimeMinutes > 0), overtimeMinutes: rows.reduce((sum, r) => sum + r.overtimeMinutes, 0),
        regularOvertimeMinutes: rows.reduce((sum, r) => sum + r.regularOvertimeMinutes, 0),
        restOvertimeMinutes: rows.reduce((sum, r) => sum + r.restOvertimeMinutes, 0),
        holidayOvertimeMinutes: rows.reduce((sum, r) => sum + r.holidayOvertimeMinutes, 0),
        workMinutes: rows.reduce((sum, r) => sum + r.workMinutes, 0)
      };
    });
  }

  function enableReports() {
    $$(".nav-item").forEach(button => { if (button.dataset.view !== "setup") button.disabled = false; });
    $("#export-button").classList.remove("hidden");
  }

  function renderAll() {
    renderDashboard();
    renderDaily();
    renderSummary();
    window.HMPipeline?.refresh();
  }

  function renderDashboard() {
    const totals = state.summary.reduce((acc, row) => {
      Object.keys(acc).forEach(key => { acc[key] += row[key] || 0; });
      return acc;
    }, { attendanceDays: 0, absenceDays: 0, lateMinutes: 0, regularOvertimeMinutes: 0, restOvertimeMinutes: 0, holidayOvertimeMinutes: 0, missingDays: 0 });
    const cards = [
      ["totalEmployees", state.employees.length, ""], ["attendanceDays", totals.attendanceDays, ""],
      ["absenceDays", totals.absenceDays, ""], ["lateMinutes", totals.lateMinutes.toLocaleString(), formatMinutes(totals.lateMinutes)],
      ["regularOvertime", totals.regularOvertimeMinutes.toLocaleString(), formatMinutes(totals.regularOvertimeMinutes)],
      ["restOvertime", totals.restOvertimeMinutes.toLocaleString(), formatMinutes(totals.restOvertimeMinutes)],
      ["holidayOvertime", totals.holidayOvertimeMinutes.toLocaleString(), formatMinutes(totals.holidayOvertimeMinutes)]
    ];
    $("#kpi-grid").innerHTML = cards.map(([label, value, sub]) => `<article class="kpi-card"><span>${t(label)}</span><strong>${value}</strong><small>${sub}</small></article>`).join("");
    const top = [...state.summary].sort((a, b) => b.lateMinutes - a.lateMinutes).slice(0, 7);
    const max = Math.max(1, ...top.map(x => x.lateMinutes));
    $("#late-chart").innerHTML = top.map(row => `<div class="bar-item"><span title="${escapeHtml(row.name)}">${escapeHtml(shortName(row.name))}</span><div class="bar-track"><div class="bar-fill" style="width:${(row.lateMinutes / max) * 100}%"></div></div><span class="bar-value">${row.lateMinutes} min</span></div>`).join("") || `<p>${t("noResults")}</p>`;
    const quality = [
      ["unmatchedPunches", state.diagnostics.unmatched], ["singlePunches", state.diagnostics.singles],
      ["multiplePunches", state.diagnostics.multiples], ["sourceRows", state.punches.length]
    ];
    $("#quality-list").innerHTML = quality.map(([label, value]) => `<div class="quality-item"><span>${t(label)}</span><strong>${value.toLocaleString()}</strong></div>`).join("");
  }

  function filteredDailyRows() {
    const search = normalizeHeader($("#daily-search").value);
    const status = $("#daily-status-filter").value;
    return state.results.filter(row => {
      const matchesSearch = !search || normalizeHeader(`${row.code}${row.name}${row.department}`).includes(search);
      const matchesStatus = status === "all" ||
        (status === "absence" && row.isAbsent) ||
        (status === "missing" && row.isMissing) ||
        (status === "late" && row.lateMinutes > 0) ||
        (status === "overtime" && row.overtimeMinutes > 0);
      return matchesSearch && matchesStatus;
    });
  }

  function renderDaily() {
    const rows = filteredDailyRows();
    const pages = Math.max(1, Math.ceil(rows.length / state.pageSize));
    state.page = Math.min(state.page, pages);
    const start = (state.page - 1) * state.pageSize;
    const pageRows = rows.slice(start, start + state.pageSize);
    const headers = [
      ["code", ""], ["name", ""], ["department", ""], ["date", ""], ["day", ""], ["dayType", ""], ["shift", ""],
      ["officialIn", "time-head"], ["officialOut", "time-head"], ["inMovement", "time-head"], ["outMovement", "time-head"],
      ["workMins", "effect-head"], ["lateMinutes", "effect-head"], ["earlyMins", "effect-head"],
      ["regularOvertime", "effect-head"], ["restOvertime", "effect-head"], ["holidayOvertime", "effect-head"],
      ["leaveType", "leave-head"], ["leaveDays", "leave-head"], ["permissionType", "leave-head"], ["permissionHours", "leave-head"], ["notes", ""]
    ];
    $("#daily-table").innerHTML = `<thead><tr>${headers.map(([key, cls]) => `<th class="${cls}">${t(key)}</th>`).join("")}</tr></thead><tbody>${pageRows.map(renderDailyRow).join("") || `<tr><td colspan="${headers.length}">${t("noResults")}</td></tr>`}</tbody>`;
    $("#page-info").textContent = t("page", { current: state.page, total: pages });
    $("#prev-page").disabled = state.page <= 1;
    $("#next-page").disabled = state.page >= pages;
    $$("#daily-table input[data-field]").forEach(input => input.addEventListener("change", handleInlineEdit));
  }

  function renderDailyRow(row) {
    const status = row.isAbsent ? "absence" : row.isMissing ? "warning" : row.dayType === "holiday" ? "holiday" : row.dayType === "leave" ? "leave" : row.dayType === "rest" ? "rest" : "present";
    const dayTypeText = dayTypeLabel(row.dayType);
    const noteText = row.note ? (I18N[state.lang][row.note] || row.note) : "";
    const leaveText = row.leave ? leaveTypeLabel(row.leave.type) : "";
    const permissionText = row.permissions.map(item => item.rawType || permissionTypeLabel(item.type)).join(" + ");
    return `<tr data-id="${escapeAttr(row.id)}">
      <td>${escapeHtml(row.code)}</td><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.department)}</td>
      <td>${formatDisplayDate(row.date)}</td><td>${DAY_NAMES[state.lang][row.date.getDay()]}</td>
      <td><span class="status-chip ${status}">${dayTypeText}</span></td><td>${escapeHtml(row.shift)}</td>
      <td>${formatTime(row.officialIn)}</td><td>${formatTime(row.officialOut)}</td>
      <td class="movement-cell">${movementEditor(row, "actualIn", "in")}</td>
      <td class="movement-cell">${movementEditor(row, "actualOut", "out")}</td>
      <td>${row.workMinutes}</td><td>${row.lateMinutes}</td><td>${row.earlyMinutes}</td>
      <td class="effect-cell">${row.regularOvertimeMinutes}</td><td class="effect-cell">${row.restOvertimeMinutes}</td><td class="effect-cell">${row.holidayOvertimeMinutes}</td>
      <td>${escapeHtml(leaveText)}</td><td>${row.leave && row.dayType === "leave" ? 1 : 0}</td>
      <td>${escapeHtml(permissionText)}</td><td>${(row.permissionMinutes / 60).toFixed(2)}</td>
      <td><input type="text" data-field="manualNote" data-id="${escapeAttr(row.id)}" value="${escapeAttr(noteText)}"></td>
    </tr>`;
  }

  function movementEditor(row, field, kind) {
    const value = row[field];
    const label = value ? (kind === "in" ? t("attendanceMovement") : t("departureMovement")) : (kind === "in" ? t("missingIn") : t("missingOut"));
    const css = value ? kind : "missing";
    return `<div class="movement ${css}"><span>${label}</span><input type="time" data-field="${field}" data-id="${escapeAttr(row.id)}" value="${formatTime(value)}"></div>`;
  }

  function handleInlineEdit(event) {
    const row = state.results.find(item => item.id === event.target.dataset.id);
    if (!row) return;
    window.HMPipeline?.clearDecision(row.id);
    const field = event.target.dataset.field;
    if (field === "manualNote") row.manualNote = event.target.value.trim();
    else {
      const minutes = parseTime(event.target.value);
      if (minutes === null) row[field] = null;
      else {
        const date = startOfDay(row.date);
        if (field === "actualOut" && minutes < ((row.actualIn||row.officialIn).getHours() * 60 + (row.actualIn||row.officialIn).getMinutes())) date.setDate(date.getDate() + 1);
        row[field] = addMinutes(date, minutes);
      }
    }
    recalculateRow(row);
    buildSummary();
    renderAll();
  }

  function renderSummary() {
    const search = normalizeHeader($("#summary-search").value);
    const rows = state.summary.filter(row => !search || normalizeHeader(`${row.code}${row.name}${row.department}`).includes(search));
    const headers = ["code", "name", "job", "department", "attendanceDays", "completeDays", "absenceDays", "missingDays", "annualLeaveDays", "unpaidLeaveDays", "sickLeaveDays", "otherLeaveDays", "leaveDays", "permissionDays", "permissionHours", "lateDays", "lateMinutes", "earlyDays", "earlyMinutes", "regularOvertime", "restOvertime", "holidayOvertime", "totalOvertime", "workHours"];
    $("#summary-table").innerHTML = `<thead><tr>${headers.map(h => `<th>${t(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>
      <td>${escapeHtml(row.code)}</td><td>${escapeHtml(row.name)}</td><td>${escapeHtml(row.job)}</td><td>${escapeHtml(row.department)}</td>
      <td>${row.attendanceDays}</td><td>${row.completeDays}</td><td>${row.absenceDays}</td><td>${row.missingDays}</td>
      <td>${row.annualLeaveDays}</td><td>${row.unpaidLeaveDays}</td><td>${row.sickLeaveDays}</td><td>${row.otherLeaveDays}</td><td>${row.leaveDays}</td>
      <td>${row.permissionDays}</td><td>${(row.permissionMinutes / 60).toFixed(2)}</td>
      <td>${row.lateDays}</td><td>${row.lateMinutes}</td><td>${row.earlyDays}</td><td>${row.earlyMinutes}</td>
      <td>${row.regularOvertimeMinutes}</td><td>${row.restOvertimeMinutes}</td><td>${row.holidayOvertimeMinutes}</td><td>${row.overtimeMinutes}</td><td>${(row.workMinutes / 60).toFixed(2)}</td>
    </tr>`).join("") || `<tr><td colspan="${headers.length}">${t("noResults")}</td></tr>`}</tbody>`;
  }

  function showView(view) {
    state.currentView = view;
    $$(".view").forEach(el => el.classList.toggle("active-view", el.id === `view-${view}`));
    $$(".nav-item").forEach(el => el.classList.toggle("active", el.dataset.view === view));
    const titleKey = view === "setup" ? "setupTitle" : `${view}Title`;
    $("#page-title").textContent = t(titleKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $("#lang-toggle").textContent = t("languageName");
    if (state.results.length) renderAll();
    showView(state.currentView);
    validateSetup();
  }

  function downloadTemplate() {
    const link = document.createElement("a");
    link.href = "assets/HM_Attendance_Inputs_Template.xlsx";
    link.download = "HM_Attendance_Inputs_Template.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast(t("templateDone"));
  }

  function exportExcel() {
    const daily = state.results.map(row => ({
      [t("code")]: row.code, [t("name")]: row.name, [t("job")]: row.job, [t("department")]: row.department,
      [t("date")]: dateKey(row.date), [t("day")]: DAY_NAMES[state.lang][row.date.getDay()],
      [t("dayType")]: dayTypeLabel(row.dayType), [t("shift")]: row.shift,
      [t("officialIn")]: formatTime(row.officialIn), [t("officialOut")]: formatTime(row.officialOut),
      [t("inMovement")]: row.actualIn ? `${t("attendanceMovement")} ${formatTime(row.actualIn)}` : t("missingIn"),
      [t("outMovement")]: row.actualOut ? `${t("departureMovement")} ${formatTime(row.actualOut)}` : t("missingOut"),
      [t("workMins")]: row.workMinutes, [t("lateMinutes")]: row.lateMinutes, [t("earlyMins")]: row.earlyMinutes,
      [t("regularOvertime")]: row.regularOvertimeMinutes, [t("restOvertime")]: row.restOvertimeMinutes,
      [t("holidayOvertime")]: row.holidayOvertimeMinutes, [t("totalOvertime")]: row.overtimeMinutes,
      [t("leaveType")]: row.leave ? leaveTypeLabel(row.leave.type) : "", [t("leaveDays")]: row.leave && row.dayType === "leave" ? 1 : 0,
      [t("permissionType")]: row.permissions.map(item => item.rawType || permissionTypeLabel(item.type)).join(" + "),
      [t("permissionFrom")]: row.permissions.map(item => item.from === null ? "" : minutesText(item.from)).filter(Boolean).join(" + "),
      [t("permissionTo")]: row.permissions.map(item => item.to === null ? "" : minutesText(item.to)).filter(Boolean).join(" + "),
      [t("permissionHours")]: +(row.permissionMinutes / 60).toFixed(2),
      [t("holidayName")]: row.holiday ? row.holiday.name : "",
      [t("notes")]: row.note ? (I18N[state.lang][row.note] || row.note) : "",
      [t("sourceRows")]: row.sourcePunches, [t("firstPunch")]: formatTime(row.sourceFirst), [t("lastPunch")]: formatTime(row.sourceLast)
    }));
    const summary = state.summary.map(row => ({
      [t("code")]: row.code, [t("name")]: row.name, [t("job")]: row.job, [t("department")]: row.department,
      [t("attendanceDays")]: row.attendanceDays, [t("completeDays")]: row.completeDays, [t("absenceDays")]: row.absenceDays,
      [t("missingDays")]: row.missingDays, [t("annualLeaveDays")]: row.annualLeaveDays, [t("unpaidLeaveDays")]: row.unpaidLeaveDays,
      [t("sickLeaveDays")]: row.sickLeaveDays, [t("otherLeaveDays")]: row.otherLeaveDays, [t("leaveDays")]: row.leaveDays,
      [t("permissionDays")]: row.permissionDays, [t("permissionHours")]: +(row.permissionMinutes / 60).toFixed(2),
      [t("lateDays")]: row.lateDays, [t("lateMinutes")]: row.lateMinutes,
      [t("earlyDays")]: row.earlyDays, [t("earlyMinutes")]: row.earlyMinutes, [t("overtimeDays")]: row.overtimeDays,
      [t("regularOvertime")]: row.regularOvertimeMinutes, [t("restOvertime")]: row.restOvertimeMinutes,
      [t("holidayOvertime")]: row.holidayOvertimeMinutes, [t("totalOvertime")]: row.overtimeMinutes,
      [t("workHours")]: +(row.workMinutes / 60).toFixed(2)
    }));
    const wb = XLSX.utils.book_new();
    appendJsonSheet(wb, daily, "Attendance_Report", 18);
    appendJsonSheet(wb, summary, "Employees_Summary", 18);
    appendJsonSheet(wb, state.punches.map(p => ({
      [t("code")]: p.code, [t("name")]: p.name, [t("department")]: p.department,
      [t("date")]: `${dateKey(p.dt)} ${formatTime(p.dt)}`, [state.lang === "ar" ? "نوع الحركة" : "Movement type"]: p.movement
    })), "Raw_Movements", 22);
    appendJsonSheet(wb, state.employees.map(e => ({
      [t("code")]: e.code, [t("name")]: e.name, [t("job")]: e.job, [t("department")]: e.department,
      [t("hireDate")]: e.hireDate ? dateKey(e.hireDate) : "", [t("shift")]: e.shift,
      [t("officialIn")]: minutesText(e.start), [t("officialOut")]: minutesText(e.end), [t("rest")]: e.restRaw
    })), "Employees", 20);
    appendJsonSheet(wb, state.shiftSchedules.map(item => ({
      [t("code")]: item.code,
      [state.lang === "ar" ? "من تاريخ" : "From date"]: dateKey(item.from),
      [state.lang === "ar" ? "إلى تاريخ" : "To date"]: dateKey(item.to),
      [t("shift")]: item.shift, [t("officialIn")]: minutesText(item.start), [t("officialOut")]: minutesText(item.end),
      [state.lang === "ar" ? "أيام الراحة" : "Rest days"]: item.restRaw
    })), "Shift_Schedule", 20);
    appendJsonSheet(wb, state.leaves.map(item => ({
      [t("code")]: item.code, [t("leaveType")]: leaveTypeLabel(item.type),
      [state.lang === "ar" ? "تاريخ البداية" : "Start date"]: dateKey(item.start),
      [state.lang === "ar" ? "تاريخ النهاية" : "End date"]: dateKey(item.end), [t("leaveDays")]: item.days, [t("notes")]: item.notes
    })), "Leaves", 20);
    appendJsonSheet(wb, state.permissions.map(item => ({
      [t("code")]: item.code, [t("date")]: dateKey(item.date), [t("permissionType")]: item.rawType || permissionTypeLabel(item.type),
      [t("permissionFrom")]: item.from === null ? "" : minutesText(item.from), [t("permissionTo")]: item.to === null ? "" : minutesText(item.to),
      [t("permissionHours")]: +(item.minutes / 60).toFixed(2), [t("notes")]: item.notes
    })), "Permissions", 20);
    appendJsonSheet(wb, state.holidays.map(item => ({
      [t("date")]: dateKey(item.date), [t("holidayName")]: item.name, [t("notes")]: item.notes
    })), "Official_Holidays", 24);
    XLSX.writeFile(wb, `HM_Attendance_${dateKey(state.settings.start)}_${dateKey(state.settings.end)}.xlsx`);
    toast(t("exportDone"));
  }

  function appendJsonSheet(workbook, data, name, defaultWidth) {
    const sheet = XLSX.utils.json_to_sheet(data.length ? data : [{}]);
    if (sheet["!ref"]) sheet["!autofilter"] = { ref: sheet["!ref"] };
    const columns = data.length ? Object.keys(data[0]).length : 1;
    sheet["!cols"] = Array.from({ length: columns }, () => ({ wch: defaultWidth }));
    XLSX.utils.book_append_sheet(workbook, sheet, name);
  }

  function minutesText(value) { return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`; }
  function dayTypeLabel(type) { return t(type === "holiday" ? "officialHoliday" : type === "leave" ? "leave" : type === "rest" ? "rest" : "present"); }
  function leaveTypeLabel(type) { return t(type === "annual" ? "annualLeaveDays" : type === "unpaid" ? "unpaidLeaveDays" : type === "sick" ? "sickLeaveDays" : "otherLeaveDays"); }
  function permissionTypeLabel(type) {
    if (state.lang === "ar") return type === "arrival" ? "إذن تأخير حضور" : type === "early" ? "إذن خروج مبكر" : "إذن أثناء اليوم";
    return type === "arrival" ? "Late-arrival permission" : type === "early" ? "Early-leave permission" : "Midday permission";
  }
  function formatDisplayDate(date) { return new Intl.DateTimeFormat(state.lang === "ar" ? "ar-EG" : "en-GB", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date); }
  function shortName(name) { const parts = String(name).split(/\s+/); return parts.slice(0, 3).join(" "); }
  function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[ch])); }
  function escapeAttr(value) { return escapeHtml(value); }
  function toast(message) { const el = $("#toast"); el.textContent = message; el.classList.add("show"); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("show"), 3200); }

  function wireDropZone() {
    const zone = $(".drop-zone");
    ["dragenter", "dragover"].forEach(name => zone.addEventListener(name, event => { event.preventDefault(); zone.classList.add("dragging"); }));
    ["dragleave", "drop"].forEach(name => zone.addEventListener(name, event => { event.preventDefault(); zone.classList.remove("dragging"); }));
    zone.addEventListener("drop", event => { const file = event.dataTransfer.files[0]; if (file) importPunches(file); });
  }

  function initialize() {
    applyLanguage();
    $$(".nav-item").forEach(button => button.addEventListener("click", () => !button.disabled && showView(button.dataset.view)));
    $("#lang-toggle").addEventListener("click", () => { state.lang = state.lang === "ar" ? "en" : "ar"; localStorage.setItem("hm-attendance-lang", state.lang); applyLanguage(); });
    $("#punch-file").addEventListener("change", event => event.target.files[0] && importPunches(event.target.files[0]));
    $("#employees-file").addEventListener("change", event => event.target.files[0] && importEmployees(event.target.files[0]));
    $("#download-template").addEventListener("click", downloadTemplate);
    $("#generate-report").addEventListener("click", calculateReports);
    $("#export-button").addEventListener("click", exportExcel);
    $("#daily-search").addEventListener("input", () => { state.page = 1; renderDaily(); });
    $("#daily-status-filter").addEventListener("change", () => { state.page = 1; renderDaily(); });
    $("#summary-search").addEventListener("input", renderSummary);
    $("#prev-page").addEventListener("click", () => { state.page -= 1; renderDaily(); });
    $("#next-page").addEventListener("click", () => { state.page += 1; renderDaily(); });
    $$(".date-entry").forEach(input => {
      input.addEventListener("input", () => { input.value = maskDateInput(input.value); });
      input.addEventListener("blur", () => {
        const parsed = parseInputDate(input.value);
        if (parsed) input.value = formatInputDate(parsed);
      });
    });
    wireDropZone();
  }

  initialize();
  window.HMPipeline.install({state,parseTime,dateKey,formatInputDate,formatTime,dayTypeLabel,validateSetup,calculateReports,showView,importEmployees,importPunches});
})();

