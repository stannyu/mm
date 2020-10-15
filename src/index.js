// here I am importing both styles - for library and app
// but in real world scenario this would be only library specific styles
import './assets/app-styles.scss';
import './assets/editor-styles.scss';

import { Controller } from './emails-editor/controller';
import { Model } from './emails-editor/model';
import { View } from './emails-editor/view';

class EmailsEditor {
  EMAILS_EDITOR;

  constructor(container, options = {}) {
    // best place to handle instantiation errors
    if (!container || container.hasChildNodes()) {
      throw new Error('EmailsEditor require valid DOM element without content.');
    }

    this.EMAILS_EDITOR = new Controller(container, options, new Model(container, options), new View());
  }

  handleAddEmails(element) {
    element.addEventListener('click', () => this.EMAILS_EDITOR.addRandomEmail(this));
  }

  handleEmailsCount(element) {
    element.addEventListener('click', () => this.EMAILS_EDITOR.getValidEmailsCount());
  }
}

window.EmailsEditor = EmailsEditor;
export default EmailsEditor;
