const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('timeline-wrap')) entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.06 });

$$('.reveal, .timeline-wrap').forEach((el) => observer.observe(el));

const altitude = $('[data-altitude]');
const topbar = $('.topbar');
let ticking = false;

function updateFlightData() {
  const scrollMax = document.documentElement.scrollHeight - innerHeight;
  const progress = scrollMax > 0 ? scrollY / scrollMax : 0;
  const feet = Math.round(1200 + Math.sin(progress * Math.PI) * 33800);
  altitude.textContent = feet.toLocaleString('pt-BR').padStart(6, '0');
  topbar.classList.toggle('scrolled', scrollY > 40);
  ticking = false;
}

addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateFlightData);
    ticking = true;
  }
}, { passive: true });
updateFlightData();

const modes = {
  marketing: {
    g1: ['CONVERSÃO', '7.2', '%', 'acima da rota prevista', 72],
    g2: ['ALCANCE', '86', 'K', 'vetor em expansão', 86],
    efficiency: '94.8%'
  },
  performance: {
    g1: ['PROCESSADOR', '63', '%', 'carga estabilizada', 63],
    g2: ['MEMÓRIA', '74', '%', 'reserva operacional', 74],
    efficiency: '98.1%'
  },
  strategy: {
    g1: ['META', '81', '%', 'progresso consolidado', 81],
    g2: ['FOCO', '92', '%', 'prioridades alinhadas', 92],
    efficiency: '96.4%'
  }
};

$$('.mode').forEach((button) => button.addEventListener('click', () => {
  $$('.mode').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const data = modes[button.dataset.mode];
  ['g1', 'g2'].forEach((key, index) => {
    $(`[data-label="${key}"]`).textContent = data[key][0];
    $(`[data-value="${key}"]`).textContent = data[key][1];
    $(`[data-unit="${key}"]`).textContent = data[key][2];
    $(`[data-note="${key}"]`).textContent = data[key][3];
    $$('.gauge')[index].style.setProperty('--value', data[key][4]);
  });
  $('[data-efficiency]').textContent = data.efficiency;
}));

function updateClock() {
  $('#panel-clock').textContent = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(new Date());
}
updateClock();
setInterval(updateClock, 1000);

let audioContext;
let engineNodes = [];
const soundButton = $('.sound-toggle');

function stopSound() {
  engineNodes.forEach((node) => { try { node.stop?.(); node.disconnect?.(); } catch (_) {} });
  engineNodes = [];
}

soundButton.addEventListener('click', async () => {
  const enabled = soundButton.getAttribute('aria-pressed') === 'true';
  if (enabled) {
    stopSound();
    soundButton.setAttribute('aria-pressed', 'false');
    soundButton.setAttribute('aria-label', 'Ativar som ambiente');
    return;
  }
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  audioContext = audioContext || new Ctx();
  await audioContext.resume();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  gain.gain.value = 0.025;
  filter.type = 'lowpass';
  filter.frequency.value = 170;
  gain.connect(filter).connect(audioContext.destination);
  [48, 73].forEach((frequency) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    oscillator.start();
    engineNodes.push(oscillator);
  });
  engineNodes.push(gain, filter);
  soundButton.setAttribute('aria-pressed', 'true');
  soundButton.setAttribute('aria-label', 'Desativar som ambiente');
});

$('.replay-flight').addEventListener('click', () => {
  scrollTo({ top: 0, behavior: 'smooth' });
  const plane = $('.hero-plane');
  plane.style.animation = 'none';
  requestAnimationFrame(() => {
    plane.offsetHeight;
    plane.style.animation = '';
  });
});
