import { isValidEmail, setClassWithPrefix } from '../utils/utils';
import { removeIcon } from '../utils/constants';

export class View {
  createInput(placeholder) {
    const input = document.createElement('input');
    setClassWithPrefix(input, 'input');
    input.setAttribute('placeholder', placeholder);
    return input;
  }

  createEmailTag(email) {
    const emailTag = document.createElement('div');
    setClassWithPrefix(emailTag, 'email-tag');
    if (!isValidEmail(email)) {
      setClassWithPrefix(emailTag, 'email--invalid');
    }
    emailTag.textContent = email;
    emailTag.setAttribute('data-key', email);

    return emailTag;
  }

  createRemoveButton() {
    const removeButton = document.createElement('button');
    removeButton.innerHTML = removeIcon;
    setClassWithPrefix(removeButton, 'email-remove');
    return removeButton;
  }
}
