module.exports = {
	name: "tourl",
	alias: ["tourl", "tolink","upload"],
	desc: "Convertir archivo a url",
	use: "Responde un mensaje que desea subir a la wweb",
	isMedia: {
		isQVideo: true,
		isQImage: true,
	},
	category: "tools",
	wait: true,
	async run({ msg, conn }, { q, cmdNya }) {
	  try {
		 y = await msg.quoted.download()
     buff = await tool.telegraph (y)
     msg.reply(buff)
	  } catch (e){
	    global.error(cmdNya, e, msg)
	  }
	},
};
