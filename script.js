let secret, attempts, bestScore;
const numBox = document.getElementById('numberBox');
const msg    = document.getElementById('message');
const sc     = document.getElementById('score');
const best   = document.getElementById('best');
const input  = document.getElementById('guessInput');

function init(newGame = false) {
  secret = Math.floor(Math.random() * 10) + 1;
  attempts = 0;
  numBox.textContent = '?';
  sc.textContent = 'Attempts: 0';
  msg.textContent = '';
  input.value = '';
  input.disabled = false;
  input.focus();

  if (newGame || bestScore === undefined) {
    bestScore = Infinity;
    best.textContent = 'Best Score: –';
  } else {
    best.textContent = `Best Score: ${bestScore}`;
  }

  console.log('Secret:', secret);
}

function check() {
  const val = input.value.trim();
  if (!val) return;

  const g = Number(val);
  if (g < 1 || g > 10) {
    msg.textContent = '❗ Enter a number 1–10';
    msg.style.color = '#e74c3c';
    input.value = '';
    input.focus();
    return;
  }

  attempts++;
  let feedback = '';

  if (g === secret) {
    feedback = '😊 Correct!';
    msg.style.color = '#27ae60';
    numBox.textContent = secret;
    input.disabled = true;
    if (attempts < bestScore) {
      bestScore = attempts;
    }
  } else {
    const diff = g - secret;
    if (diff === 1) feedback = '😐 Slightly high';
    else if (diff === -1) feedback = '😐 Slightly low';
    else if (diff > 1) feedback = '😔 Too high';
    else feedback = '😔 Too low';
    msg.style.color = '#e67e22';
  }

  sc.textContent = `Attempts: ${attempts}`;
  best.textContent = bestScore !== Infinity ? `Best Score: ${bestScore}` : 'Best Score: –';
  msg.textContent = feedback;
  input.value = '';
  input.focus();
}

document.getElementById('guessBtn').onclick = check;
document.getElementById('clearBtn').onclick = () => {
  input.value = '';
  input.focus();
};
document.getElementById('newBtn').onclick = () => init();
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') check();
});

init(true);
