import { MediaList } from '../models/medias.model.js';
import { PhotographerProfile } from '../models/photographerProfile.model.js';


const fetchPhotographer = async () => {
    const photographerId = parseInt(new URLSearchParams(window.location.search).get('id'));
    const fetchPhotographer = await fetch('./data/photographers.json').then((data) => data.json());
    const photographer = fetchPhotographer.photographers.find((photographer) => photographer.id === photographerId);

    if (!photographerId || !Number(photographerId) || !photographer) {
        return window.location.assign('../');
    }
    return photographer;
}

/* Il récupère les données du fichier photographers.json et filtre le tableau de médias pour n'inclure que le
  médias qui ont le même photographeId que la photographie.*/

const getMedias = async (photograph) => {
    const data = await fetch('./data/photographers.json').then((response) => response.json());
    const medias = data.media.filter(media => media.photographerId === photograph.id);

    return [...medias]

};

const displayPhotographerProfile = (photographer) => {
    const photographerProfile = new PhotographerProfile(photographer.name, `${photographer.city}, ${photographer.country}`, photographer.tagline, photographer.portrait);
    photographerProfile.display();
};

/**
 * The function takes a photographer object and an array of media objects, and adds the first media
 * object to the media list.
 * @param photographer - {
 * @param medias - [{
 */
const displayMedias = async (photographer, medias) => {
    const mediaList = new MediaList();
    mediaList.init(photographer, medias);
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

    await displayPhotographerProfile(photographer);
    await displayMedias(photographer, medias);
};

/* It's calling the function init. */
init();