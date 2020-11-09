#include <qmobot.h>
#include <WiFi.h>


const char* ssid = "QMOBOT3";
const char* password = "12345678";

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
  
  WiFi.softAP(ssid, password);
  delay(1000);
  
  wifiServer.begin();

  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
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
        // run_it(c);
        client.write(c);
      }
      delay(10);
    }

    stop();
    client.stop();
    Serial.println("Client disconnected");
  }
}