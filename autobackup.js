// autobackup.js — versi ringan, hanya file penting 
const fs = require('fs'); const path = require('path'); const archiver = require('archiver');

const config = { foldersToBackup: ['./database', './lib', './library', './tmp', './temp', './db', './data', './Plugins', './BotzNeww'], filesToBackup: ['./case.js', './connection.js', './autobackup.js', './package.json', './settings.js'], backupFolder: './backup', logFile: 'backup.log', maxBackupFiles: 5 };

function log(message) { 
const ts = new Date().toISOString(); 
const entry = `[${ts}] ${message}\n`; console.log(entry.trim()); fs.appendFileSync(config.logFile, entry); return entry;}

function ensureFolderExists(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }

function cleanOldBackups() { 

const files = fs.readdirSync(config.backupFolder) .filter(f => f.endsWith('.zip')) .sort((a, b) => fs.statSync(path.join(config.backupFolder, b)).mtime - fs.statSync(path.join(config.backupFolder, a)).mtime); 

const excess = files.slice(config.maxBackupFiles); excess.forEach(file => { fs.unlinkSync(path.join(config.backupFolder, file)); log(`🗑️ Backup lama dihapus: ${file}`); }); }

function countFilesInFolder(folder) { let count = 0; if (!fs.existsSync(folder)) return 0; const items = fs.readdirSync(folder, { withFileTypes: true }); for (const item of items) { 
const fullPath = path.join(folder, item.name); if (item.isFile()) count++; else if (item.isDirectory()) count += countFilesInFolder(fullPath); } return count; }

async function createBackupZip() { ensureFolderExists(config.backupFolder);

const ts = new Date().toISOString().replace(/[:.]/g, "-");
                               const zipName = `backup-${ts}.zip`;
                                 const zipPath = path.join(config.backupFolder, zipName);

return new Promise((resolve, reject) => { 
    
const output = fs.createWriteStream(zipPath); 

const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  let summary = config.foldersToBackup.map(folder => {
    const label = folder.replace('./', '');
    const fileCount = countFilesInFolder(folder);
    return `- ${label}/: ${fileCount > 0 ? `${fileCount} file` : 'kosong'}`;
  }).join('\n');

  const msg = `✅ Backup ZIP selesai: ${zipName}

📦 Ringkasan isi: ${summary}`; log(msg); resolve({ zipPath, logMsg: msg }); });

archive.on('error', err => {
  const errorMsg = `❌ Gagal membuat ZIP: ${err.message}`;
  log(errorMsg);
  reject({ zipPath: null, logMsg: errorMsg });
});

archive.pipe(output);

// Tambahkan folder penting saja
for (const folder of config.foldersToBackup) {
  if (fs.existsSync(folder)) archive.directory(folder, folder.replace('./', ''));
}

// Tambahkan file penting satu per satu
for (const file of config.filesToBackup) {
  if (fs.existsSync(file)) archive.file(file, { name: path.basename(file) });
}

const now = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
const infoText = `🗓️ Backup dibuat: ${now}\n📦 Folder dibackup: ${config.foldersToBackup.join(', ')}\n📄 File: ${config.filesToBackup.join(', ')}`;
archive.append(infoText, { name: 'backup-info.txt' });

archive.finalize();

// ❌ Jika hasil backup terlalu besar, hapus file
output.on('close', () => {
  if (archive.pointer() > 20 * 1024 * 1024) { // >20MB
    fs.unlinkSync(zipPath);
    const msg = `❌ Backup gagal: ukuran melebihi 20MB (${(archive.pointer() / 1024 / 1024).toFixed(2)}MB)`;
    log(msg);
    return reject({ zipPath: null, logMsg: msg });
  }
});

}); }

module.exports = { createBackupZip, cleanOldBackups };

