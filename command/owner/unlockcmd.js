module.exports = {
	name: "unlockcmd",
	alias: ["ulockcmd"],
	category: "private",
	isOwner: true,
	desc: "Funciones de desbloqueo",
	use: `<nombre del comando>`,
	query: `Introduce el nombre del comando`,
	async run({ msg, conn }, { q, map, args, arg }) {
		var data = [...map.command.keys()];
		[...map.command.values()]
			.map((x) => x.alias)
			.join(" ")
			.replace(/ +/gi, ",")
			.split(",")
			.map((a) => data.push(a));
		if (!data.includes(q)) throw "Comando no encontrado";
		if (!map.lockcmd.has(q)) throw "Este comando no ha sido bloqueado antes";
		map.lockcmd.delete(q);
		await msg.reply(`Se desbloqueo con exito el comando "${q}"`);
	},
};
