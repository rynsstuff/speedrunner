// login.js

function switchToTab(paneId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  const pane = document.getElementById(paneId);
  if (pane) pane.classList.add('active');
  const idx = paneId === 'signin-pane' ? 0 : 1;
  document.querySelectorAll('#auth-tabs .tab-btn')[idx].classList.add('active');
}

// Password strength
document.getElementById('reg-password').addEventListener('input', function () {
  const val = this.value;
  const bar = document.getElementById('pw-strength');
  const fill = document.getElementById('strength-fill');
  const label = document.getElementById('strength-label');
  if (val.length === 0) { bar.style.display = 'none'; return; }
  bar.style.display = 'flex';

  let score = 0;
  if (val.length >= 8)  score++;
  if (val.length >= 12) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const levels = [
    { pct: '20%', color: 'var(--crimson)',  text: 'Weak' },
    { pct: '40%', color: 'var(--crimson)',  text: 'Weak' },
    { pct: '60%', color: '#f0c070',         text: 'Fair' },
    { pct: '80%', color: 'var(--cyan)',     text: 'Good' },
    { pct: '100%',color: 'var(--lime)',     text: 'Strong' },
  ];
  const lvl = levels[Math.min(score, 4)];
  fill.style.width = lvl.pct;
  fill.style.background = lvl.color;
  label.textContent = lvl.text;
  label.style.color = lvl.color;
});

// Sign in
document.getElementById('signin-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const user = document.getElementById('si-username').value.trim();
  const pass = document.getElementById('si-password').value;
  const err  = document.getElementById('signin-error');
  err.style.display = 'none';

  if (!user || !pass) {
    err.textContent = 'Please fill in all fields.';
    err.style.display = 'block';
    return;
  }
  // Simulate login redirect
  const btn = this.querySelector('button[type=submit]');
  btn.textContent = 'Signing in…';
  btn.disabled = true;
  setTimeout(() => { window.location.href = 'index.html'; }, 700);
});

// Register
document.getElementById('register-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('reg-username').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const err      = document.getElementById('register-error');
  err.style.display = 'none';

  if (!username)          { showRegError('Username is required.'); return; }
  if (!email)             { showRegError('Email is required.'); return; }
  if (password.length < 8){ showRegError('Password must be at least 8 characters.'); return; }

  const btn = this.querySelector('button[type=submit]');
  btn.textContent = 'Creating account…';
  btn.disabled = true;
  setTimeout(() => { window.location.href = 'index.html'; }, 800);
});

function showRegError(msg) {
  const el = document.getElementById('register-error');
  el.textContent = msg;
  el.style.display = 'block';
}
