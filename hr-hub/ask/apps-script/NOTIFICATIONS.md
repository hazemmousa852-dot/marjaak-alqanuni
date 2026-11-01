# Owner notifications

The bound Apps Script has one time-driven trigger: `sendOwnerDigest`, deployment **Head**, **Every hour**. The published web app stays on its existing deployment; the scheduled function reads the same private spreadsheet directly.

Run `enableOwnerNotifications` once as the sheet owner to initialize the checkpoint. The spreadsheet menu offers enable, disable and manual digest checks. Enabling again preserves the checkpoint. Old questions before initial activation do not generate alerts.

A digest is sent only when new timestamped questions arrive. It contains the number of questions, up to 20 question IDs/categories, and the private spreadsheet link. It excludes question text, names, contact details, answers and tracking tokens. Recipient is the configured `OWNER_EMAIL`, not request data.

The sender reserves 20 daily email recipients for answers and sends at most once per hour. On quota exhaustion or send failure, the checkpoint stays unchanged; the next scheduled run retries. On successful send, the checkpoint advances under the same script lock used for submissions. The trigger runs while the site and spreadsheet are closed. Gmail/mobile push depends on the owner's device notification settings.
