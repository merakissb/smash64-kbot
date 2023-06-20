function getQuitUserId(line) {
  const quitMatch = line.match(/User(\d+)/);

  if (quitMatch) {
    return quitMatch[1];
  }

  return '';
}

module.exports = {
  getQuitUserId,
};