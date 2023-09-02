/**
 * Global variable for tracking form mode state.
 * Simple (false) - Only Course Name and GPA are required.
 * Full (true) - GPA is not required, it will be calculated with the extra fields.
 */
let fullFormMode = false;

let editMode = false;
let courseSelectedIndex = -1;

/**
 * Global variable for the dialog element.
 */
const dialog = document.getElementById('dialog');

/**
 * Global variable for the dialog container (the background).
 */
const dialogContainer = document.getElementById('dialogContainer');

/**
 * Set the required attribute to true for the input with the specified ID.
 * @param {number} inputId
 */
const makeInputRequired = (inputId) => {
  const input = document.getElementById(inputId);
  input.required = true;
};

/**
 * Set the required attribute to false for the input with the specified ID.
 * @param {number} inputId
 */
const makeInputNotRequired = (inputId) => {
  const input = document.getElementById(inputId);
  input.required = false;
};

/**
 * Add the class "hidden" to the element with the ID specified.
 * @param {number} elementId
 */
const makeElementHidden = (elementId) => {
  const element = document.getElementById(elementId);
  element.classList.add('hidden');
};

/**
 * Remove the class "hidden" to the element with the ID specified.
 * @param {number} elementId
 */
const makeElementVisible = (elementId) => {
  const element = document.getElementById(elementId);
  element.classList.remove('hidden');
};

/**
 * Ensure input value is between [0.00 - 10.00]
 * @param {object} input
 */
const validateGPAInput = (input) => {
  if (input.value.includes('.')) {
    // Split the input value into integer and fractional parts
    var parts = input.value.split('.');
    var integerPart = parts[0];
    var fractionalPart = parts[1];

    // Ensure the integer part is within the range [0, 10]
    if (integerPart === '' || parseFloat(integerPart) < 0) {
      integerPart = '0';
    } else if (parseFloat(integerPart) > 10) {
      integerPart = '10';
    }

    // Ensure the fractional part is no longer than 2 characters
    if (fractionalPart && fractionalPart !== '' && fractionalPart.length > 2) {
      fractionalPart = fractionalPart.slice(0, 2);
    }

    // Combine the integer and fractional parts and set the input value
    input.value = integerPart + (fractionalPart ? '.' + fractionalPart : '.');
  } else {
    if (input.value < 0) {
      input.value = '';
    }
  }
};

/**
 * Validate that the numbers are within the range 0 - 100.
 */
const sanitizeFormNumberInputs = () => {
  const numberInputs = document.querySelectorAll('.form input[type="number"]');
  for (let input of numberInputs) {
    if (input.id === 'gpa') {
      input.addEventListener('input', (e) => {
        validateGPAInput(e.target);
      });
      continue;
    }

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
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === '.') {
        e.preventDefault();
      }
    });
  }
  const gpaInput = document.getElementById('gpa');
  gpaInput.addEventListener('input', (e) => {
    if (e.target.value > 10) {
      e.target.value = 10;
    }
  });
};

/**
 * Open the dialog.
 */
const openDialog = () => {
  document.body.style.top = `-${window.scrollY}px`;
  dialogContainer.style.display = 'block';
  document.body.style.position = 'fixed';
  dialog.show();
};

/**
 * Close the dialog.
 */
const closeDialog = () => {
  dialogContainer.style.display = 'none';
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
  dialog.close();
};

/**
 * Returns template string for a table row from courses table.
 * @param {object} data
 * @returns
 */
const tableRow = (data) => {
  return `
  <tr class="formTable__tr" onClick="editCourse('${data.index}')">
    <form class="formTable" id="addNewCourseForm">
      <td class="formTable__td courseName">
      ${data.courseName}
      </td>
      <td class="formTable__td gpa">
      ${data.gpa}
      </td>
    </form>
    <td class="formTable__td optionsTd">
      <button class="button button--delete" id="deleteButton${data.index}" type="button" title="deleteButton${data.index}" onClick="deleteCourse('${data.index}'); event.stopPropagation();">
        <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ef4444" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
        </svg>
      </button>
    </td>
  </tr>
  `;
};

