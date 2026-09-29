const fs = require('fs');
let js = fs.readFileSync('js/game.js', 'utf8');

// Cari bagian hue calculation di track creation
const oldTrackColor = `    const hue = 260 - (i * 3.5);
    const trackColor = 'hsl(' + hue + ', 65%, 40%)';`;

const newTrackColor = `    // Warna track ambil dari CSS variable --c-primary
    const cs = getComputedStyle(document.body);
    const primaryColor = cs.getPropertyValue('--c-primary').trim() || '#7c3aed';
    const primaryDark = cs.getPropertyValue('--c-primary-dark').trim() || '#5b21b6';
    // Buat gradient sederhana dengan mix ke dark
    const trackColor = i % 2 === 0 ? primaryColor : primaryDark;`;

if (!js.includes(oldTrackColor)) {
    console.error('❌ Track color marker tidak ditemukan');
    process.exit(1);
}
js = js.replace(oldTrackColor, newTrackColor);

// Track border juga ikut tema
const oldStroke = `            strokeStyle: '#e94560',`;
const newStroke = `            strokeStyle: 'rgba(255, 255, 255, 0.4)',`;
js = js.split(oldStroke).join(newStroke);

// Finish line warna soft green + lebih tebal
const oldFinish = `    render: { fillStyle: '#00b894' },
    label: 'finish'`;
const newFinish = `    render: { fillStyle: '#10b981' },
    label: 'finish'`;
js = js.replace(oldFinish, newFinish);

fs.writeFileSync('js/game.js', js);
console.log('✅ Track adaptif ke tema');
