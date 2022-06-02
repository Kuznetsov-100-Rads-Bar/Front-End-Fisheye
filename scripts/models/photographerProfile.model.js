/* It creates a new instance of a photographer profile, which is then displayed on the page. */
export class PhotographerProfile {
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
    }

    display = () => {
        const formHeaderTitle = document.getElementById("formHeaderTitle");
        formHeaderTitle.innerHTML = `${formHeaderTitle.textContent} <br/>${this.name}`;
        formHeaderTitle.style.textAlign = 'left';
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

        return photographHeader;
    }
}