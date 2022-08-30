let { monospace } = require("../../lib/function")

module.exports = {
  name: "searchgore",
  alias: ["sgore","goresearch"],
  category: "search",
  desc: "Busqueda de gore..",
  async run({msg, conn},{q}){
    if(!q) throw `_Ejemplo : .${msg.command} brutal_`
    try {
      gore = await sc.searchgore(q);
      txt = `*Busqueda Gore*\n-Si desea descargar el video, escriba .goredl <link>\n\n`
      for (let i of gore.data){
        txt += `- Titulo : ${i.judul}` + "\n"
        txt += `- Descargas : ${i.uploader}` + "\n"
        txt += `- Imagen : ${i.thumb}` + "\n"
        txt += `- Link : ${i.link}` + "\n"
        txt += `-------------------------` + "\n\n"
      }
      conn.sendFile(msg.from, gore.data[0].thumb,'', txt, msg)
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}