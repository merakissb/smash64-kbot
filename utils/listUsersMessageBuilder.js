const { messages } = require('../locales/en');
const colors = require('./colors');

function buildListUsersMessage(users) {
  const userList = Object.values(users).map(user => `ID: ${user.id}, Nick: ${user.nick}, Ping: ${user.ping}`);
  const title = userList.length > 0 ? messages.usersConnected : messages.noUsersConnected;
  const description = userList.length > 0 ? 'Users connected to the server:\n' + userList.join('\n') : 'No users connected to the server.';
  const color = userList.length > 0 ? colors.success : colors.error;

  return {
    embed: {
      color,
      title,
      description,
      timestamp: new Date(),
    },
  };
}

module.exports = {
  buildListUsersMessage,
};