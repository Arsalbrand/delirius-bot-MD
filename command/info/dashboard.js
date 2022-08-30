const prettyms = require("pretty-ms")
const { monospace } = require('../../lib/function')

module.exports = {
	name: "dashboard",
	alias: ["db"],
	desc: "Monitor " + config.namebot + " informacion de la cantidad de comandos usados",
	category: "info",
	isSpam: true,
	wait: false,
	async run({ msg, conn }) {
		dashboard.sort(function (a, b) {
			return b.success - a.success;
		});
		let success = dashboard.map((a) => a.success);
		let failed = dashboard.map((a) => a.failed);
		let jumlah = require("mathjs").evaluate(success.join("+")) + require("mathjs").evaluate(failed.join("+"));
		
		txt = "*" + config.namebot + "Tablero*\n\n"
		txt += "Hits globales\n";
		txt += `   • Global : ${jumlah}` + `\n`
		txt += `   • Éxito : ${require("mathjs").evaluate(success.join("+"))}` + `\n`
		txt += `   • Fallido : ${require("mathjs").evaluate(failed.join("+"))}` + "\n\n";
		let dbny = dashboard.length > 5 ? 5 : dashboard.length;
		for(let i = 0; i < dbny; i++){
		  txt += `Comandos : *${dashboard[i].name}*\n`
		  txt += `   • Total : ${dashboard[i].success + dashboard[i].failed}` + `\n`;
		  txt += `   • Éxito : ${dashboard[i].success}` + `\n`; 
		  txt += `   • Fallido : ${dashboard[i].failed}` +`\n`;
		  txt += `   • Usado hace : ${await prettyms(Date.now() - dashboard[i].lastUpdate, {
				verbose: true,
			})}` + `\n\n`;
		}
		await msg.reply(txt, {adReply : true});
	},
};
