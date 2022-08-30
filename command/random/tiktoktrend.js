const { monospace, random } = require("../../lib/function")
const { tiktoktrend } = require("../../lib/scrape");


module.exports = {
  name: "tiktoktrend",
  alias: ["tttrend","tiktoktrend"],
  category: "random",
  desc: "Unknown",
  wait: true,
  async run({msg,conn},{map, cmdNya}){
    try {
      var trend = await tiktoktrend();
      result = await random(trend.result)
      txt = "*Tiktok trend*\n\n"
      txt += monospace(`• User : ${result.username}`) + "\n"
      txt += monospace(`• Descargas : ${result.upload_time}`) + "\n"
      txt += monospace(`• Vistas : ${result.views}`) + "\n"
      txt += monospace(`• Likes : ${result.like}`) + "\n"
      txt += monospace(`• Comentarios : ${result.comment}`) + "\n"
      txt += monospace(`• Compartido : ${result.share}`) + "\n"
      txt += monospace(`• Descripcion : ${result.caption}`)
      conn.sendFile(msg.from, result.video, "tt.mp4",txt,msg)
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}
