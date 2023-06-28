const { messages } = require('../locales/en');
const { server } = require('../config.json');
const colors = require('./colors');

function buildListUsersMessage(users) {
  const userList = Object.values(users).map(user => `${user.nick} \`${user.ping}ms\``);
  const hasUsersConnected = userList.length > 0;
  const description = hasUsersConnected ? userList.join('\n') : messages.noUsersConnected;
  const color = hasUsersConnected ? colors.success : colors.error;

  return {
    embed: {
      color,
      author: {
        name: server.name,
        iconURL: server.iconUrl
      },
      description
    },
  };
}

module.exports = {
  buildListUsersMessage,
};