/**
 * Delete the course with the specified ID.
 * @param {number} index
 */
const deleteCourse = (index) => {
  const courses = getCourses();
  courses.splice(index, 1);
  localStorage.setItem('coursesEspol', JSON.stringify(courses));
  updateView();
};

/**
 *
 * @param {number} index
 */
const editCourse = (index) => {
  editMode = true;
  courseSelectedIndex = index;

  const courses = getCourses();
  openDialog();

  const course = courses[index];
  setFormInputValues(course);

  const dialogTitle = document.getElementById('dialogTitle');
  dialogTitle.innerText = 'Editar Materia';

  const dialogSubmitButton = document.getElementById('dialogSubmitButton');
  dialogSubmitButton.innerText = 'Guardar';
};

/**
 * Update the course info
 * @param {object} course
 */
const saveCourse = (newCourseInfo, index) => {
  const courses = getCourses();
  courses[index] = newCourseInfo;
  localStorage.setItem('coursesEspol', JSON.stringify(courses));
  updateView();
};

const setFormInputValues = (course) => {
  const courseName = document.getElementById('courseName');
  const gpa = document.getElementById('gpa');
  const pPractic = document.getElementById('pPractic');
  const partial1 = document.getElementById('partial1');
  const partial2 = document.getElementById('partial2');
  const practic = document.getElementById('practic');
  const replacementExam = document.getElementById('replacementExam');

  if (editMode) {
    courseName.value = course.courseName;
    gpa.value = course.gpa;
    pPractic.value = course.pPractic;
    partial1.value = course.partial1;
    partial2.value = course.partial2;
    practic.value = course.practic;
    replacementExam.value = course.replacementExam;
  } else {
    courseName.value = '';
    gpa.value = 0;
    pPractic.value = 0;
    partial1.value = 0;
    partial2.value = 0;
    practic.value = 0;
    replacementExam.value = 0;
  }
};

/**
 * Returns global GPA based on courses present in localstorage
 * @returns Global GPA
 */
const calculateGlobalGPA = () => {
  const courses = getCourses();
  let total = 0;
  let numberOfCourses = courses.length;
  courses.forEach((course) => {
    total += parseFloat(course.gpa);
  });
  return (total / numberOfCourses).toFixed(2);
};

/**
 * Returns GPA for the course specified as courseInfo
 * @param {object} courseInfo
 * @returns GPA
 */
const calculateGPA = (courseInfo) => {
  let { pPractic, partial1, partial2, practic, replacementExam } = courseInfo;

  pPractic = parseFloat(pPractic);
  partial1 = parseFloat(partial1);
  partial2 = parseFloat(partial2);
  practic = parseFloat(practic);
  replacementExam = parseFloat(replacementExam);

  let score = 0;

  if (replacementExam !== 0) {
    if (partial1 <= partial2) {
      partial1 = replacementExam > partial1 ? replacementExam : partial1;
    } else {
      partial2 = replacementExam > partial2 ? replacementExam : partial2;
    }
  }

  if (pPractic === 0) {
    score = (partial1 + partial2) / 2;
  } else {
    const pp = pPractic / 100; // porcentaje practico 0-1
    const pa = Math.abs(pp - 1); // porcentaje aulico 0-1
    score = ((partial1 + partial2) / 2) * pa + practic * pp;
  }

  return (score / 10).toFixed(2);
};

/**
 * Return a coruses object with a list items with all the courses
 * @returns courses object
 */
const getCourses = () => {
  return JSON.parse(localStorage.getItem('coursesEspol'));
};

/**
 * Save newCourse in localstorage
 * @param {object} newCourse
 */
const addNewCourse = (newCourse) => {
  const courses = getCourses();
  courses.push(newCourse);
  localStorage.setItem('coursesEspol', JSON.stringify(courses));
  updateView();
};

