module.exports = {
  name: "settextwelcome",
  alias: ["setwelcome"],
  category: "group",
  query: "Ingresa un texto\n@subject subject group\n@ownergc owner group\n@user tag participant is left\n@creation when was the group created\n@desc descripdescription",
  isGroup: true,
  isAdmin: true,
  async run({msg,conn},{q}){
    try {
      let dataNeeded = db.cekDatabase("welcome", "id", msg.from);
      if (!dataNeeded) throw "Bienvenida aún no está activado en este grupo\nUsar comando: *.welcome on*";
      let data = JSON.parse(require('fs'). readFileSync('./lib/database/welcome.json'))
      let da = data.find((a) => a.id == msg.from);
      da.teks = q;
	  	da.lastUpdate = Date.now();
	  	require("fs").writeFileSync("./lib/database/welcome.json", JSON.stringify(data, null, 2));
      await	msg.reply("Listo")
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}



		
    
    
		
	  