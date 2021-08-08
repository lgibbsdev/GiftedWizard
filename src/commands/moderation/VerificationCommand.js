const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class VerificationCommand extends BaseCommand {
  constructor() {
    super('verification', 'moderation', []);
  }

  async run(client, message, args) {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You do not have the permissions required to use this command!");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have permission to manage roles. Please edit my role.");

    const verifyEmbed = new Discord.MessageEmbed()
      .setTitle('Human Verification')
      .setDescription('Type \`-verify\` below to verify that you are human!')
      .setTimestamp()
      .setColor("#ff0000")
      .setFooter(client.user.tag, client.user.displayAvatarURL);

    message.channel.send(verifyEmbed)
    await message.delete()

  }

}