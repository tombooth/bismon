
var noble = require('noble');

var RBL_SERVICE_UUID = "713D0000503E4C75BA943148F18D941E",
    RBL_CHAR_TX_UUID = "713D0002503E4C75BA943148F18D941E",
    RBL_CHAR_RX_UUID = "713D0003503E4C75BA943148F18D941E";

function by_uuid(list, uuid) {
  var uuid = uuid.toLowerCase(),
      filtered = list.filter(function(i) {
        return i.uuid.toLowerCase() === uuid;
      });

  return filtered && filtered[0]
}

function read_message(data) {
  switch (data.toString('utf8', 0, 1)) {
    case 'O':
      return {
        weight: data.readInt16BE(1),
        light: data.readInt16BE(3),
        battery: data.readFloatBE(5)
      };
    default:
      return {
        message: 'unknown'
      };
  }
}

noble.on('discover', function(peripheral) {
  noble.stopScanning();
  console.log('Found a device: ' + peripheral.advertisement.localName);
  console.log('Connecting...');
  peripheral.connect(function(err) {
    if (err) console.log(err);
    else {
      console.log('Connected.');
      console.log('Finding RBL service...');
      peripheral.discoverServices([RBL_SERVICE_UUID], function(err, services) {
        if (err) console.log(err);
        else {
          var rbl_service = services[0];

          console.log('Found.');
          console.log('Finding TX and RX...');

          rbl_service.discoverCharacteristics(
            [RBL_CHAR_TX_UUID, RBL_CHAR_RX_UUID],
            function(err, characteristics) {
              if (err) console.log(err);
              else {
                var tx = by_uuid(characteristics, RBL_CHAR_TX_UUID),
                    rx = by_uuid(characteristics, RBL_CHAR_RX_UUID);

                console.log('Found.');
                console.log('Configuring...');

                tx.on('read', function(data) {
                  console.log(read_message(data));
                });
                tx.notify(true);
                console.log('Done.');
              }
            }
          );
        }
      });
    }
  });
});

console.log('Scanning...');
noble.startScanning();
