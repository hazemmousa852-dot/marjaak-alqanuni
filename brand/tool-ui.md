# Hazem Moussa tools — identity v1

Canonical stylesheet: `brand/tool-ui.css`.
Pilot: Payroll Sheet Builder, Industrial Labor Guide, Employment Contract Generator.

## Palette

| Purpose | Color |
| --- | --- |
| Navigation and headings | `#071827` |
| Primary actions | `#16746e` |
| Decorative gold | `#c8a365` |
| Canvas | `#f3f6f7` |
| Surface | `#ffffff` |
| Body text | `#173449` |
| Secondary text | `#536978` |
| Border | `#d9e3e8` |

Cairo is the interface font. Controls have 10px corners, panels 16px corners.
Primary-action white text contrast is 5.59:1; muted text on white is 5.74:1.

## Integration

1. Load the versioned stylesheet after the app's stylesheets.
2. Add `data-hm-theme="v1"` to body, and `.hm-ui` only to interface containers.
3. Use `.hm-panel`, `.hm-primary`, `.hm-secondary`, `.hm-result`, `.hm-notice`, and `.hm-app-toolbar` for shared components.
4. Keep generated document DOM outside `.hm-ui`. Do not map the app's original root document tokens globally.
5. Keep the tools-hub navigation script for consistent cross-tool navigation.

All rules are in `@media screen`. No exported workbook code, contract templates,
PDF/Word generators, legal content, or calculation functions are changed by the theme.
Actual `.contract-page` DOM remains outside interface wrappers, including when rendered
for PDF capture using screen media. Error/destructive states keep their original colors.

Other tools are not opted in. Integrate each adapter and check its layout/outputs before extending coverage.

React pilots vendor a byte-identical copy as `client/src/tool-ui.css`, imported after index.css. Sync these copies when updating the canonical source.
