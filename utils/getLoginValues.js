function getLoginValues(line) {
  const idMatch = line.match(/User(\d+)/);
  const nameMatch = line.match(/name=(.*?)\s*,/);
  const pingMatch = line.match(/ping=(\d+)/);

  if (idMatch && nameMatch && pingMatch) {
    const id = idMatch[1];
    const nick = nameMatch[1].trim();
    const ping = parseInt(pingMatch[1]);
    return { id, nick, ping };
  }

  return {};
}

module.exports = {
  getLoginValues,
};