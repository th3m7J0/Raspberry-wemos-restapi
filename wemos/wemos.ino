/*
    * ==================
    * GITHUB : 
    * ==================
*/

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
//#include <DHT.h>
#include <stdlib.h>

ESP8266WebServer server;
uint8_t pin_led = 2; // led inclue dans l'arduino
char* ssid = "PUT YOUR SSID";
char* password = "PUT YOUR PASSWORD";

float tmp[] = {18, 20, 22, 24};
float hmd[] = {56, 58, 60, 54};

//#define DHTPIN D2 
//#define DHTTYPE DHT11   // DHT 22  (AM2302), AM2321
//DHT dht(DHTPIN, DHTTYPE);

void setup() {
    //dht.begin();
    pinMode(pin_led, OUTPUT);
    Serial.begin(115200);
    
    // connecting to wifi ----------------
    WiFi.begin(ssid, password);
    Serial.print("CONNECTING ... ");
    while(WiFi.status()!=WL_CONNECTED) {
        Serial.print(". ");
        delay(500);
    }
    Serial.println("");
    Serial.print("Local IP Address: ");
    Serial.println(WiFi.localIP());
    //Serial.print("External IP Address: ");
    
    
    
    // define endpoints ------------------
    server.on("/switchLight",switchLight);
    server.on("/getInfo",getInfo);
    server.on("/receiveData",receiveData);
    server.begin();
}





void switchLight(){
    digitalWrite(pin_led,!digitalRead(pin_led)); // toggle LED status "ON" or "OFF"
    String led_state = digitalRead(pin_led) ? "OFF" : "ON"; // get LED status
    Serial.println(led_state);
    server.sendHeader("Access-Control-Allow-Origin", "*"); // to allow cors origin
    server.send(200,"application/json", "{\"state\" :\""+ led_state +"\"}");
}

void getInfo() {
    // float humidity = dht.readHumidity();
    // float temperature = dht.readTemperature();
  float humidity = hmd[rand() % 4];
    float temperature = tmp[rand() % 4];
    String json = "{\"t\":\"" + String(temperature) + "\","; // to send DATA as JSON
    json += "\"h\":\"" + String(humidity) + "\"}";
    
    server.sendHeader("Access-Control-Allow-Origin", "*"); // to allow cors origin
    server.send(200, "application/json", json);
} 

void receiveData() { // this function is just to receive data from server 
    Serial.print(server.arg("data"));
    // do somthing with this data : server.arg("*****")
    Serial.println("");
    server.sendHeader("Access-Control-Allow-Origin", "*"); // to allow cors origin
    server.send(200,"application/json", "{\"message\" : \"data received successfuly\"}");
}

void loop(){
    server.handleClient();
} 
