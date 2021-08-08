const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'test', []);
  }

  async run(client, message, args) {
    message.channel.send('pong');
  }
}