module.exports = function (client) {
    client.on("message", (async message) => {
        if (message.author.bot) return;
        const { language, prefix } = message.guild ? await database.Guilds.findOne({_id: message.guild.id}) : null
        const guildId = message.guild && message.guild.id

        const botMention = client.user.toString()

        const sw = (...s) => s.some(st => message.content.startsWith(st))
        const usedPrefix = sw(botMention, `<@!${client.user.id}>`) ? `${botMention} ` : sw(prefix) ? prefix : null
        
        if (usedPrefix) {
            const fullCmd = message.content.substring(usedPrefix.length).split(/[ \t]+/).filter(a => a)
            const args = fullCmd.slice(1)
            if (!fullCmd.length) return
            
            const cmd = fullCmd[0].toLowerCase().trim()
            const command = client.commands.find(c => c.name.includes(cmd))
      
            if(command) {
                if(message.content.startsWith(message.guild.me.toString())) message.mentions.users = message.mentions.users.filter(a => a.id != client.user.id)

                const t = client.i18next.getFixedT(language)
      
                command.runCommand(message, args, t)
      }
    }
    })
}
