const { default: makeWASocket, DisconnectReason, makeInMemoryStore, jidDecode, proto, getContentType, useMultiFileAuthState, downloadContentFromMessage } = require("@whiskeysockets/baileys");

const pino = require('pino');
const chalk = require('chalk');
const fs = require('fs');
const readline = require("readline");
const PhoneNumber = require('awesome-phonenumber');
const { exec, spawn, execSync } = require('child_process');
const path = require('path')
const { createBackupZip, cleanOldBackups } = require('./autobackup');

//====[ Password Settings ]====//
const pw = "baniw"; // Ganti jadi "nopw" atau "no pw" untuk menonaktifkan password

const { Boom } = require('@hapi/boom');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, addExif } = require('./lib/exif')
const { smsg, sleep, getBuffer, botTerkoneksi } = require('./lib/func')


const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, resolve)
    })
};
//======
async function startSesi() {
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState("session")
    const bani = makeWASocket({
        logger: pino({
            level: "silent"
        }),
        printQRInTerminal: false,
        auth: state,
        connectT