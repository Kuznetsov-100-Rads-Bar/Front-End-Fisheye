function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    // pour récupérer les données nécessaires (id, tagline, city, etc..)
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {


        const article = document.createElement('article');

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}