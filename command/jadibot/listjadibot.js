const prettyms = require('pretty-ms')

module.exports = {
  name: "listjadibot",
  alias: ["listjadibot","listbot"],
  category: "jadibot",
  desc: "Mostar a los usuarios que son bots!",
  async run({conn, msg}){
    try {
      let user = [... new Set([...global.conns.filter(conn => conn).map(conn => conn)])]
      te = "*List Jadibot*\n\n"
      te += ` Total : ${global.conns.length}\n\n`
      for(let i of user){
        y = await conn.decodeJid(i.user.id)
        te += "Usuario : @" + y.split("@")[0] + "\n"
        te += "Nombre : " + i.user.name + "\n"
        te += "Tiempo : " + await prettyms(Date.now() - i.time, { verbose: true, }) + "\n\n"
      }
      user != "" ? await msg.reply(te,{withTag : true}) : await msg.reply("No hay usuarios")
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}
