let google = require('google-it')

module.exports = {
	name: "googlesearch",
	alias: ["gs", "googlesearch","google"],
	category: "search",
	wait: true,
	query: `	Busqueda en google`,
	async run({ msg, conn }, { q }) {
	        try {
	          google({'query': q}).then(res => {
            let teks = `Busqueda en google para: ${q}\n\n`
            for (let g of res) {
              teks += `- *Title* : ${g.title}\n`
              teks += `- *Description* : ${g.snippet}\n`
              teks += `- *Link* : ${g.link}\n\n────────────────────────\n\n`
                } 
              msg.reply(teks)
                })
	        } catch (e){
	          global.error(msg.command, e, msg)
	        }
			}
}