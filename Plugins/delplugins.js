const fs = require("fs");

const handler = async (m, {  isOwner, text, command }) => {
try {
if (!isCreator) return m.reply(mess.owner)
const Plugin = await fs.readdirSync("./Plugins")
if (Plugin.length < 1) return m.reply("Tidak ada file plugin")
if (!text || !text.endsWith(".js")) return m.reply(`*contoh:* ${command} ping.js`)
if (!Plugin.includes(text)) return m.reply("Plugin tidak ditemukan")
await fs.unlinkSync(`./Plugins/${text.toLowerCase().trim()}`)
return m.reply(`Berhasil menghapus plugin *${text.toLowerCase().trim()}*`)
} catch (err) {
console.log(err)
}
}

handler.command = ["delp", "dp", "delplugin", "delplugins"]
module.exports = handler