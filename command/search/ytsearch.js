let yts = require("yt-search")
let { monospace } = require('../../lib/function')


module.exports = {
  name: "ytsearch",
  alias: ["yts","ytsearch","youtubesearch","getmp3","getmp4","getmusic","getvideo"],
  category: "search",
  desc: "Busqueda en youtube",
  async run({msg, conn},{q, cmdNya}) {
    let { quoted, from, reply } = msg;
    switch(cmdNya){
      case "yts":
      case "ytsearch":
      case "youtubesearch":
        if(!q) throw `Ejemplo : .${cmdNya} <pregunta>`
        try {
          await msg.reply(respon.wait)
          let yt = await yts(q)
          let txt = `*YouTube Search*\n\n`
          txt += `Para descargar use .getmp3 <link>\n.getmp4 <link>\n\n\n`
          n = 0
          for ( var i of yt.all ) {
            txt += `No.${n+=1}\n`
            txt += '- Titulo : ' + i.title + '\n'
            txt += '- Link : ' + i.url + '\n'
            txt += '- Id : ' + i.videoId + '\n'
            txt += '- Descargas : ' + i.ago + '\n'
            p = await tool.formatRupiah(`${i.views}`, ".")
            txt += ' × Views : ' + p + '\n\n'
           }
           await conn.sendFile(msg.from, yt.all[0].thumbnail, "",txt,msg)
        } catch (e){
          global.error(cmdNya, e, msg)
        }
        break;
        
        case "getmp3":
        case "getmusic":
          if(!q) throw `Ejemplo : .${cmdNya} 1`
          if(!msg.quoted) throw "Responde un mensaje"
          if(!msg.quoted.isSelf) throw "Responde un mensaje del bot"
          await reply(respon.wait)
          urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
          if (!urls) throw `Tal vez el mensaje que respondiste no contiene el resultado de ytsearch`
          y = await sc.youtube("mp3",urls[q - 1], "265")
          txt = "* YouTube - Downloader*\n\n"
          txt += "Titulo: " + y.title + "```\n"
          txt += "Genero : " + y.genre + "```\n"
          txt += "Size : " + y.size + "```\n"
          p = await tool.formatRupiah(`${y.views}`, ".")
          txt += "Vistas : " + p + "\n"
          txt += "Calidad : " + y.quality + "\n"
          txt += "Duracion : " + y.seconds + " sec " + ` ( ${y.timestamp} ) ` + "\n"
          txt += "Descargas : " + y.uploadDate + ` ( ${y.ago} ) ` + "\n"
          txt += "Link : " + y.url + "\n"
          await conn.sendFile(from, y.thumb, "", txt,msg)
          await conn.sendFile(msg.from, y.link, "yt.mp3","", msg)
          break
        
        case "getmp4":
        case "getvideo":
          if(!q) throw `Ejemplo : .${cmdNya} 1`
          if(!msg.quoted) throw "Responde un mensaje"
          if(!msg.quoted.isSelf) throw "Responde un mensaje del bot"
          await reply(respon.wait)
          urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
          if (!urls) throw `Tal vez el mensaje que respondiste no contiene el resultado de ytsearch`
          y = await sc.youtube("mp4",urls[q - 1], "480")
          txt = "*YouTube - Downloader*\n\n"
          txt += "Titulo : " + y.title + "\n"
          txt += "Genero : " + y.genre + "\n"
          txt += "Peso : " + y.size + "\n"
          p = await tool.formatRupiah(`${y.views}`, ".")
          txt += "Vistas : " + p + "\n"
          txt += "Calidad : " + y.quality + "\n"
          txt += "Duracion : " + y.seconds + " sec " + ` ( ${y.timestamp} ) ` + "\n"
          txt += "Descargas : " + y.uploadDate + ` ( ${y.ago} ) ` + "\n"
          txt += "Link : " + y.url + "\n"
          await conn.sendFile(from, y.thumb, "", txt,msg)
          await conn.sendFile(msg.from, y.link, "yt.mp4","", msg)
          break
    }
  }
}
