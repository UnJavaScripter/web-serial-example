byte incomingByte[1];

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    int serialMessage = Serial.parseInt();
    if(serialMessage == 1) {
      Serial.println("LED On");
      digitalWrite(13, HIGH);
    } else if(serialMessage == 0) {
      Serial.println("LED Off");
      digitalWrite(13, LOW);
    }
  }
}
