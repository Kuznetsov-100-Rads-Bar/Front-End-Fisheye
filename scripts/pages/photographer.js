/* It creates a new instance of a photographer profile, which is then displayed on the page. */
class PhotographerProfile {
    /**
     * It's a constructor that creates a new object with the given parameters and returns it.
     * @param name - string
     * @param location - "Paris"
     * @param slogan - "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl
     * eget congue congue, nisl nisi porta nisl, eget tincidunt nisl nisi eget n
     * @param image - the name of the image file (e.g. "image.jpg")
     */
    /* It's a constructor that creates a new object with the given parameters and returns it. */
    constructor(name, location, slogan, image) {
        this.name = name;
        this.location = location;
        this.slogan = slogan;
        this.image = image;

        /* It's a variable that stores the element with the class "photograph-header" in the DOM. */
        const photographHeader = document.querySelector(".photograph-header");

        /* It creates a new div element and stores it in the variable photographInformations. */
        const photographInformations = document.createElement("div");
        /* It adds the class "photograph-informations" to the element stored in the variable
        photographInformations. */
        photographInformations.classList.add('photograph-informations');


        /* It creates a new h3 element and stores it in the variable photographName. */
        const photographName = document.createElement('h3');
        /* It adds the class "photograph-name" to the element stored in the variable photographName. */
        photographName.classList.add('photograph-name');
        /* It's setting the text content of the element stored in the variable photographName to the
        value of the property name of the object stored in the variable this. */
        photographName.textContent = this.name;


        /* It creates a new p element and stores it in the variable photographLocation. */
        const photographLocation = document.createElement("p");
        /* It adds the class "photograph-location" to the element stored in the variable
        photographLocation. */
        photographLocation.classList.add('photograph-location');
        /* It's setting the text content of the element stored in the variable photographLocation to the
        value of the property location of the object stored in the variable this. */
        photographLocation.textContent = this.location;


        /* It creates a new p element and stores it in the variable photographSlogan. */
        const photographSlogan = document.createElement('p');
        /* It adds the class "photograph-slogan" to the element stored in the variable
        photographSlogan. */
        photographSlogan.classList.add('photograph-slogan');
        /* It's setting the text content of the element stored in the variable photographSlogan to the
        value of the property slogan of the object stored in the variable this. */
        photographSlogan.textContent = this.slogan;


        /* It creates a new img element and stores it in the variable photographPicture. */
        const photographPicture = document.createElement('img');
        /* It adds the class "photograph-picture" to the element stored in the variable
        photographPicture. */
        photographPicture.classList.add('photograph-picture');
        /* It's setting the src attribute of the element stored in the variable photographPicture to
        the value of the property image of the object stored in the variable this. */
        photographPicture.setAttribute('src', `./assets/photographers/${this.image}`);
        /* It's setting the alt attribute of the element stored in the variable photographPicture to
        the value of the property name of the object stored in the variable this. */
        photographPicture.setAttribute('alt', `Photo de profil de ${this.name}`);


        /* It's adding the element stored in the variable photographInformations as the first child of
        the element stored in the variable photographHeader. */
        photographHeader.prepend(photographInformations);
        /* It's adding the element stored in the variable photographPicture as the last child of the
        element stored in the variable photographHeader. */
        photographHeader.appendChild(photographPicture);
        /* It's adding the element stored in the variable photographName as the last child of the
        element stored in the variable photographInformations. */
        photographInformations.appendChild(photographName);
        /* It's adding the element stored in the variable photographLocation after the element stored in
        the variable photographName. */
        photographName.after(photographLocation);
        /* It's adding the element stored in the variable photographSlogan after the element stored in
        the variable photographLocation. */
        photographLocation.after(photographSlogan);
    }
}

/**
 * It fetches the photographer's data from the JSON file and returns it.
 * @returns The photographer object.
 */
/**
 * It fetches a photographer from the database, and then returns the photographer's name and the
 * photographer's image.
 */
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



//  ça affiche la carte du profil de la photographie.
const displayProfileData = async (photograph) => {
    const profileSection = document.querySelector('.photograph_page');
    // eslint-disable-next-line no-undef
    const photographModel = photographFactory(photograph);
    const profileCardDOM = photographModel.getProfileCardDOM();

    const contactButton = document.querySelector('.contact_button');
    const closeModalButton = document.getElementById('close_modal');

    const elementsListened = [contactButton, closeModalButton];
    elementsListened.forEach((element) => {
        // eslint-disable-next-line
        element.addEventListener('click', toggleModal)
    });

    profileSection.prepend(profileCardDOM);
};




// Afficher le contenu d'une photo
// const displayPhotographContent = async (photograph) => {
//     const photographMedias = document.querySelector('.photograph_medias');
//     const { medias } = await getMedias(photograph);
//     let tabIndex = 0;

