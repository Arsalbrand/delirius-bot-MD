const { monospace } = require("../../lib/function")

module.exports = {
  name: "tagall",
  alias: ["tagall","infoall"],
	category: "group",
	desc: "Mencionar a todos los participantes del grupo",
	isGroup: true,
	isAdmin: true,
	async run({msg, conn},{q}){
	  let data = await conn.groupMetadata(msg.from)
	  let txt1 = `Anuncio \n\n`
	  let txt = `• De @${msg.sender.split("@")[0]}\n`
	      txt += `• Mensaje : ${q ? q : "Sin mensaje"}\n`
	      txt += `• Grupo : ${data.subject}\n`
	      txt += `• Miembros : ${data.participants.length}\n\n`
	      for(let i of data.participants){
	        txt += `>  @${i.id.split("@")[0]}\n`
	      }
	      txt2 = "\n\n" + global.footer
	      teks = txt1 + txt + txt2
	      conn.sendMessage(msg.from,{text : teks, withTag : true},{quoted:msg})
	}
}
