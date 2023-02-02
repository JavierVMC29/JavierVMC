const form = document.getElementById('form');
const numberInputs = document.getElementsByClassName('form__field__input');
const realTime = document.getElementById('realtime');
let hotReloading = false;

realTime.addEventListener('change', (e) => {
  hotReloading = !hotReloading;
});

const AP = `
  <img src="./images/approved.png" alt="Celebracion" class="scale-in-center" />
  <span class="scale-in-center">Felicitaciones!<br />Aprobaste</span>
  <p id="promedio" class="scale-in-center">0</p>
  <p class="scale-in-center">Nota final</p>
  <p id="tip" class="scale-in-center"></p>
`;

const RP = `
  <img src="./images/sad.svg" alt="Celebracion" class="scale-in-center" />
  <span class="scale-in-center">Lo sentimos mucho<br />Reprobaste</span>
  <p id="promedio" class="scale-in-center">0</p>
  <p class="scale-in-center">Nota final</p>
  <p id="tip" class="scale-in-center"></p>
`;

const getValue = (id) => {
  return parseInt(document.getElementById(id).value) || 0;
};

const getFormInputs = () => {
  const porcentajePractico = getValue('porcentaje_practico');
  const parcial1 = getValue('primer_parcial');
  const parcial2 = getValue('segundo_parcial');
  const practico = getValue('practico');
  const mejoramiento = getValue('mejoramiento');

  return {
    porcentajePractico: porcentajePractico,
    parcial1: parcial1,
    parcial2: parcial2,
    practico: practico,
    mejoramiento: mejoramiento
  };
};

const calculate = (data) => {
  let { porcentajePractico, parcial1, parcial2, practico, mejoramiento } = data;

  let score = 0;

  if (mejoramiento !== 0) {
    if (parcial1 <= parcial2) {
      parcial1 = mejoramiento > parcial1 ? mejoramiento : parcial1;
    } else {
      parcial2 = mejoramiento > parcial2 ? mejoramiento : parcial2;
    }
  }

  if (porcentajePractico === 0) {
    score = (parcial1 + parcial2) / 2;
  } else {
    const pp = porcentajePractico / 100; // porcentaje practico 0-1
    const pa = Math.abs(pp - 1); // porcentaje aulico 0-1
    score = ((parcial1 + parcial2) / 2) * pa + practico * pp;
  }

  return (score / 10).toFixed(2);
};

const showTip = (tip) => {
  const p = document.getElementById('tip');
  p.innerText = tip;
};

const calculateScoreToPass = (data) => {
  let { porcentajePractico, parcial1, parcial2, practico } = data;
  let scoreNeeded = 0;
  if (porcentajePractico === 0) {
    scoreNeeded = parcial1 > parcial2 ? 120 - parcial1 : 120 - parcial2;
    showTip(`Necesitas ${scoreNeeded.toFixed(2)} en mejoramiento para pasar.`);
  } else {
    const pp = porcentajePractico / 100; // porcentaje practico 0-1
    const pa = Math.abs(pp - 1); // porcentaje aulico 0-1
    if (practico === 0) {
      scoreNeeded = (60 - ((parcial1 + parcial2) / 2) * pa) / pp;
      showTip(`Necesitas ${scoreNeeded.toFixed(2)} en practico para pasar.`);
    } else {
      scoreNeeded =
        ((60 - practico * pp) / pa) * 2 -
        (parcial1 > parcial2 ? parcial1 : parcial2);
      showTip(
        `Necesitas ${scoreNeeded.toFixed(2)} en mejoramiento para pasar.`
      );
    }
  }
};

const showResults = () => {
  const data = getFormInputs();
  const result = calculate(data);
  const results = document.querySelector('.results_section');
  results.innerHTML = parseFloat(result) >= 6.0 ? AP : RP;
  const p = document.getElementById('promedio');
  p.innerText = result;
  if (parseFloat(result) < 6.0) {
    calculateScoreToPass(data);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  showResults();
};

form.addEventListener('submit', handleSubmit);

for (let input of numberInputs) {
  input.addEventListener('input', (e) => {
    if (e.target.value > 100) {
      e.target.value = 100;
    }
    if (
      e.target.value < 0 ||
      e.target.value === 'e' ||
      e.target.value.includes('.')
    ) {
      e.target.value = '';
    }
    if (hotReloading) {
      showResults();
    }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === '.') {
      e.preventDefault();
    }
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((res) => console.log('service worker registered'))
      .catch((err) => console.log('service worker not registered', err));
  });
}
