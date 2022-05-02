function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  // pour récupérer les données nécessaires (id, tagline, city, etc..)
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const link = document.createElement("a");
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
  return { name, picture, getUserCardDOM };
}
