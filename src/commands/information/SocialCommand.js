const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SocialCommand extends BaseCommand {
  constructor() {
    super('social', 'information', []);
  }

  async run(client, message, args) {
    const youtubeEmbed = new Discord.MessageEmbed()
      .setTitle('Check out Trooper Gibbs on YouTube!')
      .setURL('https://www.youtube.com/channel/UC01z3StDEdxU-FucKyBCB8A/')
      .setTimestamp()
      .setColor("#ff0000")
      .setFooter('TrooperGibbs#4693');
    const patreonEmbed = new Discord.MessageEmbed()
      .setTitle('Check out Trooper Gibbs on Patreon!')
      .setURL('https://www.patreon.com/troopergibbs')
      .setTimestamp()
      .setColor("#ff0000")
      .setFooter('TrooperGibbs#4693');
    const discordEmbed = new Discord.MessageEmbed()
      .setTitle('Check out Trooper Gibbs\'s Discord Server!')
      .setURL('https://discord.gg/FHvut3U9sa')
      .setTimestamp()
      .setColor("#ff0000")
      .setFooter('TrooperGibbs#4693');

    message.channel.send(youtubeEmbed).catch(err => console.log(err));
    message.channel.send(patreonEmbed).catch(err => console.log(err));
    message.channel.send(discordEmbed).catch(err => console.log(err));
  }
}