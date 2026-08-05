---
id: intro
slug: /intro
title: Calibration Result System
sidebar_label: Introduction
sidebar_position: 1
---

# Calibration Result System (v1.1)

Welcome to the **Calibration Result Analysis System** documentation.

This system is used to analyze fisheye camera calibration data, optimize distance, visualize results (ZFL vs IH), and support multi-round processing.

Version 1.1 tracks the [`main_development`](https://github.com/perseverance-tech-tw/moil-fisheye-calisys/tree/main_development) branch.

---

## ⚠️ Scope: The C++ Rewrite Is Client-Only

Before anything else, this is the single most important thing to understand about version 1.1:

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ THE SERVER IS STILL VERSION 1.0 PYTHON</div>
  <div>
    Only the <strong>client</strong> application was rewritten in C++. The <strong>server</strong> side is <strong>completely unchanged</strong> — it is still the Python 3.8.10 + FastAPI installation from version 1.0, running on the Windows 11 server computer. Do <strong>not</strong> reinstall or rebuild the server for version 1.1. If your servers already run, they work with the new client as-is.
  </div>
</div>

| | Client (the calibration app) | Server (axis / monitor / camera services) |
|---|---|---|
| **Version 1.0** | Python 3.8 + PyQt6 | Python 3.8.10 + FastAPI on Windows 11 |
| **Version 1.1** | **C++17 + Qt6** ← rewritten | **Python 3.8.10 + FastAPI — unchanged** |
| **Where it runs** | Ubuntu or Windows workstation | Windows 11 x64 server computer |
| **Installation guide** | [Client Installation Guide](/moilcalib_documentation/docs/v1.1/installation/client) — completely new steps | [Server Installation](/moilcalib_documentation/docs/v1.1/installation/server) — identical to version 1.0 |
| **What to do when upgrading** | Install the build tools and compile the new client | **Nothing** |

### Why the Server Did Not Change

The client and the servers talk to each other over **HTTP**, not through shared code. As long as the three services answer the same endpoints on ports `8000` (axis), `8001` (monitor), and `8002` (camera), the client does not care what language they are written in. Rewriting the client therefore did not require touching the server at all.

That HTTP boundary is also why the two sides can be different versions: a **version 1.1 C++ client** and a **version 1.0 Python server** are the expected, supported combination.

<div className="custom-note custom-important">
  <div className="custom-note-title">📌 ABOUT THE C++ SERVER IN THE REPOSITORY</div>
  <div>
    The repository contains an experimental C++ server port (<code>cpp_server/</code>). It is <strong>not used for real calibration work</strong>: only the camera server is a full port, while the axis motion and the monitor display layers are still <strong>simulators</strong> (the axis serial protocol and real display control are unfinished). Keep using the Python servers described in the Server Installation guide.
  </div>
</div>

---

## What Changed in Version 1.1

Version 1.1 is **not a new calibration method**. The calibration procedure, the hardware, and the results you get are the same as version 1.0. What changed is *how the client application is built*:

<div className="custom-note custom-important">
  <div className="custom-note-title">📌 THE ONE-SENTENCE SUMMARY</div>
  <div>
    The <strong>client</strong> application — and only the client — was rewritten from <strong>Python 3.8 + PyQt6</strong> to <strong>C++17 + Qt6</strong>, and its source files were reorganized into a clear layered structure — so the app runs faster, responds immediately while the axis stage is moving, and installs as a single compiled program instead of a Python environment.
  </div>
</div>

### 1. Language: Python → C++ (client only)

The client is now compiled native code instead of interpreted Python. This matters most in the places where the old version felt slow:

| Where | Version 1.0 (Python) | Version 1.1 (C++) |
|---|---|---|
| **Calibration math** | NumPy + Python loops | C++17 with **Eigen3** for linear algebra |
| **Image processing** | OpenCV through the Python binding | **OpenCV** called directly, no binding overhead |
| **Result tables and plots** | PyQt6 widgets driven from Python | Qt6 widgets driven from C++ |
| **Pattern generation** | Python rendering loops | C++ rendering |
| **Parallel work** | Limited by the Python GIL | **QtConcurrent** threads and **OpenMP**, no GIL |

The heavy analysis paths — multi-round aggregation, range search, regression fitting, ZFL/IH curve building — are the ones that benefit most, because they are exactly the loops that Python executed one element at a time.

### 2. Responsiveness: the UI no longer freezes

In version 1.1 the axis stage is polled by a background worker (one `QtConcurrent` task per axis, every 20 ms) that reads the limit sensors, origin sensor, motion state, and position, then updates the LEDs, coordinates, and alpha/beta values live. Because this runs off the UI thread, the window stays responsive while the stage moves.

Two safety behaviours were added along with it:

- **Axis safety-lock** — while any axis is moving, every control except that axis's **STOP** button is locked, so a second command cannot be issued into a moving stage.
- **Blocking homing with a progress dialog** — `ALL HOME` runs the axes in a fixed order (yaw → pitch → X → Y → Z), skips axes that are already homed, and waits for a confirmed stop before continuing.

### 3. File structure: flat MVC folders → layered `cpp/` tree

Version 1.0 kept the client spread across `mvc_model/`, `mvc_controller/`, and `mvc_view/`, with very large controller files (`controller_main.py` was about 3,700 lines and `controller_cali_result.py` about 7,900). Version 1.1 puts the whole client under `cpp/`, split by responsibility:

```text
cpp/
  CMakeLists.txt              # Qt6 + OpenCV + Eigen; AUTOUIC / AUTOMOC
  ui/*.ui                     # Qt Designer layouts (mainwindow, cali_result,
                              # pattern_generator, monitor_viewer, 3d_measurement)
  app/                        # main.cpp — QApplication, theme, MainWindow
  src/
    controllers/              # one controller per window/dialog
    core/
      cali/                   # CaliCompute, CaliMath, CaliRound, Regression
      algorithm/              # MoilCali detection algorithms
      measure3d/              # Moil3d triangulation
      pattern/                # pattern generator core
      moildev/                # Moildev interface
    models/device/            # axis / camera / monitor HTTP clients
    io/                       # XlsxIO, HttpSync
    views/                    # HistogramPlot, Point3dGlView, theme, widgets
  tests/                      # one test binary per compute module
  packaging/                  # portable .7z, desktop entry, Inno Setup script
```

The practical benefit: the **compute core is separated from the UI**, which is what makes the next point possible.

### 4. A verified compute core

Because the math now lives in standalone modules, each one has its own test binary that can be run without launching the app:

| Test | Covers |
|---|---|
| `calicompute_test` | Multi-round calibration computation |
| `calimath_test` / `caliround_test` | Calibration math and per-round handling |
| `regression_test` | Curve fitting |
| `moilcali_test` | Center/ROI detection algorithm |
| `moil3d_test` / `measure3d_test` | 3D triangulation |
| `patterngen_test` | Pattern generation |
| `xlsx_test` | Excel import/export |
| `database_test` | Calibration result database |

These modules were ported and **checked numerically against the Python results**, so version 1.1 produces the same values as version 1.0 — faster.

### 5. Simpler installation, real packaging

| | Version 1.0 | Version 1.1 |
|---|---|---|
| **Runtime needed** | Python 3.8.10 built from source, `venv`, pinned `pip` 22.0 / `setuptools` 59.6, `requirements.client`, manual Moildev 2.7 | None — a compiled binary |
| **Dependencies** | Installed per machine with `pip` | Found at build time by CMake (`find_package`) |
| **Submodules** | `git submodule update --remote` required | No submodules |
| **Platforms** | Ubuntu | **Ubuntu and Windows (MSVC)** |
| **Distribution** | Copy the source tree and rebuild the environment | Portable Linux `.7z` (bundles Qt + OpenCV), Windows Inno Setup installer, Linux desktop launcher |

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 FOR EXISTING USERS</div>
  <div>
    There is no virtual environment to activate anymore. After pulling new code you <em>rebuild</em> instead of reinstalling packages — see the <a href="/moilcalib_documentation/docs/v1.1/installation/client">Client Installation Guide</a>.
  </div>
</div>

### 6. New tool: Setup Center

Version 1.1 adds **[Setup Center](/moilcalib_documentation/docs/v1.1/verification/setup-center)**, opened from the **Calibration Result / 3D Validation** panel of the main window.

It verifies the camera centre point (`iCx`, `iCy`) in a camera-parameter JSON: load a fisheye image, nudge the centre by clicking the image or using the spin boxes, and confirm it against guide rings, a panorama preview, and an anypoint view. If the centre is wrong, every result computed from those parameters is wrong — so this check now has its own tool, and the corrected centre can be saved straight back into the parameter file.

---

## What Stayed the Same

This is deliberate — the rewrite was about speed and structure, not about changing how you calibrate:

- **The calibration workflow** — capture, centering, positive/negative shots, multi-round analysis, range filtering, best-distance detection.
- **The HTTP API between client and servers** — the same three services on ports `8000` (axis), `8001` (monitor), `8002` (camera).
- **The servers themselves** — still the Python HTTP servers running on the Windows server computer. **The Server Installation guide is unchanged from version 1.0.**
- **The hardware** — the same axis stages (YinDa / 盈達 and Yuanman / 元滿), monitors, and cameras.
- **The result format** — the same Excel export and database records.

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ SERVER SIDE IS UNCHANGED</div>
  <div>
    Only the <strong>client</strong> was rewritten in C++. Install the servers exactly as before, following the <a href="/moilcalib_documentation/docs/v1.1/installation/server">Server Installation</a> guide. An experimental C++ server port exists in the repository, but its axis motion and monitor display layers are still simulators and are <strong>not</strong> used for real calibration work.
  </div>
</div>

---

## Known Limitations in Version 1.1

Two features depend on data held outside this repository:

| Feature | Status |
|---|---|
| **Database cloud round-data** | The database stores references to cloud files rather than the values themselves, so loading a full round requires downloading from cloud storage. The C++ database window is metadata-only by design — see [Reload Calibration Data](/moilcalib_documentation/docs/v1.1/calibration/reload-calibration-data). |
| **Remote (cloud) folder paths** | The **Cali Folder** field in the Cali Result window accepts local paths only; `http(s)` links are rejected. Download the calibration folder first. |

One offline tool, the repeat-experiment helper, has not been ported — it was a standalone script with no launcher in the main app, and its histogram logic already exists in the main window.

---

## Key Features

- Multi-round analysis
- Range-based filtering
- Automatic best-distance detection
- Visualization tools (IH-Alpha, ZFL-IH, Overlap, Aggregation vs. Distance)
- Interactive point picking, ROI/edge overlays, and pattern generation with JSON import/export

---

## Documentation Structure

This documentation is ordered by the **order you actually do the work**, not by which window each feature lives in:

```text
Installation
   ↓  server first, then the client
System Overview — the main window
   ↓
Calibration Workflow
   1. Pattern Setup      → PCT (Pattern Generator) → Monitor Viewer
   2. Camera Calibration → capture positive / negative shots
   3. Calibration Result → result table, parameters, overlap & aggregation
   4. Reload Calibration Data
   ↓
Verification — are these camera parameters good?
   · Setup Center     → check the centre point (iCx / iCy)
   · 3D Verification  → check measured 3D distances
   ↓
Database — store and retrieve the results
```

| Section | Purpose |
|---|---|
| **Installation** | Install the server (unchanged from v1.0) and build the new C++ client. |
| **System Overview** | The main window — the hub that opens every other tool. |
| **Calibration Workflow** | The calibration run itself, in order: prepare and display the pattern, capture, then read the results. |
| **Verification** | Check that the camera parameters are good — **Setup Center** for the centre point, **3D Verification** for measured distances. |
| **Database** | Manage stored calibration data. |

<div className="custom-note custom-important">
  <div className="custom-note-title">📌 Read First</div>
  <div>
    Start with the <strong>Installation</strong> section — the client build steps are completely different from version 1.0 — then review the <strong>System Overview</strong> before performing your first calibration.
  </div>
</div>

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 WHY PATTERN SETUP COMES FIRST</div>
  <div>
    The <strong>PCT (Pattern Generator)</strong> and <strong>Monitor Viewer</strong> are not side utilities — they are step 1 of every calibration. The pattern has to be generated and pushed to the correct monitor before any capture is meaningful, so they are documented at the start of the workflow rather than in the System Overview.
  </div>
</div>
