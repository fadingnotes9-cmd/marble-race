// ============================================
// 🎯 MARBLE RACE - Full Version v3
// ============================================

const { Engine, Render, Runner, Bodies, Composite, Events, Body } = Matter;

const engine = Engine.create();
const world = engine.world;
engine.gravity.y = 1;
engine.gravity.scale = 0.001;

const canvas = document.getElementById('raceCanvas');
const W = window.innerWidth;
const H = window.innerHeight;

const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: W,
        height: H,
        wireframes: false,
        background: '#0a0a15',
        hasBounds: true
    }
});

const walls = [];
const TRACK_W = W * 0.65;
const TRACK_COUNT = 12;
const TRACK_START_Y = 350;
const TRACK_GAP = 180;

walls.push(Bodies.rectangle(-20, 1500, 40, 4500, {
    isStatic: true,
    render: { fillStyle: '#e94560' }
}));
walls.push(Bodies.rectangle(W + 20, 1500, 40, 4500, {
    isStatic: true,
    render: { fillStyle: '#e94560' }
}));

for (let i = 0; i < TRACK_COUNT; i++) {
    const y = TRACK_START_Y + (i * TRACK_GAP);
    const isLeft = i % 2 === 0;
    const x = isLeft ? W * 0.32 : W * 0.68;
    const angle = isLeft ? 0.35 : -0.35;
    const hue = 260 - (i * 3.5);
    const trackColor = 'hsl(' + hue + ', 65%, 40%)';

    walls.push(Bodies.rectangle(x, y, TRACK_W, 20, {
        isStatic: true,
        angle: angle,
        render: {
            fillStyle: trackColor,
            strokeStyle: '#e94560',
            lineWidth: 2
        }
    }));
}

const FINISH_Y = TRACK_START_Y + (TRACK_COUNT * TRACK_GAP) + 100;
const finishLine = Bodies.rectangle(W / 2, FINISH_Y, W, 25, {
    isStatic: true,
    isSensor: true,
    render: { fillStyle: '#00b894' },
    label: 'finish'
});
walls.push(finishLine);

walls.push(Bodies.rectangle(W / 2, FINISH_Y + 400, W, 40, {
    isStatic: true,
    render: { fillStyle: '#1a1a2e' }
}));

Composite.add(world, walls);

const marbles = [];
const colors = [
    '#e94560', '#3b82f6', '#f5a623', '#00b894',
    '#6c5ce7', '#fd79a8', '#00cec9', '#ffeaa7'
];
const names = ['Budi', 'Siti', 'Agus', 'Dewi', 'Rian', 'Lina', 'Joko', 'Rina'];

let finishOrder = [];
let raceRunning = false;
let raceStartTime = 0;

function createMarbles(count) {
    marbles.forEach(m => Composite.remove(world, m));
    marbles.length = 0;
    finishOrder = [];

    for (let i = 0; i < count; i++) {
        const x = (W / 2) + (Math.random() * 100 - 50);
        const y = 80 + (i * 40);
        const color = colors[i % colors.length];
        const name = names[i % names.length];

        const marble = Bodies.circle(x, y, 15, {
            restitution: 0.6,
            friction: 0.01,
            render: {
                fillStyle: color,
                strokeStyle: '#fff',
                lineWidth: 2
            },
            label: name,
            plugin: { color: color, name: name, finished: false, finishTime: 0 }
        });

        marbles.push(marble);
        Composite.add(world, marble);
    }
}

Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach(pair => {
        const labels = [pair.bodyA.label, pair.bodyB.label];
        if (labels.includes('finish')) {
            const marbleBody = pair.bodyA.label === 'finish' ? pair.bodyB : pair.bodyA;
            const isMarble = marbles.includes(marbleBody);

            if (isMarble && !marbleBody.plugin.finished) {
                marbleBody.plugin.finished = true;
                marbleBody.plugin.finishTime = Date.now() - raceStartTime;

                finishOrder.push({
                    name: marbleBody.plugin.name,
                    color: marbleBody.plugin.color,
                    rank: finishOrder.length + 1,
                    time: marbleBody.plugin.finishTime
                });

                Body.setPosition(marbleBody, { x: -9999, y: -9999 });
                Body.setStatic(marbleBody, true);
            }
        }
    });
});

let cameraY = 0;
let cameraTargetY = 0;

Events.on(engine, 'afterUpdate', () => {
    if (marbles.length === 0) return;

    const activeMarbles = marbles.filter(m => !m.plugin.finished);

    if (activeMarbles.length === 0) {
        cameraTargetY = Math.max(0, FINISH_Y - H + 250);
        cameraY += (cameraTargetY - cameraY) * 0.05;
        return;
    }

    const leader = activeMarbles.reduce((prev, curr) =>
        (prev.position.y > curr.position.y) ? prev : curr
    );

    cameraTargetY = Math.max(0, leader.position.y - H * 0.4);
    cameraY += (cameraTargetY - cameraY) * 0.08;
});

