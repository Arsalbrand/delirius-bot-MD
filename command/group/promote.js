module.exports = {
	name: "promote",
	alias: ["pm","promote"],
	category: "group",
	desc: "Asignar admin a un miembro del grupo",
	use: "<mencionar>",
	isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({ msg, conn }) {
		const mm = msg.quoted ? [msg.quoted.sender] : msg.mentions;
		for (let i of mm) await conn.groupParticipantsUpdate(msg.from, [i], "promote");
		await msg.reply("Listo");
	},
};
