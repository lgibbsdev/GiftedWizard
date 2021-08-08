const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the permissions required to use this command!");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have permission to ban members. Please edit my role.");
    
    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!reason) reason = 'No reason given.';
    if (!args[0]) return message.channel.send('You must state someone to ban. \`-ban @user reason\`');
    if (!mentionedMember) return message.channel.send('The member mentioned is not in the server');
    if (!mentionedMember.bannable) return message.channel.send('I cannot ban that member. Make sure my role is above theirs.');

    const banEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been banned from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setTimestamp()
      .setColor("#ff0000")
      .setFooter(client.user.tag, client.user.displayAvatarURL);
    const appealsEmbed = new Discord.MessageEmbed()
      .setTitle("You may appeal by clicking on this embed")
      .setURL('https://docs.google.com/forms/d/e/1FAIpQLSdl56CJwlzVcII6ZDYMAMK0O2WEQtbZI6oWc_AgZK5cqWy59g/viewform?usp=sf_link')
      .setTimestamp()
      .setColor("#ff0000")
      .setFooter(client.user.tag, client.user.displayAvatarURL);

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.send(appealsEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 0,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send("I have succesfully banned the member!"));
  }
}