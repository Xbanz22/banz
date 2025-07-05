const fs = require("fs");
const path = require("path");

let handler = async (m, { files }) => {
  try {
    const pluginDir = path.join(__dirname, "../Plugins");
    const files = fs.readdirSync(pluginDir).filter(file => file.endsWith(".js"));

    if (files.length === 0) {
      return m.reply("📦 Tidak ada file plugin di folder.");
    }

    m.reply(`📦 Total Fitur plugin saat ini: *${files.length}*`);
  } catch (err) {
    console.error(err);
    m.reply("❌ Gagal membaca folder plugin.");
  }
};

handler.command = ["totalfiturplugin", "totalfiturplug"];
module.exports = handler;