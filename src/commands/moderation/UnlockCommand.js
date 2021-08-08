const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class UnlockCommand extends BaseCommand {
  constructor() {
    super('unlock', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have the permissions required to use this command!');
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I do not have permission to edit channels. Please edit my role.");

    const role = message.guild.roles.cache.find(role => role.name === "Verified Member");
    const unlockEmbed = new Discord.MessageEmbed()
      .setTitle('I have successfully unlocked the channel!')
      .setColor("#ff0000")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL);
    let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!lockChannel) lockChannel = message.channel;

    await lockChannel.updateOverwrite(role, {
      SEND_MESSAGES: true
    })
    message.channel.send(unlockEmbed)
    await message.delete()
  }
}