const fs = require('fs');
let js = fs.readFileSync('js/game.js', 'utf8');

// 1. Hapus blok DOMContentLoaded yang lama (apply theme)
const oldBlock = `// Auto-load tema tersimpan
window.addEventListener('DOMContentLoaded', () => {
    const saved = (() => {
        try { return localStorage.getItem('marble-theme'); } catch (e) { return null; }
    })();
    if (saved) {
        applyTheme(saved);
        const sel = document.getElementById('themeSelect');
        if (sel) sel.value = saved;
    }
    const sel = document.getElementById('themeSelect');
    if (sel) {
        sel.addEventListener('change', (e) => applyTheme(e.target.value));
    }
});`;

if (!js.includes(oldBlock)) {
    console.error('❌ Blok lama tidak match');
    process.exit(1);
}

// 2. Ganti dengan versi baru: apply theme LANGSUNG (top-level)
const newBlock = `// Auto-load tema tersimpan — LANGSUNG (bukan tunggu DOMContentLoaded)
// karena track creation butuh warna ini.
(function applySavedTheme() {
    try {
        const saved = localStorage.getItem('marble-theme');
        if (saved) {
            document.body.setAttribute('data-theme', saved);
            console.log('🎨 Theme applied early:', saved);
        }
    } catch (e) {}
})();

// Setup dropdown setelah DOM ready
window.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('themeSelect');
    const saved = (() => {
        try { return localStorage.getItem('marble-theme'); } catch (e) { return null; }
    })();
    if (sel) {
        if (saved) sel.value = saved;
        sel.addEventListener('change', (e) => {
            applyTheme(e.target.value);
            // Reload supaya track rebuild dengan warna baru
            setTimeout(() => location.reload(), 300);
        });
    }
});`;

js = js.replace(oldBlock, newBlock);
fs.writeFileSync('js/game.js', js);
console.log('✅ Theme order fixed');
