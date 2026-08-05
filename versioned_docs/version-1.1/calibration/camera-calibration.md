---
id: camera-calibration
slug: /calibration/camera-calibration
title: Camera Calibration
sidebar_label: "2. Camera Calibration"
---

# Camera Calibration

This is **step 2** of the calibration workflow — the capture run itself. You use the **Main Window** to home the axes, put the calibration pattern on the monitors, and take the two images that everything else is computed from: the **positive shot** and the **negative shot**.

<div className="custom-note custom-important">
  <div className="custom-note-title">📖 WHAT THIS PAGE IS</div>
  <div>
    This is the <strong>procedure</strong> — what to do, in order. It names the controls but does not describe them all. For what every field, LED, and button in the Main Window does, see the <a href="/moilcalib_documentation/docs/v1.1/system-overview/main-window"><strong>Main Window Reference</strong></a>.
  </div>
</div>

<div className="custom-note custom-important">
  <div className="custom-note-title">✅ PREREQUISITES</div>
  <ol>
    <li>The <a href="/moilcalib_documentation/docs/v1.1/installation/server">servers</a> are running and reachable, and the <a href="/moilcalib_documentation/docs/v1.1/installation/client">client</a> is built.</li>
    <li>The calibration patterns are prepared in the <a href="/moilcalib_documentation/docs/v1.1/calibration/pct-pattern-generator">PCT Pattern Generator</a> and assigned to the correct directions in the <a href="/moilcalib_documentation/docs/v1.1/calibration/monitor-viewer">Monitor Viewer</a> (step 1).</li>
    <li>The axis stage, monitors, and camera are connected and powered.</li>
  </ol>
</div>

<div className="center">

<a id="fig-1"></a>

![Main Window overview](../assets/images/img_12.png)

<p><em><a href="#fig-1"><strong>Figure 1.</strong></a> The Main Window — every step on this page happens here.</em></p>

</div>

For a panel-by-panel reference of this window, see [Main Window Overview](/moilcalib_documentation/docs/v1.1/system-overview/main-window). This page is the **procedure**.

---

## Where the Captured Images Are Saved

This is the question that comes up first, so it is answered first: every capture is written as a PNG into an **`image_cali/`** folder, and the two you need are these:

| Button | File written | What it is |
|---|---|---|
| **Pos Shot** | `image_cali/capture_positive_shot.png` | **The positive image** — the pattern as generated |
| **Neg Shot** | `image_cali/capture_negative_shot.png` | **The negative image** — the same pattern with inverted colours |
| **Capture** | `image_cali/capture_single_image.png` | A plain preview frame, not used by the calibration |

The same folder also holds the patterns that were pushed to the monitors:

```text
image_cali/pattern_circle_<direction>.png    e.g. pattern_circle_top.png, pattern_circle_n.png
image_cali/_tmp_pattern_circle.png           temporary render from the Pattern Generator
```

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ WHERE IS <code>image_cali/</code> EXACTLY?</div>
  <div>
    The path is resolved against the <strong>working directory the application was launched from</strong> — not the folder holding the binary. If you start the client from the project root with <code>./cpp/build/moilcali</code>, the images land in <code>&lt;project root&gt;/image_cali/</code>. Launch it from somewhere else and the folder is created there instead. When in doubt, read the <strong>Img Path</strong> field in the Camera Panel: after every capture it shows the full path of the file that was just written.
  </div>
</div>

<div className="custom-note custom-warning">
  <div className="custom-note-title">⚠️ EACH CAPTURE OVERWRITES THE PREVIOUS ONE</div>
  <div>
    The file names are fixed. The next <strong>Pos Shot</strong> replaces <code>capture_positive_shot.png</code>, and the next <strong>Neg Shot</strong> replaces <code>capture_negative_shot.png</code>. If you need to keep the images of a round — for a report, for re-analysis, or for a different distance — <strong>copy them out of <code>image_cali/</code> before capturing again</strong>.
  </div>
</div>

