module.exports = {
  name: "savefile",
  alias: ["sf","sv","safe","save"],
  category: "private",
  query: `Ingresa el nombre de archivo.\nEjemplo: \n .save index.js\n.save command/main/main.js\n.save lib/function/function.js\n.save lib/function. js`,
  isOwner: true,
  isQuoted: true,
  async run({msg, conn},{q, args}){
    try {
      teks = `./${q}`
      await require("fs").writeFileSync(teks, msg.quoted.text);
	  	await msg.reply(`Guardado exitosamente.`);
	  //	process.send("reset");
    } catch (e) {
      global.error(msg.command, e, msg)
    }
  }
}