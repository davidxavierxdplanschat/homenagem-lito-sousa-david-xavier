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
const portraitFlight = $('.portrait-flight');
const approachReadout = $('[data-approach]');
const coupleJourney = $('.couple-journey');
const journeyReadout = $('[data-journey-readout]');
let ticking = false;

const smoothstep = (edge0, edge1, value) => {
  const x = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return x * x * (3 - 2 * x);
};

const phaseBand = (value, enterStart, enterEnd, leaveStart, leaveEnd) =>
  smoothstep(enterStart, enterEnd, value) * (1 - smoothstep(leaveStart, leaveEnd, value));

function updateFlightData() {
  const scrollMax = document.documentElement.scrollHeight - innerHeight;
  const progress = scrollMax > 0 ? scrollY / scrollMax : 0;
  const feet = Math.round(1200 + Math.sin(progress * Math.PI) * 33800);
  altitude.textContent = feet.toLocaleString('pt-BR').padStart(6, '0');
  topbar.classList.toggle('scrolled', scrollY > 40);
  if (portraitFlight) {
    const rect = portraitFlight.getBoundingClientRect();
    const flightProgress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)));
    const slowOpening = Math.min(1, flightProgress / .34);
    const cameraProgress = flightProgress < .34
      ? smoothstep(0, 1, slowOpening) * .035
      : .035 + smoothstep(.34, 1, flightProgress) * .965;
    portraitFlight.style.setProperty('--p', flightProgress.toFixed(3));
    portraitFlight.style.setProperty('--camera', cameraProgress.toFixed(4));
    portraitFlight.style.setProperty('--intro', (1 - smoothstep(.24, .35, flightProgress)).toFixed(3));
    portraitFlight.style.setProperty('--hud', (1 - smoothstep(.46, .69, flightProgress)).toFixed(3));
    portraitFlight.style.setProperty('--phase1', phaseBand(flightProgress, .32, .42, .49, .57).toFixed(3));
    portraitFlight.style.setProperty('--phase2', phaseBand(flightProgress, .53, .62, .69, .77).toFixed(3));
    portraitFlight.style.setProperty('--phase3', phaseBand(flightProgress, .73, .81, .88, .94).toFixed(3));
    portraitFlight.style.setProperty('--sun', smoothstep(.68, 1, flightProgress).toFixed(3));
    portraitFlight.style.setProperty('--arrival', smoothstep(.89, .97, flightProgress).toFixed(3));
    const objectStart = innerWidth <= 560 ? 58 : innerWidth <= 900 ? 57 : 50;
    const objectEnd = innerWidth <= 900 ? 78 : 77;
    portraitFlight.style.setProperty('--object-x', `${(objectStart + (objectEnd - objectStart) * cameraProgress).toFixed(2)}%`);
    if (approachReadout) approachReadout.textContent = String(Math.round(flightProgress * 100)).padStart(3, '0');
  }
  if (coupleJourney) {
    const rect = coupleJourney.getBoundingClientRect();
    const journeyProgress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)));
    const easeJourney = smoothstep(0, 1, journeyProgress);
    const isMobile = innerWidth <= 560;
    coupleJourney.style.setProperty('--journey', journeyProgress.toFixed(4));
    coupleJourney.style.setProperty('--journey-x', `${(5.5 - easeJourney * 11).toFixed(2)}%`);
    coupleJourney.style.setProperty('--journey-scale', (1.18 + Math.sin(journeyProgress * Math.PI) * .045).toFixed(3));
    coupleJourney.style.setProperty('--journey-focus', `${(isMobile ? 27 : 42) + easeJourney * (isMobile ? 52 : 16)}%`);
    coupleJourney.style.setProperty('--j-phase1', (1 - smoothstep(.18, .34, journeyProgress)).toFixed(3));
    coupleJourney.style.setProperty('--j-phase2', phaseBand(journeyProgress, .25, .4, .55, .69).toFixed(3));
    coupleJourney.style.setProperty('--j-phase3', smoothstep(.63, .8, journeyProgress).toFixed(3));
    coupleJourney.style.setProperty('--plane-x', `${(12 + easeJourney * 76).toFixed(2)}%`);
    coupleJourney.style.setProperty('--plane-y', `${(60 - Math.sin(easeJourney * Math.PI) * 30).toFixed(2)}%`);
    coupleJourney.style.setProperty('--light-a-x', `${(12 + easeJourney * 68).toFixed(2)}%`);
    coupleJourney.style.setProperty('--light-b-x', `${(76 - easeJourney * 45).toFixed(2)}%`);
    if (journeyReadout) journeyReadout.textContent = String(Math.round(journeyProgress * 100)).padStart(3, '0');
  }
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

const fearContent = {
  sounds: {
    kicker: 'O AVIÃO MUDA DE CONFIGURAÇÃO',
    title: 'Nem todo som é sinal de falha.',
    copy: 'Flaps, trem de pouso, bombas e mudanças de potência produzem sons diferentes ao longo do voo. Entender a origem desses ruídos ajuda a trocar o susto pela leitura do que a aeronave está fazendo.',
    status: 'VOO ESTÁVEL'
  },
  turbulence: {
    kicker: 'O AR TAMBÉM TEM MOVIMENTO',
    title: 'Desconforto não é sinônimo de catástrofe.',
    copy: 'A turbulência pode assustar, mas tripulações recebem previsões, relatórios e treinamento para lidar com ela. O gesto mais importante do passageiro é simples: permanecer com o cinto afivelado.',
    status: 'TURBULÊNCIA MONITORADA'
  },
  goaround: {
    kicker: 'SEGURANÇA TAMBÉM É TENTAR DE NOVO',
    title: 'Arremeter é uma decisão segura.',
    copy: 'Quando as condições para pousar não estão adequadas, interromper a aproximação e subir novamente é um procedimento normal. Não significa fracasso: significa que os limites operacionais foram respeitados.',
    status: 'NOVA APROXIMAÇÃO'
  }
};

