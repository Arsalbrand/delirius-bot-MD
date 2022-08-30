module.exports = {
  name: "localonly",
  alias: ["localonly","antiluar"],
  category: "group",
  desc: "Elimina a usuarios de otros paises",
  use: "<on / off>",
  query: "enter options\non = aktif\noff = nonaktif",
  isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({msg, conn},{args}){
	  let data = JSON.parse(require("fs").readFileSync("./lib/database/localonly.json"));
		let data2 = data.includes(msg.from);
	  if(args[0] == "on"){
	    if (data2) throw "Ha estado activo antes";
			db.modified("localonly", msg.from);
			await msg.reply(`Localonly solo se activó correctamente`);
	  } else if(args[0] == "off"){
	    if (!data2) throw "No activo antes";
			data.splice(data.indexOf(msg.from), 1);
			require("fs").writeFileSync("./lib/database/localonly.json", JSON.stringify(data, null, 2));
			await msg.reply("eliminar con éxito el localonly solo en este grupo");
	  }
	}
}