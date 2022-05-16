/**
 * It takes a photographer object as an argument and returns a new object with the properties name,
 * picture, and getUserCardDOM.
 * @param data - {
 * @returns The function getUserCardDOM() is being returned.
 */
/* It takes a photographer object as an argument and returns a new object with the properties name,
picture, and getUserCardDOM. */
//Fonction factory pour l'affichage de la page d'accueil
function photographerFactory(data) {
  /* Destructuring the data object. */
  const { name, portrait, city, country, tagline, price, id } = data;
  /* Creating a new variable called picture and assigning it the value of the portrait property of the
data object. */
  // pour récupérer les données nécessaires (id, tagline, city, etc..)
  const picture = `assets/photographers/${portrait}`;

  /* Creating a function that will return a link. */
  function getUserCardDOM() {
    /* It creates a link element. */
    const link = document.createElement("a");

    /* Création d'un lien vers la page photographe.html. */
    link.setAttribute(
      "href",
      window.location.origin + "/photographer.html?id=" + id
    );
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.style.marginBottom = "4px";
    h2.textContent = name;

    const location = document.createElement("p");
    location.textContent = `${country}, ${city}`;
    location.style.color = "#901C1C";
    location.style.fontSize = "16px";
    location.style.margin = "0";

    const slogan = document.createElement("p");
    slogan.textContent = `${tagline}`;
    slogan.style.color = "#000000";
    slogan.style.fontSize = "13px";
    slogan.style.margin = "0";

    const photographerPrice = document.createElement("p");
    photographerPrice.textContent = `${price}€/jour`;
    photographerPrice.style.color = "#757575";
    photographerPrice.style.fontSize = "12px";
    photographerPrice.style.margin = "0";

    link.appendChild(article);
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(slogan);
    article.appendChild(photographerPrice);
    return link;
  }
  /* Returning the name, picture, and getUserCardDOM properties. */
  return { name, picture, getUserCardDOM };
}
