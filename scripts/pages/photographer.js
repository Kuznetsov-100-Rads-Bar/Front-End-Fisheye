import { MediaList } from '../models/medias.model.js';
import { PhotographerProfile } from '../models/photographerProfile.model.js';
import { Lightbox } from '../models/lightbox.model.js';


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

const initLighbox = (medias, photographerName) => {
    const lightBox = new Lightbox(medias, photographerName);

    const lightBoxModal = document.querySelector(".lightbox_modal");
    const lightBoxCloseButton = document.querySelector(".close_modal");
    const lightBoxNextButton = document.querySelector(".right_arrow");
    const lightBoxPreviousButton = document.querySelector(".left_arrow");
    const mediaSection = document.getElementById("mediaSection");

    mediaSection.addEventListener("click", (event) => {
        if (event.target.classList.contains("media-img")) {
            const media = event.target;
            const splittedMedia = media.attributes.src.value.split("/");

            const mediaName = splittedMedia[splittedMedia.length - 1];

            lightBox.display(mediaName);
        }
    })

    lightBoxNextButton.addEventListener("click", () => lightBox.change("next"));
    lightBoxPreviousButton.addEventListener("click", () => lightBox.change("previous"));


    // mediaImgs.forEach(media => {
    //     media.addEventListener("click", (event) => {
    //         console.log(event.target)
    //     })
    // });

    lightBoxCloseButton.addEventListener("click", () => {
        console.log("CLICKED");
        lightBox.close()
    });


}

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