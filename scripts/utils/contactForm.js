/* eslint-disable max-len */
/**
 * Lorsque le modal est affiché, le bouton de fermeture est focalisé. Si l'utilisateur appuie sur la touche de tabulation, le focus
 passera au bouton Soumettre. Si l'utilisateur appuie sur la touche Entrée alors que le bouton Soumettre est
 focalisé, le focus reviendra au bouton de fermeture.
 */
/* Une fonction qui affiche le modal. */
function displayModal() {
  const modal = document.getElementById('contact_modal');
  const closeBtn = document.querySelector('#closeForm');
  const submitBtn = document.querySelectorAll('.contact_button')[1];

  modal.style.display = 'block';
  closeBtn.focus();

  /* Écoute d'un événement keydown sur le modal. Si l'élément actif est le bouton d'envoi, il
  empêcher l'action par défaut et se concentrer sur le bouton de fermeture. */
  modal.addEventListener('keydown', (e) => {
    if (document.activeElement === submitBtn) {
      e.preventDefault();
      closeBtn.focus();
    }
  });
}

/* Fermeture du modal. */
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

const closeFormButton = document.getElementById('closeForm');
closeFormButton.addEventListener('click', closeModal);

const openFormButton = document.getElementById('openFormButton');
openFormButton.addEventListener('click', displayModal);

// Je selectionne et je stocke tous les éléments nécessaires.
const form = document.getElementById('formContact');

const lastName = document.getElementById('lastName');
const firstName = document.getElementById('firstName');
const email = document.getElementById('email');
const message = document.getElementById('message');

/* Une fonction qui empêche l'action par défaut du formulaire et affiche les valeurs du formulaire dans la
console. */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-console
  console.log({
    lastName: lastName.value,
    firstName: firstName.value,
    email: email.value,
    message: message.value,
  });

  lastName.value = '';
  firstName.value = '';
  email.value = '';
  message.value = '';
});
