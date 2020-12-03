#include <qmobot.h>
#include <WiFi.h>


const char* ssid = "NU";
const char* password = "1234512345";

WiFiServer wifiServer(80);

void run_it(char dir) {
  // 0 - stop
  // 1 - up
  // 6 - down
  // 2 - right
  // 3 - left
  // 4 - right up
  // 5 - left up

  if(dir=='0'){
    stop();
  }
  else if(dir=='1'){
    stop();
    run('R', 255);
    run('L', 255);
  }
  else if(dir=='6'){
    run('R', -255);
    run('L', -255);
  }
  else if(dir=='2'){
    run('R', -255);
    run('L', 255);
  }
  else if(dir=='3'){
    run('L', -255);
    run('R', 255);
  }
  else if(dir=='4'){
    run('R', 100);
    run('L', 255);
  }
  else if(dir=='5'){
    run('L', 100);
    run('R', 255);
  }
}


void setup() {
  begin(true, true);

  erase();
  stop();
  
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
 
  Serial.println("Connected to the WiFi network");
  
  wifiServer.begin();

  IPAddress IP = WiFi.localIP();
  Serial.print("IP address: ");
  Serial.println(IP);

  show("QMOBOT.COM", 30, 30);
}

void loop() {
  WiFiClient client = wifiServer.available();
 
  if (client) {
    Serial.println("Client connected");
 
    while (client.connected()) {
 
      while (client.available()>0) {
        char c = client.read();
        Serial.println(c);
        run_it(c);
        client.write(c);
      }
      delay(10);
    }

    stop();
    client.stop();
    Serial.println("Client disconnected");
  }
}