// const { exec } = require('child_process');

// function initializeWifi() {
//     console.log('Initializing Wi-Fi...');
//     // Wi-Fi adaptörünü başlat veya gerekli ayarları yap
// }

// function checkNetwork(targetSSID, callback) {
//     setInterval(() => {
//         exec('netsh wlan show interfaces', (err, stdout, stderr) => {
//             if (err) {
//                 console.error('Error checking network:', err);
//                 return;
//             }
//             const ssidMatch = stdout.match(/SSID\s+:\s+(.+)/);
//             if (ssidMatch && ssidMatch[1] === targetSSID) {
//                 console.log(`Connected to ${targetSSID}`);
//             }
//         });
//     }, 5000); // Her 5 saniyede bir ağı kontrol et
//     callback(); // Sunucuyu başlat
// }

// module.exports = { initializeWifi, checkNetwork };
