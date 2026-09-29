// ============================================
// Firebase Helper - Bridge YouTube Chat ke Game
// ============================================
// Pakai Firebase SDK versi 10 (compat mode via CDN)
// Di-load di index.html SEBELUM file ini.

const DB_PATH = 'joins';

// Referensi ke Realtime Database
let db = null;

function initFirebase() {
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase SDK belum di-load. Cek index.html.');
        return false;
    }
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    console.log('✅ Firebase initialized');
    return true;
}

// ============================================
// Tulis join ke database (dari Node listener)
// ============================================
async function pushJoin(name) {
    if (!db) return null;
    const ref = db.ref(DB_PATH).push();
    await ref.set({
        name: name,
        timestamp: Date.now()
    });
    return ref.key;
}

// ============================================
// Subscribe ke perubahan joins (untuk game)
// ============================================
function onNewJoin(callback) {
    if (!db) return;
    // Listen ke child_added — setiap ada join baru, panggil callback
    db.ref(DB_PATH).on('child_added', (snapshot) => {
        const data = snapshot.val();
        console.log('📥 New join:', data);
        callback(data, snapshot.key);
    });
}

// ============================================
// Hapus semua joins (reset sebelum race baru)
// ============================================
async function clearJoins() {
    if (!db) return;
    await db.ref(DB_PATH).remove();
    console.log('🗑️ Joins cleared');
}

// ============================================
// Test koneksi
// ============================================
function testConnection() {
    if (!db) return;
    db.ref('.info/connected').on('value', (snap) => {
        if (snap.val() === true) {
            console.log('🔥 Firebase CONNECTED');
        } else {
            console.log('⚠️ Firebase disconnected');
        }
    });
}

// ============================================
// Auto-init saat file di-load
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    const ok = initFirebase();
    if (ok) {
        testConnection();
        // Update status dot di HUD
        db.ref('.info/connected').on('value', (snap) => {
            const dot = document.getElementById('fb-status');
            if (!dot) return;
            if (snap.val() === true) {
                dot.textContent = '🔥';
                dot.title = 'Firebase connected';
            } else {
                dot.textContent = '⚠️';
                dot.title = 'Firebase disconnected';
            }
        });
    }
});
