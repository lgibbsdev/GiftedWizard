const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }
    async run(client, message, args) {
      if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have the permissions required to use this command!");
      if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have permission to mute members. Please edit my role.");
  
      const muteRole = message.guild.roles.cache.find(role => role.name === "Muted");
      const memberRole = message.guild.roles.cache.find(role => role.name === "Verified Member");
      const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

      if (!args[0]) return message.channel.send(`You must state someone to unmute. \`-unmute @user \``);
      if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
      if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot unmute yourself');
      if (mentionedMember.roles.cache.has(muteRole)) return message.channel.send('The user stated is already unmuted.')

      await mentionedMember.roles.remove(muteRole);
      await mentionedMember.roles.add(memberRole);
      await message.channel.send('I have successfully unmuted the member')
  }
}