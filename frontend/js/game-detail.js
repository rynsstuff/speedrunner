// game-detail.js

const runs = [
  { rank: 1, runner: 'GlitchHuntr',  time: '00:07.48', platform: 'Java', date: '2026-05-20', status: 'verified', vod: 'https://youtube.com' },
  { rank: 2, runner: 'SpeedDemon',   time: '00:07.91', platform: 'Java', date: '2026-05-18', status: 'verified', vod: 'https://youtube.com' },
  { rank: 3, runner: 'FramePerfect', time: '00:08.14', platform: 'Bedrock', date: '2026-05-15', status: 'verified', vod: 'https://twitch.tv' },
  { rank: 4, runner: 'NightCore99',  time: '00:08.55', platform: 'Java', date: '2026-05-10', status: 'verified', vod: 'https://youtube.com' },
  { rank: 5, runner: 'VelocityX',    time: '00:09.02', platform: 'Java', date: '2026-05-08', status: 'pending',  vod: null },
  { rank: 6, runner: 'IllumiaX',     time: '00:09.37', platform: 'Bedrock', date: '2026-04-29', status: 'verified', vod: 'https://youtube.com' },
];

function renderLeaderboard(data) {
  const tbody = document.getElementById('lb-body');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr class="${r.rank === 1 ? 'wr-row' : ''}" style="cursor:pointer;" onclick="openModal(${r.rank - 1})">
      <td class="${r.rank <= 3 ? 'rank-' + r.rank : 'text-faint'} mono">#${r.rank}</td>
      <td class="mono">${r.runner}</td>
      <td class="mono ${r.rank === 1 ? 'text-lime' : ''}">${r.time}</td>
      <td class="text-muted">${r.platform}</td>
      <td class="text-muted">${r.date}</td>
      <td><span class="chip chip-${r.status}">${r.status === 'verified' ? 'Verified' : 'Pending'}</span></td>
      <td>${r.vod ? `<a class="vod-link" href="${r.vod}" target="_blank" onclick="event.stopPropagation()">▶ VOD</a>` : '<span class="text-faint" style="font-size:12px;">—</span>'}</td>
    </tr>
  `).join('');
}

function openModal(idx) {
  const r = runs[idx];
  document.getElementById('modal-body').innerHTML = `
    <div class="modal-row"><span class="text-faint">Runner</span><span class="mono">${r.runner}</span></div>
    <div class="modal-row"><span class="text-faint">Category</span><span>Any%</span></div>
    <div class="modal-row"><span class="text-faint">Time</span><span class="mono text-cyan">${r.time}</span></div>
    <div class="modal-row"><span class="text-faint">Platform</span><span>${r.platform}</span></div>
    <div class="modal-row"><span class="text-faint">Date</span><span>${r.date}</span></div>
    <div class="modal-row"><span class="text-faint">Status</span><span class="chip chip-${r.status}">${r.status}</span></div>
    ${r.vod ? `<div class="modal-row"><span class="text-faint">VOD</span><a class="vod-link" href="${r.vod}" target="_blank">Watch Recording ↗</a></div>` : ''}
  `;
  document.getElementById('run-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('run-modal').style.display = 'none';
}

// Close on backdrop click
document.getElementById('run-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Platform filter
document.getElementById('platform-filter').addEventListener('change', function() {
  const val = this.value;
  const filtered = val === 'All Platforms' ? runs : runs.filter(r => r.platform === val);
  renderLeaderboard(filtered);
});

document.addEventListener('DOMContentLoaded', () => {
  renderLeaderboard(runs);
});
