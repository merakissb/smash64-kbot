const Tail = require('tail').Tail;
const { getLoginValues } = require('./getLoginValues');
const { getQuitUserId } = require('./getQuitUserId');
const { removeUser } = require('./removeUser');

function startLogReader(logDir, users) {
  const tail = new Tail(logDir);

  tail.on('line', (line) => {
    if (line.includes('login request:')) {
      const { id, nick, ping } = getLoginValues(line);

      if (id && nick && ping) {
        const user = { id, nick, ping };
        users[id] = user;
      }
    } else if (line.includes('quit:') || line.includes('quit: Ping Timeout')) {
      const id = getQuitUserId(line);

      if (id) {
        removeUser(users, id);
      }
    }
  });

  tail.on('error', (error) => {
    console.error('Error reading log file:', error);
  });
}

module.exports = {
  startLogReader,
};
