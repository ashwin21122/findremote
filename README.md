# FindRemote

FindRemote is a starter prototype for finding a misplaced TV remote using a small Bluetooth sensor attached to it.

## What this prototype does

- Connects a web page to an ESP32 Bluetooth Low Energy (BLE) sensor.
- Sends a command to turn an attached buzzer on or off.
- Lets you save a manually entered last-known location label.

## Important limitation

A normal BLE connection and buzzer do **not** reveal the remote's exact physical coordinates or which side of a sofa it is under. This prototype rings the remote so you can hear it. The location label is manually entered.

For precise direction and distance, investigate UWB hardware (a compatible tag and phone/anchor system). BLE signal strength can provide rough proximity estimates with suitable hardware/software, but it is not exact indoor positioning.

## Project structure

```text
findremote/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── style.css
├── js/
│   └── app.js
└── firmware/
    └── FindRemote.ino
```

## Run the web app

1. Open this folder in VS Code.
2. Install the **Live Server** extension.
3. Open `index.html`.
4. Right-click and choose **Open with Live Server**.
5. Use Chrome with Web Bluetooth support. The page must be served from localhost or HTTPS.

The web interface can be opened before the ESP32 is ready, but the Connect button needs the hardware to work.

## Hardware needed

- ESP32 development board with BLE support
- Active buzzer
- Jumper wires
- USB cable and suitable power source
- A small enclosure and safe attachment method

## Wire the buzzer

This example uses GPIO 25:

- Buzzer signal / positive pin -> GPIO 25 (check your buzzer module's voltage and current requirements)
- Buzzer ground / negative pin -> GND

If your buzzer draws more current than an ESP32 GPIO can safely supply, use a suitable transistor driver and external supply. Do not connect a high-current buzzer directly to an ESP32 pin.

## Upload the ESP32 firmware

1. Install Arduino IDE and the ESP32 board support package.
2. Open `firmware/FindRemote.ino`.
3. Select your ESP32 board and COM port.
4. Upload the sketch.
5. Power the ESP32. It advertises as `FindRemote-Remote`.
6. In the web app, choose **Connect to remote sensor**, select the device, then press **Ring my remote**.

## Git practice

```bash
git init
git status
git add .
git commit -m "Initial FindRemote prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/findremote.git
git push -u origin main
```

After editing files:

```bash
git status
git diff
git add .
git commit -m "Improve finder interface"
git push
```

Create a feature branch:

```bash
git switch -c feature-low-battery-indicator
```

When the feature is ready:

```bash
git add .
git commit -m "Add low battery indicator"
git switch main
git merge feature-low-battery-indicator
git push
```

Replace the GitHub URL with your own repository URL.
