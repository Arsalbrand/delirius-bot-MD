const getPosition = (name, _dir) => {
	let position = null;
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === name) {
			position = i;
		}
	});
	if (position !== null) {
		return position;
	}
};

module.exports = {
	name: "left",
	alias: ["left"],
	desc: "Activa la función de despedida de grupo",
	use: "<on/off>",
	category: "group",
	query: "Ingresar opciones\non = Activar\noff = Desactivar",
	isAdmin: true,
	async run({ msg, conn }, { args, prefix }) {
		let data = JSON.parse(require("fs").readFileSync("./lib/database/left.json"));
		let data2 = db.cekDatabase("left", "id", msg.from);
		if (args[0] == "on") {
			if (data2) throw "Activo anteriormente";
			db.modified("left", { id: msg.from, teks: "Adios @user", lastUpdate: false });
			await msg.reply(`Activado exitosamente`);
		} else if (args[0] == "off") {
			if (!data2) throw "Activo antes";
			data.splice(getPosition(msg.from, data), 1);
			require("fs").writeFileSync("./lib/database/left.json", JSON.stringify(data, null, 2));
			await msg.reply("Eliminar con éxito la despedida en este grupo");
		}
	},
};
