// here I am importing both styles - for library and app
// but in real world scenario this would be only library specific styles
import './assets/app-styles.scss';
import './assets/editor-styles.scss';

import image from './img/background.jpg';

import { Controller } from './emails-editor/controller';
import { Model } from './emails-editor/model';
import { View } from './emails-editor/view';

class EmailsEditor {
  EMAILS_EDITOR;
  sliderWidth;
  windowWidth;
  sliderPosition;

  constructor() {
    // best place to handle instantiation errors
    // if (!container || container.hasChildNodes()) {
    //   throw new Error('EmailsEditor require valid DOM element without content.');
    // }
    //
    // this.EMAILS_EDITOR = new Controller(container, options, new Model(container, options), new View());

    this.windowWidth = window.innerWidth;
    this.sliderPosition = 1;
    this.initBgImage();
  }

  initBgImage() {
    const imageContainer = document.getElementById('container');
    const img = document.createElement('img');
    img.setAttribute('src', image);
    img.classList.add('background-image');
    imageContainer.appendChild(img);

    setTimeout(() => {
      console.log(img.offsetWidth);
      this.sliderWidth = img.offsetWidth;
    }, 100);

    window.addEventListener('resize', () => {
      this.sliderWidth = img.offsetWidth;
      console.log(this.sliderWidth);
    });

    const arrR = document.getElementsByClassName('arrowRight')[0];
    arrR.addEventListener('click', () => {
      const scroll = ((this.sliderWidth - this.windowWidth) / (10 - 2)) * this.sliderPosition;
      this.sliderPosition++;
      console.log('click', scroll, this.sliderWidth, this.windowWidth);
      img.setAttribute('style', `transform:translateX(-${scroll}px)`);
    });

    const arrL = document.getElementsByClassName('arrowLeft')[0];
    arrL.addEventListener('click', () => {
      this.sliderPosition = this.sliderPosition - 1;
      const scroll = ((this.sliderWidth - this.windowWidth) / (10 - 2)) * this.sliderPosition;
      console.log('click', scroll, this.sliderWidth, this.windowWidth);
      img.setAttribute('style', `transform:translateX(-${scroll}px)`);
    });
    // window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
  }

  // handleAddEmails(element) {
  //   element.addEventListener('click', () => this.EMAILS_EDITOR.addRandomEmail(this));
  // }
  //
  // handleEmailsCount(element) {
  //   element.addEventListener('click', () => this.EMAILS_EDITOR.getValidEmailsCount());
  // }
}

window.EmailsEditor = EmailsEditor;
export default EmailsEditor;
