const { monospace } = require("../../lib/function")

module.exports = {
  name: ["help"].map((v) => v + " <comando>"),
  alias: ["help"],
  category: "main",
  desc: ['Ver información del comando', '.help <Command>'],
  async run({msg,conn},{ args, q, map}) {
      if(!q) return msg.reply("Ejemplo : .help menu",{adReply: true})
			const name = q.toLowerCase();
			const { command, prefix } = map;
			const cmd = command.get(name) || [...command.values()].find((x) => x.alias.find((x) => x == args[0]));
			if (!cmd || (cmd.category === "private" && !config.owner.includes(msg.sender)))
				return await msg.reply("Comando no encontrado");
			helpcmd = global.footer + "\n\n"
			helpcmd += "*Ayuda del comando*\n\n"
			helpcmd += `• Comando : ${q}` + "\n"
			helpcmd += `• Comandos similares : ${cmd.alias.join(", ")}` + "\n"
			helpcmd += `• Categoria : ${cmd.category}` + "\n\n"
			helpcmd += "*Permisos para el comando*\n"
			helpcmd += `• isOwner : ${cmd.options.isOwner ? '✅' : '❌'}` + "\n"
			helpcmd += `• isAdmin : ${cmd.options.isAdmin ? '✅' : '❌'}` + "\n"
			helpcmd += `• isBotAdmin : ${cmd.options.isBotAdmin ? '✅' : '❌'}` + "\n"
			helpcmd += `• isGroup : ${cmd.options.isGroup ? '✅' : '❌'}` + "\n"
      helpcmd += `• isPrivate : ${cmd.options.isPrivate ? '✅' : '❌'}` + "\n"
			helpcmd += `• Command Lock : ${map.lockcmd.get(q) ? "✅" : "❌"}` + "\n\n"
			helpcmd += "*Descripcion del comando*\n"
			helpcmd += `• Descripcion : ${cmd.desc}` + "\n"
			helpcmd += `• Uso : ${prefix}${cmd.name} ${cmd.use}` + "\n\n"
			helpcmd += "*Nota :*\n"
			helpcmd += `➠ *[ ]* = Opcional\n ➠ *|* = Or\n ➠ *<>* = Must be filled`
      msg.reply(helpcmd)
  }
}
