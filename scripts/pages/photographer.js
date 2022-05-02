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
    constructor(name, location, slogan, image) {
        this.name = name;
        this.location = location;
        this.slogan = slogan;
        this.image = image;

        const photographHeader = document.querySelector(".photograph-header");

        const photographInformations = document.createElement("div");
        photographInformations.classList.add('photograph-informations');

        const photographName = document.createElement('h3');
        photographName.classList.add('photograph-name');
        photographName.textContent = this.name;

        const photographLocation = document.createElement("p");
        photographLocation.classList.add('photograph-location');
        photographLocation.textContent = this.location;

        const photographSlogan = document.createElement('p');
        photographSlogan.classList.add('photograph-slogan');
        photographSlogan.textContent = this.slogan;

        const photographPicture = document.createElement('img');
        photographPicture.classList.add('photograph-picture');
        photographPicture.setAttribute('src', `./assets/photographers/${this.image}`);
        photographPicture.setAttribute('alt', `Photo de profil de ${this.name}`);

        photographHeader.prepend(photographInformations);
        photographHeader.appendChild(photographPicture);
        photographInformations.appendChild(photographName);
        photographName.after(photographLocation);
        photographLocation.after(photographSlogan);
    }
}

/**
 * It fetches the photographer's data from the JSON file and returns it.
 * @returns The photographer object.
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

const init = async () => {
    const photographer = await fetchPhotographer();

    const photographerProfile = new PhotographerProfile(photographer.name, `${photographer.city}, ${photographer.country}`, photographer.tagline, photographer.portrait);

    // setInterval(() => {
    //     photographerProfile.edit("Photographe bien")
    //     setInterval(() => {
    //         photographerProfile.edit(photographer.name)
    //     }, 2000);
    // }, 2000);


    // console.log(photographer)
}

init();