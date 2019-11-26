# Raspberry-wemos-restapi
IoT project to send and receive data between raspberry &amp; wemos , in this project you will find 2 folders one for wemos source code , and another one for raspberry Angular interface.

## instructions

- make sure you have `angular/cli` & `node` (v10 or higher) installed in your raspberry .

- put the interface folder in your Raspberry using ssh or vnc , then `cd interface` , run the angular app with `ng serve`.

- open the second folder for the ESP8266 in your Arduino IDE then change the SSID & Password for your AP .

- make sure that raspberry and wemos are in the same netwrok or you can use `ngrok` to give you a public URL tunnel to your 

localhost port , ex : with angular `ngrok http 4200`.

