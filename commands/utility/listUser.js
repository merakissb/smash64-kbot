const { SlashCommandBuilder } = require('discord.js');
const { startLogReader } = require('../../utils/logReader');
const { server } = require('../../config.json');
const { buildListUsersMessage } = require('../../utils/listUsersMessageBuilder');

const { logDir } = server;

let users = {};

function getListUsersResponse(users) {
  const reply = buildListUsersMessage(users);
  return { embeds: [reply.embed] };
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list_users')
    .setDescription('List all users connected to the server'),
  category: 'utility',
  async execute(interaction) {
    await interaction.deferReply();

    startLogReader(logDir, users);

    const reply = getListUsersResponse(users);
    interaction.editReply(reply);
  },
};