Events.on(render, 'beforeRender', () => {
    render.bounds.min.x = 0;
    render.bounds.max.x = W;
    render.bounds.min.y = cameraY;
    render.bounds.max.y = cameraY + H;
});

Events.on(render, 'afterRender', () => {
    const ctx = render.context;
    ctx.save();
    ctx.translate(-render.bounds.min.x, -render.bounds.min.y);

    marbles.forEach(m => {
        if (m.plugin.finished) return;

        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#000';
        ctx.fillStyle = '#fff';
        ctx.strokeText(m.plugin.name, m.position.x, m.position.y - 25);
        ctx.fillText(m.plugin.name, m.position.x, m.position.y - 25);

        ctx.beginPath();
        ctx.arc(m.position.x - 5, m.position.y - 5, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
    });

    ctx.restore();

    if (finishOrder.length > 0) {
        drawLeaderboard(ctx);
    }
});

function drawLeaderboard(ctx) {
    const lbW = Math.min(220, W * 0.6);
    const lbH = (finishOrder.length * 32) + 55;
    const lbX = 10;
    const lbY = H - lbH - 10;

    ctx.fillStyle = 'rgba(10, 10, 21, 0.92)';
    ctx.strokeStyle = '#00b894';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ctx.roundRect) {
        ctx.roundRect(lbX, lbY, lbW, lbH, 12);
    } else {
        ctx.rect(lbX, lbY, lbW, lbH);
    }
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#00b894';
    ctx.textAlign = 'left';
    ctx.fillText('🏆 FINISH ORDER', lbX + 12, lbY + 25);

    if (finishOrder[0]) {
        ctx.font = '11px Arial';
        ctx.fillStyle = '#f5a623';
        ctx.fillText('⏱ ' + formatTime(finishOrder[0].time), lbX + 12, lbY + 42);
    }

    finishOrder.forEach((f, i) => {
        const y = lbY + 65 + (i * 32);

        let rankColor = '#fff';
        let medal = '';
        if (f.rank === 1) { rankColor = '#f5a623'; medal = '🥇'; }
        else if (f.rank === 2) { rankColor = '#c0c0c0'; medal = '🥈'; }
        else if (f.rank === 3) { rankColor = '#cd7f32'; medal = '🥉'; }

        ctx.beginPath();
        ctx.arc(lbX + 22, y, 9, 0, Math.PI * 2);
        ctx.fillStyle = f.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = rankColor;
        const text = medal ? medal + ' ' + f.name : f.rank + '. ' + f.name;
        ctx.fillText(text, lbX + 38, y + 5);
    });
}

function formatTime(ms) {
    const totalSec = ms / 1000;
    const min = Math.floor(totalSec / 60);
    const sec = Math.floor(totalSec % 60);
    const centi = Math.floor((totalSec * 100) % 100);
    return String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0') + '.' + String(centi).padStart(2, '0');
}

function updateTimer() {
    if (!raceRunning) return;
    const timerEl = document.getElementById('timer');
    if (finishOrder.length > 0) {
        timerEl.textContent = formatTime(finishOrder[0].time);
    } else {
        timerEl.textContent = formatTime(Date.now() - raceStartTime);
    }
    requestAnimationFrame(updateTimer);
}

function startCountdown(callback) {
    const cdEl = document.getElementById('countdown');
    const sequence = ['3', '2', '1', 'GO!'];
    let i = 0;

    function next() {
        if (i >= sequence.length) {
            cdEl.classList.remove('show', 'go');
            callback();
            return;
        }

        cdEl.textContent = sequence[i];
        cdEl.classList.remove('go');
        if (sequence[i] === 'GO!') cdEl.classList.add('go');
        cdEl.classList.add('show');

        i++;
        setTimeout(next, sequence[i - 1] === 'GO!' ? 600 : 800);
    }
    next();
}

