// admin.js

const pendingRuns = [
  { id: 1, runner: 'NightCore99',  game: 'Super Mario 64', category: 'Any%',            time: '00:06.55', platform: 'N64',       submitted: '2026-06-07', vod: 'https://youtube.com' },
  { id: 2, runner: 'VelocityX',   game: 'Celeste',         category: 'Any%',            time: '00:28.14', platform: 'PC',        submitted: '2026-06-07', vod: 'https://twitch.tv' },
  { id: 3, runner: 'PixelBreak',  game: 'Minecraft',       category: 'Set Seed',        time: '00:05.21', platform: 'Java',      submitted: '2026-06-06', vod: 'https://youtube.com' },
  { id: 4, runner: 'SwiftRunner', game: 'Half-Life',        category: 'Any%',            time: '00:18.09', platform: 'PC',        submitted: '2026-06-06', vod: 'https://youtube.com' },
  { id: 5, runner: 'GlitchHuntr', game: 'Minecraft',       category: 'All Advancements',time: '01:10.55', platform: 'Java',      submitted: '2026-06-05', vod: 'https://twitch.tv' },
  { id: 6, runner: 'AlphaStride', game: 'Ocarina of Time', category: 'Glitchless',      time: '01:47.22', platform: 'N64',       submitted: '2026-06-05', vod: 'https://youtube.com' },
  { id: 7, runner: 'TurboFPS',    game: 'Celeste',          category: 'True Ending',     time: '01:12.34', platform: 'PC',        submitted: '2026-06-04', vod: 'https://twitch.tv' },
];

const users = [
  { username: 'IllumiaX',   email: 'illumia@mail.com',  country: 'Japan',     role: 'user',  runs: 34 },
  { username: 'NightCore99',email: 'nc99@mail.com',     country: 'USA',       role: 'user',  runs: 28 },
  { username: 'GlitchHuntr',email: 'glitch@mail.com',  country: 'Germany',   role: 'user',  runs: 21 },
  { username: 'VelocityX',  email: 'vel@mail.com',      country: 'Brazil',    role: 'user',  runs: 19 },
  { username: 'Moderator',  email: 'mod@wspeedrun.com', country: 'Indonesia', role: 'admin', runs: 0 },
];

function renderPendingRuns(data) {
  const queue = document.getElementById('runs-queue');
  if (!queue) return;
  queue.innerHTML = data.map(r => `
    <div class="run-card card" id="run-card-${r.id}">
      <div class="run-card-info">
        <span class="run-card-title">${r.runner} — ${r.game} <span class="text-faint">${r.category}</span></span>
        <div class="run-card-meta">
          <span class="label">Time: <span class="mono text-cyan">${r.time}</span></span>
          <span class="label">Platform: ${r.platform}</span>
          <span class="label">Submitted: ${r.submitted}</span>
        </div>
      </div>
      <div class="run-card-actions">
        ${r.vod ? `<a class="btn btn-ghost btn-sm" href="${r.vod}" target="_blank">▶ VOD</a>` : ''}
        <button class="btn btn-primary btn-sm" onclick="verifyRun(${r.id})">Verify</button>
        <button class="btn btn-danger btn-sm" onclick="rejectRun(${r.id})">Reject</button>
      </div>
    </div>
  `).join('');
}

function verifyRun(id) {
  const card = document.getElementById(`run-card-${id}`);
  card.style.opacity = '0.4';
  card.style.pointerEvents = 'none';
  const actions = card.querySelector('.run-card-actions');
  actions.innerHTML = '<span class="chip chip-verified">Verified</span>';
}

function rejectRun(id) {
  const card = document.getElementById(`run-card-${id}`);
  card.style.opacity = '0.4';
  card.style.pointerEvents = 'none';
  const actions = card.querySelector('.run-card-actions');
  actions.innerHTML = '<span class="chip" style="color:var(--crimson);border-color:var(--crimson);">Rejected</span>';
}

function renderUsers(data) {
  const tbody = document.getElementById('users-table');
  if (!tbody) return;
  tbody.innerHTML = data.map(u => `
    <tr>
      <td class="mono">${u.username}</td>
      <td class="text-muted">${u.email}</td>
      <td class="text-muted">${u.country}</td>
      <td><span class="chip ${u.role === 'admin' ? 'chip-live' : 'chip-pending'}">${u.role}</span></td>
      <td class="text-muted">${u.runs}</td>
    </tr>
  `).join('');
}

// Sidebar nav
document.querySelectorAll('.admin-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.admin-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// User search
document.getElementById('user-search')?.addEventListener('input', function () {
  const q = this.value.toLowerCase();
  renderUsers(users.filter(u => u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)));
});

// Game modal
function openGameModal()  { document.getElementById('game-modal').style.display = 'flex'; }
function closeGameModal() { document.getElementById('game-modal').style.display = 'none'; }
function saveGame() {
  const name = document.getElementById('new-game-name').value.trim();
  if (!name) return;
  closeGameModal();
}
document.getElementById('game-modal').addEventListener('click', function(e) {
  if (e.target === this) closeGameModal();
});

document.addEventListener('DOMContentLoaded', () => {
  renderPendingRuns(pendingRuns);
  renderUsers(users);
});
