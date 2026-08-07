---
id: client-macos
slug: /installation/client/macos
title: Client Installation on macOS
sidebar_label: macOS
---

# Client Installation on macOS

This guide builds and runs **`moilcali`**, the desktop calibration client, natively on a Mac.
Follow it start to finish.
No prior CMake or C++ experience is assumed.

This page covers the **client only**.
The three HTTP servers are a separate project on the server computer, and they are unchanged in version 1.1 (see [Server Installation](/moilcalib_documentation/docs/v1.1/installation/server)).

<div className="custom-note custom-important">
  <div className="custom-note-title">📌 NO SOURCE CHANGES ARE NEEDED</div>
  <div>
    The client was originally written for Linux, so it is fair to expect some Mac-specific patching. There is none. The source has no platform <code>#ifdef</code> guards, no Linux-only headers, and no hardcoded absolute paths. The two external programs it calls, <code>zip</code> and <code>unzip</code> (used by <code>XlsxIO.cpp</code> for Excel export), both ship with macOS. Everything on this page is about setting up the <strong>build environment</strong>, not editing code.
  </div>
</div>

---

## Before You Start

| Requirement | Description |
|---|---|
| **Operating System** | macOS on Apple Silicon (arm64). Verified on Darwin 24.4.0 |
| **Xcode Command Line Tools** | Provides the C++ compiler and the macOS system headers |
| **Homebrew** | The package manager used to install every library. See [brew.sh](https://brew.sh) |
| **Internet Connection** | Qt and OpenCV are large downloads |
| **GitHub Access** | Required to clone the private repository |
| **Disk Space** | Roughly 5 GB for the toolchain and libraries |

<div className="custom-note custom-danger">
  <div className="custom-note-title">🚨 THE ONE THING THAT BREAKS EVERYTHING</div>
  <div>
    Install <strong><code>opencv@4</code></strong>, not <code>opencv</code>. Homebrew's default <code>opencv</code> formula is now version <strong>5</strong>, which this codebase <strong>cannot compile against</strong>. Worse, the mistake does not surface when you make it: configure succeeds happily, and the failure appears later as a wall of compiler errors. If you read nothing else on this page, read <a href="#22-why-the-opencv-path-must-come-first">Why the OpenCV Path Must Come First</a>.
  </div>
</div>

---

## Quick Start

If you only want the commands, here they are.
If anything fails, or you want to understand what these do, use the numbered sections below instead.

```bash
# 1. One-time setup
xcode-select --install
brew install qt opencv@4 eigen libomp cmake ninja

# 2. Configure (from the project root)
/opt/homebrew/bin/cmake -S cpp -B cpp/build -G Ninja \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_PREFIX_PATH="/opt/homebrew/opt/opencv@4;/opt/homebrew"

# 3. Build
/opt/homebrew/bin/cmake --build cpp/build -j6 --target moilcali

# 4. Run
cd cpp/build
./moilcali
```

---

## How the Build Works

Understanding the shape of this makes every later error message much easier to read.

Turning source code into a running app is like cooking a meal from a recipe:

| Cooking | Software | What it means here |
|---|---|---|
| The recipe | `CMakeLists.txt` | A file describing what to build and what it needs |
| Ingredients | Qt, OpenCV, Eigen | Pre-written libraries this app depends on |
| Checking the pantry | **Configure** | CMake looks for each library and records where it found it |
| Actually cooking | **Build** | The compiler turns source code into a program |
| Eating | **Run** | Launching the finished app |

**Configure**, **build**, and **run** are three separate steps that fail in three different ways.
Knowing which step you are on tells you where to look:

| Step that failed | What it means |
|---|---|
| **Configure** | A library is missing entirely |
| **Build** | The libraries are present but do not fit together |
| **Run** | The app compiled but cannot start |

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ WHY THE OPENCV MISTAKE IS SO CONFUSING</div>
  <div>
    The OpenCV 5 problem is made at <strong>configure</strong> time but only fails at <strong>build</strong> time. The error appears in a completely different step from the one where you caused it, which is exactly what makes it hard to diagnose.
  </div>
</div>

---

## 1. Install the Build Tools

### 1.1 Xcode Command Line Tools

This gives you the C++ compiler itself, plus the macOS system headers.

```bash
xcode-select --install
```

If it is already installed, the command says so and does nothing.
To check first:

```bash
xcode-select -p
```

A printed path means the tools are present.

### 1.2 Homebrew Packages

```bash
brew install qt opencv@4 eigen libomp cmake ninja
```

| Package | What it does for this app |
|---|---|
| **qt** | The entire user interface: windows, buttons, tables, plus networking and serial port access |
| **opencv@4** | Image processing, chessboard corner detection, camera geometry |
| **eigen** | Matrix and linear algebra math used by the calibration computations |
| **cmake** | Reads the recipe and works out how to build everything |
| **ninja** | Does the actual compiling, quickly and in parallel |
| **libomp** | Optional. Would let Eigen use multiple CPU cores. See [OpenMP Is Not Enabled](#openmp-is-not-enabled) |

Qt and OpenCV are both large, so expect this to take a while on a slow connection.

<div className="custom-note custom-danger">
  <div className="custom-note-title">🚨 IT SAYS <code>opencv@4</code>, NOT <code>opencv</code></div>
  <div>
    This is deliberate. Typing <code>brew install opencv</code> gets you OpenCV 5, and the build will fail later with errors about <code>findChessboardCornersSB</code> and <code>__sort3</code>. See <a href="#why-opencv-4-is-pinned">Why OpenCV 4 Is Pinned</a> for the full story.
  </div>
</div>

### 1.3 If You Already Have OpenCV 5 Installed

That is completely fine, and you do **not** need to uninstall it.
The two versions coexist peacefully because `opencv@4` is what Homebrew calls **keg-only**.

Think of your Homebrew installation as a kitchen.
Normal packages go on the main shelf, where anything can grab them by default.
A keg-only package goes into a clearly labelled side cupboard instead, specifically so that nothing picks it up by accident.

So OpenCV 4 is installed but is *not* the default.
You have to point at it explicitly, which is exactly what `CMAKE_PREFIX_PATH` does in the next step.

### 1.4 Versions This Guide Was Verified Against

| Component | Version |
|---|---|
| macOS | Darwin 24.4.0, Apple Silicon (arm64) |
| Apple clang | 17.0.0 |
| Qt | 6.11.1 (Homebrew) |
| OpenCV | 4.14.0 (`opencv@4`, keg-only) |
| Eigen | 5.0.1 |
| CMake | 4.4.2 (Homebrew) |
| Ninja | 1.13.2 |

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 WHY EIGEN 5 WORKS DESPITE <code>find_package(Eigen3)</code></div>
  <div>
    Homebrew installs Eigen 5, but <code>CMakeLists.txt</code> asks for Eigen 3. This works anyway because Eigen 5 still ships a compatibility file named <code>Eigen3Config.cmake</code>, so the <code>Eigen3::Eigen</code> target still resolves. Unlike OpenCV, Eigen did not break the parts of its API this project uses.
  </div>
</div>

---

## 2. Configure

Configure is the "check the pantry" step.
CMake reads `cpp/CMakeLists.txt`, hunts down every library, and writes a concrete build plan into `cpp/build/`.

Run this from the **project root**:

```bash
cd /path/to/moil-fisheye-calisys

/opt/homebrew/bin/cmake -S cpp -B cpp/build -G Ninja \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_PREFIX_PATH="/opt/homebrew/opt/opencv@4;/opt/homebrew"
```

### 2.1 What Each Flag Means

| Flag | Meaning |
|---|---|
| `-S cpp` | **S**ource: the recipe lives in the `cpp/` folder |
| `-B cpp/build` | **B**uild: put all generated files in `cpp/build/` |
| `-G Ninja` | **G**enerator: produce a build plan for Ninja, which is faster than the default Make |
| `-DCMAKE_BUILD_TYPE=Release` | Optimise for speed rather than for debugging |
| `-DCMAKE_PREFIX_PATH=...` | Where to search for libraries, **and in what order** |

Keeping every generated file inside `cpp/build/` is what makes cleanup easy.
Deleting that one folder resets everything, which is what [Clean Rebuild](#clean-rebuild) tells you to do when things get stuck.

### 2.2 Why the OpenCV Path Must Come First

`CMAKE_PREFIX_PATH` is a list of places to look for libraries, separated by semicolons.

Think of it as handing someone a list of shops and saying "get me OpenCV, try these in order."
They go to the first shop on the list.
If it has OpenCV, they buy it and come straight home.
They never check the second shop.

Our list is:

```text
/opt/homebrew/opt/opencv@4     <- the side cupboard holding OpenCV 4
/opt/homebrew                  <- the main shelf, holding Qt, Eigen, and OpenCV 5
```

Because the OpenCV 4 cupboard is listed first, CMake finds OpenCV 4 and stops looking.
Qt and Eigen are not in that first location, so the search continues to `/opt/homebrew` and finds them there.

Swap the order and CMake finds OpenCV **5** on the main shelf first.
Configure still succeeds, cheerfully reporting that it found OpenCV.
The failure only surfaces later, in the middle of the build, as a wall of compiler errors.

### 2.3 Why the Full Path to `cmake`

The command says `/opt/homebrew/bin/cmake` rather than just `cmake`.

If you have MacPorts installed alongside Homebrew, `/opt/local/bin/cmake` usually sits earlier in your `PATH` and gets picked instead.
That version is often older and may not understand a modern Qt 6 installation.

Check which one your shell would choose:

```bash
which -a cmake
```

This lists every `cmake` on your system, in the order your shell searches them.
The first line wins.
If that first line is already `/opt/homebrew/bin/cmake`, you can safely type just `cmake` from here on.

Spelling out the full path is simply the version that works for everyone regardless of setup.

### 2.4 What a Successful Configure Looks Like

You will see roughly thirty lines of output.
These are the ones that matter:

```text
-- Found OpenCV: /opt/homebrew/Cellar/opencv@4/4.14.0 (found version "4.14.0")
-- Could NOT find OpenMP_CXX (missing: OpenMP_CXX_FLAGS OpenMP_CXX_LIB_NAMES)
-- Configuring done
-- Generating done
-- Build files have been written to: .../cpp/build
```

<div className="custom-note custom-danger">
  <div className="custom-note-title">🚨 CHECK THE OPENCV LINE SAYS 4.x</div>
  <div>
    If it reports <code>5.x</code>, stop now and fix <code>CMAKE_PREFIX_PATH</code>, because the build will fail. You will also need a <a href="#clean-rebuild">clean rebuild</a>, since CMake caches this decision and simply re-running configure will not change it.
  </div>
</div>

Two warnings are **expected** and harmless:

| Warning | Why it appears |
|---|---|
| `Could NOT find OpenMP_CXX` | Apple's clang does not enable OpenMP by default. See [OpenMP Is Not Enabled](#openmp-is-not-enabled) |
| `Could NOT find WrapVulkanHeaders` | Qt looking for an optional graphics backend that macOS does not use |

---

## 3. Build

This is the actual compiling.

```bash
/opt/homebrew/bin/cmake --build cpp/build -j6 --target moilcali
```

| Flag | Meaning |
|---|---|
| `--build cpp/build` | Execute the plan that configure generated |
| `-j6` | Compile 6 files simultaneously |
| `--target moilcali` | Build only the app, not the unit tests |

Progress appears as numbered lines like `[17/36]`, counting source files as they finish.
The final step, `[36/36]`, is the link step that combines everything into one executable.

### 3.1 Choosing a Number for `-j`

`-j6` means six compiler processes at once.
More is faster, until you run out of memory and the machine starts struggling.

`-j6` was verified comfortable on a 16 GB Mac.
Lower it to `-j4` or `-j2` if you have 8 GB, or if your Mac becomes unresponsive while building.

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 COMPARED TO LINUX</div>
  <div>
    The Linux guide insists on <code>-j2</code>, because higher values can exhaust memory and get the compiler killed by the system (exit code 137). Macs generally tolerate more, but the underlying build is memory-hungry, so do not go wild.
  </div>
</div>

### 3.2 Confirming the Build Really Succeeded

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ DO NOT TRUST THE EXIT CODE IF YOU PIPE THE BUILD</div>
  <div>
    When you write <code>cmake --build ... | tail -40</code>, the shell reports the exit status of the <strong>last</strong> command in the chain, which is <code>tail</code>. And <code>tail</code> succeeds at its job of printing lines even when the compiler feeding it failed. So the build can report success while nothing was produced.
  </div>
</div>

The reliable check is to look for the file itself:

```bash
ls -lh cpp/build/moilcali
file cpp/build/moilcali
```

You want to see:

```text
cpp/build/moilcali: Mach-O 64-bit executable arm64
```

`Mach-O` means a macOS-native executable.
`arm64` means it is built for Apple Silicon rather than running under Rosetta translation.

### 3.3 Building the Tests (optional)

Drop `--target moilcali` to build everything, including the ten test executables:

```bash
/opt/homebrew/bin/cmake --build cpp/build -j6
```

Each test is a standalone program that prints its results and exits `0` on success.
There is no test framework, so you run them directly:

```bash
./cpp/build/calicompute_test
```

Or run them all in sequence:

```bash
for t in cpp/build/*_test; do echo "== $t =="; "$t" || break; done
```

---

## 4. Run

```bash
cd cpp/build
./moilcali
```

### 4.1 You Must Run It From `cpp/build`

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ THIS IS NOT A STYLE PREFERENCE</div>
  <div>
    After compiling, CMake copies <code>config/cali_system/*.json</code> and <code>config/camera_parameters.json</code> to sit next to the binary. The app looks for those files using a path relative to the <strong>current working directory</strong>, not relative to where the executable lives. Launch from anywhere else and the app still starts, with no error message, but the <strong>Select Cali System</strong> dropdown is silently empty. That silent failure is exactly why this is worth remembering.
  </div>
</div>

### 4.2 What a Healthy Launch Looks Like

**Nothing.**

No output at all on the terminal is the success case.
Qt is quite noisy when something is wrong, so silence means the theme, fonts, `.ui` layouts, and resource bundle all loaded correctly.

The app window opens as a normal macOS application.

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 MULTI-MONITOR TIP</div>
  <div>
    If you have more than one display, the window may open on a different screen than you expect. Check your other monitors before concluding it failed to start.
  </div>
</div>

You can confirm it is alive from another terminal:

```bash
pgrep -lx moilcali
```

### 4.3 Do Not Run `cmake --install`

The `install()` section of `CMakeLists.txt` was written for Linux desktops.
It writes a `.desktop` launcher file and copies icons into `share/icons/hicolor/`, and neither of those means anything on macOS.

There is no reason to install.
Running the binary directly out of `cpp/build` is the intended macOS workflow.

---

## 5. Connect to the Servers

In the app, fill in the server URL fields and click **Update**:

| Field | Local server | Remote rig |
|---|---|---|
| **Axis** | `http://127.0.0.1:8000/` | `http://<rig-ip>:8000/` |
| **Monitor** | `http://127.0.0.1:8001/` | `http://<rig-ip>:8001/` |
| **Camera** | `http://127.0.0.1:8002/` | `http://<rig-ip>:8002/` |

---

## Daily Usage

After the first installation you do not repeat all steps.
Rebuild only what changed, then run:

```bash
cd /path/to/moil-fisheye-calisys
git pull origin main_development
/opt/homebrew/bin/cmake --build cpp/build -j6 --target moilcali
cd cpp/build && ./moilcali
```

Configure only needs re-running when files are added or removed from the project.

---

## Complete Installation Flow

| Step | Action | Command / Result |
|---|---|---|
| 1 | Install Xcode Command Line Tools | `xcode-select --install` |
| 2 | Install libraries with Homebrew | `brew install qt opencv@4 eigen libomp cmake ninja` |
| 3 | Configure | `cmake -S cpp -B cpp/build -G Ninja …` with `opencv@4` **first** in the prefix path |
| 4 | Verify configure output | The OpenCV line reports `4.x`, not `5.x` |
| 5 | Build | `cmake --build cpp/build -j6 --target moilcali` |
| 6 | Verify the binary exists | `file cpp/build/moilcali` shows `Mach-O … arm64` |
| 7 | Run from `cpp/build` | `cd cpp/build && ./moilcali` opens the client window |

---

## macOS Differences to Know About

These work differently on macOS than on Linux.
None of them prevent the app from building or running.

### OpenMP Is Not Enabled

**What OpenMP is.** A system that lets one program spread heavy math across multiple CPU cores at once.

**Why it is missing.** Apple's bundled clang compiler does not enable OpenMP by default, so CMake cannot find it even though you installed `libomp`.

**Why the build works anyway.** `CMakeLists.txt` treats OpenMP as strictly optional:

```cmake
$<$<TARGET_EXISTS:OpenMP::OpenMP_CXX>:OpenMP::OpenMP_CXX>
```

That reads as "link OpenMP only if it exists", so its absence is handled gracefully.

**What it costs you.** Eigen runs single-threaded, so heavy calibration math is slower than the same code on Linux.
Results are numerically identical.
Only the speed differs.

Wiring it up means passing `libomp`'s include and library paths to clang by hand.
Worth doing only if calibration speed becomes an actual problem in practice.

### OpenGL Is Deprecated on macOS

The 3D point viewer in `src/views/Point3dGlView.cpp` draws using an older style of OpenGL known as the **fixed-function pipeline**, with calls like `glBegin` and `glVertex` across 27 sites.

macOS offers two OpenGL modes, and only one of them supports that older style:

| Mode | Supports `glBegin`? |
|---|---|
| Legacy OpenGL 2.1 (compatibility profile) | Yes |
| OpenGL 3.2+ Core profile | No, it was removed |

Fortunately the code already asks for the right one, at `Point3dGlView.cpp:109`:

```cpp
fmt.setProfile(QSurfaceFormat::CompatibilityProfile);
```

Apple has deprecated OpenGL in favour of Metal, but it still functions.
Expect a deprecation warning in the console when the 3D view opens.
That warning is noise, not an error.

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ NOT YET VERIFIED</div>
  <div>
    The main window launches cleanly, but the 3D viewer had not been opened at the time of writing. If <strong>Auto 3D Measurement</strong> renders blank or crashes, this compatibility profile is the first thing to investigate.
  </div>
</div>

### Serial Port Device Names Differ

`QSerialPort` works on macOS, but connected devices are named differently than on Linux:

| Platform | Typical device path |
|---|---|
| Linux | `/dev/ttyUSB0`, `/dev/ttyACM0` |
| macOS | `/dev/cu.usbserial-*`, `/dev/cu.usbmodem*` |

You may also need a vendor driver for your specific USB-to-serial adapter chipset.

List what your Mac currently sees:

```bash
ls /dev/cu.*
```

---

## Troubleshooting

### Clean Rebuild

Try this first for anything build-related.

CMake **remembers** what it found during configure, caching it inside `cpp/build/`.
This trips people up constantly: changing `CMAKE_PREFIX_PATH` and re-running configure does **not** necessarily take effect, because CMake reuses the cached answer from last time.

When in doubt, delete the build folder and start over:

```bash
rm -rf cpp/build
```

Then repeat [Configure](#2-configure) and [Build](#3-build).

This is always safe.
Everything in `cpp/build/` is generated, so nothing of yours is lost.

### Quick Reference

| Symptom | Cause | Fix |
|---|---|---|
| `no member named 'findChessboardCornersSB'` | Building against OpenCV 5 | Put `/opt/homebrew/opt/opencv@4` first in `CMAKE_PREFIX_PATH`, then clean rebuild |
| `no matching function for call to '__sort3'` | Same as above | Same as above |
| Configure reports `found version "5.x"` for OpenCV | Wrong `CMAKE_PREFIX_PATH` order | Same as above |
| `Could NOT find Qt6` | Homebrew Qt not on the prefix path | Verify with `brew --prefix qt`, and keep `/opt/homebrew` in `CMAKE_PREFIX_PATH` |
| CMake complains about an unsupported Qt configuration | MacPorts `cmake` is being used | Call `/opt/homebrew/bin/cmake` by full path |
| Build says success, but no binary exists | Exit code came from a pipe, not the compiler | Check `ls cpp/build/moilcali` directly |
| **Select Cali System** dropdown is empty | Launched from the wrong folder | `cd cpp/build` first, then `./moilcali` |
| App seems not to open | It may be on another display | Check your other monitors, and `pgrep -lx moilcali` |
| `Could NOT find OpenMP` | Expected on macOS | Not a problem, see [OpenMP Is Not Enabled](#openmp-is-not-enabled) |
| `Could NOT find WrapVulkanHeaders` | Expected on macOS | Not a problem, ignore |

---

## Background: Design Decisions

You do not need this section to install the client.
It records *why* two things are the way they are, so they do not get re-proposed later.

### Why OpenCV 4 Is Pinned

Homebrew updated its default `opencv` formula to OpenCV 5.
A new major version means the authors allowed themselves to make breaking changes.
This codebase was written against OpenCV 4, and the Linux build still uses OpenCV 4 (Ubuntu 20.04 ships 4.2).

Imagine your code cites a reference book by chapter number.
A new edition comes out, the publisher reorganises it, moving a chapter and rewriting some entries.
Your citations still *look* fine, but they now point at the wrong pages or at nothing at all.

That is precisely what happened, in two separate places.

**Break 1: functions moved to a different file.**

```text
AnypointChessboard.cpp:98: error: no member named 'CALIB_CB_NORMALIZE_IMAGE' in namespace 'cv'
AnypointChessboard.cpp:98: error: no member named 'CALIB_CB_EXHAUSTIVE' in namespace 'cv'
AnypointChessboard.cpp:99: error: no member named 'CALIB_CB_ACCURACY' in namespace 'cv'
AnypointChessboard.cpp:104: error: no member named 'findChessboardCornersSB' in namespace 'cv'
```

In OpenCV 5, chessboard detection moved out of `calib3d.hpp` and into `objdetect.hpp`.
`AnypointChessboard.cpp` includes only `calib3d.hpp`, so as far as the compiler is concerned those functions no longer exist.

**Break 2: a function signature changed.**

```text
moil_3d_algorithm.cpp:70: error: no matching function for call to '__sort3'
```

This looks alarming because it points into Apple's C++ standard library rather than into project code.
The real cause is at `moil_3d_algorithm.cpp:70`, where `std::sort` is given a comparison function that calls `cv::contourArea`.
OpenCV 5 changed that function's signature enough that the comparison no longer type-checks, and the error surfaces deep inside the sorting machinery instead of at the call site.

**Why pin rather than fix the code.**
Both breaks are patchable.
But the fix would have to keep working on Linux and Windows, which are still on OpenCV 4, so it would mean scattering version checks like `#if CV_VERSION_MAJOR >= 5` through the source.
That is permanent complexity added purely to work around one machine's package manager default.

Installing `opencv@4` costs nothing, requires no source changes, and keeps every platform compiling identical code.
Migrating the project to OpenCV 5 may well be worth doing one day, but it should be a deliberate, tested, project-wide decision, not a side effect of setting up a Mac.

### Why Not Docker

Containerising this app for macOS development was considered and deliberately set aside.

A Linux container produces a **Linux** binary, and macOS cannot run Linux binaries.
So a dependency-only container gives you a compile loop with no way to actually launch and see the GUI.
You could confirm that code compiles, but never that it works.

Closing that gap means running a virtual display inside the container and streaming it to a browser.
That works, but it costs GPU acceleration on the 3D viewer, and it rules out serial port access entirely.

Building natively, as documented above, avoids all of that and gives full GPU and hardware access.

The existing `packaging/Dockerfile.ubuntu2004` is still the correct tool for its actual job, which is producing distributable Linux binaries linked against an old glibc for maximum compatibility.
It was never intended as a development environment.

---

## Glossary

| Term | Meaning |
|---|---|
| **Configure** | The step where CMake locates libraries and writes a build plan |
| **Build** | The step where the compiler turns source code into a program |
| **Compiler** | The tool that translates C++ source into machine code |
| **Linker** | Combines all compiled pieces plus libraries into one executable. The final build step |
| **Library** | Reusable pre-written code, such as Qt or OpenCV |
| **Header file** (`.h`, `.hpp`) | Declares what a library offers, so the compiler knows what exists |
| **Keg-only** | A Homebrew package installed but deliberately not made the default |
| **`PATH`** | The ordered list of folders your shell searches for commands |
| **`CMAKE_PREFIX_PATH`** | The ordered list of folders CMake searches for libraries |
| **Mach-O** | The executable file format used by macOS |
| **arm64** | Apple Silicon processor architecture, as opposed to Intel `x86_64` |
| **OpenMP** | A system for spreading computation across multiple CPU cores |
| **Fixed-function pipeline** | An older style of OpenGL drawing, using calls like `glBegin` |
