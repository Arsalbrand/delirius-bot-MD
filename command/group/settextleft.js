module.exports = {
	name: "settextleft",
	alias: ["setleft"],
	desc: "Cambiar el texto de despedida",
	category: "group",
	use: "<texto>",
	query: "Ingresa un texto\n@subject subject group\n@ownergc owner group\n@user tag participant is left\n@creation when was the group created\n@desc descripdescription",
	isAdmin: true,
	isGroup: true,
	async run({ msg, conn }, { q }) {
		let dataNeeded = db.cekDatabase("left", "id", msg.from);
		if (!dataNeeded) throw "Despedida ún no está activado en este grupo\nActivar comando : *left on*";
		let data = JSON.parse(require("fs").readFileSync("./lib/database/left.json"));
		let da = data.find((a) => a.id == msg.from);
		da.teks = q;
		da.lastUpdate = Date.now();
		require("fs").writeFileSync("./lib/database/left.json", JSON.stringify(data, null, 2));
		await msg.reply("Listo")
	},
};
