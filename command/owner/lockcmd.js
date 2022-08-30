module.exports = {
	name: "lockcmd",
	category: "private",
	isOwner: true,
	desc: "Deshabilitar funciones",
	use: `<comando | xdd>`,
	query: `Ingrese el nombre del parámetro comando y motivo, ejemplo: #lockcmd help | off`,
	async run({ msg, conn }, { q, map, args, arg }) {
		if (!args[2]) throw "Introduzca el motivo, ejemplo: #lockcmd play | dormir";
		var data = [...map.command.keys()];
		[...map.command.values()]
			.map((x) => x.alias)
			.join(" ")
			.replace(/ +/gi, ",")
			.split(",")
			.map((a) => data.push(a));
		if (!data.includes(q.split("|")[0].trim())) throw "Comando no encontrado";
		if (map.lockcmd.has(q.split("|")[0].trim())) throw "Este comando ha sido bloqueado antes";
		map.lockcmd.set(q.split("|")[0].trim(), q.split("|")[1].trim());
		await msg.reply(`Comando bloqueado con éxito "${q.split("|")[0].trim()}" con razón "${q.split("|")[1].trim()}"`);
	},
};
