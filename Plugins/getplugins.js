const fs = require("fs");

const handler = async (m, { isCreator, text, command }) => {
try {
if (!isCreator) return m.reply(mess.owner)
const Plugin = await fs.readdirSync("./Plugins")
if (Plugin.length < 1) return m.reply("Tidak ada file plugin")
if (!text || !text.endsWith(".js")) return m.reply(`*contoh:* ${command} ping.js`)
if (!Plugin.includes(text)) return m.reply("Plugin tidak ditemukan")
const result = Plugin.find(i => i == text.toLowerCase().trim())
const teks = await fs.readFileSync(`./Plugins/${text.toLowerCase().trim()}`).toString()
return m.reply(teks)
} catch (err) {
console.log(err)
}
}

handler.command = ["getp", "gp", "getplugin", "getplugins"]
module.exports = handler