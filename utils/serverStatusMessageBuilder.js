const { messages } = require('../locales/en');

function buildServerStatusMessage(name, alive, responseTime, clientLocation, host, port, admin) {
  const title = alive ? messages.serverResponding : messages.serverNotResponding;
  const description = alive
    ? messages.serverTook.replace('${name}', name).replace('${responseTime}', responseTime).replace('${clientLocation}', clientLocation)
    : messages.serverDidNotRespond.replace('${name}', name).replace('${clientLocation}', clientLocation);

  const fields = alive
    ? [
        {
          name: messages.tryFollowing,
          value: `${messages.checkAddress.replace('${host}', host).replace('${port}', port)}\n${messages.waitMinutes}\n${messages.supportMessage.replace('${admin}', admin)}`
        },
      ]
    : [
        {
          name: messages.knowInfo,
          value: `${messages.usedAddress.replace('${host}', host).replace('${port}', port)}\n${messages.checkReturned}\n${messages.supportMessage.replace('${admin}', admin)}`
        },
      ];

  const color = alive ? 0x4cae4e : 0xff0000;

  return {
    embed: {
      color,
      title,
      description,
      fields,
      timestamp: new Date(),
    },
  };
}

module.exports = {
  buildServerStatusMessage,
};