document.getElementById('startBtn').addEventListener('click', async () => {
    const ui = document.getElementById('ui');
    const timer = document.getElementById('timer');

    ui.classList.add('hidden');
    cameraY = 0;
    cameraTargetY = 0;
    finishOrder = [];
    raceRunning = false;

    // Clear kelereng lama
    marbles.forEach(m => Composite.remove(world, m));
    marbles.length = 0;

    // Cek peserta
    if (pesertaList.length < 2) {
        showNotif('Minimal 2 peserta untuk mulai');
        ui.classList.remove('hidden');
        return;
    }

    // Buat kelereng dari pesertaList
    for (const nama of pesertaList) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = (W / 2) + (Math.random() * 100 - 50);
        const y = 50 + (marbles.length * 35);
        const marble = Bodies.circle(x, y, 15, {
            restitution: 0.6,
            friction: 0.01,
            render: { fillStyle: color, strokeStyle: '#fff', lineWidth: 2 },
            label: nama,
            plugin: { color: color, name: nama, finished: false, finishTime: 0 }
        });
        marbles.push(marble);
        Composite.add(world, marble);
    }

    // Clear Firebase joins (biar fresh ronde berikutnya)
    if (typeof clearJoins === 'function') {
        try { await clearJoins(); } catch(e) { console.warn('clearJoins:', e); }
    }

    // Setup Firebase listener untuk ronde berikutnya
    setupFirebaseListener();

    startCountdown(() => {
        raceRunning = true;
        raceStartTime = Date.now();
        timer.style.display = 'block';
        updateTimer();

        setTimeout(() => ui.classList.remove('hidden'), 2000);
    });
});


// ============================================
// Task 2.6: Live Integration (Firebase -> Game)
// ============================================

function addMarble(name) {
    if (!name || name.trim() === '') return null;
    const cleanName = String(name).trim().substring(0, 12);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = (W / 2) + (Math.random() * 100 - 50);
    const y = 50;

    const marble = Bodies.circle(x, y, 15, {
        restitution: 0.6,
        friction: 0.01,
        render: { fillStyle: color, strokeStyle: '#fff', lineWidth: 2 },
        label: cleanName,
        plugin: { color: color, name: cleanName, finished: false, finishTime: 0 }
    });

    marbles.push(marble);
    Composite.add(world, marble);
    console.log('🎯 Marble spawned:', cleanName);
    return marble;
}

let fbListenerActive = false;
function setupFirebaseListener() {
    if (fbListenerActive) return;
    if (typeof onNewJoin !== 'function') {
        console.warn('⚠️ Firebase helper belum loaded');
        return;
    }
    onNewJoin((data) => {
        console.log('📥 Firebase join:', data.name);
        // JANGAN auto-spawn — cuma notif
        showNotif(data.name + ' minta join!');
    });
    fbListenerActive = true;
    console.log('✅ Firebase listener active (notif mode)');
}

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Resize handler DISABLED — bikin keyboard hilang di HP
// Manual refresh saja kalau perlu (rotate layar / ganti device)

// ============================================
// Task 2.7c: Peserta Panel + Notif System
// ============================================

let pesertaList = [];

// Notif MotoGP-style
function showNotif(text) {
    const container = document.getElementById('notifContainer');
    if (!container) return;
    const item = document.createElement('div');
    item.className = 'notif-item';
    item.textContent = text;
    container.appendChild(item);
    setTimeout(() => {
        if (item.parentNode) item.parentNode.removeChild(item);
    }, 6000);
}

// Render daftar peserta
function renderPeserta() {
    const list = document.getElementById('pesertaList');
    const count = document.getElementById('pesertaCount');
    if (!list || !count) return;
    count.textContent = pesertaList.length;
    if (pesertaList.length === 0) {
        list.innerHTML = '<div class="peserta-empty">Belum ada peserta</div>';
        return;
    }
    list.innerHTML = pesertaList.map((nama, i) =>
        '<div class="peserta-item">' +
            '<span>' + (i + 1) + '. ' + nama + '</span>' +
            '<span class="peserta-remove" data-idx="' + i + '">x</span>' +
        '</div>'
    ).join('');
    list.querySelectorAll('.peserta-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            hapusPeserta(parseInt(e.target.dataset.idx));
        });
    });
}

// Tambah peserta
function tambahPeserta(nama) {
    const clean = String(nama || '').trim().substring(0, 12);
    if (!clean) return false;
    if (pesertaList.includes(clean)) {
        showNotif('Peserta ' + clean + ' sudah ada');
        return false;
    }
    if (pesertaList.length >= 20) {
        showNotif('Maksimal 20 peserta');
        return false;
    }
    pesertaList.push(clean);
    renderPeserta();
    return true;
}

// Hapus peserta
function hapusPeserta(idx) {
    if (idx < 0 || idx >= pesertaList.length) return;
    pesertaList.splice(idx, 1);
    renderPeserta();
}

// Reset semua
function resetPeserta() {
    if (pesertaList.length === 0) return;
    pesertaList = [];
    renderPeserta();
    showNotif('Peserta di-reset');
}

// Event listeners UI
document.getElementById('tambahBtn').addEventListener('click', () => {
    const input = document.getElementById('namaInput');
    if (tambahPeserta(input.value)) {
        input.value = '';
        input.focus();
    }
});

document.getElementById('namaInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = e.target;
        if (tambahPeserta(input.value)) {
            input.value = '';
        }
    }
});

document.getElementById('resetPesertaBtn').addEventListener('click', resetPeserta);

// Initial render
renderPeserta();
