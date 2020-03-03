var mqtt = require('mqtt');
var options = {
	username: 'sub',
	password: 'secret'
}

var client  = mqtt.connect('mqtts://localhost', options)



client.on('connect', function () {
	client.subscribe("default");
})


client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
})