const { monospace, isUrl } = require("../../lib/function")

module.exports = {
  name: "goredl",
  alias: ["goredl"],
  category: "downloader",
  desc: "Descargar gore xd",
  async run({msg, conn},{q}){
    if(!q) throw `- Ejemplo : .${msg.command} <link>_`
    if(!isUrl(q) && q.includes("seegore.com")) throw 'Link invalido'
    await msg.reply(respon.wait)
    try {
      gor = await sc.goredl(q)
      gore = gor.data
      txt = "*Gore - Downloader*\n\n"
      txt += `- título : ${gore.judul}` + "\n"
      txt += `- Vistas : ${gore.views}` + "\n"
      txt += `- Comentarios : ${gore.comment}` + "\n"
      txt += `- Link : ${gore.link}` + "\n\n"
      txt += "@delirius_bot"
      conn.sendFile(msg.from, gore.link, "", txt,msg)
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}