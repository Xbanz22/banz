const fs = require('fs')
const chalk = require('chalk')

//Settings
global.owner = "6283167281739"
global.ownername = "baniwwXD"
global.namabot = "BotzNeww"
global.botversion = "V1"
global.linkgc = "-"
global.idGc = "-"
global.linkSaluran = "-"
global.idSaluran = "-"
global.namaSaluran = global.ownername + " | Saluran WhatsApp"
global.simbol = "⬡"

// >~~~~~~~~ Setting Api Panel-V1~~~~~~~~< //
global.egg = "15" // Isi id egg
global.nestid = "5" // Isi id nest
global.loc = "1" // Isi id location
global.domain = "-"
global.apikey = "-" // Isi api ptla
global.capikey = "-" // Isi api ptlc


// === [ CPANEL-V2 ] === \\
global.eggV2 = "15" // Egg ID
global.nestidV2 = "5" // nest ID
global.locV2 = "1" // Location ID
global.domainV2 = "-"
global.apikeyV2 = "-" // PLTA
global.capikeyV2 = "-" // PLTC

// >~~~~~~ Setting Api Cloudflare ~~~~~~~< //

global.apitoken_cloudflare = "rPHHrOCt08iOs2clffVnC3-xBcyfFF4__MXDwKPg"
global.accountid_cloudflare = "dfb73594c7f3bdc76fa8847f35b3613a"
global.email_cloudflare = "rabanialhusain22@gmail.com"


//Thumbnail
global.imgthumb = "https://files.catbox.moe/d6jvx2.jpg"


global.subdomain = {
  "pteroweb.my.id": {
    "zone": "714e0f2e54a90875426f8a6819f782d0",
    "apitoken": "vOn3NN5HJPut8laSwCjzY-gBO0cxeEdgSLH9WBEH"
  },
  "panelwebsite.biz.id": {
    "zone": "2d6aab40136299392d66eed44a7b1122",
    "apitoken": "CcavVSmQ6ZcGSrTnOos-oXnawq4yf86TUhmQW29S"
  },
  "privatserver.my.id": {
    "zone": "699bb9eb65046a886399c91daacb1968",
    "apitoken": "CcavVSmQ6ZcGSrTnOos-oXnawq4yf86TUhmQW29S"
  },
  "serverku.biz.id": {
    "zone": "4e4feaba70b41ed78295d2dcc090dd3a",
    "apitoken": "CcavVSmQ6ZcGSrTnOos-oXnawq4yf86TUhmQW29S"
  },
  "vipserver.web.id": {
    "zone": "e305b750127749c9b80f41a9cf4a3a53",
    "apitoken": "cpny6vwi620Tfq4vTF4KGjeJIXdUCax3dZArCqnT"
  }, 
  "mypanelstore.web.id": {
    "zone": "c61c442d70392500611499c5af816532",
    "apitoken": "uaw-48Yb5tPqhh5HdhNQSJ6dPA3cauPL_qKkC-Oa"
  }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})