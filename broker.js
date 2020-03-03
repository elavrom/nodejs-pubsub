var mosca = require('mosca');


// Accepts the connection if the username and password are valid
var authenticate = function(client, username, password, callback) {
  var authorized = ((username === 'pub' || username =='sub') && password.toString() === 'secret');
  if (authorized) client.user = username;
  callback(null, authorized);
}

// In this case the client authorized as alice can publish to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizePublish = function(client, topic, payload, callback) {
  callback(null, client.user == "pub");
}

// In this case the client authorized as alice can subscribe to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizeSubscribe = function(client, topic, callback) {
  callback(null, client.user == "sub");
}


var SECURE_KEY = __dirname + '/certificate_authority/server_key.pem';
var SECURE_CERT = __dirname + '/certificate_authority/server.pem';


var settings = {
  port: 1883,
  logger: {
    name: "secureExample",
    level: 40,
  },
  secure : {
    port: 8883,
    keyPath: SECURE_KEY,
    certPath: SECURE_CERT,
  }
}

var server = new mosca.Server(settings);






server.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  server.authenticate = authenticate;
  server.authorizePublish = authorizePublish;
  server.authorizeSubscribe = authorizeSubscribe;
  console.log(server);
  console.log('Mosca server is up and running');

}