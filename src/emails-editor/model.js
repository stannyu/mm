import { getRandomEmail, isValidEmail } from '../utils/utils';
import { EDITOR_PREFIX } from '../utils/constants';

export class Model {
  constructor(container, options) {
    this.targetElement = container;
    this.options = options;
  }

  setOptionalEmails(handler) {
    const { emails = [] } = this.options;
    this.emails = emails;
    const hasDefaultEmails = this.emails && Array.isArray(this.emails) && this.emails.length > 0;

    if (hasDefaultEmails) {
      this.emails.map((email) => handler(email));
    }
  }

  getEmails() {
    const result = this.targetElement.querySelectorAll(`.${EDITOR_PREFIX}email-block`);
    if (result && result.length > 0) {
      return [].slice.call(result).map((e) => e.getAttribute('data-key'));
    }
    return [];
  }

  getValidEmailsLength() {
    const DEFAULT_NUM_VALUE = 0;
    const validEmailSelector = `.${EDITOR_PREFIX}email-tag:not(.${EDITOR_PREFIX}email--invalid)`;

    this.getEmails().filter(isValidEmail);
    const result = this.targetElement.querySelectorAll(validEmailSelector);
    if (result && result.length > DEFAULT_NUM_VALUE) {
      return [].slice.call(result).map((e) => e.getAttribute('data-key')).length;
    }
    return DEFAULT_NUM_VALUE;
  }

  addRandomEmailTag(editor) {
    const randomEmail = getRandomEmail();
    editor.EMAILS_EDITOR.addEmailTag(randomEmail);
  }
}
