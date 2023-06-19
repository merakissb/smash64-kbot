const Tail = require('tail').Tail;

const archivo = '/Users/meraki/EmuLinkerSF/emulinker.log';
const tail = new Tail(archivo);

const users = {};

tail.on('line', (linea) => {
  if (linea.includes('login request:')) {
    const { id, nick, ping } = getLoginValues(linea);

    if (id && nick && ping) {
      const user = { nick, ping };
      users[id] = user;

      console.log('users:', users);
    }
  } else if (linea.includes('quit:') || linea.includes('quit: Ping Timeout')) {
    const id = getQuitId(linea);

    if (id) {
      removeUser(id);
    }
  }
});

function getLoginValues(linea) {
  const idMatch = linea.match(/User(\d+)/);
  const nameMatch = linea.match(/name=(.*?)\s*,/);
  const pingMatch = linea.match(/ping=(\d+)/);

  if (idMatch && nameMatch && pingMatch) {
    const id = idMatch[1];
    const nick = nameMatch[1].trim();
    const ping = parseInt(pingMatch[1]);
    return { id, nick, ping };
  }

  return {};
}

function getQuitId(linea) {
  const quitMatch = linea.match(/User(\d+)/);

  if (quitMatch) {
    return quitMatch[1];
  }

  return '';
}

function removeUser(id) {
  if (users[id]) {
    delete users[id];

    console.log('User removed with ID:', id);
    console.log('users:', users);
  }
}
