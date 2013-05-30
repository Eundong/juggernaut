var sys   = require("util");
var url   = require("url");
var redis = require("redis");

module.exports.createClient = function(redisPort, redisHost){
  var client;
  
  if (process.env.REDISTOGO_URL) {
    var address = url.parse(process.env.REDISTOGO_URL);
    client = redis.createClient(address.port, address.hostname);
    client.auth(address.auth.split(":")[1]);
  } else {
    client = redis.createClient(redisPort, redisHost);
  }
  
  // Prevent redis calling exit
  client.on("error", function(error){
    sys.error(error);
  });
  
  return client;
};
