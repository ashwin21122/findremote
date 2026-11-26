const SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
const BUZZER_UUID = "12345678-1234-1234-1234-1234567890ac";

const connectBtn = document.getElementById("connectBtn");
const ringBtn = document.getElementById("ringBtn");
const stopBtn = document.getElementById("stopBtn");
const connectionStatus = document.getElementById("connectionStatus");
const statusDot = document.getElementById("statusDot");
const helpText = document.getElementById("helpText");
const locationInput = document.getElementById("locationInput");
const locationText = document.getElementById("locationText");
const saveLocationBtn = document.getElementById("saveLocationBtn");

let device;
let buzzerCharacteristic;

function setConnected(connected) {
  connectionStatus.textContent = connected ? "Connected" : "Not connected";
  connectionStatus.className = connected ? "status connected" : "status disconnected";
  statusDot.classList.toggle("on", connected);
  ringBtn.disabled = !connected;
  stopBtn.disabled = !connected;
  helpText.textContent = connected
    ? "Your sensor is connected. Press the button to make the remote beep."
    : "Connect your FindRemote sensor to activate the finder.";
}

async function connectSensor() {
  if (!navigator.bluetooth) {
    alert("Web Bluetooth is not available in this browser. Try Chrome on Android or desktop Chrome, using localhost or HTTPS.");
    return;
  }

  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: "FindRemote" }],
      optionalServices: [SERVICE_UUID]
    });

    device.addEventListener("gattserverdisconnected", () => {
      buzzerCharacteristic = null;
      setConnected(false);
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    buzzerCharacteristic = await service.getCharacteristic(BUZZER_UUID);
    setConnected(true);
  } catch (error) {
    console.error(error);
    alert("Could not connect. Make sure the ESP32 is powered on and nearby.");
  }
}

async function setBuzzer(value) {
  if (!buzzerCharacteristic) return;
  try {
    await buzzerCharacteristic.writeValue(new Uint8Array([value]));
    helpText.textContent = value === 1 ? "Ringing your remote..." : "Sound stopped.";
  } catch (error) {
    console.error(error);
    alert("Could not send the command to the sensor.");
  }
}

connectBtn.addEventListener("click", connectSensor);
ringBtn.addEventListener("click", () => setBuzzer(1));
stopBtn.addEventListener("click", () => setBuzzer(0));

const savedLocation = localStorage.getItem("findremote-location");
if (savedLocation) locationText.textContent = savedLocation;

saveLocationBtn.addEventListener("click", () => {
  const value = locationInput.value.trim();
  if (!value) {
    alert("Enter a location label first.");
    return;
  }
  localStorage.setItem("findremote-location", value);
  locationText.textContent = value;
  locationInput.value = "";
});
