# Screenshot Capture List

This note lists the screenshots that still need to be recaptured from the **C++ application** to replace the older **Python application** screenshots used in the documentation site.

Documentation repository: `~/Desktop/moilcalib_documentation`
Target folder for new images: `versioned_docs/version-1.1/assets/images/`

## Status summary

| Item | Count |
|---|---:|
| Screenshots already replaced with C++ captures | 4 |
| Python screenshots still in use | 60 |
| Of those, actual app UI that needs recapture | 47 |
| Of those, external or non-UI images that can stay | 13 |
| New C++ features with no screenshot at all | 2 |

## Naming convention

The four replaced images use lowercase kebab-case describing the window and the view, for example:

```
calibration-result-main-window.png
calibration-result-parameter-view.png
calibration-result-overlap-view.png
calibration-result-result-view.png
```

Please follow the same pattern for new captures.
Avoid the old `img_NN.png` style, because those names carry no meaning and made it hard to tell which screenshot belonged to which part of the app.

## Capture conditions

To keep the documentation consistent, please capture with calibration data **loaded**, unless the entry explicitly says "empty".
Several existing figures deliberately show both the empty and the filled state, and those pairs are marked below.

---

# Priority 1 — New features with no screenshot yet

These two are the most valuable, because nothing in the documentation shows them at all.

| # | Suggested name | What to capture |
|---:|---|---|
| 1 | `calibration-result-graphs-tab.png` | The `Graphs` tab with all three embedded plots visible: **Shift of Entrance Pupil**, **Distance vs IH Range**, and **Distance vs Alpha**. Capture with data loaded so the plots are not empty. |
| 2 | `calibration-result-clean-noise-dialog.png` | The **Clean Noise** dialog, opened from any round. Show the direction groups (`N & S`, `W & E`, diagonals), the min/max band fields with auto-detected values filled in, and the "Apply to ALL rounds with data" checkbox. |

---

# Priority 2 — Main Cali Result window

This is the largest group.
All of these come from the **Main Cali Result** window, so they can be captured in one sitting.

## 2.1 Header and data management

| Old image | Suggested name | What to capture |
|---|---|---|
| `img_28.png` | `cali-result-header-area.png` | Close-up of the header: Cali Folder field, Select Cali System dropdown, and the button block. Note the C++ header no longer has the three "Show graph" buttons. |
| `img_48.png` | `cali-result-loaded-data.png` | Whole window after a full calibration folder is loaded, showing the tree, the `*` round marks, and a filled table. |
| `img_58.png` | `cali-result-select-system-dropdown.png` | The **Select Cali System** dropdown expanded, showing the available system options. |

## 2.2 Cali Folder input flow

| Old image | Suggested name | What to capture |
|---|---|---|
| `img_29.png` | `cali-folder-url-pasted.png` | A remote URL pasted into the Cali Folder field. |
| `img_30.png` | `cali-folder-url-selected.png` | The URL selected in the field before processing finishes. |
| `img_31.png` | `cali-folder-local-cache.png` | The field after the URL resolves to a local cache path. |
| `img_32.png` | `cali-folder-tree-view.png` | The tree view showing the calibration folder structure. |

## 2.3 File dialogs

| Old image | Suggested name | What to capture |
|---|---|---|
| `img_46.png` | `dialog-load-all-excel.png` | Folder selection dialog opened by **Load All Excel**. |
| `img_45.png` | `dialog-load-excel.png` | File selection dialog opened by **Load Excel**, with one `.xlsx` selected. |
| `img_44.png` | `dialog-save-to-excel.png` | Save dialog opened by **Save to Excel**. |
| `img_33.png` | `dialog-clear-all-table-confirm.png` | The confirmation dialog shown by **Clear All Table**. |

## 2.4 Database window

| Old image | Suggested name | What to capture |
|---|---|---|
| `img_55.png` | `database-calibration-data-window.png` | The **Calibration Data** window with its search filters and record list. |
| `img_56.png` | `database-right-click-menu.png` | The right-click menu on a record, showing **Load to System** and **Open URL**. |
| `img_54.png` | `database-source-select-dialog.png` | The dialog asking which camera folder or file to open. |

## 2.5 Round tabs and popups

| Old image | Suggested name | What to capture |
|---|---|---|
| `img_37.png` | `cali-result-tab-strip.png` | The tab strip. Make sure the `Graphs` tab is visible, since it is new. |
| `img_60.png` | `cali-result-round-loaded.png` | Round tabs showing the `*` loaded marker. |
| `img_61.png` | `cali-result-round-off.png` | A round tab showing the `[OFF]` disabled state. |
| `img_62.png` | `cali-result-round-context-menu.png` | The right-click menu on a round tab. |
| `img_63.png` | `cali-result-zfl-ih-popup.png` | The single-round ZFL-IH popup graph. |
| `img_64.png` | `cali-result-overlap-popup.png` | The single-round Overlap popup graph. |

## 2.6 Panels in the "Aggr by Distance and Range" tab

