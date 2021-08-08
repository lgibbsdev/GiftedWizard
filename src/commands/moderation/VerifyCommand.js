const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class VerifyCommand extends BaseCommand {
  constructor() {
    super('verify', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have permission to ban members. Please edit my role.");
    
    const verifyRole = message.guild.roles.cache.find(role => role.name === "Verified Member");

    await message.member.roles.add(verifyRole).catch(err => console.log(err));
    const verifiedEmbed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} is now verified`)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL)
      .setColor("#ff0000")
    
    message.channel.send(verifiedEmbed)
    await message.delete()

  }
}