/**
 * Render all the courses in localstorage
 */
const loadCourses = () => {
  const courses = getCourses();
  const coursesTableBody = document.getElementById('coursesTableBody');
  coursesTableBody.innerHTML = '';
  courses.forEach((course, index) => {
    coursesTableBody.innerHTML += tableRow({ ...course, index });
  });
  if (courses.length > 0) {
    makeElementVisible('coursesTableSection');
  } else {
    makeElementHidden('coursesTableSection');
  }
};

/**
 * Render global GPA
 */
const loadGlobalGPA = () => {
  const globalGPA = calculateGlobalGPA();
  const globalGPAContainer = document.getElementById('globalGPA');
  if (globalGPA === 'NaN') {
    globalGPAContainer.innerText = 0;
  } else {
    globalGPAContainer.innerText = globalGPA ?? 0;
  }
};

/**
 * Update all the components
 */
const updateView = () => {
  loadCourses();
  loadGlobalGPA();
};

/**
 * Create courses in localstorage if it does not exist
 */
const initCourses = () => {
  if (localStorage.getItem('coursesEspol') === null) {
    localStorage.setItem('coursesEspol', JSON.stringify([]));
  }
  // TODO: Delete this line before deploy
  // localStorage.setItem('coursesEspol', JSON.stringify([]));
  updateView();
};

/**
 * Add functionality to the dialog
 */
const initDialog = () => {
  const addCourseButton = document.getElementById('addCourseButton');
  addCourseButton.addEventListener('click', (e) => {
    openDialog();
    editMode = false;
    setFormInputValues();

    const dialogTitle = document.getElementById('dialogTitle');
    dialogTitle.innerText = 'Nueva Materia';

    const dialogSubmitButton = document.getElementById('dialogSubmitButton');
    dialogSubmitButton.innerText = 'Agregar';
  });

  const closeDialogButton = document.getElementById('closeDialogButton');
  closeDialogButton.addEventListener('click', () => {
    closeDialog();
  });
};

/**
 * Add functionality to the form switch.
 */
const initFormSwitch = () => {
  const formSwitch = document.getElementById('formSwitch');

  const defualtFieldsIds = ['gpa_field'];
  const extraFieldsIds = [
    'pPractic_field',
    'partial1_field',
    'partial2_field',
    'practic_field',
    'replacementExam_field'
  ];

  formSwitch.addEventListener('change', (e) => {
    fullFormMode = !fullFormMode;
    if (fullFormMode) {
      extraFieldsIds.forEach((id) => {
        makeElementVisible(id);
        const inputId = id.split('_')[0];
        makeInputRequired(inputId);
      });

      defualtFieldsIds.forEach((id) => {
        makeElementHidden(id);
        const inputId = id.split('_')[0];
        makeInputNotRequired(inputId);
      });
    } else {
      extraFieldsIds.forEach((id) => {
        makeElementHidden(id);
        const inputId = id.split('_')[0];
        makeInputNotRequired(inputId);
      });

      defualtFieldsIds.forEach((id) => {
        makeElementVisible(id);
        const inputId = id.split('_')[0];
        makeInputRequired(inputId);
      });
    }
  });
};

/**
 * Add functionality to the form in the dialog.
 */
const initForm = () => {
  const addCourseForm = document.getElementById('addCourseForm');
  addCourseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    closeDialog();
    const formInputs = event.target.querySelectorAll('.form input');
    const formData = {};
    formInputs.forEach(function (input) {
      formData[input.name] = input.value;
    });
    if (fullFormMode) {
      const gpa = calculateGPA(formData);
      formData['gpa'] = gpa;
    }
    if (editMode) {
      saveCourse(formData, courseSelectedIndex);
    } else {
      addNewCourse(formData);
    }
  });

  initFormSwitch();
  sanitizeFormNumberInputs();
};

/**
 * Add all the functionality to the page
 */
const init = () => {
  initCourses();
  initDialog();
  initForm();
};

init();
