const fs = require("fs");

const handler = async (m, { isCreator, text, command }) => {
try {
if (!isCreator) return m.reply(mess.owner)
if (!text || !m.quoted || !m.quoted.text) return m.reply(`Reply kode & input nama plugin\n*contoh:* ${command} menu.js dengan reply codenya`)
if (!text.endsWith(".js")) return m.reply(`Reply kode & input nama plugin\n*contoh:* ${command} menu.js dengan reply codenya`)
const res = ["saveplugin", "saveplugins", "svp", "sp"]
const action = res.includes(command) ? "save" : "menambah"
await fs.writeFileSync(`./Plugins/${text.trim()}`, m.quoted.text)
return m.reply(`Berhasil ${action} plugin *${text}*`)
} catch (err) {
console.log(err)
}
}

handler.command = ["addp", "addplugin", "addplugins", "saveplugin", "saveplugins", "svp", "sp"]
module.exports = handler