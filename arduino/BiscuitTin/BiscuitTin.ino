

#include <SPI.h>
#include <boards.h>
#include <RBL_nRF8001.h>
#include <services.h>

#include <Wire.h>
#include <MAX17043.h>

MAX17043 fuelGauge;

void setup()
{
  Serial.begin(57600);
  Serial.println("BLE Arduino Biscuit Tin");
  fuelGauge.begin();
  
  // Default pins set to 9 and 8 for REQN and RDYN
  // Set your REQN and RDYN here before ble_begin() if you need
  //ble_set_pins(3, 2);
  
  // Set your BLE Shield name here, max. length 10
  ble_set_name("BiscuitTin");
  
  // Init. and start BLE library.
  ble_begin();
}

static byte buf_len = 0;

void ble_write_string(byte *bytes, uint8_t len)
{
  if (buf_len + len > 20)
  {
    for (int j = 0; j < 15000; j++)
      ble_do_events();
    
    buf_len = 0;
  }
  
  for (int j = 0; j < len; j++)
  {
    ble_write(bytes[j]);
    buf_len++;
  }
    
  if (buf_len == 20)
  {
    for (int j = 0; j < 15000; j++)
      ble_do_events();
    
    buf_len = 0;
  }  
}

void loop()
{
  if (ble_connected()) {  
    int weight = analogRead(A0);
    byte weight_lo = weight;
    byte weight_hi = weight>>8;
    
    int light = analogRead(A3);
    byte light_lo = light;
    byte light_hi = light>>8;
    
    float battery = fuelGauge.getBatteryPercentage();
    byte *battery_arr = (byte*) &battery;
    
    byte buf[] = {'O', weight_hi, weight_lo, light_hi, light_lo, battery_arr[3], battery_arr[2], battery_arr[1], battery_arr[0]};
    ble_write_string(buf, 9);
  }
  
  ble_do_events();
  buf_len = 0;
  delay(1000);
}


