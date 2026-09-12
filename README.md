# Atrium — source files

The same system as `content-ops-platform.html`, split into three files so it can
be worked on properly.

```
index.html    the markup — the app shell only (about 50 lines)
styles.css    every style: design tokens, layout, components, charts, print
app.js        everything else: data, views, charts, interaction
```

## Opening it

Double-click `index.html`. Keep all three files in the same folder — the HTML
looks for `styles.css` and `app.js` beside it. No server, no build step, no
install.

If you move a file, update the two lines at the top and bottom of `index.html`.

## What is in each file

### index.html
Only the shell: the sidebar container, the top bar, and the empty `<main>` that
every screen is drawn into. Almost nothing is written here by hand — the
elements with `id` attributes are the hooks the script fills in:

| id | filled with |
|----|-------------|
| `brandMark`, `brandWord` | the logo, drawn as vectors |
| `nav` | the sidebar menu |
| `view` | whichever screen is open |
| `clockDay`, `clockTime` | the live date and time |
| `userChip` | the signed-in person |
| `layers`, `toasts`, `tip` | drawers, modals, messages, tooltips |

### styles.css
Read it top to bottom; it is ordered deliberately.

1. **Design tokens** — the `:root` block. Colours, radii, shadows, sidebar
   width. Change a value here and it changes everywhere. The dark theme is the
   same tokens redefined under `html[data-theme="dark"]`.
2. **Layout** — `.app` (the page grid), `.rail` (sidebar), `.topbar`, `.view`.
3. **Components** — cards, tables, KPIs, badges, meters, the kanban board, the
   calendar, drawers, modals, the command palette, toasts.
4. **Charts** — the classes the hand-built chart engine uses.
5. **Responsive** — breakpoints at 1380, 1180, 900 and 640px.
6. **Print** — what disappears when you print to PDF.

No framework and no build step. No Tailwind, no Bootstrap, no preprocessor.

### app.js
Laid out in numbered sections, in dependency order:

| Section | What it does |
|---------|--------------|
| 1 | Icons — every icon as an inline SVG path |
| 2 | Helpers and formatters — pesos, dates, percentages |
| 3 | Brand artwork, company record, the data model |
| 4 | Metrics — margins, ROI, workload, business health, written insights |
| 5 | Chart engine — line, column, bar, donut, sparkline, ring |
| 6 | UI components — cards, tables, KPIs, drawers, toasts |
| 7 | Navigation map and the built-in guide text |
| 8–31 | One function per screen (`V.dashboard`, `V.revenue`, and so on) |
| 32 | Detail drawers |
| 33–37 | Router, interaction, command palette, clock, start-up |

## How a screen works

Every screen is a function that returns an HTML string:

```js
V.revenue = () => pageHead('Revenue', 'subtitle', buttons)
  + UI.kpi({...})
  + UI.table({...});
```

`render()` calls the function for the current screen and drops the result into
`#view`. There is no virtual DOM and no reactivity — changing data and calling
`render()` redraws the screen. For a system this size that is fast and easy to
follow.

Clicks are handled by one listener on `document`, matched by `data-` attributes:

| attribute | does |
|-----------|------|
| `data-go="revenue"` | opens a screen |
| `data-open="content:CNT-001"` | opens a detail drawer |
| `data-act="new-content"` | runs an action |
| `data-seg="fin\|Cash"` | switches a tab |
| `data-sort="revTbl\|amount"` | sorts a table |

To add a screen: write `V.yourScreen`, add it to `NAV`, add an entry to `GUIDE`.

## Where the numbers come from

Monthly figures are **calculated**, never stored twice. `recomputeSeries()`
reads the revenue and expense ledgers and the published content, then fills
`SERIES`. It runs on every render, so anything entered shows up immediately.
If a figure ever looks wrong, that function is where to look first.

## Known limits

- **Nothing is saved.** Closing the tab clears everything. This is the next
  thing to build — either save-to-file, or the backend described in Part 6 of
  the manual.
- **Roles are not enforced.** They are recorded, but with no sign-in anyone who
  opens the file sees everything.
- **No platform connection.** YouTube figures are typed in for now.
- Only the "New content" and "Invite someone" forms write records. The other
  create forms open but do not save yet.