<div className="custom-note custom-danger">
  <div className="custom-note-title">🛑 RESET DELETES THESE FILES</div>
  <div>
    <strong>Reset</strong> in the menu bar deletes <code>capture_single_image.png</code>, <code>capture_positive_shot.png</code>, <code>capture_negative_shot.png</code>, <code>&#95;tmp_pattern_circle.png</code>, and every <code>pattern_circle_*.png</code> in <code>image_cali/</code>. It asks for confirmation first. Reference sample images and the pattern JSON configurations are left untouched.
  </div>
</div>

---

## 1. Connect to the Servers

In the **HTTP Server URL** panel, enter the three server addresses and press **Update** for each one.

| Field | Local server | Remote rig |
|---|---|---|
| **Axis URL** | `http://127.0.0.1:8000/` | `http://<server-ip>:8000/` |
| **Monitor URL** | `http://127.0.0.1:8001/` | `http://<server-ip>:8001/` |
| **Camera URL** | `http://127.0.0.1:8002/` | `http://<server-ip>:8002/` |

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 UPDATING THE AXIS URL RE-READS THE SENSORS</div>
  <div>
    Pressing <strong>Update</strong> next to the <strong>Axis URL</strong> re-runs the sensor-initialisation dialog, which probes the origin state of all five axes. Use it if the axis LEDs look wrong or the stage was power-cycled.
  </div>
</div>

---

## 2. Home the Axes

<div className="center">

<a id="fig-2"></a>

![Axis Control Panel](../assets/images/img_21.png)

<p><em><a href="#fig-2"><strong>Figure 2.</strong></a> Axis Control Panel.</em></p>

</div>

Press **ALL HOME** before the first capture of a session.

Homing runs in a fixed order — **yaw → pitch → X → Y → Z** — skips any axis that is already at its origin, and writes position `0` for each axis as it finishes. The coordinate fields blink while an axis is homing.

Then move the stage to the position for this round using **Relative Move** and the direction buttons, and read the resulting **α / β** values.

<div className="custom-note custom-important">
  <div className="custom-note-title">📌 CONTROLS GREY OUT WHILE AN AXIS MOVES — THIS IS NORMAL</div>
  <div>
    The safety lock disables everything except that axis's <strong>STOP</strong> button until the stage reports it has stopped. Wait, do not click repeatedly. Full description of the sensor LEDs, speed selector, and interlocks: <a href="/moilcalib_documentation/docs/v1.1/system-overview/main-window#2-axis-control-panel">Main Window Reference §2</a>.
  </div>
</div>

---

## 3. Show the Pattern and Check the Camera

<div className="center">

<a id="fig-3"></a>

![Camera Panel](../assets/images/img_16.png)

<p><em><a href="#fig-3"><strong>Figure 3.</strong></a> Camera Panel.</em></p>

</div>

Press **Capture** to take a plain preview frame. Use it to confirm three things before the real shots:

1. The camera server answers and an image appears in the preview.
2. The fisheye circle is inside the frame and roughly centred.
3. The monitors are showing the pattern, at a brightness that is neither washed out nor too dark (adjust in the [Monitor Viewer](/moilcalib_documentation/docs/v1.1/calibration/monitor-viewer)).

