const { monospace } = require('../../lib/function')

module.exports = {
  name: "randomgore",
  alias: ["gore","randomgore"],
  category: "random",
  wait: true,
  async run({msg, conn},{cmdNya}){
    try {
      gore = await sc.randomgore()
      result = gore.data
      txt = "*- Random - Gore -*\n\n"
      txt += `• Tituo : ${result.judul}` + "\n" 
      txt += `• Vistas : ${result.views}` + "\n"
      txt += `• Comentario : ${result.comment}` + "\n"
      txt += `• Link : ${result.link}`
      await conn.sendFile(msg.from, result.link, "", txt, msg)
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}