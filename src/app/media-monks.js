import '../assets/main.scss';

import slides from '../data/slides.json';

import { View } from './view';

/**
 * This example based on simple Design Pattern - MVC, but because we do not have actual
 * Model layer, this is mostly like View -> Controller relationship. Just like BackboneJS.
 *
 * Most of the code in this case is DOM manipulations, they are quite verbose.
 * This, of course could be reduced by use of any Frontend Framework
 *
 * Idea is very simple: View know nothing about data or Controller. It is only responsibility is
 * to create DOM elements and pass them to Controller. Controller responsible for data manipulations
 * and DOM update. Our Model is slides.json. It store data about slides and text positioning.
 */

export class MediaMonks {
  windowWidth;
  mainContainer;
  imageBackground;
  mainSlogan;

  sliderWidth;
  sliderPosition;
  slider;
  slidesList;
  slideContainer;
  controlRight;
  controlLeft;
  sliderFooter;

  constructor() {
    /**
     * Initiate View class
     * @type {View}
     */
    this.view = new View();
    this.init();
  }

  init() {
    this.windowWidth = window.innerWidth;
    this.sliderPosition = 0;
    this.mainContainer = document.getElementById('container');
    this.slidesList = slides;

    this.createSlider();
    this.initBackgroundImage();
    this.createFooter();

    this._setListeners();

    /**
     * In a real world scenario I wouldn't choose such a hacky way
     * to delay width calculation
     * but this is mostly about project setup anyway
     */
    setTimeout(() => {
      this.setSliderWidth();
    }, 100);
  }

  createSlider() {
    const { createSlider, createControls, createSlogan } = this.view;
    const { controlLeft, slideContainer, controlRight } = createControls();

    this.slider = createSlider();
    this.controlLeft = controlLeft;
    this.slideContainer = slideContainer;
    this.controlRight = controlRight;

    this.slider.appendChild(this.controlLeft);
    this.slider.appendChild(this.slideContainer);
    this.slider.appendChild(this.controlRight);

    this.mainSlogan = createSlogan(this.currentSlogan);
    this.slideContainer.appendChild(this.mainSlogan);

    this.mainContainer.appendChild(this.slider);
  }

  initBackgroundImage() {
    const { createBackgroundImage } = this.view;
    this.imageBackground = createBackgroundImage();
    this.mainContainer.appendChild(this.imageBackground);
  }

  createFooter() {
    const { createFooter } = this.view;

    this.sliderFooter = createFooter(this.slidesList, this.sliderPosition);
    this.slider.appendChild(this.sliderFooter);

    this._addFooterListeners();
  }

  removeSlogan() {
    this.mainSlogan.parentNode.removeChild(this.mainSlogan);
  }

  get currentSlogan() {
    return this.slidesList[this.sliderPosition];
  }

  scrollBackground() {
    this.imageBackground.setAttribute('style', `transform:translateX(-${this.calculateScrollValue()}px)`);
  }

  setSliderWidth() {
    this.sliderWidth = this.imageBackground.offsetWidth;
  }

  calculateScrollValue() {
    return ((this.sliderWidth - this.windowWidth) / (10 - 2)) * this.sliderPosition;
  }

  removeActiveStatusControl() {
    const activeBtn = document.querySelectorAll(`[data-index="${this.sliderPosition}"]`)[0];
    activeBtn.classList.remove('active');
    activeBtn.classList.add('inactive');
  }

  addActiveStatusControl() {
    const btn = document.querySelectorAll(`[data-index="${this.sliderPosition}"]`)[0];
    btn.classList.remove('inactive');
    btn.classList.add('active');
  }

  changeSlideArrowHandler(direction) {
    if (direction === 'prev' && this.sliderPosition > 0) {
      this.sliderPosition--;
    } else if (direction === 'next' && this.sliderPosition < 9) {
      this.sliderPosition++;
    }
  }

  keyDownHandler({ key }) {
    if (key === 'ArrowLeft' && this.sliderPosition > 0) {
      this._handleControl('prev');
    } else if (key === 'ArrowRight' && this.sliderPosition < this.slidesList.length - 1) {
      this._handleControl('next');
    }
  }

  handleControlsVisibility(direction) {
    if (this.sliderPosition === 0 && direction === 'next') {
      this.controlLeft.classList.remove('hide');
    }

    if (this.sliderPosition === 1 && direction === 'prev') {
      this.controlLeft.classList.add('hide');
    }

    if (this.sliderPosition === 8 && direction === 'next') {
      this.controlRight.classList.add('hide');
    }

    if (this.sliderPosition === 9 && direction === 'prev') {
      this.controlRight.classList.remove('hide');
    }
  }

  _handleControl(direction) {
    this.handleControlsVisibility(direction);
    this.removeSlogan();
    this.removeActiveStatusControl();
    this.changeSlideArrowHandler(direction);
    this.addActiveStatusControl();
    this.mainSlogan = this.view.createSlogan(this.currentSlogan);
    this.slideContainer.appendChild(this.mainSlogan);
    this.scrollBackground();
  }

  _addFooterListeners() {
    this.sliderFooter.addEventListener('click', (event) => {
      this._removeActiveStatus();
      this.sliderPosition = event.target.dataset.index;
      this._addActiveStatus();
      this.removeSlogan();
      this.mainSlogan = this.view.createSlogan(this.currentSlogan);
      this.slideContainer.appendChild(this.mainSlogan);
      this.scrollBackground();
    });
  }

  _setListeners() {
    window.addEventListener('keydown', (event) => {
      this.keyDownHandler(event);
    });

    window.addEventListener('resize', () => {
      this.setSliderWidth();
    });

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });

    this.controlRight.addEventListener('click', () => {
      this._handleControl('next');
    });

    this.controlLeft.addEventListener('click', () => {
      this._handleControl('prev');
    });
  }

  _removeActiveStatus() {
    const activeBtn = document.querySelectorAll(`[data-index="${this.sliderPosition}"]`)[0];
    activeBtn.classList.remove('active');
    activeBtn.classList.add('inactive');
  }

  _addActiveStatus() {
    const btn = document.querySelectorAll(`[data-index="${this.sliderPosition}"]`)[0];
    btn.classList.remove('inactive');
    btn.classList.add('active');
  }
}

