const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const ms = require('ms')

module.exports = class LockCommand extends BaseCommand {
  constructor() {
    super('lock', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have the permissions required to use this command!');
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I do not have permission to edit channels. Please edit my role.");

    const role = message.guild.roles.cache.find(role => role.name === "Verified Member");
    const lockEmbed = new Discord.MessageEmbed()
      .setTitle('I have successfully locked the channel!')
      .setColor("#ff0000")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL);
    let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!lockChannel) lockChannel = message.channel;

    await lockChannel.updateOverwrite(role, {
      SEND_MESSAGES: false
    })
    message.channel.send(lockEmbed)
    await message.delete()

  }
}