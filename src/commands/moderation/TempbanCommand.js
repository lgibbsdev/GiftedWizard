const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms')

module.exports = class TempbanCommand extends BaseCommand {
  constructor() {
    super('tempban', 'moderation', []);
  }

  async run(client, message, args) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the permissions required to use this command!");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have permission to ban members. Please edit my role.");
    
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(2).join(" ");
    let time = args[1];
    const tempbanEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been temporarily banned in ${message.guild.name}`)
      .addField(`Reason: ${reason}`, `Duration: ${time}`)
      .setTimestamp()
      .setColor("#ff0000")
      .setFooter(client.user.tag, client.user.displayAvatarURL);
    const appealsEmbed = new Discord.MessageEmbed()
      .setTitle("You may appeal by clicking on this embed")
      .setURL('https://docs.google.com/forms/d/e/1FAIpQLSdl56CJwlzVcII6ZDYMAMK0O2WEQtbZI6oWc_AgZK5cqWy59g/viewform?usp=sf_link')
      .setTimestamp()
      .setColor("#ff0000")
      .setFooter(client.user.tag, client.user.displayAvatarURL);

    if (!args[0]) return message.channel.send(`You must state someone to ban. \`-tempban @user time reason\``);
    if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot ban yourself');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('I cannot be banned');
    if (!reason) reason = 'No reason given.';
    if (!time) return message.channel.send(`You must state a duration to ban. \`-tempban @user time reason\``);
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot ban someone of the same role or higher than you.');

    await mentionedMember.send(tempbanEmbed);
    await mentionedMember.send(appealsEmbed);
    await mentionedMember.ban({
      days: 0,
      reason: reason });
    await message.channel.send('I have successfully banned the member');

    setTimeout(async function () {
      await message.guild.fetchBans().then(async bans => {
        if (bans.size == 0) return message.channel.send('This server doesn\'t have any bans.');
        let bannedUser = bans.find(b => b.user.id == mentionedMember);
        if (!bannedUser) return console.log ('Member Unbanned')
        await message.guild.members.unban(bannedUser.user, reason)
      });
    }, ms(time));
  }
}