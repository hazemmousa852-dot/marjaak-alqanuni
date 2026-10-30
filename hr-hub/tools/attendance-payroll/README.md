# Attendance to Payroll — Hazem Moussa

A browser-local integration of HM Attendance Intelligence and the payroll sheet builder.

- XLS/XLSX/CSV punch and employee import; text employee codes preserve leading zeros.
- Shifts spanning midnight, dated shift schedules, leave, permissions and holidays.
- Separate day/night after-shift overtime by configurable clock interval.
- Explicit decisions and reasons for absence, missing punches, multi-punch days and exceptional days.
- Monthly payroll preview and approval; input edits revoke approval.
- XLSX export: instructions, settings, employees, variables, payroll, summary, payslip, daily attendance, review trail and raw movements.

Tax, insurance, fund deductions and special rest/holiday/sick-leave settlements are entered manually after review. The app does not compute their statutory entitlements. Ordinary overtime is after-shift only; the configured overtime-start minutes are excluded. Monthly salary proration starts with an editable calendar-day fraction. This is not a general legal rule.

Data stays in memory and is lost when the page is closed. Download the workbook before leaving. There is no server, login, database or automatic backup. Excel formulas recalculate on open. Keep an approved copy before editing the exported workbook.

Runtime XLSX parsing uses the same vendored SheetJS library as HM Attendance Intelligence. Workbook export uses the local OOXML serializer from Payroll Sheet Builder.

Run checks from this directory:

    node tests/core.test.cjs
    node tests/engine.test.cjs
    node tests/workbook.test.cjs

The workbook test writes a disposable file under /tmp for calculation verification.
