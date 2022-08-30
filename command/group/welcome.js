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
	name: "welcome",
	alias: ["welcome"],
	desc: "Activar la función de bienvenida a nuevos miembros",
	use: "on/off",
	category: "group",
	query: "Ingresa una de estas opciones\non = activar\noff = desactivar",
	isAdmin: true,
	isSpam: true,
	async run({ msg, conn }, { args, prefix }) {
		let data = JSON.parse(require("fs").readFileSync("./lib/database/welcome.json"));
		let data2 = db.cekDatabase("welcome", "id", msg.from);
		if (args[0] == "on") {
			if (data2) throw "Ha estado activo antes";
			db.modified("welcome", { id: msg.from, teks: "Grupo: @subject\nUsuario : @user", lastUpdate: false });
			await msg.reply(`Bienvenida activada correctamente`);
		} else if (args[0] == "off") {
			if (!data2) throw "No activo anteriormente";
			data.splice(getPosition(msg.from, data), 1);
			require("fs").writeFileSync("./lib/database/welcome.json", JSON.stringify(data, null, 2));
			await msg.reply("Eliminar con éxito la sesión de bienvenida en este grupo");
		}
	},
};
