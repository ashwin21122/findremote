async function setBuzzer(value) {
    if (!buzzerCharacteristic) return;

    try {
        await buzzerCharacteristic.writeValue(new Uint8Array([value]));

        if (value === 1) {
            helpText.textContent = "Your remote is ringing!";
            document.getElementById("finderMessage").textContent =
                "Listening for your remote...";
        } else {
            helpText.textContent = "Sound stopped.";
            document.getElementById("finderMessage").textContent =
                "Remote finder stopped.";
        }

    } catch (error) {
        console.error(error);
        alert("Could not send the command to the sensor.");
    }
}