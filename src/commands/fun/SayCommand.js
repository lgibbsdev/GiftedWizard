const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'fun', []);
  }

  async run(client, message, args) {
    const messageToSay = args.slice(0).join(" ");
    if (!args[0]) return message.channel.send('There was no message provided.')
    const sayEmbed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} says: ${messageToSay}`)
      .setFooter(message.author.tag, message.author.displayAvatarURL)
      .setColor("#ff0000")
      .setTimestamp();
    
      await message.channel.send(sayEmbed)
      await message.delete()
    
  }
}