const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'information', []);
  }

  async run(client, message, args) {
    const sectionEmbed = new Discord.MessageEmbed()
      .setTitle('Bot Help Sections')
      .setDescription('Use \`-help sectionName\` to access another section.')
      .addField('\`fun\`', 'Commands that all users have access to that have fun uses.')
      .addField('\`info\`', 'Commands that all users have access to that have informational uses.')
      .addField('\`mod\`', 'Commands that only moderators and above have access to that have moderation uses')
      .setColor("#ff0000")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL);

    const funEmbed = new Discord.MessageEmbed()
      .setTitle('Fun Commands')
      .setDescription('These are commands that all users have access to that have fun uses.')
      .addField('\`-avatar\`', 'This command shows your name and profile picture in the chat.')
      .addField('\`-say messageToSay\`', 'This command puts whatever you say after it into an embed.')
      .setColor("#ff0000")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL);
      
    const infoEmbed = new Discord.MessageEmbed()
      .setTitle('Informational Commands')
      .setDescription('These are commands that all users have access to that have informational uses.')
      .addField('\`-help sectionName\`', 'Displays a specific section of the help menu')
      .addField('\`-social\`', 'Diplays TrooperGibbs\'s socials')
      .setColor("#ff0000")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL);

    const modEmbed = new Discord.MessageEmbed()
      .setTitle('Moderation Commands')
      .setDescription('These are commands that only moderators and above have access to that have moderation uses')
      .addField('\`-ban @user reason\`', 'Bans a mentioned user.')
      .addField('\`-tempban @user length reason\`', 'Temporarily bans a mentioned user.')
      .addField('\`-unban userID\`', 'Unbans a user.')
      .addField('\`-kick @user reason\`', 'Kicks a user.')
      .addField('\`-mute @user reason\`', 'Mutes a user.')
      .addField('\`-tempmute @user length reason\`', 'Temporarily mutes a user.')
      .addField('\`-unmute @user\`', 'Unmutes a user.')
      .addField('\`-lock\`', 'Locks a channel.')
      .addField('\`-unlock\`', 'Unlocks a channel.')
      .addField('\`-purge numberOfMessages\`', 'Deletes the designated number of messages.')
      .addField('\`-nuke channelID\`', 'Clones a channel, then deletes it. This is used to mass clear all messages from a channel.')
      .addField('\`-verification\`', 'Displays the verification message.') 
      .setColor("#ff0000")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL);

    if (!args[0]) return message.channel.send(sectionEmbed);
    if (args[0] == 'fun') return message.channel.send(funEmbed);
    else if (args[0] == 'info') return message.channel.send(infoEmbed);
    else if (args[0] == 'mod') return message.channel.send(modEmbed);
  }
}