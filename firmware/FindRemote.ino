#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>

#define BUZZER_PIN 25

#define SERVICE_UUID "12345678-1234-1234-1234-1234567890ab"
#define BUZZER_UUID  "12345678-1234-1234-1234-1234567890ac"

class BuzzerCallback : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *characteristic) {
    String value = characteristic->getValue().c_str();

    if (value.length() > 0 && value[0] == 1) {
      digitalWrite(BUZZER_PIN, HIGH);
    } else {
      digitalWrite(BUZZER_PIN, LOW);
    }
  }
};

void setup() {
  Serial.begin(115200);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  BLEDevice::init("FindRemote-Remote");

  BLEServer *server = BLEDevice::createServer();
  BLEService *service = server->createService(SERVICE_UUID);

  BLECharacteristic *buzzerCharacteristic = service->createCharacteristic(
    BUZZER_UUID,
    BLECharacteristic::PROPERTY_WRITE
  );

  buzzerCharacteristic->setCallbacks(new BuzzerCallback());
  service->start();

  BLEAdvertising *advertising = BLEDevice::getAdvertising();
  advertising->addServiceUUID(SERVICE_UUID);
  advertising->start();

  Serial.println("FindRemote sensor is ready.");
}

void loop() {
  delay(100);
}
