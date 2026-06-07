// submit-run.js

const categories = {
  minecraft: ['Any%', 'All Advancements', 'Set Seed', 'Random Seed'],
  sm64:      ['Any%', '16 Star', '70 Star', '120 Star'],
  oot:       ['Any%', 'All Dungeons', '100%', 'Glitchless'],
  celeste:   ['Any%', 'All Chapters', 'True Ending'],
  hl:        ['Any%', 'Glitchless'],
};

// Populate categories on game change
document.getElementById('game-select').addEventListener('change', function () {
  const sel = document.getElementById('category-select');
  const cats = categories[this.value] || [];
  if (cats.length === 0) {
    sel.innerHTML = '<option value="">— Select game first —</option>';
    sel.disabled = true;
  } else {
    sel.innerHTML = '<option value="">— Select category —</option>' +
      cats.map(c => `<option>${c}</option>`).join('');
    sel.disabled = false;
  }
});

// Live time preview
function updatePreview() {
  const h  = parseInt(document.getElementById('t-hours').value) || 0;
  const m  = parseInt(document.getElementById('t-mins').value)  || 0;
  const s  = parseInt(document.getElementById('t-secs').value)  || 0;
  const ms = parseInt(document.getElementById('t-ms').value)    || 0;

  if (h === 0 && m === 0 && s === 0 && ms === 0) {
    document.getElementById('preview-val').textContent = '--:--.-';
    return;
  }
  const parts = [];
  if (h > 0) parts.push(String(h).padStart(2, '0'));
  parts.push(String(m).padStart(2, '0'));
  parts.push(String(s).padStart(2, '0'));
  document.getElementById('preview-val').textContent =
    parts.join(':') + '.' + String(ms).padStart(3, '0');
}

['t-hours','t-mins','t-secs','t-ms'].forEach(id => {
  document.getElementById(id).addEventListener('input', updatePreview);
});

// Form validation & submit
document.getElementById('submit-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const errEl = document.getElementById('form-error');
  errEl.style.display = 'none';

  const game     = document.getElementById('game-select').value;
  const category = document.getElementById('category-select').value;
  const platform = document.getElementById('platform-select').value;
  const vod      = document.getElementById('vod-url').value.trim();
  const h  = parseInt(document.getElementById('t-hours').value) || 0;
  const m  = parseInt(document.getElementById('t-mins').value)  || 0;
  const s  = parseInt(document.getElementById('t-secs').value)  || 0;
  const ms = parseInt(document.getElementById('t-ms').value)    || 0;
  const totalMs = (h*3600 + m*60 + s)*1000 + ms;

  if (!game)     { showError('Please select a game.'); return; }
  if (!category) { showError('Please select a category.'); return; }
  if (!platform) { showError('Please select a platform.'); return; }
  if (totalMs === 0) { showError('Please enter a valid run time.'); return; }
  if (!vod)      { showError('A video URL is required as proof.'); return; }

  // Simulate submission
  const btn = document.getElementById('submit-btn');
  btn.textContent = 'Submitting…';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('submit-form').style.display = 'none';
    document.getElementById('success-banner').style.display = 'flex';
  }, 800);
});

function showError(msg) {
  const el = document.getElementById('form-error');
  el.textContent = msg;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
