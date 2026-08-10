---
id: main-window-overview
slug: /calibration/cali-result/main-window-overview
title: Main Window Overview
sidebar_label: Main Window Overview
sidebar_position: 2
---

# Main Window Overview

The **Main Cali Result** window is used to load calibration data, manage round tables, calculate calibration results, inspect graph behavior, and search the best distance based on aggregation values.

<Figure id="fig-main-cali-result-overview" number="1" title="Main Cali Result Overview" caption="Main Cali Result window divided into 9 main functional areas.">

![Main Cali Result overview with 9 main sections](../../assets/images/calibration-result-main-window.png)

</Figure>

---

## Page Structure

| No. | Section | Main Purpose |
|---:|---|---|
| 1 | [Header & Data Management](#1-header--data-management) | Load, update, clear, save, and manage calibration data. In the screenshot this is split into the folder/tree area **1** and the button block **2**. |
| 2 | [Round & Tab Selection](#2-round--tab-selection) | Switch between current, round, parameter, overlap, aggregation, graphs, and test pages. |
| 3 | [Result Table View](#3-result-table-view) | Display IH range, minimum aggregation, distance, and total sampling. |
| 4 | [V_Gap & H_Gap Settings](#4-v_gap--h_gap-settings) | Configure physical gap values used for side-screen calculation. |
| 5 | [Pixel Size & Distance / Round](#5-pixel-size--distance--round) | Configure pixel size conversion and round distance interval. |
| 6 | [Min Aggregation by Interval](#6-min-aggregation-by-interval) | Search minimum aggregation over IH percentage intervals. |
| 7 | [Aggr by Range and Distance](#7-aggr-by-range-and-distance) | Calculate aggregation or search distance for a selected IH range. |
| 8 | [Range Analysis Matrix](#8-range-analysis-matrix) | Analyze global and range-based distance / aggregation results. |

<div className="custom-note custom-warning">

<div className="custom-note-title">Numbering note</div>

The screenshot above is from the C++ application and labels **9** areas, because the header is split into the Cali Folder / tree area (**1**) and the data-management button block (**2**). The section numbering on this page still follows the original 8-section grouping, so screenshot label **N** corresponds to page section **N - 1** from label 3 onward. The [overview page](./index.md) uses the 9-area numbering that matches the screenshot exactly.

</div>

<div className="custom-note custom-important">
  <div className="custom-note-title">Main Goal</div>
  <p>The main goal of this window is to find the distance value that produces the lowest aggregation value. A lower aggregation value usually means the IH-ZFL curve is smoother and the calibration result is more stable.</p>
</div>

---

## Terminology

| Term | Meaning |
|---|---|
| IH / ICT | Image-height or intersection-coordinate value used as the X-axis source for curve analysis. |
| PCT | Pattern calibration target value loaded from the calibration pattern data. |
| PCT_CAL | Converted PCT value after pixel-size conversion. |
| Alpha | Angle value calculated from distance, PCT_CAL, V_Gap, and H_Gap. |
| ZFL | Calculated focal-length related value used in the IH-ZFL curve. |
| Aggr | Aggregation value used to measure IH-ZFL curve smoothness. Lower is usually better. |
| Distance | Distance value used in Alpha and ZFL calculation. |
| Range | IH percentage interval used for aggregation analysis. |

---

## Figure Reference List

Use the links below when you want to reference a figure from another part of this page.

<div className="custom-note custom-warning">

<div className="custom-note-title">Screenshots pending replacement</div>

Every figure still named `img_*.png` is a screenshot of the older Python application, and its layout and wording may no longer match what you see on screen. These are the figures that show calibration results, so they are waiting on a capture made with real data. Figure 4 is the one exception: it shows a spreadsheet, not the application, so it stays as it is.

</div>

| Figure | Name | Image File |
|---|---|---|
| [Figure 1](#fig-main-cali-result-overview) | Main Cali Result Overview | `calibration-result-main-window.png` |
| [Figure 2](#fig-header-data-management) | Header & Data Management | `main-window-overview-header-management.png` |
| [Figure 3](#fig-loaded-data-example) | Loaded Data Example | `cali-result-loaded-data.png` |
| [Figure 4](#fig-excel-layout-example) | Excel Layout Example | `img_47.png` |
| [Figure 5](#fig-calibration-data-window) | Calibration Data Window | `img_55.png` |
| [Figure 6](#fig-graphs-info-entrance-pupil) | Information — Entrance Pupil | `graphs-info-entrance-pupil.png` |
| [Figure 7](#fig-range-history-source-data) | Range Window and History Distance Source Data | `panel-range-history-values.png` |
| [Figure 8](#fig-entrance-pupil-ray-curve) | Entrance Pupil Ray Curve | `img_49.png` |
| [Figure 9](#fig-distance-vs-ih-range) | Distance vs IH Range Graph | `img_50.png` |
| [Figure 10](#fig-distance-vs-alpha) | Distance vs Alpha Graph | `img_51.png` |
| [Figure 11](#fig-round-tab-selection) | Round & Tab Selection | `cali-result-tab-strip.png` |
| [Figure 12](#fig-zfl-ih-popup) | ZFL-IH Popup Graph | `img_63.png` |
| [Figure 13](#fig-overlap-popup) | Overlap Popup Graph | `img_64.png` |
| [Figure 14](#fig-result-table-view) | Result Table View | `panel-interval-result-table.png` |
| [Figure 15](#fig-result-table-after-interval) | Result Table Output from Min Aggregation by Interval | `img_68.png` |
| [Figure 16](#fig-vgap-hgap-settings) | V_Gap & H_Gap Settings | `panel-vgap-hgap.png` |
| [Figure 17](#fig-pixel-size-distance-round) | Pixel Size & Distance / Round | `panel-pixel-size-distance.png` |
| [Figure 18](#fig-min-aggregation-by-interval) | Min Aggregation by Interval | `panel-min-aggregation-interval.png` |
| [Figure 19](#fig-min-aggregation-input-example) | Min Aggregation by Interval Input Example | `panel-min-aggregation-filled.png` |
| [Figure 20](#fig-aggr-by-range-distance) | Aggr by Range and Distance | `panel-aggr-by-range-distance.png` |
| [Figure 21](#fig-aggr-range-distance-example) | Aggr by Range and Distance Example | `img_70.png` |
| [Figure 22](#fig-range-analysis-matrix) | Range Analysis Matrix | `panel-range-analysis-matrix.png` |

---

## 1. Header & Data Management

<Figure id="fig-header-data-management" number="2" title="Header & Data Management" caption="Header & Data Management area with 5 numbered regions, shown with the Graphs tab open.">

![Header and Data Management section with 5 numbered regions and the Graphs tab open](../../assets/images/main-window-overview-header-management.png)

</Figure>

The **Header & Data Management** area is the top control section of the **Main Cali Result** window. Prepare the data here first: the result table, the parameter calculation, the aggregation tools, and the graphs all read whatever is loaded from this area.

The screenshot marks 5 regions:

| No. | Region | Contents |
|---:|---|---|
| 1 | Data source and tree | **Cali Folder** input, **Select Cali System** dropdown, and the **Tree View** file browser. |
| 2 | Data management | The button block and the **Single Distance** checkbox. |
| 3 | Shift of Entrance Pupil | Entrance pupil graph in the **Graphs** tab. |
| 4 | Distance vs IH Range | Distance versus IH range graph in the **Graphs** tab. |
| 5 | Distance vs Alpha | Distance versus alpha graph in the **Graphs** tab. |

<div className="custom-note custom-important">

<div className="custom-note-title">Graphs moved into a tab</div>

The three graph buttons that used to sit on the right of the header, **Show shift of entrance pupil**, **Show graph Dist vs IH Range**, and **Show graph Dist vs Alpha**, no longer exist. The same graphs are now embedded in the new **Graphs** tab as regions **3**, **4**, and **5**, each redrawn in place by its own **Update** button instead of opening a popup window.

</div>

### 1.1 Loaded Data Example

The screenshot below shows the window after a calibration result folder has been loaded. The tree view lists the round folders that were found, the round tabs carry `*` marks for the rounds that actually received data, and the active table is filled with PCT, ICT, alpha, and ZFL columns.

Only the rounds present in the folder are starred. In this example the folder holds rounds `1`, `3`, `5`, `7`, and `9`, so those five tabs are starred and the rest stay empty.

<Figure id="fig-loaded-data-example" number="3" title="Loaded Data Example" caption="Example of loaded calibration data with round tabs and result table.">

![Main Cali Result window after calibration data is loaded](../../assets/images/cali-result-loaded-data.png)

</Figure>

---

### 1.2 Recommended Workflow

<div className="custom-note custom-tip">

<div className="custom-note-title">Recommended Workflow</div>

1. Select the correct **Cali System** first.
2. Load calibration data using **Cali Folder**, **Tree View**, **Load Excel**, or **Load All Excel**.
3. Check whether the round tabs are loaded correctly. Loaded tabs usually show the `*` mark.
4. Use **Update Table** when the calibration image, center point, PCT, or ICT data has changed.
5. Enable **Single Distance** only when each round must use a different distance value.
6. Open the **Graphs** tab and press the **Update** button under each graph when checking distance, IH range, alpha, or entrance pupil behavior.
7. Save the final result using **Save to Excel**.

</div>

---

### 1.3 Quick Function Summary

| Region | UI Element | Main Purpose |
|---:|---|---|
| 1 | Cali Folder | Enter a local folder path, Excel file path, or URL. |
| 1 | Tree View | Browse calibration folders and load data by double-clicking. |
| 1 | Select Cali System | Select the calibration system configuration. |
| 2 | Load All Excel | Load Excel files from round folders `1` to `10`. |
| 2 | Clear Table | Clear only the currently active table. |
| 2 | Save to Excel | Save the active table as an `.xlsx` file. |
| 2 | Stop | Cancel running aggregation or range-search processes. |
| 2 | Load Excel | Load one Excel file into the active round table. |
| 2 | Clear All Table | Clear all round tables from `round_1` to `round_10`. |
| 2 | Update Table | Update center, PCT, ICT, and calculated result data. |
| 2 | Load Database | Open or load calibration result data from the database. |
| 2 | Single Distance | Use independent distance values for each round. |
| 3 | Update Shift of Entrance Pupil | Redraw the entrance pupil shift graph. |
| 3 | Information — Entrance Pupil | Open the theory dialog explaining Gennery's Figure 2. |
| 4 | Update Dist vs IH Range | Redraw the distance versus IH range graph. |
| 5 | Update Dist vs Alpha | Redraw the distance versus alpha graph. |

Regions **3**, **4**, and **5** are only visible while the **Graphs** tab is selected.

---

### 1.4 Cali Folder

#### Function

The **Cali Folder** field is used to manually enter the calibration data source. It can accept a local folder path, a local Excel file path, or a remote URL.

| Input Type | Example | System Behavior |
|---|---|---|
| Folder path | `/home/user/calibration_result` | Updates the tree view root folder. |
| Excel file path | `/home/user/calibration_result/1/result.xlsx` | Loads or dispatches the Excel file into the current workflow. |
| URL | `https://...` or copied remote file link | Resolves or downloads the remote file/folder into the local cache. |

Type or paste the source into the field and press **Enter**. When the input is a URL, the field switches to a local cache path once the download finishes, which means the data is now ready to load from the computer.

<div className="custom-note custom-tip">

<div className="custom-note-title">Note</div>

A folder path only updates the tree view root. To load data into the round table, use the **Tree View**, **Load Excel**, or **Load All Excel** after the folder appears.

</div>

---

### 1.5 Tree View

#### Function

The **Tree View** displays the selected calibration folder structure. It helps the user browse downloaded or local calibration data without manually searching through the file manager.

#### Behavior

| Double-Clicked Item | System Behavior |
|---|---|
| `.xlsx` file | Loads the selected Excel file into the current active round table. |
| Folder | Clears all round tables first, then loads Excel files from the selected folder when valid files are found. |

#### How to Use Tree View to Load One Excel File

1. Enter a calibration folder path or URL in **Cali Folder**.
2. Press **Enter** and wait until the folder appears in the tree view.
3. Expand the folder if needed.
4. Double-click one `.xlsx` file.
5. The file is loaded into the currently active round table.

#### How to Use Tree View to Load a Folder

1. Enter the main calibration folder path or URL in **Cali Folder**.
2. Press **Enter**.
3. Double-click the folder in the tree view.
4. The system clears all round tables.
5. The system loads valid Excel files from the selected folder.

<div className="custom-note custom-warning">

<div className="custom-note-title">Important</div>

Double-clicking a folder may clear existing round table data before loading the new folder. Save important data before loading another folder.

</div>

---

### 1.6 Load All Excel

#### Function

The **Load All Excel** button loads calibration result Excel files from round folders `1` to `10`. This is useful when the calibration result is already organized by round.

Clicking it opens a folder selection dialog. Choose the main folder that contains the round folders.

#### Required Folder Structure

```text
calibration_result/
├── 1/
│   └── result.xlsx
├── 2/
│   └── result.xlsx
├── 3/
│   └── result.xlsx
...
└── 10/
    └── result.xlsx
```
After loading, the same folder structure appears in the tree view on the left side of the window, and the loaded round tabs are marked with `*`.

#### How to Use

1. Click **Load All Excel**.
2. Select the main calibration result folder.
3. The system scans folders `1` to `10`.
4. The first `.xlsx` file in each folder is loaded.
5. Loaded round tabs are marked with `*`.
6. All calibration results are recalculated.

<div className="custom-note custom-tip">

<div className="custom-note-title">Note</div>

Use **Load All Excel** when the data is already separated into round folders. Use **Load Excel** when you only want to load one Excel file into the active tab.

</div>

---

### 1.7 Clear Table

#### Function

The **Clear Table** button clears only the currently active table. It does not clear the other round tabs.

#### How to Use

1. Select the round tab that should be cleared.
2. Click **Clear Table**.
3. The active table data is removed.
4. The tab `*` mark is removed.
5. The calculation result is updated.

---

### 1.8 Save to Excel

#### Function

The **Save to Excel** button exports the currently active table to an `.xlsx` file.

Select the round you want to save first. The button then opens a save dialog for the output folder and file name.

#### Saved Data

The export covers the columns from `round` to `ict_ne`:

```text
round
side
pct
ict_n
ict_s
ict_w
ict_e
ict_nw
ict_se
ict_sw
ict_ne
```
---

### 1.9 Load Excel

#### Function

The **Load Excel** button loads one `.xlsx` file into the active table. This is used when only one round needs to be loaded or replaced.

#### How to Use

1. Select the target round tab.
2. Click **Load Excel**.
3. Select one `.xlsx` file.
4. The active table is cleared.
5. The Excel data is loaded.
6. The active tab is marked with `*`.
7. All calibration results are recalculated.

#### Excel Requirement

The Excel file should contain the calibration result columns used by the table. The most important columns are:

| Column | Meaning | Unit / Content |
|---|---|---|
| `Round` | Round or sample index | Number |
| `Side` | Side or row index | Number |
| `PCT` | Pattern/calibration point distance | Usually `(mm)` |
| `N`, `S`, `W`, `E` | ICT values in four main directions | Pixel `(px)` |
| `NW`, `SE`, `SW`, `NE` | ICT values in diagonal directions | Pixel `(px)` |

The screenshot below shows an example Excel file layout that can be loaded into the calibration result table.

<Figure id="fig-excel-layout-example" number="4" title="Excel Layout Example" caption="Example Excel layout containing Round, Side, PCT, and ICT direction columns.">

![Example Excel layout for calibration result data](../../assets/images/img_47.png)

</Figure>

```text
Recommended sheet name: Sheet
Required content: Round, Side, PCT, N, S, W, E, NW, SE, SW, NE
Legacy import range used by some workflows: A3:K42
```
<div className="custom-note custom-warning">

<div className="custom-note-title">Important</div>

If the selected Excel file does not follow the expected format, the table may not load correctly. Make sure the workbook contains the required calibration result columns and that the PCT/ICT values are placed in the correct columns.

</div>

---

### 1.10 Clear All Table

#### Function

The **Clear All Table** button clears all round tables from `round_1` to `round_10`.

Before deleting anything the system asks for confirmation:

```text
Are you sure you want to delete data from All Tables (Round 1 - 10)?
```
Click **Yes** to clear all round tables, or **No** to cancel.

<div className="custom-note custom-warning">

<div className="custom-note-title">Data Deletion Warning</div>

This function clears all round data from `round_1` to `round_10`. Save important results before using **Clear All Table**.

</div>

---

### 1.11 Update Table

#### Function

The **Update Table** button updates the active table using the latest calibration image data and pattern data.

#### What It Updates

This function updates:

| Updated Data | Description |
|---|---|
| Image center values | Updates center-related line edit values into the active table. |
| Round number | Updates the current round information. |
| PCT column | Updates the PCT values from pattern data. |
| ICT 8-direction values | Updates ICT values for north, south, west, east, and diagonal directions. |
| Calculated result data | Recalculates the calibration result after the table is updated. |

#### How to Use

1. Prepare positive and negative calibration images.
2. Make sure the Pattern Generator data is available.
3. Select the target round tab.
4. Click **Update Table**.
5. The active table is refreshed.
6. All calibration calculations are updated.

#### ICT Data Source

```text
image_cali/capture_positive_shot.png
image_cali/capture_negative_shot.png
```
The 8-direction ICT values are:

```text
ict_n
ict_s
ict_w
ict_e
ict_nw
ict_se
ict_sw
ict_ne
```
---

### 1.12 Stop

#### Function

The **Stop** button is used to cancel a running calculation process. This is commonly used when aggregation, range counting, or range-search processing takes too long, or when the user started the wrong process and wants to stop it before the UI is updated.

#### Confirming the Cancellation

The terminal reports the cancellation. If the system was counting IH range data, it prints:

```text
range_1: canceled before UI update.
```
This message means the running process was cancelled before the table or UI was refreshed. It is a normal cancellation status, not a program error.

#### What Happens When Stop Is Pressed

When the user clicks **Stop**, the system sends a cancellation request to the active calculation process.

The stop logic may perform these actions:

- set the cancellation flag,
- stop active timers,
- stop range-based processing,
- prevent the next UI update,
- clear active UI highlights or active range states,
- exit the running loop safely.

#### How to Use

1. Start a long-running aggregation, range search, or calculation process.
2. Click **Stop**.
3. Wait until the current calculation step exits safely.
4. Check the terminal message to confirm that the process was cancelled.

<div className="custom-note custom-tip">

<div className="custom-note-title">Note</div>

The process may not stop at the exact same second the button is clicked. Some calculation steps need to finish their current iteration before the program can stop safely.

</div>

---

### 1.13 Load Database

#### Function

The **Load Database** button opens the **Calibration Data** window. This window is used to search calibration records, select a calibration dataset, load the dataset into the system, or open the related URL source.

#### Database Window Overview

After clicking **Load Database**, the **Calibration Data** window appears.

<Figure id="fig-calibration-data-window" number="5" title="Calibration Data Window" caption="Database window used to search and select calibration result records.">

![Calibration Data database window with search filters and calibration data list](../../assets/images/img_55.png)

</Figure>

The database window is divided into two main areas:

| Area | Description |
|---|---|
| **Search Information** | Used to filter data by Brand, Name, Number, FoV, Resolution, Calibration System, Calibrator, Calibration Date, ICX, and ICY. |
| **Calibration Data List** | Displays available calibration records from the database. Each row represents one calibration dataset. |

#### How to Search Data

1. Type a keyword or value into one of the search fields.
2. The table filters the matching calibration records.
3. Select the row that matches the camera and calibration result you want to use.
4. Continue with **Load to System** or **Open URL**.

#### Database Right-Click Menu

After selecting a row in the database table, right-click it to open the action menu, which provides two actions:

| Menu Action | Function |
|---|---|
| **Load to System** | Loads the selected calibration data into the calibration result system. |
| **Open URL** | Opens the related cloud or OneDrive URL for the selected calibration dataset. |

#### Open URL from Database

**Open URL** opens the dataset location in the browser. The page normally holds the round folders, the camera or calibration JSON file, and the Excel result file.

If one database record points to more than one source, a dialog asks which camera folder or file to open.

#### How to Use Load Database

1. Click **Load Database**.
2. The **Calibration Data** window opens.
3. Use the search fields to find the target calibration record.
4. Select the correct row in the data table.
5. Right-click the selected row.
6. Choose one of these actions:
   - **Load to System** to load the data into the application.
   - **Open URL** to open the dataset source in the browser.
7. If the selection dialog appears, choose the correct camera folder or file and click **OK**.

#### Typical Workflow

```text
Click Load Database
   ↓
Open Calibration Data window
   ↓
Search or filter calibration record
   ↓
Select the correct row
   ↓
Right-click the row
   ↓
Choose Load to System or Open URL
   ↓
If needed, select the target camera folder or file
   ↓
Load data into system or open the dataset URL
```
#### When to Use Load Database

Use **Load Database** when:

- the calibration result already exists in the database,
- the user does not want to manually paste a folder path or URL,
- the user wants to search data by camera brand, name, FoV, resolution, calibrator, or calibration date,
- the user wants to open the source folder from the stored URL,
- the user wants to load database-selected data directly into the calibration workflow.

<div className="custom-note custom-tip">

<div className="custom-note-title">Note</div>

Use **Open URL** when you only want to inspect or download the dataset from the browser. Use **Load to System** when you want the selected calibration data to be used directly by the application.

</div>

---

### 1.14 Single Distance

#### Function

The **Single Distance** checkbox changes how the distance value is calculated.

#### Mode 1 — Single Distance OFF

When unchecked, distance is calculated automatically:

```text
distance = base_distance + dis_per_round × (current_round - first_valid_round)
```
Use this mode when the distance difference between rounds follows the same step value.

#### Mode 2 — Single Distance ON

When checked, each round can use its own distance value, read from that round's own distance field.

Use this mode when each round has a manually measured or different distance value.

#### How to Use Automatic Distance

1. Leave **Single Distance** unchecked.
2. Enter the base distance.
3. Enter `Dis / Round`.
4. Update or calculate the result.

#### How to Use Per-Round Distance

1. Check **Single Distance**.
2. Enter distance values for each round.
3. Press **Enter** or run the update.
4. Each round is calculated independently.

---

### 1.15 Shift of Entrance Pupil (Graphs Tab, Region 3)

<div className="custom-note custom-warning">

<div className="custom-note-title">Moved in this version</div>

Sections 1.15, 1.16, and 1.17 describe three buttons that no longer exist in the header. In the C++ application, the same three graphs are embedded in the `Graphs` tab, each with its own **Update** button, and they appear as regions **3**, **4**, and **5** in [Figure 2](#fig-header-data-management). The purpose, source data, and interpretation described below are still correct. Only the place you click has changed.

</div>

#### Function

The **Shift of Entrance Pupil** graph is the left panel of the `Graphs` tab. It visualizes entrance pupil shift using the distance, alpha, IH range, and history-distance values prepared from the range analysis area. The X-axis is **Lateral displacement** and the Y-axis is **Optical Axis (distance)**.

The panel has two buttons:

| Button | Purpose |
|---|---|
| **Update Shift of Entrance Pupil** | Redraw the graph using the current range and distance values. |
| **Information — Entrance Pupil** | Open a dialog explaining Gennery's Figure 2, the entrance-pupil model the plot is built on. |

<Figure id="fig-graphs-info-entrance-pupil" number="6" title="Information — Entrance Pupil" caption="Theory dialog opened from the Shift of Entrance Pupil panel, explaining Gennery's Figure 2.">

![Information dialog explaining the entrance pupil model](../../assets/images/graphs-info-entrance-pupil.png)

</Figure>

#### Source Data for Entrance Pupil and Graph Tools

The screenshot below shows the **Range Window** and **History Distance** information used as the source data for the entrance pupil visualization and the graph buttons.

<Figure id="fig-range-history-source-data" number="7" title="Range Window and History Distance Source Data" caption="Range and history-distance values used by graph and entrance-pupil visualization tools.">

![Range Window and History Distance values used as graph source data](../../assets/images/panel-range-history-values.png)

</Figure>

This area contains the calculated values for each range group. These values are used by:

| Source Field | Used For |
|---|---|
| **IH Min / IH Max** | Defines the IH percentage range for each `Range_1` to `Range_20`. |
| **Aggregation** | Shows the aggregation value for each range. This helps identify which range has stable or unstable results. |
| **PCT to Pupil** | Provides the distance-related value used when drawing the entrance pupil and distance graphs. |
| **Sampling Number** | Shows how many samples are used in each range. This helps judge whether the range has enough data. |
| **Alpha Min / Alpha Max** | Defines the alpha angle range used for alpha-related graph visualization. |
| **History Distance** | Stores or recalls previous distance results so they can be compared or reused. |

<div className="custom-note custom-tip">

<div className="custom-note-title">Note</div>

All three graphs in the `Graphs` tab use values from this range/history-distance area. Therefore, before pressing any **Update** button, make sure the range values have already been calculated or updated.

</div>

#### Purpose

This visualization helps the user inspect how the entrance pupil changes based on calibration data. The output window can show a ray curve based on distance and alpha values for each range or round.

<Figure id="fig-entrance-pupil-ray-curve" number="8" title="Entrance Pupil Ray Curve" caption="Ray curve visualization generated from distance and alpha values.">

![Ray curve from distance and alpha visualization](../../assets/images/img_49.png)

</Figure>

In this graph, each ray represents one range or round result. The label shows the angle `θ` and the distance `d`, so the user can compare whether the ray direction and distance distribution are reasonable.

#### How to Use

1. Load calibration data.
2. Update or calculate results.
3. Check that the **Range Window** / **History Distance** values are filled.
4. Open the **Graphs** tab.
5. Click **Update Shift of Entrance Pupil**.
6. Inspect the graph, and click **Information — Entrance Pupil** for the theory behind it.

#### When to Use

Use this function when checking:

| Check Item | Purpose |
|---|---|
| Entrance pupil stability | Checks whether the entrance pupil shifts abnormally. |
| Round-to-round behavior | Compares entrance pupil movement between loaded rounds. |
| Calibration consistency | Helps verify whether the calibration result is reasonable. |
| Possible alignment issue | Helps identify unusual movement or inconsistent data. |
| Range-source correctness | Confirms that the graph is generated from the expected IH, alpha, and distance range values. |

---

### 1.16 Distance vs IH Range (Graphs Tab, Region 4)

#### Function

The **Distance vs IH Range** graph is the middle panel of the `Graphs` tab. It compares distance with IH range, and is redrawn with the **Update Dist vs IH Range** button below the panel.

<Figure id="fig-distance-vs-ih-range" number="9" title="Distance vs IH Range Graph" caption="Graph showing distance changes across IH range mean values.">

![Distance versus IH range mean graph](../../assets/images/img_50.png)

</Figure>

The graph shows the distance value for each IH range group. The X-axis is **IH Range Mean (%)**, and the Y-axis is **Distance**. Each point is labeled by range number, such as `R1`, `R2`, and so on.

The source values come from the **Range Window**. The IH range is taken from **IH Min / IH Max**, while the distance value is taken from the range distance result such as **PCT to Pupil** or history-distance calculation output.

#### How to Use

1. Load calibration data.
2. Run aggregation or range analysis.
3. Make sure distance values are filled.
4. Open the **Graphs** tab.
5. Click **Update Dist vs IH Range**.
6. Inspect the graph.

#### What It Helps Check

This graph helps check:

| Check Item | Description |
|---|---|
| Best distance stability | Shows whether the best distance is stable across IH ranges. |
| Abnormal IH range | Helps identify IH ranges that produce unusual distance values. |
| Distance reliability | Helps decide whether the selected distance is reliable. |
| Range consistency | Shows whether range groups behave consistently. |

---

### 1.17 Distance vs Alpha (Graphs Tab, Region 5)

#### Function

The **Distance vs Alpha** graph is the right panel of the `Graphs` tab. It compares distance with alpha, and is redrawn with the **Update Dist vs Alpha** button below the panel.

<Figure id="fig-distance-vs-alpha" number="10" title="Distance vs Alpha Graph" caption="Graph showing the relationship between alpha mean and distance.">

![Distance versus alpha mean graph](../../assets/images/img_51.png)

</Figure>

The graph shows the relationship between **Alpha Mean (degree)** and **Distance**. Each point is labeled by range number, so abnormal alpha or distance changes can be checked visually.

The source values come from the **Range Window**. The alpha range is taken from **Alpha Min / Alpha Max**, while the distance value is taken from the range distance result such as **PCT to Pupil** or history-distance calculation output.

#### How to Use

1. Load calibration data.
2. Update all calculation results.
3. Make sure alpha values are calculated.
4. Open the **Graphs** tab.
5. Click **Update Dist vs Alpha**.
6. Inspect the graph.

#### Related Alpha Formulas

For top-screen layers:

```text
alpha = atan(pct_cal / distance)
```
For side-screen layers:

```text
alpha = π/2 - atan((distance - pct_cal - v_gap) / h_gap)
```
#### What It Helps Check

This graph helps check:

| Check Item | Description |
|---|---|
| Alpha smoothness | Checks whether alpha changes smoothly. |
| Distance sensitivity | Shows how alpha changes when distance changes. |
| Abnormal alpha behavior | Helps identify unstable or incorrect alpha values. |
| Calibration geometry stability | Helps verify whether geometry parameters are reasonable. |

---

### 1.18 Select Cali System

#### Function

The **Select Cali System** dropdown selects the calibration system configuration. This selection is important because it defines the default calibration geometry used by the system.

The selected calibration system is directly related to:

| Related Setting | Why It Is Connected |
|---|---|
| **V_Gap & H_Gap** | These values describe the physical gap geometry for the selected calibration system. |
| **Pixel Size (Top / Side)** | These values convert PCT data from pixel units into physical millimeter values. |
| **Dis / Round** | This value controls how distance changes between calibration rounds. |
| **Alpha and ZFL Calculation** | V_Gap, H_Gap, pixel size, and distance are all used together to calculate alpha and ZFL. |

#### Why This Setting Must Be Selected First

The **Select Cali System** option should be checked before adjusting **V_Gap**, **H_Gap**, **Pixel Size**, and **Dis / Round** because these values represent one complete calibration system setup.

In other words, these sections should be understood as one connected configuration group:

```text
Select Cali System
   ↓
Load system configuration JSON
   ↓
Set or confirm V_Gap and H_Gap
   ↓
Set or confirm Pixel Size Top / Side
   ↓
Set or confirm Dis / Round
   ↓
Calculate PCT_CAL, Distance, Alpha, and ZFL
```
#### Configuration Mapping

Each option loads one configuration file from `cali_system_configuration_json/`:

| Cali System | Configuration File |
|---|---|
| Yuanman - SIDE (EV2785) | `yuanman_ev2785.json` |
| Yuanman - SIDE (EV2730Q) | `yuanman_ev2730q.json` |
| Yinda | `yinda.json` |
| Brodand C++ | `brodand_cpp.json` |

#### How to Use

1. Select the correct **Cali System** first.
2. Confirm that **V_Gap** and **H_Gap** match the selected hardware setup.
3. Confirm that **Pixel Size (Top)** and **Pixel Size (Side)** are correct.
4. Confirm **Dis / Round** if the calibration uses multiple rounds.
5. Load or update calibration data.
6. Run calculation and inspect the IH-ZFL / Overlap graph.

#### `main.json` Behavior

When a full calibration folder is loaded, the system checks for:

```text
main.json
```
If `main.json` exists, it loads:

```text
systemType
distance_per_round
```
If `main.json` does not exist or is invalid, it uses the default values:

```text
System: Yuanman - SIDE (EV2785)
Distance per round: 10
```
<div className="custom-note custom-warning">

<div className="custom-note-title">Important</div>

Do not treat **Select Cali System**, **V_Gap / H_Gap**, and **Pixel Size** as separate settings. They work together as one calibration geometry configuration. If one of them is incorrect, the calculated alpha, ZFL, aggregation, and best distance can also become incorrect.

</div>

---

## 2. Round & Tab Selection

<a id="2-round--tab-selection"></a>

The **Round & Tab Selection** area is used to switch between calibration rounds, parameter pages, overlap visualization, aggregation analysis, and testing pages.

<Figure id="fig-round-tab-selection" number="11" title="Round & Tab Selection" caption="Tab selection area for current, round, parameter, overlap, aggregation, and test pages.">

![Round and tab selection](../../assets/images/cali-result-tab-strip.png)

</Figure>

### 2.1 Main Functions

| No. | Tab / Area | Purpose |
|---:|---|---|
| 1 | `current` | Temporary/current working table. |
| 2 | `round_1 ~ round_10` | Calibration result tables for each round. |
| 3 | `parameter` | Parameter and graph calculation page. |
| 4 | `Overlap` | Overlap visualization page. |
| 5 | `Aggr by Distance and Range` | Aggregation analysis page. |
| 6 | `Graphs` | Shift of Entrance Pupil, Distance vs IH Range, and Distance vs Alpha graphs. New in the C++ application. |
| 7 | `test` | Testing and validation page. |

---

### 2.2 Loaded Round Indicator

When calibration data is loaded successfully, the related round tab is marked using the `*` symbol.

#### Meaning of `*`

| Indicator | Meaning |
|---|---|
| `round_x *` | The round already contains loaded calibration data. |
| `*` mark | The data has been updated or loaded successfully. |
| Active round | The round can be included in calculation and graph processing. |

Example:

```text
round_1 *
round_3 *
round_5 *
```
---

### 2.3 Disabled Round State

Rounds can also be disabled from calculation and visualization.

When disabled, the tab displays `[OFF]`.

#### Disabled Round Behavior

| Behavior | Description |
|---|---|
| Excluded from aggregation | Disabled round is ignored during aggregation calculation. |
| Excluded from graphs | Disabled round is not included in graph visualization. |
| Ignored during update | Update-all calculation skips this round. |
| Data remains stored | Table data still exists but is temporarily ignored. |

---

### 2.4 Right Click Menu on Round Tabs

Each round tab supports a custom right-click menu.

#### Available Menu Actions

| Menu Action | Purpose |
|---|---|
| Turn Off Round | Disable round calculation and plotting. |
| Show ZFL-IH Graph | Open single-round ZFL-IH popup graph. |
| Show Overlap Graph | Open overlap graph popup. |

---

### 2.5 ZFL-IH Popup Graph

The **Show ZFL-IH Graph** menu opens a popup graph for the selected round.

<Figure id="fig-zfl-ih-popup" number="12" title="ZFL-IH Popup Graph" caption="Popup graph showing IH versus ZFL behavior for one calibration round.">

![ZFL-IH popup graph](../../assets/images/img_63.png)

</Figure>

#### Graph Information

| Graph Element | Meaning |
|---|---|
| X-axis | IH value |
| Y-axis | ZFL value |
| Red points | Calibration samples |
| Yellow line | Reference IH position |

#### Purpose

- inspect IH-ZFL smoothness,
- detect unstable regions,
- identify abnormal points,
- compare curve behavior between rounds.

---

### 2.6 Overlap Popup Graph

The **Show Overlap Graph** menu opens an overlap visualization for the selected round.

<Figure id="fig-overlap-popup" number="13" title="Overlap Popup Graph" caption="Overlap graph visualization for one calibration round.">

![Overlap popup graph](../../assets/images/img_64.png)

</Figure>

#### Graph Information

| Element | Meaning |
|---|---|
| X-axis | ICT |
| Y-axis | ZFL |
| Red curve | Calculated overlap curve |
| Yellow line | Reference position |

#### Purpose

- inspect overlap continuity,
- compare round consistency,
- detect unstable transitions,
- identify outlier points.

---

### 2.7 Recommended Workflow

<div className="custom-note custom-tip">

<div className="custom-note-title">Recommended Workflow</div>

1. Load calibration data first.
2. Check which rounds contain `*`.
3. Disable unused rounds if needed.
4. Open the ZFL-IH graph to inspect curve smoothness.
5. Open the overlap graph to inspect overlap continuity.
6. Continue with aggregation or range analysis.

</div>

---

## 3. Result Table View

<a id="result-table-view"></a>

<Figure id="fig-result-table-view" number="14" title="Result Table View" caption="Summary table showing IH range, minimum aggregation, best distance, and total sampling.">

![Result table view](../../assets/images/panel-interval-result-table.png)

</Figure>

The **Result Table View** is the output table for the interval aggregation process. This table is closely connected to **[Section 6. Min Aggregation by Interval](#6-min-aggregation-by-interval)**.

In simple terms:

```text
Section 6 setup
   ↓
Click Min Aggregation by Interval
   ↓
System searches best distance and minimum aggregation
   ↓
Section 3 Result Table View is filled
   ↓
The same result can be saved as CSV
```
<div className="custom-note custom-important">

<div className="custom-note-title">Relationship Between Section 3 and Section 6</div>

The values shown in **Result Table View** are generated from the settings in **Min Aggregation by Interval**. Therefore, Section 3 should be understood as the **result/output area**, while Section 6 is the **setup/process area**.

</div>

### 3.1 Output Example After Running Min Aggregation by Interval

The screenshot below shows the result table after the interval calculation has been executed. The table contains the generated IH interval rows and the calculated output values.

<Figure id="fig-result-table-after-interval" number="15" title="Result Table Output from Min Aggregation by Interval" caption="Result table filled after the interval aggregation calculation is completed.">

![Result table output after running Min Aggregation by Interval](../../assets/images/img_68.png)

</Figure>

### 3.2 Visible Columns

| No. | Column | Generated From | Description |
|---:|---|---|---|
| 1 | **IH Range (%)** | `IH Min`, `IH Max`, `Window`, and `Step` from Section 6 | Shows the IH interval being analyzed, for example `ALL` or `0 ~ 20%`. |
| 2 | **Alpha Range** | Calculated alpha values inside the selected IH range | Shows the alpha range if alpha data is available. |
| 3 | **Distance** | Best-distance search result | Shows the distance that produces the lowest aggregation in that IH interval. |
| 4 | **Aggr** | Aggregation calculation result | Shows the aggregation value at the selected or best distance. |
| 5 | **Total Sampling** | Number of IH/ZFL samples inside the range | Shows how many valid data points were used for that interval. |

### 3.3 Meaning of Each Output Row

Each row represents one interval analysis result.

| Row Example | Meaning |
|---|---|
| `ALL` | Global calculation using all available samples. |
| `0 ~ 20%` | Calculation using only samples inside the 0 to 20 percent IH range. |

For example, if the table shows:

```text
IH Range (%)    Distance    Aggr      Total Sampling
ALL             223.293     6216.394  435
0 ~ 20%         223.210     581.456   36
```
It means the system calculated one global result and one interval-specific result. The interval-specific row uses fewer samples because it only includes points inside the selected IH percentage range.

### 3.4 Why Total Sampling Is Important

`Total Sampling` shows how much data was used to produce the result.

| Total Sampling Condition | Interpretation |
|---|---|
| High sampling count | Result is usually more reliable because more data points are used. |
| Low sampling count | Result should be checked carefully because it is based on fewer data points. |
| Empty or zero sampling | The interval may not contain valid IH/ZFL data. |

<div className="custom-note custom-warning">

<div className="custom-note-title">Important</div>

If **Total Sampling** is too small, the minimum aggregation result may be less reliable. Always check this column before deciding that a distance value is good.

</div>

### 3.5 How Result Table View Is Filled

The table is filled after the user runs **Min Aggregation by Interval** in Section 6.

```text
User enters interval setup
   ↓
System filters IH data by interval
   ↓
System searches distance
   ↓
System calculates aggregation
   ↓
System counts total sampling
   ↓
Result Table View is updated
```
### 3.6 CSV Output Relationship

The same result shown in the table can also be saved as a CSV file. After the calculation finishes, the system can open a save dialog and write the table output into `interval.csv` or another selected file name.

The saved CSV contains the same main output columns:

```text
IH Range (%), Alpha Range, Distance, Aggr, Total Sampling
```
---
## 4. V_Gap & H_Gap Settings

<a id="vgap-hgap-settings"></a>

<Figure id="fig-vgap-hgap-settings" number="16" title="V_Gap & H_Gap Settings" caption="Physical gap settings used together with the selected calibration system.">

![V Gap and H Gap settings](../../assets/images/panel-vgap-hgap.png)

</Figure>

The **V_Gap & H_Gap** section is part of the calibration system geometry configuration. These values should match the selected system in **Select Cali System**.

This means **V_Gap & H_Gap**, **Pixel Size**, and **Select Cali System** are connected. They are used together to calculate side-screen alpha, ZFL, and aggregation results.

<div className="custom-note custom-important">

<div className="custom-note-title">Configuration Relationship</div>

When the user changes **Select Cali System**, the physical geometry may also change. Therefore, the user should always confirm **V_Gap**, **H_Gap**, **Pixel Size (Top)**, **Pixel Size (Side)**, and **Dis / Round** before running the final calculation.

</div>

### 4.1 Main Components

| No. | Component | Description |
|---:|---|---|
| 1 | **Direction Labels** | Shows direction labels `N`, `S`, `E`, and `W`. |
| 2 | **V_Gap** | Vertical gap value for each side direction. |
| 3 | **H_Gap** | Horizontal gap value for each side direction. |
| 4 | **mm** | Unit label showing that the values are in millimeters. |

### 4.2 Direction Meaning

| Direction | Meaning |
|---|---|
| `N` | North direction. |
| `S` | South direction. |
| `E` | East direction. |
| `W` | West direction. |

### 4.3 How This Section Connects to Select Cali System

The selected calibration system defines the physical layout of the calibration setup. The **V_Gap** and **H_Gap** values describe the gap geometry for that selected layout.

| Selected System Setting | Connected Value |
|---|---|
| Calibration system type | Determines which physical setup is used. |
| V_Gap | Defines vertical offset for each side direction. |
| H_Gap | Defines horizontal offset for each side direction. |
| Pixel Size | Converts PCT data before alpha and ZFL are calculated. |
| Distance / Round | Defines the distance used together with gap values. |

### 4.4 How the Values Are Used

For top-screen layers, alpha is calculated using distance and calibrated PCT:

```text
alpha = atan(pct_cal / distance)
```
For side-screen layers, alpha is calculated using **V_Gap** and **H_Gap**:

```text
alpha = π/2 - atan((distance - pct_cal - v_gap) / h_gap)
```
After alpha is calculated, ZFL is calculated using:

```text
zfl = 1 / tan(alpha) × ict
```
Pressing **Enter** in any V_Gap or H_Gap field recalculates all enabled round results.

### 4.5 How to Use

1. Select the correct **Cali System** first.
2. Confirm that the V_Gap and H_Gap values match the selected system.
3. Edit the values if the physical setup is different.
4. Press **Enter** after editing a value.
5. Confirm **Pixel Size** and **Dis / Round** in the next section.
6. Run **Update All Cali Result**.
7. Check IH-ZFL and Overlap graphs to confirm that the result is stable.

<div className="custom-note custom-warning">

<div className="custom-note-title">Warning</div>

Incorrect V_Gap or H_Gap values can produce wrong alpha and ZFL results, especially for side-screen layers. Always check these values together with **Select Cali System** and **Pixel Size**.

</div>

---

## 5. Pixel Size & Distance / Round

<a id="pixel-size-distance-round"></a>

<Figure id="fig-pixel-size-distance-round" number="17" title="Pixel Size & Distance / Round" caption="Pixel size and distance settings used together with V_Gap, H_Gap, and the selected calibration system.">

![Pixel size and distance per round settings](../../assets/images/panel-pixel-size-distance.png)

</Figure>

The **Pixel Size & Distance / Round** section is also part of the same calibration system configuration group. It should be checked together with **Select Cali System** and **V_Gap & H_Gap**.

This section controls how PCT data is converted into millimeters and how the distance changes between calibration rounds.

### 5.1 Why This Section Is Connected to Select Cali System

The selected calibration system defines the calibration setup. The pixel size values and distance-per-round value describe how that setup should be calculated.

```text
Select Cali System
   ↓
Confirm V_Gap / H_Gap
   ↓
Confirm Pixel Size Top / Side
   ↓
Confirm Dis / Round
   ↓
Calculate PCT_CAL, Distance, Alpha, ZFL
```
If the selected system is changed, the user should confirm these values again because a different system may use different screen geometry, pixel conversion, or distance step.

### 5.2 Main Components

| No. | Component | Related Widget | Description |
|---:|---|---|---|
| 1 | **Pixel Size (Top)** | `lineedit_pixel_size_top` | Pixel size used for top-screen layers. |
| 2 | **Pixel Size (Side)** | `lineedit_pixel_size_side` | Pixel size used for side-screen layers. |
| 3 | **Dis / Round** | `lineedit_dis_per_round` | Distance increment between rounds. |
| 4 | **Round** | `lineedit_round` | Target round number for copying current data. |
| 5 | **Keep Round Data** | `btn_keep_round_data` | Copies current table data into the selected round. |
| 6 | **mm** | Unit label | Shows millimeter unit. |

### 5.3 Pixel Size Usage

Pixel size is used inside `calculate_pct_cal()` to convert PCT pixel values into physical millimeter values.

The system selects the pixel size based on the layer position:

| Layer Condition | Pixel Size Used |
|---|---|
| `layer < side_layer` | Pixel Size (Top) |
| `layer >= side_layer` | Pixel Size (Side) |

Simplified formula:

```text
pct_cal = sum(PCT values) × selected_pixel_size
```
The calculated `pct_cal` is then used together with **distance**, **V_Gap**, and **H_Gap** to calculate alpha and ZFL.

### 5.4 Distance / Round Formula

When **Single Distance** is not enabled, distance is calculated automatically:

```text
distance = base_distance + dis_per_round × (current_round - first_valid_round)
```
| Term | Meaning |
|---|---|
| `base_distance` | The starting distance value. |
| `dis_per_round` | The distance increment between rounds. |
| `current_round` | The active round number. |
| `first_valid_round` | The first round that contains valid ICT/IH data. |

### 5.5 Calculation Relationship

These values work together in the calculation pipeline:

| Value | Used For |
|---|---|
| Select Cali System | Determines which configuration profile should be used. |
| Pixel Size Top / Side | Converts PCT into `pct_cal`. |
| Distance / Round | Calculates distance for each round. |
| V_Gap / H_Gap | Calculates side-screen alpha. |
| Alpha | Used to calculate ZFL. |
| ZFL | Used for IH-ZFL curve and aggregation analysis. |

### 5.6 Keep Round Data Function

This function copies data from the current table into the selected round table.

Simplified flow:

```text
Enter target round
   ↓
Click Keep Round Data
   ↓
Read data from tablewidget_0
   ↓
Copy data into tablewidget_{round}
```
### 5.7 How to Use

1. Select the correct **Cali System** first.
2. Confirm **V_Gap** and **H_Gap** values.
3. Enter correct **Pixel Size (Top)** and **Pixel Size (Side)** values.
4. Enter **Dis / Round** according to the distance step between rounds.
5. Press **Enter** after editing pixel size or distance-per-round fields.
6. Run **Update All Cali Result**.
7. Check the calculated alpha, ZFL, overlap, and aggregation result.

<div className="custom-note custom-tip">

<div className="custom-note-title">Note</div>

Use **Pixel Size**, **Dis / Round**, **V_Gap**, **H_Gap**, and **Select Cali System** as one connected configuration group. Do not adjust only one of them without checking the others.

</div>

---

## 6. Min Aggregation by Interval

<a id="min-aggregation-by-interval"></a>

<Figure id="fig-min-aggregation-by-interval" number="18" title="Min Aggregation by Interval" caption="Interval settings used to search minimum aggregation across IH percentage ranges.">

![Min aggregation by interval settings](../../assets/images/panel-min-aggregation-interval.png)

</Figure>

The **Min Aggregation by Interval** panel is the setup and process area used to generate the values displayed in **[Section 3. Result Table View](#3-result-table-view)**.

This means Section 6 is not separate from Section 3. Section 6 defines the interval rules, and Section 3 displays the calculated result.

```text
Min Aggregation by Interval setup
   ↓
Run process button
   ↓
Calculate best distance and aggregation
   ↓
Show result in Result Table View
   ↓
Save result to CSV
```
### 6.1 Input Example

The screenshot below shows an example setup:

<Figure id="fig-min-aggregation-input-example" number="19" title="Min Aggregation by Interval Input Example" caption="Example settings using IH Min = 0, IH Max = 100, Window = 20, and Step = 10.">

![Min Aggregation by Interval input example](../../assets/images/panel-min-aggregation-filled.png)

</Figure>

In this example:

| Field | Value | Meaning |
|---|---:|---|
| **IH Min** | `0` | The interval search starts from 0 percent IH. |
| **IH Max** | `100` | The interval search can go up to 100 percent IH. |
| **Window** | `20` | Each interval covers 20 percent IH range. |
| **Step** | `10` | The interval moves forward by 10 percent each step. |

With this setup, the system can generate interval ranges such as:

```text
0 ~ 20%
10 ~ 30%
20 ~ 40%
...
80 ~ 100%
```
### 6.2 Main Components

| No. | Component | Description |
|---:|---|---|
| 1 | **IH Min** | Starting IH percentage value. |
| 2 | **IH Max** | Ending IH percentage value. |
| 3 | **Window** | Width of each IH interval. |
| 4 | **Step** | Shift value used to move from one interval to the next interval. |
| 5 | **Process Button** | Starts the minimum aggregation by interval process. |

### 6.3 Meaning of Window and Step

`Window` and `Step` are IH percentage settings.

They are not time values.

| Parameter | Meaning | Example |
|---|---|---|
| **Window** | Size of each interval range | `20` means each interval covers 20 percent IH. |
| **Step** | Movement between interval starts | `10` means the next interval starts 10 percent after the previous start. |

Example:

```text
IH Min = 0
IH Max = 100
Window = 20
Step = 10
```
Generated intervals:

```text
0 ~ 20%
10 ~ 30%
20 ~ 40%
30 ~ 50%
...
80 ~ 100%
```
### 6.4 Process Flow

When the user clicks **Min Aggregation by interval**, the system performs the following process:

```text
Read IH Min, IH Max, Window, and Step
   ↓
Collect IH and ZFL data from enabled rounds
   ↓
Generate interval ranges
   ↓
Convert IH percentage interval into actual IH pixel bounds
   ↓
Search the best distance for each interval
   ↓
Calculate minimum aggregation
   ↓
Count total sampling
   ↓
Fill Result Table View
   ↓
Ask user where to save CSV
   ↓
Save interval result to CSV
```
### 6.5 Result Written to Section 3

After the process is complete, the output is shown in **Result Table View**.

The output columns are:

| Output Column | Meaning |
|---|---|
| **IH Range (%)** | The generated interval range. |
| **Alpha Range** | Minimum and maximum alpha value inside that interval. |
| **Distance** | Best distance found for that interval. |
| **Aggr** | Minimum aggregation value for that interval. |
| **Total Sampling** | Number of valid data samples inside that interval. |

### 6.6 CSV Output

After the interval calculation, the system can save the result as a CSV file, defaulting to the name `interval.csv`. A confirmation message reports the final save path once the file is written.

The CSV contains the same columns as the Result Table View:

```text
IH Range (%), Alpha Range, Distance, Aggr, Total Sampling
```
### 6.7 How to Use

1. Load calibration data first.
2. Make sure the required rounds are enabled.
3. Confirm that IH/ZFL data exists.
4. Enter **IH Min**.
5. Enter **IH Max**.
6. Enter **Window**.
7. Enter **Step**.
8. Click **Min Aggregation by interval**.
9. Check the output in **Result Table View**.
10. Save the output CSV when the save dialog appears.
11. Open the CSV file if you need to inspect or share the result.

<div className="custom-note custom-warning">

<div className="custom-note-title">Important</div>

If no valid IH/ZFL data exists in the enabled rounds, the interval calculation cannot produce a reliable result. Always load and update calibration data before running this process.

</div>

---
## 7. Aggr by Range and Distance

<a id="aggr-by-range-and-distance"></a>

The **Aggr by Range and Distance** section is used to calculate the aggregation value based on a selected **IH range** and a specific **distance**.

Unlike **Min Aggregation by Interval**, which automatically generates multiple interval ranges, this section focuses on **one selected IH range only**.

This tool is commonly used when the user wants to:

- manually inspect aggregation behavior,
- verify a specific distance result,
- compare aggregation values between IH ranges,
- check whether a selected distance produces a stable IH-ZFL curve.

---

<Figure id="fig-aggr-by-range-distance" number="20" title="Aggr by Range and Distance" caption="Main calculation panel used to calculate aggregation from IH range and distance.">

![Aggregation by range and distance panel](../../assets/images/panel-aggr-by-range-distance.png)

</Figure>

---

### 7.1 Main Components

| No. | Component | Description |
|---:|---|---|
| 1 | **IH Min** | Minimum IH percentage used as the lower boundary of the selected range. |
| 2 | **IH Max** | Maximum IH percentage used as the upper boundary of the selected range. |
| 3 | **Aggr** | Output aggregation value calculated by the system. |
| 4 | **Distance** | Input distance value used during aggregation calculation. |
| 5 | **Process Button** | Starts the aggregation calculation process. |

---

### 7.2 Example Result

The image below shows an example result generated by the system.

<Figure id="fig-aggr-range-distance-example" number="21" title="Aggr by Range and Distance Example" caption="Example showing aggregation result calculated from IH range and distance.">

![Aggregation by range and distance example result](../../assets/images/img_70.png)

</Figure>

Based on [Figure 21](#fig-aggr-range-distance-example):

| Field | Value | Meaning |
|---|---:|---|
| **IH Min** | `0` | Aggregation starts from 0 percent IH. |
| **IH Max** | `10` | Aggregation only uses data until 10 percent IH. |
| **Distance** | `223.591` | Distance value used during calculation. |
| **Aggr Result** | `273.065` | Aggregation value generated from the selected IH range and distance. |

This means the system analyzes the **0 ~ 10% IH range** and calculates the aggregation value using distance **223.591**.
The calculated aggregation result is **273.065**.

---

### 7.3 Main Purpose

This section is mainly used to evaluate aggregation behavior for one selected IH range.

General workflow:

```text
Select IH range
        ↓
Enter distance value
        ↓
Run aggregation calculation
        ↓
System filters IH-ZFL data inside selected IH range
        ↓
Aggregation value is calculated
        ↓
Result is displayed in Aggr field
```
---

### 7.4 Calculation Concept

Aggregation is used to measure how smooth or stable the IH-ZFL curve is.

```text
Lower aggregation
        ↓
Smoother IH-ZFL curve
        ↓
More stable calibration result
```
```text
Higher aggregation
        ↓
More unstable curve
        ↓
Larger jumps between IH-ZFL points
```

Because of this relationship, the aggregation value is often used to check whether a distance configuration produces a stable calibration result.

---

### 7.5 Relationship with IH-ZFL Graph

The aggregation value is directly related to the IH-ZFL curve behavior.

```text
Distance changes
        ↓
ZFL values change
        ↓
IH-ZFL curve shape changes
        ↓
Aggregation value changes
```
For this reason, users commonly use these tools together:

| Tool | Purpose |
|---|---|
| **ZFL-IH Graph** | Visually inspect the IH-ZFL curve. |
| **Overlap Graph** | Check whether curve overlap is stable. |
| **Aggr by Range and Distance** | Calculate aggregation value numerically for a selected range and distance. |

---

### 7.6 How to Use

#### Manual Aggregation Check

Use this when you already have a distance value and want to calculate its aggregation.

1. Enter **IH Min**.
2. Enter **IH Max**.
3. Enter **Distance**.
4. Click **Aggr by Range and Distance**.
5. Check the calculated aggregation result in the **Aggr** field.

---

#### Compare Multiple IH Ranges

Use this when you want to compare aggregation stability across different IH ranges.

1. Set one IH range, for example `0 ~ 10`.
2. Enter the distance value.
3. Run the calculation.
4. Record the aggregation result.
5. Change the IH range, for example `10 ~ 20`.
6. Run the calculation again.
7. Compare the aggregation values.

This helps identify which IH region produces the most stable calibration result.

---

### 7.7 Recommended Workflow

<div className="custom-note custom-tip">

<div className="custom-note-title">
Recommended Workflow
</div>

1. Load and update calibration data first.
2. Confirm IH-ZFL data already exists.
3. Select the target IH range.
4. Enter the distance value.
5. Run aggregation calculation.
6. Compare the result with the ZFL-IH graph.
7. Inspect whether the aggregation value is stable.

</div>

---

### 7.8 Important Notes

<div className="custom-note custom-warning">

<div className="custom-note-title">
Important
</div>

The aggregation result depends heavily on:

- valid IH-ZFL data,
- correct distance configuration,
- correct calibration geometry,
- and enabled calibration rounds.

If the calibration data is incomplete or unstable, the aggregation result may also become unstable.

</div>

---

## 8. Range Analysis Matrix

<a id="range-analysis-matrix"></a>

<Figure id="fig-range-analysis-matrix" number="22" title="Range Analysis Matrix" caption="Matrix used to calculate global and range-based distance and aggregation results.">

![Range analysis matrix](../../assets/images/panel-range-analysis-matrix.png)

</Figure>

The **Range Analysis Matrix** is used to manage multiple IH range calculations from **Global** and `Range_1` to `Range_20`. This is the main area for finding best distances and minimum aggregation values across IH percentage ranges.

### 8.1 Main Components

| No. | Component | Description |
|---:|---|---|
| 1 | **Range Window** | Opens or applies range window settings. |
| 2 | **History Distance** | Reuses saved distance history when IH range matches. |
| 3 | **Save Distance History** | Saves current best distance results for later reuse. |
| 4 | **Global** | Global range without specific IH filter. |
| 5 | **Range_1 ~ Range_20** | IH percentage ranges used for range analysis. |
| 6 | **Enable Checkbox** | Enables or disables each range calculation. |
| 7 | **IH Min / IH Max** | IH percentage bounds for each range. |
| 8 | **Dist Min / Dist Max** | Distance search limits for each range. |
| 9 | **Aggregation** | Output minimum aggregation value. |
| 10 | **PCT to Pupil** | Reference PCT-to-pupil value. |
| 11 | **Sampling Number** | Number of samples inside the range. |
| 12 | **Alpha Min / Alpha Max** | Alpha range output, usually shown in degrees. |

### 8.2 Global and Range_1 ~ Range_20

`Global` is also called `range_0`. It calculates aggregation using all enabled data points without applying a specific IH percentage filter.

`Range_1` to `Range_20` are normally used as 5% IH percentage ranges:

```text
Range_1  = 0 ~ 5%
Range_2  = 5 ~ 10%
Range_3  = 10 ~ 15%
...
Range_20 = 95 ~ 100%
```
### 8.3 Range Calculation Flow

```text
Enable range checkbox
   ↓
Read IH Min and IH Max
   ↓
Convert IH percentage to pixel range
   ↓
Read Dist Min and Dist Max
   ↓
Check history distance mode
   ↓
Search best distance if needed
   ↓
Calculate minimum aggregation
   ↓
Update distance, aggregation, sampling number, and alpha range
```
### 8.4 Enable Checkbox Behavior

Each range has an enable checkbox. When the checkbox is turned on, the system starts processing that range.

When the checkbox is turned off, the system stops or skips that range.

### 8.5 History Distance Mode

When **History Distance** is enabled, the system can reuse previous best distance values.

The history value is only reused when:

```text
current IH Min == history IH Min
current IH Max == history IH Max
```

If the IH range does not match, the system ignores the history value and searches from scratch.

<div className="custom-note custom-tip">

<div className="custom-note-title">History Distance Rule</div>

History distance is only valid when the current IH range exactly matches the saved IH range.

</div>

### 8.6 Save Distance History

The **Save Distance History** button stores the current best distance results so they can be reused later.

Use this after the range calculation has successfully filled distance values.

### 8.7 How to Use Range Analysis Matrix

#### Manual Range Calculation

1. Load calibration data.
2. Run **Update All Cali Result**.
3. Set **IH Min** and **IH Max** for the target range.
4. Optional: set **Dist Min** and **Dist Max**.
5. Enable the checkbox for the range.
6. Wait until **Aggregation** and **Distance** are filled.
7. Check **Sampling Number** and **Alpha Min / Alpha Max**.

#### Use History Distance

1. Make sure distance history exists.
2. Enable **History Distance**.
3. Enable a range checkbox.
4. If the IH range matches history, the distance is reused.
5. If not, the system searches the best distance again.

#### Save New History

1. Finish calculating the ranges.
2. Confirm that distance values are correct.
3. Click **Save Distance History**.
4. The system saves the current distance results.

<div className="custom-note custom-warning">

<div className="custom-note-title">Important</div>

Before saving distance history, make sure the ranges and distance values are correct. Wrong history data can affect future range calculations.

</div>