//     const filter = document.getElementById('filterSelector');
//     let filterValue = filter.value;

//     medias
//         .sort((a, b) => b.likes - a.likes)
//         .forEach(async (media) => {
//             tabIndex = tabIndex + 1;

//             media.photographerName = photograph.name;
//             media.tabIndex = tabIndex;

//             // eslint-disable-next-line no-undef
//             const mediaModel = photographFactory(media);
//             const mediaCardDOM = await mediaModel.getMediaCardDOM();
//             photographMedias.appendChild(mediaCardDOM);
//         });

//     updateTotalLikes(medias, photograph.price);

//     /* A callback function that is called when the value of the filter changes. */
//     filter.addEventListener('change', (event) => {
//         tabIndex = 0;
//         filterValue = event.currentTarget.value;

//         photographMedias.innerHTML = '';
//         medias.sort((a, b) => filterValue === 'popularity' ? b.likes - a.likes : filterValue === 'date' ? new Date(b.date) - new Date(a.date) : filterValue === 'title' ? b.title < a.title : b > a)
//             .forEach(async (media) => {
//                 tabIndex = tabIndex + 1;

//                 media.photographerName = photograph.name;
//                 media.tabIndex = tabIndex;

//                 // eslint-disable-next-line no-undef
//                 const mediaModel = photographFactory(media);
//                 const mediaCardDOM = await mediaModel.getMediaCardDOM();
//                 photographMedias.appendChild(mediaCardDOM);
//             });
//         updateTotalLikes(medias, photograph.price);
//     });
// };

// const updateTotalLikes = async (medias, price) => {
//     let likes = 0;

//     /* Adding the likes of each media to the total likes of the photograph. */
//     medias.map((media) => (likes = likes + media.likes));

//     const statsLikes = document.querySelector('.photograph_stats_likes');
//     statsLikes.innerText = `${likes.toString()} \u2764`;
//     const statsPrice = document.querySelector('.photograph_stats_price');
//     statsPrice.innerText = `${price.toString()}€ / heure`;

//     const mediasContainer = document.querySelector('.photograph_medias');
//     /* Adding the event listener to the `photograph_medias` element. */
//     mediasContainer.addEventListener('click', (event) => {
//         if (event.target.classList.contains('photograph_media_informations_likes_button')) {
//             likes = likes + 1;
//             statsLikes.innerText = `${likes} \u2764`;
//         }
//         if (event.target.classList.contains('photograph_media_picture')) {
//             const selectedMedia = event.target.parentNode.attributes.tabIndex.value - 1;
//             // eslint-disable-next-line no-undef
//             displayLightbox(medias, selectedMedia || 0);
//         }
//     });

//     mediasContainer.addEventListener('keydown', (event) => {
//         const keyPressed = event.key;
//         /* Checking if the key pressed is the spacebar or the enter key. If it is, then it will get the
//         tabIndex of the selected media and subtract 1 from it. Then it will display the lightbox with
//         the selected media. */
//         if (keyPressed === ' ' || keyPressed === 'Enter') {
//             const selectedMedia = event.target.attributes.tabIndex.value - 1;
//             // eslint-disable-next-line no-undef
//             displayLightbox(medias, selectedMedia || 0);
//         }
//     });
// }

class MediaList {
    constructor() {
        this.medias = []

        this.add = ({ photographerName, media }) => {
            const source = `assets/${photographerName.split(" ")[0]}/media`
            this.medias.push({ source: source, photographerName: photographerName, media: media });
            return true;
        }

        this.retreive = () => {
            return this.medias;
        }
    }

}

const displayMedias = async (photographer, medias) => {
    const mediaList = new MediaList();

    console.log(photographer);
    console.log(medias);

    mediaList.add({ photographerName: photographer.name, media: medias[0] });

    console.log(mediaList.retreive());
}

/**
 * An async function that is called when the page loads.
 */
const init = async () => {
    /* On obtient l'identifiant du photographe à partir de l'URL. */
    const photographer = await fetchPhotographer();

    /* It's creating a new instance of the class PhotographerProfile with the parameters
    photographer.name, photographer.city, photographer.country, photographer.tagline and
    photographer.portrait. */
    /* Le mot clé ci-dessous "new" nous permet d'instancier un nouvel objet =>
    en faite ça veut dire que l'on va  créer un nouvel objet à partir de ma fonction
     ou de ma classe.
    */
    const photographerProfile = new PhotographerProfile(photographer.name, `${photographer.city}, ${photographer.country}`, photographer.tagline, photographer.portrait);


    const medias = await getMedias(photographer);

    await displayMedias(photographer, medias);
}

/* It's calling the function init. */
init();
