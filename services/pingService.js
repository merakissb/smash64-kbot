const ping = require('ping');

async function pingService(host, port) {
  try {
    const response = await ping.promise.probe(host, { port: port });
    const responseTime = parseInt(response.time);
    return { alive: response.alive, responseTime };
  } catch (error) {
    return { alive: false, responseTime: -1 };
  }
}

module.exports = { pingService };