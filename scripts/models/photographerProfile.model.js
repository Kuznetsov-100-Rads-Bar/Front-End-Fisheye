/* eslint-disable max-len */
/* Il crée une nouvelle instance d'un profil de photographe, qui est ensuite affiché sur la page. */
/* Il exporte la classe à utiliser dans un autre fichier. */
export default class {
  /**
     * C'est un constructeur qui crée un nouvel objet avec les paramètres donnés et le renvoie.
     * @param name - string
     * @param location - "Paris"
     * @param slogan - "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl
     * eget congue congue, nisl nisi porta nisl, eget tincidunt nisl nisi eget n
     * @param image - the name of the image file (e.g. "image.jpg")
     */
  /* C'est un constructeur qui crée un nouvel objet avec les paramètres donnés et le renvoie. */
  constructor(name, location, slogan, image) {
    this.name = name;
    this.location = location;
    this.slogan = slogan;
    this.image = image;
  }

  /* C'est une méthode qui affiche le profil du photographe sur la page. */
  display = () => {
    const formHeaderTitle = document.getElementById('formHeaderTitle');
    formHeaderTitle.innerHTML = `${formHeaderTitle.textContent} <br/>${this.name}`;
    formHeaderTitle.style.textAlign = 'left';

    /* C'est une variable qui stocke l'élément avec la classe "photograph-header" dans le DOM. */
    const photographHeader = document.querySelector('.photograph-header');

    /* Il crée un nouvel élément div et le stocke dans la variable photographInformations. */
    const photographInformations = document.createElement('div');
    /* Il ajoute la classe "photograph-informations" à l'élément stocké dans la variable
        photographieInformations. */

    photographInformations.classList.add('photograph-informations');

    /* Il crée un nouvel élément h3 et le stocke dans la variable photographName. */
    const photographName = document.createElement('h3');

    /* Il ajoute la classe "photograph-name" à l'élément stocké dans la variable photographName. */
    photographName.classList.add('photograph-name');

    /* Il définit le contenu textuel de l'élément stocké dans la variable photographName sur le
        valeur du nom de propriété de l'objet stocké dans la variable this. */
    photographName.textContent = this.name;

    /* Il crée un nouvel élément p et le stocke dans la variable photographLocation. */
    const photographLocation = document.createElement('p');

    /* Il ajoute la classe "photograph-location" à l'élément stocké dans la variable
        photographieEmplacement. */
    photographLocation.classList.add('photograph-location');

    /* Il définit le contenu textuel de l'élément stocké dans la variable photographLocation sur le
        valeur de la propriété location de l'objet stocké dans la variable this. */
    photographLocation.textContent = this.location;

    /* Il crée un nouvel élément p et le stocke dans la variable photographSlogan. */
    const photographSlogan = document.createElement('p');

    /* Il ajoute la classe "photograph-slogan" à l'élément stocké dans la variable
        photographieSlogan. */
    photographSlogan.classList.add('photograph-slogan');

    /* Il définit le contenu textuel de l'élément stocké dans la variable photographSlogan sur
        valeur de la propriété slogan de l'objet stocké dans la variable this. */
    photographSlogan.textContent = this.slogan;

    /* Il crée un nouvel élément img et le stocke dans la variable photographPicture. */
    const photographPicture = document.createElement('img');

    /* Il ajoute la classe "photograph-picture" à l'élément stocké dans la variable
        photographieImage. */
    photographPicture.classList.add('photograph-picture');

    /* Il définit l'attribut src de l'élément stocké dans la variable photographPicture sur
        la valeur de la propriété image de l'objet stockée dans la variable this. */
    photographPicture.setAttribute('src', `./assets/photographers/${this.image}`);

    /* Il définit l'attribut alt de l'élément stocké dans la variable photographPicture sur
        la valeur du nom de propriété de l'objet stocké dans la variable this. */
    photographPicture.setAttribute('alt', `Photo de profil de ${this.name}`);

    /* C'est ajouter l'élément stocké dans la variable photographInformations comme premier enfant de
        l'élément stocké dans la variable photographHeader. */
    photographHeader.prepend(photographInformations);

    /* C'est ajouter l'élément stocké dans la variable photographPicture comme dernier enfant de la
        élément stocké dans la variable photographHeader. */
    photographHeader.appendChild(photographPicture);

    /* Il s'agit d'ajouter l'élément stocké dans la variable photographName comme dernier enfant de la
        élément stocké dans la variable photographInformations. */
    photographInformations.appendChild(photographName);

    /* C'est ajouter l'élément stocké dans la variable photographLocation après l'élément stocké dans
        la variable photoName. */
    photographName.after(photographLocation);

    /* C'est ajouter l'élément stocké dans la variable photographSlogan après l'élément stocké dans
        la variable photographieEmplacement. */
    photographLocation.after(photographSlogan);

    /* Il renvoie l'élément stocké dans la variable photographHeader. */
    return photographHeader;
  };
}
