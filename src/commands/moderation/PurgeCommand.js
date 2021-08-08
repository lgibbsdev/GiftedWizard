const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You do not have the permissions required to use this command!');
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have permission to delete messages. Please edit my role.");
    if(!args[0]) return message.channel.send("You must state a number of messages to purge. \`-purge numberOfMessages\`");
    const amountToDelete = Number(args[0], 10);

    if (isNaN(amountToDelete)) return message.channel.send("Number stated is not a valid number.");
    if (!Number.isInteger(amountToDelete)) return message.channel.send("Number stated must be a whole number.");
    if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send('The number stated must be between 2 and 100.');
    const fetched = await message.channel.messages.fetch({
      limit: amountToDelete
    });

    try {
      await message.channel.bulkDelete(fetched)
        .then(messages => message.channel.send(`I deleted \`${messages.size}\` messages!`));
    } catch (err) {
      console.log(err);
      message.channel.send(`I was unable to delete the amount stated, please make sure the messages are recent.`);
    }
  }
}