| Old image | Suggested name | What to capture |
|---|---|---|
| `img_38.png` | `panel-interval-result-table.png` | The interval result table, empty. Columns: IH Range, Minimum Aggregation, Distance (mm), Total Sampling. |
| `img_68.png` | `panel-interval-result-filled.png` | The same table filled after running **Min Aggregation by interval**. Used in two places in the docs, so one capture covers both. |
| `img_39.png` | `panel-vgap-hgap.png` | The V_Gap and H_Gap panel. |
| `img_40.png` | `panel-pixel-size-distance.png` | The Pixel Size and Dis / Round panel. |
| `img_41.png` | `panel-min-aggregation-interval.png` | The Min Aggregation by Interval panel, empty. |
| `img_69.png` | `panel-min-aggregation-filled.png` | The same panel with example input values filled in. |
| `img_42.png` | `panel-aggr-by-range-distance.png` | The Aggr by Range and Distance panel, empty. |
| `img_70.png` | `panel-aggr-by-range-filled.png` | The same panel with an example result. |
| `img_43.png` | `panel-range-analysis-matrix.png` | The Range Analysis Matrix, including Range Window, History Distance, and Save Distance History. |
| `img_57.png` | `panel-range-history-values.png` | The Range Window and History Distance area with calculated values filled in. |

## 2.7 Graphs previously opened from header buttons

These three now live in the `Graphs` tab.
Capture each plot individually, in addition to the whole-tab capture in Priority 1.

| Old image | Suggested name | What to capture |
|---|---|---|
| `img_49.png` | `graph-entrance-pupil-shift.png` | The **Shift of Entrance Pupil** plot with ray curves drawn. |
| `img_50.png` | `graph-distance-vs-ih-range.png` | The **Distance vs IH Range** plot with range points labelled. |
| `img_51.png` | `graph-distance-vs-alpha.png` | The **Distance vs Alpha** plot. |

---

# Priority 3 — Result Table view

| Old image | Suggested name | What to capture |
|---|---|---|
| `img_80.png` | `result-table-control-row.png` | The control row close-up. **Must include the new Clean Noise button** next to Aggr Round. |
| `img_81.png` | `result-table-formula-panel.png` | The formula panel close-up. **Must include the new Calculate Result button** at the top. |
| `img_79.png` | `result-table-empty.png` | The result table in its empty state. |
| `img_88.png` | `result-table-filled.png` | The result table after calculation, showing Alpha and ZFL values. |
| `img_89.png` | `result-table-column-structure.png` | The table header row showing the full column structure and the black separator columns. |

---

# Priority 4 — Parameter view

| Old image | Suggested name | What to capture |
|---|---|---|
| `img_72.png` | `parameter-ih-alpha-graph.png` | The IH-Alpha graph area, empty. **Include the green Information button** below it, which is new. |
| `img_75.png` | `parameter-ih-alpha-filled.png` | The IH-Alpha graph with plotted calibration points and the fitted curve. |
| `img_73.png` | `parameter-zfl-ih-graph.png` | The ZFL-IH graph area, empty. |
| `img_76.png` | `parameter-zfl-ih-filled.png` | The ZFL-IH graph with plotted data. |
| `img_74.png` | `parameter-panel.png` | The parameter panel with camera parameters filled in after a fit. |

---

# Priority 5 — Overlap view

| Old image | Suggested name | What to capture |
|---|---|---|
| `img_71.png` | `overlap-view-loaded.png` | The Overlap tab with calibration data loaded, so both the Overlap graph and the Aggregation vs. Distance graph show real curves. |

---

# Priority 6 — Other windows

These are outside the Cali Result window.
Please confirm whether each of these windows exists in the C++ application before capturing.

| Old image | Used in | Suggested name | What to capture |
|---|---|---|---|
| `img_11.png` | `installation/client.md` | `client-main-window.png` | The Calibration System Client main window. |
| `img_101.png` | `verification/setup-center.md` | `setup-center-window.png` | The Setup Center window. |
| `img_99.png` | `verification/3d-verification.md` | `3d-verification-anypoint.png` | Anypoint detection on the Camera Right tab. |
| `img_100.png` | `verification/3d-verification.md` | `3d-verification-ori-det.png` | ORI_DET manual corner picking on the original images. |

---

# Images that do NOT need recapture

These 13 are not C++ application UI, so the existing files remain valid.
No action needed unless the underlying content itself changes.

| Image | Why it can stay |
|---|---|
| `img_1.png` | Git installation page, external website. |
| `img_47.png` | Example Excel layout, shown in a spreadsheet application. |
| `img_67.png` | Interval CSV opened in LibreOffice Calc. |
| `img_53.png` | OneDrive folder opened in a browser. |
| `img_52.png` | Terminal output after pressing Stop. Recapture only if the message text changed in the C++ build. |
| `img_65.png` | CSV save dialog. This is an OS dialog, so it is only worth recapturing if the platform differs. |
| `img_66.png` | CSV saved confirmation message. Same reasoning as above. |
| `img_103.png` | Figure 2 from Gennery 2006, an academic paper illustration. Must not be replaced. |
| `img_102.png` | Ray curve output graph. Recapture only if the plot styling changed. |
| `img_97.png` | Captured positive shot from the fisheye camera. Camera output, not UI. |
| `img_98.png` | Captured negative shot from the fisheye camera. Camera output, not UI. |
| `img_91.png` | Generated calibration pattern. Pattern output, not UI. |
| `img_28.png` | Listed in section 2.1 above. It also appears in `reload-calibration-data.md`, so one recapture covers both pages. |

---

# After capturing

1. Copy the new files into `versioned_docs/version-1.1/assets/images/`.
2. Update the `![alt](../../assets/images/...)` reference on each page listed above.
3. On `main-window-overview.md`, remove the "Screenshots pending replacement" warning box once every figure on that page is replaced.
4. Run `npm run build` in the documentation repository. The build fails on broken links and is the fastest way to catch a mistyped path.
5. Delete the replaced `img_NN.png` files only after the build passes.
