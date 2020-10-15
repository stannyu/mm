import { setClassWithPrefix } from '../utils/utils';

const PLACEHOLDER_DEFAULT = 'add more people';

export class Controller {
  constructor(container, options, model, view) {
    this.model = model;
    this.view = view;

    this.targetElement = container;
    this.options = options;

    this.init();
  }

  init() {
    const { placeholder = PLACEHOLDER_DEFAULT } = this.options;
    this.placeholder = placeholder;

    this.setupMainContainer();
    this.setupInput();

    this.model.setOptionalEmails(this.addEmailTag.bind(this));
  }

  setupMainContainer() {
    setClassWithPrefix(this.targetElement, 'input-container');
    this.targetElement.addEventListener('click', this.handleContainerClick.bind(this));
  }

  setupInput() {
    const { createInput } = this.view;

    this.input = createInput(this.placeholder);

    this.input.addEventListener('blur', this.handleInputBlur.bind(this));
    this.input.addEventListener('keydown', this.handleInputKeyDown.bind(this));
    this.input.addEventListener('paste', this.handleInputPaste.bind(this));

    this.targetElement.appendChild(this.input);
  }

  addEmailTag(email) {
    const existing = this.targetElement.querySelectorAll(`[data-key="${email}"]`);
    if (existing && existing.length === 0) {
      const { createEmailTag, createRemoveButton } = this.view;

      const emailBlock = createEmailTag(email);
      const removeButton = createRemoveButton();
      removeButton.addEventListener('click', (event) => this.handleEmailRemove(event, email));

      emailBlock.appendChild(removeButton);
      this.targetElement.insertBefore(emailBlock, this.input);
      this.input.scrollIntoView();
    }
  }

  removeEmailTag(email) {
    const result = this.targetElement.querySelectorAll(`[data-key="${email}"]`);
    if (result && result.length === 1) {
      // no need to remove event listener from "remove" element of email tag
      // no references left for it so any event handlers/listeners associated with it will be removed by GC
      this.targetElement.removeChild(result[0]);
    }
    this.handleContainerClick();
  }

  getValidEmailsCount() {
    const numberOfValidEmails = this.model.getValidEmailsLength();
    alert(`You entered ${numberOfValidEmails} valid email(s)`);
  }

  addRandomEmail(editor) {
    this.model.addRandomEmailTag(editor);
  }

  /**
   * EVENT HANDLERS
   */

  handleContainerClick() {
    if (this.input) {
      this.input.focus();
    }
  }

  handleInputBlur() {
    if (this.input && this.input.value) {
      this.addEmailTag(this.input.value);
      this.input.value = '';
    }
  }

  handleInputPaste(e) {
    e.preventDefault();
    const emails = e.clipboardData && e.clipboardData.getData('text');
    if (emails) {
      emails
        .split(',')
        .map((email) => email.trim())
        .forEach((email) => {
          this.addEmailTag(email);
        });
    }
  }

  handleInputKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      this.handleInputBlur();
    }
    if (e.key === 'Backspace' && this.input && !this.input.value && this.targetElement.childNodes.length > 1) {
      this.targetElement.removeChild(this.targetElement.childNodes[this.targetElement.childNodes.length - 2]);
    }
  }

  handleEmailRemove(event, email) {
    event.stopPropagation();
    this.removeEmailTag(email);
  }
}
