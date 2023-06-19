const { SlashCommandBuilder } = require('discord.js');
const { server } = require('../../config.json');
const { buildServerStatusMessage } = require('../../utils/serverStatusMessageBuilder');
const { pingService } = require('../../services/pingService');
const { geolocationService } = require('../../services/geolocationService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('checkserver')
    .setDescription('Status and delay responses!'),
  category: 'utility',
  async execute(interaction) {
    await interaction.deferReply();

    const { name, host, port, admin } = server;
    const { alive, responseTime } = await pingService(host, port);
    const clientLocation = await geolocationService();

    const message = buildServerStatusMessage(name, alive, responseTime, clientLocation, host, port, admin);

    await interaction.editReply({ embeds: [message.embed] });
  },
};