const buildMessage = require("./createMessage.js")
module.exports = class Command {
   constructor(client, options = {}) {
       this.name = options.name || "invalid"
       this.cd = options.cooldown || 0
       this.description = options.description || "Comando sem Descrição"
       this.cdMessage = options.cdMessage 
       this.category = options.category || "Sem categoria"
       this.guildOnly = options.guildOnly || false
       this.clientPermissions = options.clientPermissions || null
       this.permissions = options.permissions || null
       this.ob = []
       this.client = client
       this.run = options.run || function(params){
          params.message.reply({
             embed:{
                 title:"Maintence",
                 description:"This command is under maintence",
                 color: params.message.client.color
             } 
          })
       };
   }
   runCommand(message, prefix, args){
       try {
       const client = message.guild.me
       if(options.permissions) {
	  const missing = message.channel.permissionsFor(message.author).missing(this.userPermissions)
	  if(missing.length > 0) {
	    if(missing.length === 1) {
		return message.channel.send(`Você precisa da permissão \`${this.userPermissions.join(", ")}\` para executar esse comando.`)
	    }
	  }
	       
       }
	
       const promise = this.run(message, args, client, prefix)
       
       const retVal = await promise
       
       return retVal
  }
}
