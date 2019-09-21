redis = require('redis');
var client = redis.createClient();

/*
* @description: establishing connection to redis cache
*/
exports.redisConnection = function(){
    client.on('connect', function(){
        console.log('redis connection established!');
    });

    client.on('error', function(err){
        console.log('error while connecting to redis ->',err);
        process.exit();
    });

    client.on('disconnect', function(){
        console.log('redis disconnected.')
        process.exit();
    });
}