let { areJidsSameUser } = require("@adiwajshing/baileys")

module.exports = {
  name: "linkgroup",
  alias: ["linkgc","linkgroup","grouplink"],
  category: "group",
  desc: " Obtener el link del grupo",
  async run({msg, conn},{args}) {
    let group = msg.from
    if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]
    if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) throw 'Solo para identificación de grupo'
    let groupMetadata = await conn.groupMetadata(group)
    if (!groupMetadata) throw 'GroupMetadata no esta definido :\\'
    if (!('participants' in groupMetadata)) throw 'Participants no esta definido'
    let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
    if (!me) throw 'No estoy en ese grupo'
    if (!me.admin) throw 'No soy administrador'
    msg.reply('https://chat.whatsapp.com/' + await conn.groupInviteCode(group), {adReply : true})
  }
}