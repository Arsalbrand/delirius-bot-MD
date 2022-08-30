const lyrics = require("music-lyrics")

module.exports = {
  name: "lirik",
  alias: ["lirik","liric"],
  category: "search",
  desc: "Busqueda de letras",
  async run({msg},{q, cmdNya}){
    if(!q) throw "Ejemplo: .lirik nothing on you"
    try{
            lir = await lyrics.search(q)
            lir != '' ? await msg.reply(lir) : await msg.reply('Letra no encontrada')
        }catch(e){
            global.error(cmdNya, e, msg)
        }
  }
}