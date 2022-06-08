function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const closeFormButton = document.getElementById("closeForm");
closeFormButton.addEventListener("click", closeModal);

const openFormButton = document.getElementById("openFormButton");
openFormButton.addEventListener("click", displayModal);

// Je selectionne et je stocke tous les éléments nécessaires.
const form = document.getElementById("formContact");

const lastName = document.getElementById("lastName");
const firstName = document.getElementById("firstName");
const email = document.getElementById("email");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log({
        lastName: lastName.value,
        firstName: firstName.value,
        email: email.value,
        message: message.value
    });

    lastName.value = "";
    firstName.value = "";
    email.value = "";
    message.value = "";
})
