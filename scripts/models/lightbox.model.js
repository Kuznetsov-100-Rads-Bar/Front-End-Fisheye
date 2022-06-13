/* eslint-disable no-lonely-if */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* Selecting the element with the class `lightbox_modal` and assigning it to the variable
`lightBoxModal`. */
const lightBoxModal = document.querySelector('.lightbox_modal');

/* Selecting the element with the class `media_container` and assigning it to the variable
`lightBoxMediaContainer`. */
const lightBoxMediaContainer = document.querySelector('.media_container');

/* Selecting the element with the class `photographer` and assigning it to the variable `root`. */
const root = document.querySelector('.photographer');

/* It creates a class called Lightbox. */
export default class {
  /**
         * The constructor function is used to create a new object with the specified prototype object and
         * properties.
         * @param medias - an array of objects that contain the image url and the image caption
         * @param photographerName - The name of the photographer
         */
  constructor(medias, photographerName) {
    this.medias = medias;
    this.currentImageIndex = 0;
    this.photographerName = photographerName;
    this.isDisplayed = false;
  }

  // eslint-disable-next-line class-methods-use-this
  trapFocus = (modal) => {
    // add all the elements inside modal which you want to make focusable
    const focusableElements = Array.from(modal.querySelectorAll('button'));
    // const modal = document.querySelector('#exampleModal'); // select the modal by it's id
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    document.addEventListener('keydown', (e) => {
      const isTabPressed = e.key === 'Tab' || e.code === '9';
      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) { // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // add focus for the last focusable element
          e.preventDefault();
        }
      } else if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    });
    // console.log(firstFocusableElement, ' /n', focusableElements);
    firstFocusableElement.focus();
  };

  keyHandler = (event) => {
    const { key } = event;

    if (key === 'ArrowRight') {
      this.change('next');
    } else if (key === 'ArrowLeft') {
      this.change('previous');
    } else if (key === 'Escape') {
      this.close();
    }
    // console.log(key);
  };

  display = (selectedMedia) => {
    if (this.isDisplayed) {
      root.removeEventListener('keyup', (event) => this.keyHandler(event));
      return this.close();
    }

    this.trapFocus(lightBoxModal);
    root.addEventListener('keyup', this.keyHandler);

    const splittedSelectedMedia = selectedMedia.split('.');
    const isMediaVideo = Boolean(splittedSelectedMedia[splittedSelectedMedia.length - 1] === 'mp4');

    this.currentImageIndex = this.medias.findIndex((media) => (isMediaVideo ? media.video : media.image === selectedMedia));

    const mediaSource = `assets/medias/${this.photographerName.split(' ')[0]}/${isMediaVideo ? this.medias[this.currentImageIndex].video : this.medias[this.currentImageIndex].image}`;

    const mediaName = this.medias[this.currentImageIndex].title;

    let media;

    if (isMediaVideo) {
      media = document.createElement('video');
      media.setAttribute('autoplay', true);
    } else if (!isMediaVideo) {
      media = document.createElement('img');
    } else {
      media = document.createElement('span');
    }

    media.setAttribute('src', mediaSource);
    media.classList.add('lightbox_media');
    media.setAttribute('alt', 'Media');

    const mediaTitle = document.createElement('p');
    mediaTitle.classList.add('lightbox_media_title');
    mediaTitle.textContent = mediaName;

    lightBoxMediaContainer.innerHTML = '';
    lightBoxMediaContainer.appendChild(media);
    lightBoxMediaContainer.appendChild(mediaTitle);

    this.isDisplayed = true;
    // eslint-disable-next-line no-return-assign
    return lightBoxModal.style.display = 'block';
  };

  close = () => {
    // console.log("IsShowed ?", this.isDisplayed)
    if (this.isDisplayed) {
      root.removeEventListener('keyup', this.keyHandler);
      this.isDisplayed = false;
      // eslint-disable-next-line no-return-assign
      return lightBoxModal.style.display = 'none';
    }
  };

  change = (direction) => {
    if (direction === 'next') {
      if (!this.medias[this.currentImageIndex + 1]) {
        this.currentImageIndex = 0;
      } else {
        this.currentImageIndex += 1;
      }
    } else {
      if (!this.medias[this.currentImageIndex - 1]) {
        this.currentImageIndex = (this.medias.length - 1);
      } else {
        this.currentImageIndex -= 1;
      }
    }

    const isMediaVideo = Boolean(this.medias[this.currentImageIndex].video);

    const mediaSource = `assets/medias/${this.photographerName.split(' ')[0]}/${isMediaVideo ? this.medias[this.currentImageIndex].video : this.medias[this.currentImageIndex].image}`;

    const mediaName = this.medias[this.currentImageIndex].title;

    let media;

    if (isMediaVideo) {
      media = document.createElement('video');
      media.setAttribute('autoplay', true);
    } else if (!isMediaVideo) {
      media = document.createElement('img');
    } else {
      media = document.createElement('span');
    }

    media.setAttribute('src', mediaSource);
    media.classList.add('lightbox_media');
    media.setAttribute('alt', 'Media');

    const mediaTitle = document.createElement('p');
    mediaTitle.classList.add('lightbox_media_title');
    mediaTitle.textContent = mediaName;

    lightBoxMediaContainer.innerHTML = '';
    lightBoxMediaContainer.appendChild(media);
    lightBoxMediaContainer.appendChild(mediaTitle);

    return 'change media';
  };
}
