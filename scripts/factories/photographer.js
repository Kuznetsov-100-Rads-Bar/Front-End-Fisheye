/* eslint-disable max-len */
/**
 * It takes a photographer object as an argument and returns a new object with the properties name,
 * picture, and getUserCardDOM.
 * @param data - {
 * @returns The function getUserCardDOM() is being returned.
 */
/* Il prend un objet photographe comme argument et renvoie un nouvel objet avec le nom des propriétés,
image et getUserCardDOM. */
// Fonction factory pour l'affichage de la page d'accueil
export default (data) => {
  /* Déstructuration de l'objet de données. */
  const {
    name,
    portrait,
    city,
    country,
    tagline,
    price,
    id,
  } = data;

  /* Créer une nouvelle variable appelée image et lui attribuer la valeur de la propriété portrait du
objet de données. */
  // pour récupérer les données nécessaires (id, tagline, city, etc..)
  const picture = `assets/photographers/${portrait}`;

  /* Créer une fonction qui renverra un lien. */
  function getUserCardDOM() {
    /* Il crée un élément de lien `a`. */
    const link = document.createElement('a');

    /* Création d'un lien vers la page photographe.html. */
    link.setAttribute(
      'href',
      `${window.location}photographer.html?id=${id}`,
    );
    /* Il crée un élément article. */
    const article = document.createElement('article');

    /* Il crée un élément d'image. */
    const img = document.createElement('img');

    /* On définie l'attribut src de l'élément img sur la valeur de la variable image. */
    img.setAttribute('src', picture);
    /* Il crée un élément h2. */
    const h2 = document.createElement('h2');
    /* On définie la propriété margin-bottom de l'élément h2 sur 4px. */
    h2.style.marginBottom = '4px';
    /* Définition du contenu textuel de l'élément h2 sur la valeur de la variable name. */
    h2.textContent = name;

    /* Il crée un élément de paragraphe. */
    const location = document.createElement('p');
    /* Définition du contenu textuel de l'élément de localisation sur la valeur des variables country et city. */
    location.textContent = `${country}, ${city}`;
    /* Définir la couleur de l'emplacement sur un rouge foncé. */
    location.style.color = '#901C1C';
    /* Il définit la taille de la police de l'emplacement à 16px. */
    location.style.fontSize = '16px';
    /* Il définit la marge de l'élément de localisation à 0. */
    location.style.margin = '0';

    /* Il crée un élément de paragraphe et définit le contenu du texte sur la valeur de la variable tagline.
    Il définit la couleur du slogan sur noir, la taille de la police sur 13px et la marge sur 0. */
    const slogan = document.createElement('p');
    slogan.textContent = `${tagline}`;
    slogan.style.color = '#000000';
    slogan.style.fontSize = '13px';
    slogan.style.margin = '0';

    /* Il crée un élément de paragraphe et définit le contenu du texte sur la valeur de la variable de `prix`. Cela
    définit la couleur du prix sur un gris foncé, la taille de la police sur 12 pixels et la marge sur 0. */
    const photographerPrice = document.createElement('p');
    photographerPrice.textContent = `${price}€/jour`;
    photographerPrice.style.color = '#757575';
    photographerPrice.style.fontSize = '12px';
    photographerPrice.style.margin = '0';

    /* Il ajoute l'élément article à l'élément lien. */
    link.appendChild(article);
    /* Il ajoute l'élément img à l'élément article. */
    article.appendChild(img);
    /* Il ajoute l'élément h2 à l'élément article. */
    article.appendChild(h2);
    /* Il ajoute l'élément location à l'élément article. */
    article.appendChild(location);
    /* Il ajoute l'élément slogan à l'élément article. */
    article.appendChild(slogan);
    /* Il ajoute l'élément photographePrice à l'élément article. */
    article.appendChild(photographerPrice);
    /* Il renvoie l'élément: lien. */
    return link;
  }
  /* Renvoi du nom, de l'image et des propriétés getUserCardDOM. */
  return { name, picture, getUserCardDOM };
};
