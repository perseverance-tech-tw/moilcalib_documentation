---
id: client-linux
slug: /installation/client/linux
title: Client Installation on Linux
sidebar_label: Linux
---

# Client Installation on Linux

This guide builds and runs **`moilcali`**, the desktop calibration client, on Ubuntu or Debian.
Follow it start to finish.
No prior CMake or C++ experience is assumed.

Linux is the platform the client was originally written for, so it is the most straightforward of the three builds.
Every dependency comes from `apt`, and there is no manual library installation.

This page covers the **client only**.
The three HTTP servers run on the Windows server computer and are unchanged in version 1.1 (see [Server Installation](/moilcalib_documentation/docs/v1.1/installation/server)).

---

## Before You Start

| Requirement | Description |
|---|---|
| **Operating System** | Ubuntu 22.04 / 24.04, or another recent Debian-based distribution |
| **Internet Connection** | Required to install packages and clone the repository |
| **GitHub Access** | Required to download the project repository |
| **Personal Access Token** | Used as the GitHub password during authentication |
| **Disk Space** | Roughly 5 GB for the toolchain and libraries |
| **Memory** | 8 GB or more. See [Always Use `-j2`](#31-always-use--j2) |

<div className="custom-note custom-important">
  <div className="custom-note-title">📌 NO PYTHON, NO VIRTUAL ENVIRONMENT</div>
  <div>
    Version 1.1 no longer uses Python, a <code>venv</code>, or <code>requirements.client</code>. Everything is compiled with <strong>CMake</strong>. <code>CMakeLists.txt</code> only calls <code>find_package</code>, so it never downloads anything: every dependency must be installed <em>before</em> configuring.
  </div>
</div>

---

## Quick Start

If you only want the commands, here they are.
If anything fails, or you want to understand what these do, use the numbered sections below instead.

```bash
# 1. One-time setup
sudo apt update
sudo apt install -y \
    build-essential cmake \
    qt6-base-dev qt6-base-dev-tools qt6-serialport-dev \
    libqt6sql6-sqlite \
    libopencv-dev libeigen3-dev

# 2. Configure (from the project root)
cmake -S cpp -B cpp/build

# 3. Build
cmake --build cpp/build -j2

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

---

## 1. Install the Build Dependencies

### 1.1 Install Git

Git is required to download the project from GitHub.

```bash
sudo apt update
sudo apt install -y git
git --version
```

### 1.2 Install the Libraries

```bash
sudo apt install -y \
    build-essential cmake \
    qt6-base-dev qt6-base-dev-tools qt6-serialport-dev \
    libqt6sql6-sqlite \
    libopencv-dev libeigen3-dev
```

| Package | What it does for this app |
|---|---|
| **build-essential** | The GCC C++ compiler and the standard build tools |
| **cmake** | Reads the recipe and works out how to build everything |
| **qt6-base-dev** | The user interface: windows, buttons, tables, plus networking |
| **qt6-serialport-dev** | Serial port access for the axis stage |
| **libqt6sql6-sqlite** | The SQLite driver used by the calibration result database |
| **libopencv-dev** | Image processing, chessboard corner detection, camera geometry |
| **libeigen3-dev** | Matrix and linear algebra math used by the calibration computations |

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ IF <code>qt6-serialport-dev</code> IS NOT FOUND</div>
  <div>
    SerialPort is a separate add-on and is <strong>not</strong> part of qtbase, so it has its own package. If your distribution does not have <code>qt6-serialport-dev</code>, try <code>libqt6serialport6-dev</code> instead. Without it, configure fails at <code>find_package(Qt6 ... SerialPort)</code>.
  </div>
</div>

The app needs Qt6 **Widgets, Network, SerialPort, Concurrent, Sql, and OpenGLWidgets**.
All except SerialPort ship inside qtbase.

### 1.3 Clone the Repository

The C++ client lives on the **`main_development`** branch, in the `cpp/` folder:

```bash
cd ~/Documents/
git clone -b main_development https://github.com/perseverance-tech-tw/moil-fisheye-calisys.git
cd moil-fisheye-calisys
```

<div className="custom-note custom-important">
  <div className="custom-note-title">📌 BRANCH MATTERS</div>
  <div>
    The default branch (<code>main</code>) still holds the version 1.0 Python client. The C++ / Qt6 client is on <code>main_development</code>. If you already cloned the repository, switch with <code>git checkout main_development</code>.
  </div>
</div>

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 NO SUBMODULES</div>
  <div>
    Unlike version 1.0, this branch has <strong>no Git submodules</strong>. There is no <code>--recurse-submodules</code> flag and no <code>git submodule update</code> step. A plain clone gives you the complete source.
  </div>
</div>

To avoid retyping your credentials, enable the Git credential cache first:

```bash
git config --global credential.helper cache
```

When GitHub asks for authentication, use your **username** and a **personal access token** as the password.
GitHub no longer accepts normal account passwords for Git operations.

---

## 2. Configure

Configure is the "check the pantry" step.
CMake reads `cpp/CMakeLists.txt`, hunts down every library, and writes a concrete build plan into `cpp/build/`.

Run this from the **project root**, not from inside `cpp/`:

```bash
cd ~/Documents/moil-fisheye-calisys
cmake -S cpp -B cpp/build
```

| Flag | Meaning |
|---|---|
| `-S cpp` | **S**ource: the recipe lives in the `cpp/` folder |
| `-B cpp/build` | **B**uild: put all generated files in `cpp/build/` |

Keeping every generated file inside `cpp/build/` is what makes cleanup easy.
Deleting that one folder resets everything, which is what [Clean Rebuild](#clean-rebuild) tells you to do when things get stuck.

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 RE-RUN CONFIGURE AFTER ADDING FILES</div>
  <div>
    You only need to configure once. Run it again when source files are <strong>added or removed</strong> from the project, since CMake needs to notice them. Ordinary edits to existing files do not require it.
  </div>
</div>

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 OPTIONAL: A FASTER BUILD WITH NINJA</div>
  <div>
    By default CMake generates Makefiles. Installing Ninja (<code>sudo apt install -y ninja-build</code>) and adding <code>-G Ninja</code> to the configure command gives noticeably faster incremental builds. This is optional and everything on this page works either way.
  </div>
</div>

### 2.1 What a Successful Configure Looks Like

The lines that matter:

```text
-- Found OpenCV: /usr (found version "4.5.4")
-- Configuring done
-- Generating done
-- Build files have been written to: .../cpp/build
```

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 EIGEN 3 VS THE PACKAGE VERSION</div>
  <div>
    <code>CMakeLists.txt</code> asks for Eigen 3 via <code>find_package(Eigen3 REQUIRED)</code>, and <code>libeigen3-dev</code> provides exactly that. There is no version mismatch to work around on Linux.
  </div>
</div>

---

## 3. Build

This is the actual compiling.

```bash
cmake --build cpp/build -j2
```

| Flag | Meaning |
|---|---|
| `--build cpp/build` | Execute the plan that configure generated |
| `-j2` | Compile 2 files simultaneously |

### 3.1 Always Use `-j2`

<div className="custom-note custom-danger">
  <div className="custom-note-title">🚨 A BARE <code>-j</code> CAN KILL THE MACHINE</div>
  <div>
    Do <strong>not</strong> use a bare <code>-j</code> or <code>-j$(nproc)</code>. Those tell the compiler to use every core at once, and this build is memory-hungry enough that it can exhaust RAM and get killed by the system. The symptom is the build stopping with <strong>exit code 137</strong>, which means the kernel terminated the process. Always pass an explicit small number.
  </div>
</div>

`-j2` is the safe default and is what the project's own build script uses.
If you have plenty of RAM you can raise it cautiously, but exit code 137 means you went too high.

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

You want to see `ELF 64-bit LSB executable`, which is the Linux native executable format.

### 3.3 Building the Tests (optional)

The build above compiles the app only.
To build everything, including the test executables, drop the target filter:

```bash
cmake --build cpp/build -j2
```

Each test is a standalone program that prints its results and exits `0` on success.
There is no test framework, so you run them directly:

```bash
for t in cpp/build/*_test; do echo "== $t =="; "$t" || break; done
# e.g. ./cpp/build/calicompute_test  ./cpp/build/moil3d_test  ./cpp/build/patterngen_test
```

---

## 4. Run

```bash
cd cpp/build
./moilcali
```

### 4.1 You Must Run It From `cpp/build`

<div className="custom-note custom-danger">
  <div className="custom-note-title">🚨 RUNNING FROM THE PROJECT ROOT SILENTLY BREAKS THE APP</div>
  <div>
    After compiling, CMake copies <code>config/cali_system/*.json</code> and <code>config/camera_parameters.json</code> into <code>cpp/build/config/</code>, next to the binary. The app looks for those files relative to the <strong>current working directory</strong>, not relative to where the executable lives. There is no <code>config/</code> folder at the project root, so launching with <code>./cpp/build/moilcali</code> from the root means the app still starts, with no error message, but the <strong>Select Cali System</strong> dropdown is silently empty. Always <code>cd cpp/build</code> first.
  </div>
</div>

The same applies to the `image_cali/` and `pattern_json/` folders that the capture, pattern generator, and monitor viewer windows read and write.

### 4.2 What a Healthy Launch Looks Like

**Nothing.**

No output at all on the terminal is the success case.
Qt is quite noisy when something is wrong, so silence means the theme, fonts, `.ui` layouts, and resource bundle all loaded correctly.

You can confirm it is alive from another terminal:

```bash
pgrep -lx moilcali
```

---

## 5. Connect to the Servers

In the app, fill in the server URL fields and click **Update**:

| Field | Local server | Remote rig |
|---|---|---|
| **Axis** | `http://127.0.0.1:8000/` | `http://<rig-ip>:8000/` |
| **Monitor** | `http://127.0.0.1:8001/` | `http://<rig-ip>:8001/` |
| **Camera** | `http://127.0.0.1:8002/` | `http://<rig-ip>:8002/` |

<div className="custom-note custom-important">
  <div className="custom-note-title">📌 GOOD TO KNOW</div>
  <div>
    Changing the <strong>Axis</strong> URL and clicking <strong>Update</strong> re-runs the sensor-init dialog. To change the default server IP the app starts with, edit <code>ControllerMain::initUrls()</code> in <code>cpp/src/controllers/controller_main.cpp</code>.
  </div>
</div>

---

## 6. Install as a Desktop App (optional)

The launcher icon runs `~/.local/bin/moilcali`.
After building, update it with:

```bash
cp -f cpp/build/moilcali ~/.local/bin/moilcali
```

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ DO NOT USE <code>cmake --install</code></div>
  <div>
    <code>cmake --install cpp/build</code> targets <code>/usr/local/bin</code>, which needs <code>sudo</code> and is <strong>not</strong> where the desktop launcher looks. The <code>cp</code> above is the simple path.
  </div>
</div>

Note that a binary launched from the desktop icon inherits whatever working directory the launcher sets, so the [working directory rule](#41-you-must-run-it-from-cppbuild) still applies.

---

## 7. Package a Portable `.7z` (optional)

```bash
bash cpp/packaging/make_linux_7z.sh 2.1.1     # -> moilcali-2.1.1-linux.7z
```

The archive is self-contained: it bundles Qt, OpenCV, and the plugins.
On the target machine:

```bash
cmake -E tar xf moilcali-2.1.1-linux.7z        # or: 7z x …
cd moilcali-linux && ./run.sh
```

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ NO CROSS-BUILDING</div>
  <div>
    A Windows <code>.exe</code> cannot be built on Linux. It must be built on Windows. The Windows installer script is <code>cpp/packaging/moilcali.iss</code> (Inno Setup); there is no CI workflow for it in this repository.
  </div>
</div>

---

## Daily Usage

After the first installation you do not repeat all steps.
Rebuild only what changed, then run:

```bash
cd ~/Documents/moil-fisheye-calisys
git pull origin main_development
cmake --build cpp/build -j2
cd cpp/build && ./moilcali
```

This ensures the running binary matches the current source.

---

## Complete Installation Flow

| Step | Action | Command / Result |
|---|---|---|
| 1 | Install Git | `sudo apt install -y git` |
| 2 | Install build dependencies | `build-essential`, `cmake`, Qt6 (incl. SerialPort), OpenCV, Eigen3 |
| 3 | Clone the `main_development` branch | Project downloaded to `~/Documents/moil-fisheye-calisys` |
| 4 | Configure | `cmake -S cpp -B cpp/build` |
| 5 | Build | `cmake --build cpp/build -j2` |
| 6 | Verify the binary exists | `file cpp/build/moilcali` shows `ELF 64-bit` |
| 7 | Run from `cpp/build` | `cd cpp/build && ./moilcali` opens the client window |

---

## Troubleshooting

### Clean Rebuild

Try this first for anything build-related.

CMake **remembers** what it found during configure, caching it inside `cpp/build/`.
This trips people up constantly: installing a missing library and re-running configure does **not** necessarily take effect, because CMake reuses the cached answer from last time.

When in doubt, delete the build folder and start over:

```bash
rm -rf cpp/build && cmake -S cpp -B cpp/build && cmake --build cpp/build -j2
```

This is always safe.
Everything in `cpp/build/` is generated, so nothing of yours is lost.

### Quick Reference

| Symptom | Cause | Fix |
|---|---|---|
| `find_package` fails for Qt6 SerialPort | SerialPort is a separate package, not part of qtbase | `sudo apt install -y qt6-serialport-dev` or `libqt6serialport6-dev` |
| Build stops with **exit code 137** | Out of memory from too many parallel jobs | Use `-j2`, never a bare `-j` or `-j$(nproc)` |
| `Could NOT find Qt6` | Qt6 development packages not installed | Install `qt6-base-dev` and `qt6-base-dev-tools` |
| `Could NOT find OpenCV` | OpenCV headers missing | `sudo apt install -y libopencv-dev` |
| Build says success, but no binary exists | Exit code came from a pipe, not the compiler | Check `ls cpp/build/moilcali` directly |
| **Select Cali System** dropdown is empty | Launched from the wrong folder | `cd cpp/build` first, then `./moilcali` |
| Captured images do not appear | Same working directory problem | `cd cpp/build` first, then `./moilcali` |
| Installing a library did not fix configure | CMake cached the old result | Do a [clean rebuild](#clean-rebuild) |
| GitHub authentication failed | Password used instead of a token | Use a personal access token as the password |
| App starts but cannot reach the servers | Servers not running, or wrong URLs | Check the ports in [section 5](#5-connect-to-the-servers) and click **Update** |

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
| **`-dev` package** | On Debian-based systems, the package holding a library's header files. Needed to *build* against a library, not just run it |
| **ELF** | The executable file format used by Linux |
| **Exit code 137** | The process was killed by the system, almost always for running out of memory |
