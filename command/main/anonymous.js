const fs = require('fs')
module.exports = {
  name: "anonymous",
  alias: ["anonymous","start","next","leave","stop"],
  desc: "#start para comenzar a buscar usuarios anónimos\n#stop para salir del chat\n#next para encontrar otros usuarios",
  category: "anonymous",
  isPrivate: true,
  async run({msg,conn},{q}){
    const { command } = msg
    const desc = '#start para buscar usuarios anonimos\n#stop para salir del chat\n#next para encontrar otro usuario'
        const anony = JSON.parse(fs.readFileSync('./lib/database/anonymous.json'))
        const isanon = Object.values(anony).find(anon => [anon.a, anon.b].includes(msg.sender))
        buttonAll = [ 
                { buttonId: `.start`, buttonText: { displayText: 'START' }, type: 1 },
                { buttonId: `.next`, buttonText: { displayText: 'NEXT' }, type: 1 },
                { buttonId: `.leave`, buttonText: { displayText: 'LEAVE' }, type: 1 }
           ]
        buttonNext = [ 
                { buttonId: `.next`, buttonText: { displayText: 'NEXT' }, type: 1 },
                { buttonId: `.leave`, buttonText: { displayText: 'LEAVE' }, type: 1 }
           ]
           
           
    switch(command){
      case "anonymous":
        await conn.sendMessage(msg.from, {text: "Charla anónima\n\n" + desc,footer: "_haga clic aquí_",buttons: buttonAll,headerType: 1},{quoted : msg })
        break

      case "start":
        if(isanon) return msg.reply('¡Aún estás en el chat!')
            await msg.reply('buscando usuarios...')
            find = Object.values(anony).find(anon => anon.status == 'search')
            if(find == undefined){
                anony[msg.sender] = {
                    id: msg.sender,
                    a: msg.sender,
                    b: '',
                    status: 'search'
                }
                await fs.writeFileSync('./lib/database/anonymous.json', JSON.stringify(anony))
            }
            else{
                find.b = msg.sender
                find.status = 'chatting'
                anony[find.id] = {...find}
                await fs.writeFileSync('./lib/database/anonymous.json', JSON.stringify(anony))
                find = Object.values(anony).find(anon => [anon.a, anon.b].includes(msg.sender))
                await conn.sendMessage(find.a, {text: "_Usuarios encontrados.._",footer: config.namebot,buttons: buttonNext,headerType: 1},{quoted : msg })
                await conn.sendMessage(find.b, {text: "_Usuarios encontrados.._",footer: config.namebot,buttons: buttonNext,headerType: 1},{quoted : msg })
            }
        break

      case "next":
        if(!isanon) return msg.reply("No has iniciado el chat anónimo\nEscribe: #start para iniciar")
            find = Object.values(anony).find(anon => [anon.a, anon.b].includes(msg.sender) && anon.status == 'chatting')
            if(find == undefined) return msg.reply('¡Aún no tienes pareja!')
            pas = find.a == msg.sender ? find.b : find.a
            if(!pas) return msg.reply('No tienes pareja')
            await conn.sendMessage(pas, {text: "_El usuario abandonó el chat_",footer: config.namebot,buttons: buttonAll,headerType: 1},{quoted : msg })
            delete anony[find.id]
            await fs.writeFileSync('./lib/database/anonymous.json', JSON.stringify(anony))
        break
 
      case "leave":
      case "stop":
        if(!isanon) return msg.reply("No has iniciado el chat anónimo\nEscribe: #start para iniciar")
            find = Object.values(anony).find(anon => [anon.a, anon.b].includes(msg.sender))
            pas = find.a == msg.sender ? find.b : find.a
            if(find.b != '') await conn.sendMessage(pas, {text: "_El usuario abandonó el chat.._",footer: config.namebot,buttonAll: buttonAll,headerType: 1},{quoted : msg })
            delete anony[find.id]
            await fs.writeFileSync('./lib/database/anonymous.json', JSON.stringify(anony))
        break
    }
  }
}
