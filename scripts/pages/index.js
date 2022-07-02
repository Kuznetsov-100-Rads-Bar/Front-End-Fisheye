/* eslint-disable import/extensions */
/* eslint-disable max-len */
import photographerFactory from '../factories/photographer.js';
/**
 * Il récupère le fichier JSON, puis renvoie le tableau des photographes
 * @returns La fonction getPhotographers renvoie un objet avec une propriété photographes.
 */
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  // Renommer ma constante en data ()
  const data = await fetch('data/photographers.json').then((result) => result.json());
  // et bien retourner le tableau photographers seulement une fois
  // console.log(data);
  return {
    photographers: [...data.photographers],
  };
}

/* Creating a function called displayData that takes a parameter called photographers. */
async function displayData(photographers) {
  /* Selecting the element with the class photographer_section. */
  const photographersSection = document.querySelector('.photographer_section');

  /* Une boucle forEach qui parcourt le tableau des photographes et appelle la fonction
  photographeFactory() avec chaque objet photographe comme argument. Il appelle alors la fonction
  getUserCardDOM() sur le résultat de photographeFactory() et ajoute le résultat à l'élément avec
  la classe photographe_section. */
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * La fonction init() est une fonction asynchrone qui appelle la fonction getPhotographers() puis
 * appelle la fonction displayData() avec le résultat de getPhotographers() comme argument.
 */
/**
 * Nous allons récupérer les données de l'API, puis les afficher sur la page.
 */
async function init() {
  // On récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

/* Appel de la fonction init() */
init();
