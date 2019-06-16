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
       let _this = this
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
       if(!client.hasPermissions(options.permissions))
	
       this.run({
           message:message,
           args: args,
           client: message.client,
           prefix:prefix,
		   buildMessage(params={}){
            params.title  = params.title ? params.title : _this.name.pop();
            params.color = params.color || message.client.color;
            params.footer = params.footer ||  {
              icon_url:message.author.displayAvatarURL,
              text:message.author.username
            }
            params = {embed:params};
             return {
                 send(id){
                     if (!id) message.channel.send(params)
                     else message.client.channels.get(id.toString()).send(params)
                 }
             }}
       })}
       catch(err){
         if (message.client.logErrors)  console.error(`${err.toString()} in command: ${this.name.pop()}`);
         message.client.emit("commandError",_this,err);
       }
       this.ob.push(message.author.id)
       setTimeout(() => this.ob.splice(this.ob.indexOf(message.authorid),1),1000*this.cd)
  }
}
