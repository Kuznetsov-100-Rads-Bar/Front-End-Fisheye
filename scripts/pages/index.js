import { photographerFactory } from "../factories/photographer.js";
/**
 * It fetches the JSON file, then returns the photographers array
 * @returns The function getPhotographers is returning an object with a property photographers.
 */
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  // Renommer ma constante en data ()
  const data = await fetch("data/photographers.json").then((result) =>
    result.json()
  );
  // et bien retourner le tableau photographers seulement une fois
  // console.log(data);
  return {
    photographers: [...data.photographers],
  };
}

/* Creating a function called displayData that takes a parameter called photographers. */
async function displayData(photographers) {
  /* Selecting the element with the class photographer_section. */
  const photographersSection = document.querySelector(".photographer_section");

  /* A forEach loop that loops through the photographers array and calls the function
  photographerFactory() with each photographer object as an argument. It then calls the function
  getUserCardDOM() on the result of photographerFactory() and appends the result to the element with
  the class photographer_section. */
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * The function init() is an asynchronous function that calls the function getPhotographers() and then
 * calls the function displayData() with the result of getPhotographers() as an argument.
 */
async function init() {
  // On récupère les datas des photographes
  const { photographers } = await getPhotographers();
  /* Calling the function displayData() with the result of getPhotographers() as an argument. */
  displayData(photographers);
}

init();
