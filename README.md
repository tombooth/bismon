# BIScuit MONitor

A data collecting, arduino powered, bluetooth biscuit tin.

## Usage

### Arduino sketch

Requires the following libraries to be installed:
   - [Nordic Bluetooth low energy SDK for Arduino beta version 0.9.0](https://github.com/NordicSemiconductor/ble-sdk-arduino/archive/0.9.0.beta.zip)
   - [RedBearLab nRF8001 Library version 20140509](https://github.com/RedBearLab/nRF8001/archive/20140509.zip)
   - [LiPoFuelGauge](https://github.com/awelters/LiPoFuelGauge)

### Node.JS client app

```
$ cd client
$ npm install

Once biscuit tin is running

$ node index.js [BEARER_TOKEN]
```