$$('.fear-tab').forEach((button) => button.addEventListener('click', () => {
  const key = button.dataset.fear;
  const content = fearContent[key];
  $$('.fear-tab').forEach((tab) => {
    const selected = tab === button;
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-selected', String(selected));
  });
  $('.flight-window').dataset.flightState = key;
  $('[data-fear-kicker]').textContent = content.kicker;
  $('[data-fear-title]').textContent = content.title;
  $('[data-fear-copy]').textContent = content.copy;
  $('.flight-readout span').textContent = content.status;
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
let masterGain;
const soundButton = $('.sound-toggle');
const soundLabel = $('.sound-label');

function stopSound() {
  const nodesToStop = [...engineNodes];
  const gainToStop = masterGain;
  engineNodes = [];
  masterGain = null;
  if (gainToStop && audioContext) {
    const now = audioContext.currentTime;
    gainToStop.gain.cancelScheduledValues(now);
    gainToStop.gain.setValueAtTime(gainToStop.gain.value, now);
    gainToStop.gain.linearRampToValueAtTime(0, now + .9);
  }
  setTimeout(() => {
    nodesToStop.forEach((node) => { try { node.stop?.(); node.disconnect?.(); } catch (_) {} });
    try { gainToStop?.disconnect(); } catch (_) {}
  }, 950);
}

soundButton.addEventListener('click', async () => {
  const enabled = soundButton.getAttribute('aria-pressed') === 'true';
  if (enabled) {
    stopSound();
    soundButton.setAttribute('aria-pressed', 'false');
    soundButton.setAttribute('aria-label', 'Ativar som ambiente');
    soundButton.dataset.audio = 'off';
    soundLabel.textContent = 'som';
    return;
  }
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) {
    soundButton.setAttribute('aria-label', 'Som ambiente indisponível neste navegador');
    return;
  }
  try {
    audioContext = !audioContext || audioContext.state === 'closed' ? new Ctx() : audioContext;
    await audioContext.resume();
    const now = audioContext.currentTime;

    masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(.16, now + 1.8);
    masterGain.connect(audioContext.destination);

    const engineBus = audioContext.createGain();
    const engineFilter = audioContext.createBiquadFilter();
    engineBus.gain.value = .36;
    engineFilter.type = 'lowpass';
    engineFilter.frequency.value = 520;
    engineFilter.Q.value = .65;
    engineBus.connect(engineFilter).connect(masterGain);

    [
      [82.4, 'sine', .8],
      [123.6, 'sine', .32],
      [164.8, 'triangle', .09]
    ].forEach(([frequency, type, level]) => {
      const oscillator = audioContext.createOscillator();
      const voiceGain = audioContext.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      voiceGain.gain.value = level;
      oscillator.connect(voiceGain).connect(engineBus);
      oscillator.start();
      engineNodes.push(oscillator, voiceGain);
    });

    const pulse = audioContext.createOscillator();
    const pulseDepth = audioContext.createGain();
    pulse.type = 'sine';
    pulse.frequency.value = .075;
    pulseDepth.gain.value = .055;
    pulse.connect(pulseDepth).connect(engineBus.gain);
    pulse.start();

    const airBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 4, audioContext.sampleRate);
    const airData = airBuffer.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < airData.length; i += 1) {
      brown = (brown + (Math.random() * 2 - 1) * .035) / 1.035;
      airData[i] = brown * 2.8;
    }
    const air = audioContext.createBufferSource();
    const airFilter = audioContext.createBiquadFilter();
    const airGain = audioContext.createGain();
    air.buffer = airBuffer;
    air.loop = true;
    airFilter.type = 'bandpass';
    airFilter.frequency.value = 690;
    airFilter.Q.value = .55;
    airGain.gain.value = .12;
    air.connect(airFilter).connect(airGain).connect(masterGain);
    air.start();

    const padBus = audioContext.createGain();
    const padFilter = audioContext.createBiquadFilter();
    padBus.gain.value = .055;
    padFilter.type = 'lowpass';
    padFilter.frequency.value = 980;
    padBus.connect(padFilter).connect(masterGain);
    [196, 246.94, 293.66].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const voiceGain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      voiceGain.gain.value = index === 0 ? .42 : .24;
      oscillator.detune.value = index === 1 ? -4 : index === 2 ? 3 : 0;
      oscillator.connect(voiceGain).connect(padBus);
      oscillator.start();
      engineNodes.push(oscillator, voiceGain);
    });

    engineNodes.push(engineBus, engineFilter, pulse, pulseDepth, air, airFilter, airGain, padBus, padFilter);
    soundButton.setAttribute('aria-pressed', 'true');
    soundButton.setAttribute('aria-label', 'Desativar som ambiente');
    soundButton.dataset.audio = 'playing';
    soundLabel.textContent = 'som ligado';
  } catch (_) {
    stopSound();
    soundButton.setAttribute('aria-pressed', 'false');
    soundButton.setAttribute('aria-label', 'Não foi possível iniciar o som ambiente');
    soundButton.dataset.audio = 'error';
    soundLabel.textContent = 'som';
  }
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
