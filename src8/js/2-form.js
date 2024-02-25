import debounce from 'lodash/debounce';

const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector('.feedback-form');

form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  form.email.value = '';
  form.message.value = ''

  localStorage.clear()
});


form.addEventListener('input', debounce(onInput, 1000));

function onInput() {

  const emailValue = form.email.value.trim();
  const messageValue = form.message.value.trim();
  
  const formData = {
    email: emailValue,
    message: messageValue
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

  function reloadPage() {
  const dataForm = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  if (dataForm) {
    form.email.value = dataForm.email || '';
    form.message.value = dataForm.message || '';
  }
}

reloadPage();



