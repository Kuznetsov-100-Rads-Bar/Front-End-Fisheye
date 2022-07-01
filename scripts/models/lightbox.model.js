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

  // Accessibilité
  /* Une fonction qui est appelée lorsqu'une touche est enfoncée. */
  keyHandler = (event) => {
    const { key } = event;
    const { classList } = event.target;

    /* Vérifier si la touche enfoncée est la barre d'espace ou la touche entrée. Si c'est le cas, il vérifie si le
  classList contient la classe left_arrow_button ou right_arrow_button. Si c'est le cas, il renvoie le
  changement de fonction avec le paramètre précédent ou suivant. */
    if (key === ' ' || key === 'Enter') {
      if (classList.contains('left_arrow_button')) {
        return this.change('previous');
      }
      if (classList.contains('right_arrow_button')) {
        return this.change('next');
      }
    } else if (key === 'ArrowRight') {
      return this.change('next');
    } else if (key === 'ArrowLeft') {
      return this.change('previous');
    } else if (key === 'Escape') {
      return this.close();
    }
    // console.log(key);
    /* Vérifier si la touche enfoncée est la touche fléchée droite ou la touche fléchée gauche. Si c'est le droit
    touche fléchée, il appelle la fonction de changement avec le paramètre suivant.Si c'est la flèche vers la gauche,
    il appelle la fonction change avec le paramètre précédent.S'il s'agit de la touche d'échappement, il appelle le
    fermer la fonction */
  };

  /* Une fonction qui affiche la lightbox. */
  display = (selectedMedia) => {
    /* Vérifier si la lightbox est affichée. Si c'est le cas, il supprime l'écouteur d'événement et ferme la lightbox. */
    if (this.isDisplayed) {
      root.removeEventListener('keyup', (event) => this.keyHandler(event));
      return this.close();
    }

    /* Ajout d'un écouteur d'événement à l'élément root. Lorsque l'événement est déclenché, il appelle le
    Fonction keyHandler. */
    this.trapFocus(lightBoxModal);
    root.addEventListener('keyup', (event) => this.keyHandler(event));

    /* It splits the selectedMedia string into an array of strings. */
    const splittedSelectedMedia = selectedMedia.split('.');

    /* It checks if the media is a video or not. */
    const isMediaVideo = Boolean(splittedSelectedMedia[splittedSelectedMedia.length - 1] === 'mp4');

    /* Finding the index of the selected media in the medias array. */
    this.currentImageIndex = this.medias.findIndex((media) => (isMediaVideo ? media.video : media.image === selectedMedia));

    /* Creating the path to the media. */
    const mediaSource = `assets/medias/${this.photographerName.split(' ')[0]}/${isMediaVideo ? this.medias[this.currentImageIndex].video : this.medias[this.currentImageIndex].image}`;

    /* Getting the title of the current media. */
    const mediaName = this.medias[this.currentImageIndex].title;

    /* Créer une vidéo ou un élément d'image. */
    let media;

    /* Création d'un élément vidéo et définition de l'attribut de lecture automatique sur true. */
    if (isMediaVideo) {
      media = document.createElement('video');
      media.setAttribute('autoplay', true);
    } else if (!isMediaVideo) {
      media = document.createElement('img');
    } else {
      media = document.createElement('span');
    }

    /* Il définit la source du média sur mediaSource. */
    media.setAttribute('src', mediaSource);
    /* Il ajoute la classe `lightbox_media` à l'élément `media`. */
    media.classList.add('lightbox_media');
    /* Il définit l'attribut alt du média sur Media. */
    media.setAttribute('alt', 'Media');

    /* Il crée un élément de paragraphe et l'affecte à la variable `mediaTitle`. */
    const mediaTitle = document.createElement('p');
    /* Il ajoute la classe `lightbox_media_title` à l'élément `mediaTitle`. */
    mediaTitle.classList.add('lightbox_media_title');
    /* Il définit le contenu textuel de l'élément mediaTitle sur la variable mediaName. */
    mediaTitle.textContent = mediaName;

    /* Emptying the lightBoxMediaContainer. */
    lightBoxMediaContainer.innerHTML = '';
    /* Il ajoute l'élément média à l'élément lightBoxMediaContainer. */
    lightBoxMediaContainer.appendChild(media);
    /* Il ajoute l'élément mediaTitle à l'élément lightBoxMediaContainer. */
    lightBoxMediaContainer.appendChild(mediaTitle);

    /* Définir la valeur de la propriété `isDisplayed` sur true. */
    this.isDisplayed = true;
    // eslint-disable-next-line no-return-assign
    return lightBoxModal.style.display = 'block'; // Définition de la propriété d'affichage de l'élément avec la classe `lightbox_modal` sur `block`.
  };

  /* Une fonction qui ferme la lightbox. */
  close = () => {
    // console.log("IsShowed ?", this.isDisplayed)
    /* Vérifier si la lightbox est affichée. Si c'est le cas, il supprime l'écouteur d'événement et ferme le lightbox. */
    if (this.isDisplayed) {
      root.removeEventListener('keyup', this.keyHandler);
      this.isDisplayed = false;
      // eslint-disable-next-line no-return-assign
      return lightBoxModal.style.display = 'none'; // Définition de la propriété d'affichage de l'élément avec la classe `lightbox_modal` sur `none`
    }
  };

  /* Une fonction qui change le média affiché dans la lightbox. */
  change = (direction) => {
  /* Vérifier si la direction est suivante ou précédente. S'il est le suivant, il vérifie si le currentImageIndex
  est le dernier. Si c'est le cas, il définit le currentImageIndex sur 0. Si ce n'est pas le cas, il incrémente le
  currentImageIndex par 1. S'il est précédent, il vérifie si le currentImageIndex est le premier. Si
  c'est le cas, il définit le currentImageIndex sur le dernier. Si ce n'est pas le cas, il décrémente le
  currentImageIndex par 1. */
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

    /* Il vérifie si le média est une vidéo ou non. */
    const isMediaVideo = Boolean(this.medias[this.currentImageIndex].video);

    /* It creates the path to the media. */
    const mediaSource = `assets/medias/${this.photographerName.split(' ')[0]}/${isMediaVideo ? this.medias[this.currentImageIndex].video : this.medias[this.currentImageIndex].image}`;

    const mediaName = this.medias[this.currentImageIndex].title;

    /* Il crée une vidéo ou un élément d'image. */
    let media;

    if (isMediaVideo) {
      media = document.createElement('video');
      media.setAttribute('autoplay', true);
    } else if (!isMediaVideo) {
      media = document.createElement('img');
    } else {
      media = document.createElement('span');
    }

    /* Il définit la source du média sur mediaSource. */
    media.setAttribute('src', mediaSource);
    /* Il ajoute la classe `lightbox_media` à l'élément `media`. */
    media.classList.add('lightbox_media');
    /* Il définit l'attribut alt de l'élément média sur Media. */
    media.setAttribute('alt', 'Media');

    /* Il crée un élément de paragraphe et l'affecte à la variable `mediaTitle`. */
    const mediaTitle = document.createElement('p');
    /* Il ajoute la classe `lightbox_media_title` à l'élément `mediaTitle`. */
    mediaTitle.classList.add('lightbox_media_title');
    /* Il définit le contenu textuel de l'élément mediaTitle sur la variable mediaName. */
    mediaTitle.textContent = mediaName;

    /* Emptying the lightBoxMediaContainer. */
    lightBoxMediaContainer.innerHTML = '';
    /* Il ajoute l'élément `media` à l'élément `lightBoxMediaContainer`. */
    lightBoxMediaContainer.appendChild(media);
    /* Il ajoute l'élément `mediaTitle` à l'élément `lightBoxMediaContainer`. */
    lightBoxMediaContainer.appendChild(mediaTitle);

    /* Returning a string. */
    return 'change media';
  };
}