**Org Res** and **Cali Res** fill in by themselves from the captured image — they are readouts, not settings, so there is nothing to configure here. Field-by-field description of this panel: [Main Window Reference §4](/moilcalib_documentation/docs/v1.1/system-overview/main-window#4-camera-panel).

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 DO NOT RELY ON <strong>Open Img</strong></div>
  <div>
    That button is <strong>not active in version 1.1</strong>. To work on an existing image, capture again, or point a tool that accepts a file — such as <a href="/moilcalib_documentation/docs/v1.1/verification/setup-center">Setup Center</a> — at the PNG in <code>image_cali/</code>.
  </div>
</div>

---

## 4. Take the Positive and Negative Shots

This is the actual measurement. **Pos Shot** and **Neg Shot** are not plain captures — each one runs a small sequence:

```text
Click Pos Shot / Neg Shot
   ↓
Pattern Mode is set to Positive / Negative
   ↓
The matching pattern is pushed to every monitor
   ↓
Short pause (~300 ms) so the screens actually show it
   ↓
A frame is fetched from the camera server
   ↓
Image is saved to image_cali/capture_positive_shot.png
                  or image_cali/capture_negative_shot.png
   ↓
The pattern centre is auto-detected from THIS image → CPX / CPY
   ↓
The edge circle overlay is drawn
   ↓
Both histograms refresh
```

<div className="custom-note custom-important">
  <div className="custom-note-title">📌 WHY BOTH SHOTS ARE NEEDED</div>
  <div>
    The positive and negative captures show the same pattern with inverted colours. The calibration uses the pair together to find the intersection points (ICT) reliably — a single image cannot separate the pattern edges from the background as cleanly.
  </div>
</div>

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 EACH SHOT CENTRES ITSELF</div>
  <div>
    The positive and negative shots detect their centres <strong>independently</strong> — the positive centre goes to the <strong>Positive CPX / CPY</strong> fields and the negative centre to the <strong>Negative CPX / CPY</strong> fields. They are not expected to be identical.
  </div>
</div>

The captured pair looks like this — the concentric pattern in the middle and the stripline patterns on the four sides:

<div className="center">

<a id="fig-4"></a>

![Captured positive shot](../assets/images/img_97.png)

<p><em><a href="#fig-4"><strong>Figure 4.</strong></a> Positive shot — <code>image_cali/capture_positive_shot.png</code>.</em></p>

</div>

<div className="center">

<a id="fig-5"></a>

![Captured negative shot](../assets/images/img_98.png)

<p><em><a href="#fig-5"><strong>Figure 5.</strong></a> Negative shot — <code>image_cali/capture_negative_shot.png</code>, the same layout with inverted colours.</em></p>

</div>

---

## 5. Check and Correct the Centre

<div className="center">

<a id="fig-6"></a>

![Centering Panel](../assets/images/img_22.png)

<p><em><a href="#fig-6"><strong>Figure 6.</strong></a> Centering Panel.</em></p>

</div>

The centre point is the most important value in this step — everything downstream inherits an error in it. Each shot has already filled its own CPX / CPY; your job here is to confirm them, and to fix them if they are wrong.

**Confirm.** Double-click the preview to open the zoomable viewer and check that the marked centre really sits on the middle of the concentric pattern. Tick **Edge** and set a radius to compare the centre against the outer edge of the fisheye circle.

**If the centre is wrong**, choose one of two fixes:

| Situation | Do this |
|---|---|
| Auto-detection landed close but not exactly right | Adjust **PosThr** (for the positive image) or **NegThr** (for the negative image) and let Auto run again. |
| Auto-detection is far off — wrong lobe of the pattern entirely | Switch to **Manual**, click the correct centre on the preview, and the panel returns to **Auto** to refine from that point. |
| The centre is correct and you do not want captures to move it | Switch to **Locked**. |

Do this for **both** images — the positive and negative centres are independent and are corrected separately.

<div className="custom-note custom-tip">
  <div className="custom-note-title">💡 CLICKING ONLY WORKS AFTER A POS / NEG SHOT</div>
  <div>
    The click-to-set-centre gesture requires a pattern mode. After a plain <strong>Capture</strong>, Pattern Mode is empty and clicks are ignored.
  </div>
</div>

Full description of every field and mode in this panel: [Main Window Reference §5](/moilcalib_documentation/docs/v1.1/system-overview/main-window#5-centering-panel).

---

## 6. Read the Histograms

<div className="center">

<a id="fig-7"></a>

![Histogram Panel](../assets/images/img_25.png)

<p><em><a href="#fig-7"><strong>Figure 7.</strong></a> Histogram panel.</em></p>

</div>

Both histograms refresh automatically after a positive or negative shot. This is the quality gate for the capture — read them before you move on.

Tick the directions you want to check (**Pos** and **Neg** columns, eight directions each), press **Show Curve**, and use **Pop Up** if the plot is too small to judge.

<div className="custom-note custom-important">
  <div className="custom-note-title">📌 THE DECISION: ACCEPT OR RE-CAPTURE</div>
  <div>
    <ul>
      <li><strong>Clear swings between light and dark</strong> — good, continue to step 3.</li>
      <li><strong>Flat tops</strong> — the monitor is too bright and the stripe edges are lost. Lower the brightness in the <a href="/moilcalib_documentation/docs/v1.1/calibration/monitor-viewer">Monitor Viewer</a> and capture again.</li>
      <li><strong>Barely any swing</strong> — too dark. Raise the brightness and capture again.</li>
      <li><strong>Positive and negative curves for the same direction differ a lot</strong> — suspect a wrong centre or the wrong pattern on that monitor. Fix the cause, then capture again.</li>
    </ul>
    Do not try to compensate for a bad capture later in the analysis — re-capture.
  </div>
</div>

Description of the controls and how the curves are built: [Main Window Reference §7](/moilcalib_documentation/docs/v1.1/system-overview/main-window#7-histogram-panel).

---

## 7. Repeat for Each Round

A calibration set is built from several rounds, moving the stage between them. For each round:

1. Move the axes to the next position.
2. Take the **Pos Shot**.
3. Take the **Neg Shot**.
4. Confirm the centre and the histograms.
5. **Copy the two PNGs out of `image_cali/`** if you need to keep them — the next round overwrites them.

---

## Before Moving On

| Check | |
|---|---|
| All five axes homed successfully | ☐ |
| Patterns visible on every monitor direction | ☐ |
| `capture_positive_shot.png` written and looks correct | ☐ |
| `capture_negative_shot.png` written and looks correct | ☐ |
| Positive CPX / CPY sit on the centre of the concentric pattern | ☐ |
| Negative CPX / CPY sit on the centre of the concentric pattern | ☐ |
| Histogram curves swing clearly, no flat tops | ☐ |
| Images copied out of `image_cali/` if this round must be kept | ☐ |

Next: open **Moil Cali Result** to compute and inspect the values — see [3. Calibration Result](/moilcalib_documentation/docs/v1.1/calibration/cali-result).

---

## Troubleshooting

| Problem | Cause | Solution |
|---|---|---|
| "No image received from camera server" | The camera server is not running or the URL is wrong. | Check the Camera URL, confirm the camera server is up (`http://<server-ip>:8002/docs`), then press **Update**. |
| "Received data could not be decoded as an image" | The server replied, but not with a usable image. | Check the camera driver selection on the server and that the camera is connected. |
| The capture is black or shows no pattern | The pattern was not pushed to the monitors, or brightness is at zero. | Re-send the pattern from the [Monitor Viewer](/moilcalib_documentation/docs/v1.1/calibration/monitor-viewer) and raise the brightness. |
| Auto-detected centre is clearly wrong | The threshold does not suit this image. | Adjust **PosThr** / **NegThr**, or switch to **Manual**, click the correct centre, and let Auto refine it. |
| The centre keeps changing between captures | Auto mode re-detects on every shot — this is expected. | Use **Locked** once you are satisfied with the centre. |
| Clicking the image does nothing | Pattern Mode is empty (a plain Capture). | Take a **Pos Shot** or **Neg Shot** first. |
| No `image_cali/` folder anywhere | It is created relative to the launch directory. | Read the full path from the **Img Path** field, or relaunch the client from the project root. |
| The images disappeared | **Reset** was used. | Reset deletes the cached captures and patterns. Capture again — and copy files out before resetting next time. |
| Controls are greyed out | An axis is still moving; the safety lock is active. | Wait for the axis to stop, or press its **STOP** button. |

---

## Summary

Camera calibration is the capture run: connect to the servers, home the axes, put the pattern on the monitors, then take a **positive** and a **negative** shot. Each shot pushes its own pattern, saves a PNG into `image_cali/`, detects the pattern centre from that image, and refreshes the histograms. The two files —

```text
image_cali/capture_positive_shot.png
image_cali/capture_negative_shot.png
```

— together with the PCT values from the Pattern Generator, are the input to the calibration result calculation in step 3.

---

_Screenshots on this page are reused from version 1.0 and will be replaced with version 1.1 captures._
