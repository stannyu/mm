import {EDITOR_PREFIX} from "./constants";

function isValidEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email.toLowerCase());
}

function setClassWithPrefix(element, className) {
  const existingClass = element.getAttribute('class');
  const newClass = `${EDITOR_PREFIX}${className}`;
  element.setAttribute('class', existingClass ? `${existingClass} ${newClass}` : newClass);
}

function getRandomEmail() {
  return Math.random().toString(36).substring(2, 10) + '@test.io';
}

export { setClassWithPrefix, isValidEmail, getRandomEmail };
