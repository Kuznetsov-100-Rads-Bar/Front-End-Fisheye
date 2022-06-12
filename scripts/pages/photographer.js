/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* It's importing the classes from the models folder. */
import MediaList from '../models/medias.model.js';
import PhotographerProfile from '../models/photographerProfile.model.js';
import Lightbox from '../models/lightbox.model.js';

/**
 * If the photographerId is not a number, or if the photographerId is not found in the photographers
 * array, then redirect to the homepage.
 * @returns The photographer object.
 */
const fetchPhotographer = async () => {
  const photographerId = parseInt(new URLSearchParams(window.location.search).get('id'), 10);
  const fetchPhotographerData = await fetch('./data/photographers.json').then((data) => data.json());
  const photographer = fetchPhotographerData.photographers.find((profile) => profile.id === photographerId);

  if (!photographerId || !Number(photographerId) || !photographer) {
    return window.location.assign('../');
  }
  return photographer;
};

/* Il récupère les données du fichier photographers.json et filtre le tableau de médias pour n'inclure que le
  médias qui ont le même photographeId que la photographie. */

const getMedias = async (photograph) => {
  const data = await fetch('./data/photographers.json').then((response) => response.json());
  const medias = data.media.filter((media) => media.photographerId === photograph.id);

  return [...medias];
};

/**
 * This function takes a photographer object as an argument and creates a new PhotographerProfile
 * object with the photographer's name, city, country, tagline, and portrait. Then it displays the
 * photographer's profile.
 * @param photographer - {
 */
const displayPhotographerProfile = (photographer) => {
  const photographerProfile = new PhotographerProfile(photographer.name, `${photographer.city}, ${photographer.country}`, photographer.tagline, photographer.portrait);
  photographerProfile.display();
};

/**
 * This function creates a new MediaList object, and then calls the init method on that object, passing
 * in the photographer and medias parameters.
 * @param photographer - The photographer's name
 * @param medias - an array of objects, each object has a property called "media_type" which is either
 * "image" or "video"
 */
const displayMedias = async (photographer, medias) => {
  const mediaList = new MediaList();
  mediaList.init(photographer, medias);
};

/**
 * It takes an array of media objects and a photographer name, and then it creates a new Lightbox
 * object, and then it adds event listeners to the media section, the next and previous buttons, and
 * the close button.
 * @param medias - an array of media objects
 * @param photographerName - "John Doe"
 */
const initLighbox = (medias, photographerName) => {
  const lightBox = new Lightbox(medias, photographerName);

  const lightBoxCloseButton = document.querySelector('.close_modal');
  const lightBoxNextButton = document.querySelector('.right_arrow');
  const lightBoxPreviousButton = document.querySelector('.left_arrow');
  const mediaSection = document.getElementById('mediaSection');

  const displayLightbox = (media) => {
    const splittedMedia = media.attributes.src.value.split('/');
    const mediaName = splittedMedia[splittedMedia.length - 1];
    lightBox.display(mediaName);
  };

  mediaSection.addEventListener('click', (event) => {
    if (event.target.classList.contains('media-img')) {
      const media = event.target;
      displayLightbox(media);
    }
  });

  mediaSection.addEventListener('keyup', (event) => {
    if (event.target.classList.contains('media-card')) {
      if (event.key === 'Enter' || event.key === ' ') {
        const media = event.target.childNodes[0];
        displayLightbox(media);
      }
    }
  });

  lightBoxNextButton.addEventListener('click', () => lightBox.change('next'));
  lightBoxPreviousButton.addEventListener('click', () => lightBox.change('previous'));

  lightBoxCloseButton.addEventListener('click', () => {
    lightBox.close();
  });
};

/**
 * An async function that is called when the page loads.
 */
const init = async () => {
  /* On obtient l'identifiant du photographe à partir de l'URL. */
  const photographer = await fetchPhotographer();

  /* Le mot clé ci-dessous "new" nous permet d'instancier un nouvel objet =>
    en faite ça veut dire que l'on va  créer un nouvel objet à partir de ma fonction
     ou de ma classe.
    */

  const medias = await getMedias(photographer);

  await initLighbox(medias, photographer.name);

  await displayPhotographerProfile(photographer);
  await displayMedias(photographer, medias);
};

/* It's calling the function init. */
init();
