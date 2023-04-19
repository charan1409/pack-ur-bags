const redis = require('redis');

const client = redis.createClient({
    password: 'zC9jjbffQ3MgFrRNmZ2tTyFFhsFyRRGZ',
    socket: {
        host: 'redis-13875.c301.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 13875
    }
});
client.connect();
client.on('connect', () => {
    console.log('Redis client connected');
});

module.exports = client;