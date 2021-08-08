const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const ms = require('ms')

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {

    const muteRole = message.guild.roles.cache.find(role => role.name === "Muted");
    const memberRole = message.guild.roles.cache.find(role => role.name === "Verified Member");
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let time = args[1];
    let reason = args.slice(2).join(" ");
    const tempmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been temporarily muted in ${message.guild.name}`)
      .addField(`Reason: ${reason}`, `Duration: ${time}`)
      .setTimestamp()
      .setColor("#ff0000")
      .setFooter(client.user.tag, client.user.displayAvatarURL);

    if (!args[0]) return message.channel.send(`You must state someone to mute. \`-tempmute @user time reason\``);
    if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot mute yourself');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('I cannot be muted');
    if (!reason) reason = 'No reason given.';
    if (!time) return message.channel.send(`You must state a duration to mute. \`-tempmute @user time reason\``);
    if (mentionedMember.roles.cache.has(muteRole)) return message.channel.send('The user stated is already muted.');
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot mute someone of the same role or higher than you.');

    await mentionedMember.send(tempmuteEmbed);
    await mentionedMember.roles.add(muteRole);
    await mentionedMember.roles.remove(memberRole);
    await message.channel.send('I have successfully muted the member');

    setTimeout(async function () {
      await mentionedMember.roles.remove(muteRole);
      await mentionedMember.roles.add(memberRole);
      await mentionedMember.send(`Your mute in ${message.guild.name} has been lifted.`);
    }, ms(time));
  }
}