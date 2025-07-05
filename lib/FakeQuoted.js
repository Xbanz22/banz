require("../settings.js")

const FakeTransaksi = {
  key: {
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast'
  },
  message: {
    locationMessage: {
      name: `${global.owner} Marketplace`, 
      jpegThumbnail: ''
    }
  }
}

const FakeLiveLoc = {
  key: {
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast'
  },
  message: {
    liveLocationMessage: {
    degreesLatitude: -999,
    degreesLongitude: 99999,
    sequenceNumber: "99999",
    caption: `Powered by ${global.owner}`, 
    jpegThumbnail: ""
  }
  }
}

module.exports = { FakeLiveLoc, FakeTransaksi }