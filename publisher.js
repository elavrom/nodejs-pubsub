var mqtt = require('mqtt');
var options = {
	username: 'pub',
	password: 'secret'
}

var client  = mqtt.connect('mqtts://localhost', options)


client.on('connect', function () {

      client.publish('default', 'Hello mqtt')
    }
 )