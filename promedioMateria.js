/**
 * Returns a template string of the result
 * @param {string} imagePath image to display along the result
 * @param {boolean} approved whereas course has been approved or not
 * @returns
 */
const resultTemplate = (approved) => {
  return `
  <img src="${
    approved ? './images/approved.png' : './images/sad.svg'
  }" alt="Celebracion" class="scale-in-center" />
  <span class="scale-in-center">${
    approved ? 'Felicitaciones!' : 'Lo sentimos mucho'
  }<br />${approved ? 'Aprobaste' : 'Reprobaste'}</span>
  <p id="promedio" class="scale-in-center">0</p>
  <p class="scale-in-center">Nota final</p>
  <p id="tip" class="scale-in-center"></p>
`;
};

/**
 *
 * @param {string} id
 * @returns Integer value of the input
 */
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

/**
 * Returns GPA for the course specified as courseInfo
 * @param {object} courseInfo
 * @returns GPA
 */
const calculateGPA = (courseInfo) => {
  let { porcentajePractico, parcial1, parcial2, practico, mejoramiento } =
    courseInfo;

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

/**
 * Calculate the score needed to approve the course.
 * @param {object} data
 */
const calculateScoreToApprove = (data) => {
  let { porcentajePractico, parcial1, parcial2, practico } = data;
  let scoreNeeded = 0;

  if (porcentajePractico === 0) {
    scoreNeeded = parcial1 > parcial2 ? 120 - parcial1 : 120 - parcial2;
    return scoreNeeded;
  }

  const pp = porcentajePractico / 100; // porcentaje practico 0-1
  const pa = Math.abs(pp - 1); // porcentaje aulico 0-1

  if (practico === 0) {
    scoreNeeded = (60 - ((parcial1 + parcial2) / 2) * pa) / pp;
  } else {
    scoreNeeded =
      ((60 - practico * pp) / pa) * 2 -
      (parcial1 > parcial2 ? parcial1 : parcial2);
  }

  return scoreNeeded;
};

/**
 * Display the score needed to approve the course.
 */
const showScoreToApproved = (scoreNeeded, pPractic, practic) => {
  if (pPractic === 0) {
    showTip(`Necesitas ${scoreNeeded.toFixed(2)} en mejoramiento para pasar.`);
    return;
  }
  if (practic === 0) {
    showTip(`Necesitas ${scoreNeeded.toFixed(2)} en practico para pasar.`);
  } else {
    showTip(`Necesitas ${scoreNeeded.toFixed(2)} en mejoramiento para pasar.`);
  }
};

/**
 * Display results
 */
const showResults = () => {
  const courseInfo = getFormInputs();
  const gpa = calculateGPA(courseInfo);

  const results = document.querySelector('.results_section');
  results.classList.remove('hidden');

  results.innerHTML = resultTemplate(parseFloat(gpa) >= 6.0);

  const p = document.getElementById('promedio');
  p.innerText = gpa;

  if (parseFloat(gpa) < 6.0) {
    const scoreNeeded = calculateScoreToApprove(courseInfo);
    showScoreToApproved(
      scoreNeeded,
      courseInfo.porcentajePractico,
      courseInfo.practico
    );
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  showResults();
};

const realTime = document.getElementById('realtime');
let hotReloading = false;

realTime.addEventListener('change', (e) => {
  hotReloading = !hotReloading;
});

const form = document.getElementById('form');
const numberInputs = document.getElementsByClassName('form__field__input');

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
