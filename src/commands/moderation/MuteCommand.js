const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have the permissions required to use this command!");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have permission to mute members. Please edit my role.");

    const muteRole = message.guild.roles.cache.find(role => role.name === "Muted");
    const memberRole = message.guild.roles.cache.find(role => role.name === "Verified Member");
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ");
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setTimestamp()
      .setColor("#ff0000")
      .setFooter(client.user.tag, client.user.displayAvatarURL);

    if (!args[0]) return message.channel.send(`You must state someone to mute. \`-mute @user reason\``);
    if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot mute yourself');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('I cannot be muted');
    if (!reason) reason = 'No reason given.';
    if (mentionedMember.roles.cache.has(muteRole)) return message.channel.send('The user stated is already muted.')
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot mute someone of the same role or higher than you.')

    await mentionedMember.send(muteEmbed);
    await mentionedMember.roles.add(muteRole);
    await mentionedMember.roles.remove(memberRole);
    await message.channel.send('I have successfully muted the member')

  }
}