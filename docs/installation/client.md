---
id: client-installation-guide
slug: /installation/client
title: Client Installation Guide
---

# Client Installation Guide

Which of the four routes you want, and the one decision that picks it.

Each route page is self-contained — you do not need to read this page first.

---

## Pick by what you want to do, not by the OS you own

A Windows PC can do either column.

| | **Just use the app** | **Work on the code** |
|---|---|---|
| You get | The released app, installed | A build you can change |
| How | Double-click one `.exe` | Clone and compile |
| ROS / Qt / OpenCV needed? | **No** — all bundled inside the installer | Yes |
| Time | ~10–15 min | ~30–45 min the first time |

---

## The four routes

| Route | Who it is for | Talks to a real rig? |
|---|---|---|
| [**Windows (Installer)**](./client-windows.md) | Operators. One `.exe`, a Start Menu entry, nothing else to install | ✅ Yes |
| [**Linux (Ubuntu 24.04)**](./client-linux.md) | Developers. ROS 2 Jazzy + `setup.sh`. **Also the WSL2 route** | ✅ Yes |
| [**Docker**](./client-docker.md) | Anyone who would rather not install ROS 2 on the host | ✅ Yes, with `--network host` |
| [**Windows (Native MSVC)**](./client-windows-native.md) | Developers wanting a real `.exe` with no Linux | ❌ **No** |

<div className="custom-note custom-danger">
  <div className="custom-note-title">⛔ THE NATIVE WINDOWS BUILD CANNOT TALK TO THE RIG</div>
  <div>
    It builds against ROS 2 <strong>Lyrical</strong>, and cross-distro DDS is not supported, so it will never see the rig's <strong>Jazzy</strong> nodes. It is for GUI and calibration-maths work. If you need real hardware, use the installer or the WSL2 route.
  </div>
</div>

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ macOS IS NOT SUPPORTED IN VERSION 2.0</div>
  <div>
    Version 1.1 had a <a href="/moilcalib_documentation/docs/v1.1/installation/client/macos">macOS route</a>. Version 2.0 builds against ROS 2 Jazzy, which is packaged for Ubuntu 24.04 — there is no macOS equivalent, and no plan to add one.
  </div>
</div>

---

## How the build works

Understanding the shape of this makes every later error message easier to read.

Turning source into a running app is like cooking from a recipe:

| Cooking | Software | What it means here |
|---|---|---|
| The recipe | `CMakeLists.txt` | A file describing what to build and what it needs |
| Ingredients | Qt6, OpenCV, Eigen, rclcpp | Pre-written libraries the app depends on |
| Checking the pantry | **Configure** | CMake looks for each library and records where it found it |
| Cooking | **Build** | The compiler turns source into a binary |

### The one thing that is new in v2.0

**`moil_interfaces` must be built before the app.**

It is the ROS 2 package defining the `.msg` and `.srv` types the client and the
rig both speak. Without it, the configure step fails.

<div className="custom-note custom-danger">
  <div className="custom-note-title">⚠️ THE APP COMPILES AGAINST THE *INSTALLED* INTERFACES</div>
  <div>
    Not the ones in your source tree. Editing a <code>.srv</code> and rebuilding only the app changes <strong>nothing</strong> — rebuild the package first. This catches everyone once.
  </div>
</div>

---

## Runtime requirements no installer covers

The application shells out to two external programs for Excel `.xlsx` import and
export:

| Program | Used for | Get it |
|---|---|---|
| `unzip` | reading `.xlsx` — an `.xlsx` file *is* a zip archive | `sudo apt install unzip` |
| `zip` | writing `.xlsx` | `sudo apt install zip` |

| Missing | Symptom |
|---|---|
| `unzip` | *Load All Excel* reports **"No round subfolders (1..10) with .xlsx found"** even when the files are plainly there — the folders are found, and every file reads back empty |
| `zip` | Saving results fails |

**`setup.sh` does not install them.** The packaged Windows installer already
contains both. On a native Windows build neither exists by default:
`choco install zip unzip`.

---

## After installing

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ INSTALLED IS NOT CONNECTED</div>
  <div>
    Version 1.1 had three URL fields, so a wrong address was visible. Version 2.0 discovers the rig automatically — which means <strong>a client that connects to nothing looks identical to one that connects perfectly</strong>, right up until you press Capture.
    <br /><br />
    Go to <a href="../ros/connect-to-rig.md">Connect the App to the Rig</a> and confirm before assuming the install worked.
  </div>
</div>

Two signs to know straight away:

- **The first window can take up to a minute.** It probes the rig's services with
  a 5-second timeout each before drawing. On a machine that cannot see the rig,
  this looks like nothing is happening.
- **Every sensor LED white** after startup means the axis node is not answering.

---

## Screenshots this page needs

None — this page is a decision table. Its value is the routing, and the four
route pages carry their own captures.

---

## Source material

| What | Where |
|---|---|
| All four routes, at length | `README.md` (repo root) |
| Build detail, networking troubleshooting | `cpp/README.md` |
| One-shot Ubuntu install | `setup.sh` |
| Excel shell-outs | `cpp/src/io/XlsxIO.cpp` |
