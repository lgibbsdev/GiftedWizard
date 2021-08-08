const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NukeCommand extends BaseCommand {
  constructor() {
    super('nuke', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have the permissions required to use this command!');
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I do not have permission to delete channels. Please edit my role.");

    let reason = args.join(" ")
    const nukeChannel = message.channel;

    if (!reason) reason = 'No reason given.';
    if (!nukeChannel.deletable) return message.channel.send("I cannot delete this channel.")

    await nukeChannel.clone().catch(err => console.log(err))
    await nukeChannel.delete(reason).catch(err => console.log(err))
  }
}