function removeUser(users, id) {
  if (users[id]) {
    delete users[id];
  }
}

module.exports = {
  removeUser,
};