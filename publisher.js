var mqtt = require('mqtt');
var options = {
	username: 'pub',
	password: 'secret'
}

var client  = mqtt.connect('mqtt://localhost', options)


client.on('connect', function () {

      client.publish('default', 'Hello mqtt')
    }
 )