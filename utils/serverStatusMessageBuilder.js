const { messages } = require('../locales/en');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const colors = require('./colors');

function buildServerStatusMessage(name, alive, responseTime, clientLocation, host, port, admin) {

  let row = null;

  if (alive) {
    row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`copy:${host}:${port}`)
        .setLabel('Copy Address')
        .setStyle(ButtonStyle.Success)
    );
  }

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

  const color = alive ? colors.success : colors.error;

  return {
    embed: {
      color,
      title,
      description,
      fields,
    },
    components: row ? [row] : null ,
  };
}

module.exports = {
  buildServerStatusMessage,
};
