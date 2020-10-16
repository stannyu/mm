import { isValidEmail, setClassWithPrefix } from '../utils/utils';
import { removeIcon } from '../utils/constants';

/**
 * Not the best way to use image, but this is a test assignment
 */
import image from '../img/background.jpg';

export class View {
  createBackgroundImage() {
    const imageBackground = document.createElement('img');
    imageBackground.setAttribute('src', image);
    imageBackground.classList.add('background-image');

    return imageBackground;
  }

  createSlider() {
    const slider = document.createElement('div');
    slider.classList.add('slider');

    return slider;
  }

  createControls() {
    const controlRight = document.createElement('button');
    controlRight.classList.add('arrow-wrapper');
    controlRight.classList.add('arrowRight');

    const slideContainer = document.createElement('div');
    slideContainer.classList.add('slide-container');

    const controlLeft = document.createElement('button');
    controlLeft.classList.add('arrow-wrapper');
    controlLeft.classList.add('arrowLeft');
    controlLeft.classList.add('hide');

    return { controlRight, slideContainer, controlLeft };
  }

  createSlogan(currentSlogan) {
    const BREAK_LINE = '<br />';
    const mainSlogan = document.createElement('h2');
    mainSlogan.classList.add('heading');

    const { vertical, horizontal } = currentSlogan.position;

    if (vertical === 'top') {
      mainSlogan.classList.add('alignTop');
    } else {
      mainSlogan.classList.add('alignCenter');
    }

    if (horizontal === 'left') {
      mainSlogan.classList.add('alignLeft');
    } else {
      mainSlogan.classList.add('alignRight');
    }

    const text = currentSlogan.heading.reduce((result, line, index, array) => {
      if (index < array.length - 1) {
        result += line + BREAK_LINE;
      } else {
        result += line;
      }
      return result;
    }, '');

    mainSlogan.innerHTML = text;

    return mainSlogan;
  }

  createFooter(slides, sliderPosition) {
    const sliderFooter = document.createElement('div');
    const sliderStatusContainer = document.createElement('div');
    const sliderControlsContainer = document.createElement('div');

    sliderFooter.classList.add('wrapper-container');
    sliderStatusContainer.classList.add('status-container');
    sliderFooter.appendChild(sliderStatusContainer);
    sliderControlsContainer.classList.add('controls-container');

    const controlButtons = slides.map((slide, index) => {
      const btn = document.createElement('button');
      if (sliderPosition !== index) {
        btn.classList.add('inactive');
      } else {
        btn.classList.add('active');
      }

      btn.setAttribute('data-index', index);
      if (index !== 0 && index !== slides.length - 1) {
        btn.innerHTML = index;
      }
      return btn;
    });

    controlButtons.map((button) => {
      sliderControlsContainer.appendChild(button);
    });

    sliderFooter.appendChild(sliderControlsContainer);

    return sliderFooter;
    // this.slider.appendChild(this.sliderFooter);
  }

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
