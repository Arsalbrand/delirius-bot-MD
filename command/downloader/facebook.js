const { monospace, isUrl } = require("../../lib/function")

module.exports = {
  name: "fb",
  alias: ["fbdl","facebook","fb"],
  category: "downloader",
  desc: "Descargas de facebook",
  async run({msg, conn},{q}){
    if(!q) throw `- Ejemplo : ${msg.command} <link>`
    if(!isUrl(q) && q.includes("facebook.com")) throw 'Link invalido'
    await msg.reply(respon.wait)
    try {
      fbdl = await sc.facebook2(q)
      txt = "*Facebook - Downloader*\n\n"
      txt += `- Titulo : ${fbdl.title}_\n`
      txt += `- Link : ${fbdl.hd != '' ? fbdl.hd : fbdl.sd}_`
      fbdl.hd != '' ? await conn.sendFile(msg.from, fbdl.hd, "", txt, msg) : await conn.sendFile(msg.from, fbdl.sd, "", txt, msg)
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}