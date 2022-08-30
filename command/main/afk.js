const fs = require("fs")

module.exports = {
  name: ["afk"].map((v) => v + " <reason>"),
  alias: ["afk"],
  category: "main",
  desc: "Tiempo inactivo",
  isGroup: true,
  async run({conn, msg}, {q}) {
    try {
      const afk = JSON.parse(fs.readFileSync("./lib/database/afk.json"));
      afk[msg.sender] = {
        id: msg.sender,
        time: Date.now(),
        reason: q ? q : "Yntkts",
      }
      await fs.writeFileSync("./lib/database/afk.json", JSON.stringify(afk));
      txt = "*MODO AFK*\n\n"
      txt += msg.pushName + "ahora estas Afk!!\n"
      txt += `Razon : ${q ? q : "No lo dijo xdd"}`
      msg.reply(txt)
    } catch (e) {
      global.error(msg.command, e, msg)
    }
  }
}
