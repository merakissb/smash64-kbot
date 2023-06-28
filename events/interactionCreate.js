const { Events } = require('discord.js');
const { execSync } = require('child_process');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) {
			if (interaction.isButton() && interaction.customId.startsWith('copy:')) {
        const [_, host, port] = interaction.customId.split(':');
        const address = `${host}:${port}`;

				try {
          const command = getClipboardCommand(address);

          if (command) {
            execSync(command);
          }

          await interaction.reply({
            content: 'Address copied to clipboard.',
            ephemeral: true
          });
        } catch (error) {
          console.error('Error copying to clipboard:', error);
        }
			}
			return;
		}

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};

function getClipboardCommand(address) {
  let command = '';

  if (process.platform === 'darwin' || process.platform === 'linux') {
    command = `printf "${address}" | pbcopy`;
  } else if (process.platform === 'win32') {
    command = `echo|set/p="${address}"|clip`;
  }

  return command;
}