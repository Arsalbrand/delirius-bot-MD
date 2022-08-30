const fs = require("fs")

module.exports = async function(msg, conn) {
  const word = JSON.parse(require("fs").readFileSync('./lib/database/toxic.json'))
  const { body, sender, isGroup, from, reply } = msg;
  if(word[msg.from] == undefined) return
   for(let kasar of word[msg.from].kata){
     if(body.includes(kasar)){
       if(word[msg.from].warning[msg.sender] == undefined){
         word[msg.from].warning[msg.sender] = {
                        kata: [kasar],
                        count: 1
                    }
       } else {
         word[msg.from].warning[msg.sender].kata.push(kasar)
         word[msg.from].warning[msg.sender].count++
       }
       await fs.writeFileSync('./lib/database/toxic.json', JSON.stringify(word))
       if(word[msg.from].warning[msg.sender].count == 10){
         teks = "⚠️ ️ADVERTENCIA\n\n"
         teks += "Palabra prohibida detectada.\n"
         teks += " - Palabra : " + kasar + "\n"
         teks += " - Advertencia : 10/10 \n\n"
         teks += "Lo siento, serás expulsado por el bot"
         msg.reply(teks)
         setTimeout(() => {
           conn.groupParticipantsUpdate(msg.from, [msg.sender], "remove")
         }, 3000);
         word[msg.from].warning[msg.sender] = {
                        kata: [],
                        count: 0
                    }
          await fs.writeFileSync('./lib/database/toxic.json', JSON.stringify(word))
                } else {
         text = "⚠️ ️ ADVERTENCIA\n\n"
         text += "Kata terlarang terdeteksi..\n"
         text += " - Palabra : " + kasar + "\n"
         text += " - Advertencia : " + word[msg.from].warning[msg.sender].count + "/5 \n\n"
         text += "Nota: Si la advertencia ha llegado a 10, el bot lo eliminará automáticamente."
         return msg.reply(text)
       }
     }
   }
}