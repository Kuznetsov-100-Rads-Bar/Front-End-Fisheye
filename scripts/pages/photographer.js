/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* On importe les classes du dossier des modèles. */
import MediaList from '../models/medias.model.js';

/* On importe la classe PhotographerProfile à partir du fichier photographeProfile.model.js. */
import PhotographerProfile from '../models/photographerProfile.model.js';

/* On importe la classe Lightbox du fichier lightbox.model.js. */
import Lightbox from '../models/lightbox.model.js';

/**
 * Si le photographeId n'est pas un nombre, ou si le photographeId n'est pas trouvé dans les photographes
 * tableau, puis rediriger vers la page d'accueil.
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
 * Cette fonction prend un objet photographe comme argument et crée un nouveau PhotographerProfile
 * L'objet avec le nom, la ville, le pays, le slogan et le portrait du photographe. Ensuite, il affiche le
 * profil du photographe.
 * @param photographer - {
 */
const displayPhotographerProfile = (photographer) => {
  const photographerProfile = new PhotographerProfile(photographer.name, `${photographer.city}, ${photographer.country}`, photographer.tagline, photographer.portrait);
  photographerProfile.display();
};

/**
 *Cette fonction crée un nouvel objet MediaList, puis appelle la méthode init sur cet objet, qui passe
  dans les paramètres du photographe et des médias.
 * @param photographer - The photographer's name
 * @param medias - un tableau d'objets, chaque objet a une propriété appelée "media_type" qui est soit
  "image" ou "video"
 */
const displayMedias = async (photographer, medias) => {
  const mediaList = new MediaList();
  mediaList.init(photographer, medias);
};

/**
 * Il prend un tableau d'objets multimédias et un nom de photographe, puis il crée une nouvelle Lightbox
  objet, puis il ajoute des écouteurs d'événements à la section média, les boutons suivant et précédent, et
  le bouton de fermeture.
 * @param medias - an array of media objects
 * @param photographerName - "John Doe"
 */
const initLighbox = (medias, photographerName) => {
  const lightBox = new Lightbox(medias, photographerName);

  const lightBoxCloseButton = document.querySelector('.close_modal');
  const lightBoxNextButton = document.querySelector('.right_arrow');
  const lightBoxPreviousButton = document.querySelector('.left_arrow');
  const mediaSection = document.getElementById('mediaSection');

  /* Il prend un objet média comme argument, divise l'attribut source du média en un tableau, puis
   utilise le dernier élément du tableau comme nom du média.

   La fonction appelle ensuite la méthode d'affichage sur l'objet lightBox, en transmettant le nom du média sous la forme d'argument.

   Enfin, la fonction définit le focus sur le lightBoxCloseButton.
  * @param media - the image that was clicked on
  */
  const displayLightbox = (media) => {
    const splittedMedia = media.attributes.src.value.split('/');
    const mediaName = splittedMedia[splittedMedia.length - 1];
    lightBox.display(mediaName);
    lightBoxCloseButton.focus();
  };

  /* Il écoute l'événement click sur la mediaSection. Si la cible de l'événement contient la classe
media-img, alors il affichera la lightbox. */
  mediaSection.addEventListener('click', (event) => {
    if (event.target.classList.contains('media-img')) {
      const media = event.target;
      displayLightbox(media);
    }
  });

  /* Il écoute l'événement keyup sur la mediaSection. Si la cible de l'événement contient la carte média
classe, puis il affichera la lightbox. */
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
 * Une fonction asynchrone appelée lors du chargement de la page.
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

/* Il appelle la fonction init. */
init();
