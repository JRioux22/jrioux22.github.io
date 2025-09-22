document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  const showError = (input, message) => {
    const error = input.nextElementSibling; // le <small>
    if (error) {
      error.textContent = message;
    }
    input.classList.add("border-red-600");
  };

  const clearError = (input) => {
    const error = input.nextElementSibling;
    if (error) {
      error.textContent = "";
    }
    input.classList.remove("border-red-600");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const adresse = document.getElementById("adresse");
    const postal = document.getElementById("postal");
    const provinceInput = document.getElementById("province");

    if (nom.value.trim().length < 2) {
      showError(nom, "Le nom doit comporter au moins 2 caractères.");
      valid = false;
    } else clearError(nom);

    if (prenom.value.trim().length < 2) {
      showError(prenom, "Le prénom doit comporter au moins 2 caractères.");
      valid = false;
    } else clearError(prenom);

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value.trim())) {
      showError(email, "L'email est invalide.");
      valid = false;
    } else clearError(email);

    const regexPhone = /^[0-9\s\-\+]{8,15}$/;
    if (!regexPhone.test(phone.value.trim())) {
      showError(phone, "Le numéro de téléphone est invalide.");
      valid = false;
    } else clearError(phone);

    if (adresse.value.trim().length < 5) {
      showError(adresse, "L'adresse est trop courte.");
      valid = false;
    } else clearError(adresse);

    const regexPostal = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!regexPostal.test(postal.value.trim())) {
      showError(postal, "Le code postal est invalide (ex : A1A 1A1).");
      valid = false;
    } else clearError(postal);

    if (!provinceInput.value.trim()) {
      showError(provinceInput, "Veuillez choisir une province.");
      valid = false;
    } else clearError(provinceInput);

    const paiementChecked = form.querySelector(
      'input[name="paiement"]:checked'
    );
    const paiementError = form
      .querySelector('fieldset input[name="paiement"]')
      .closest("fieldset")
      .querySelector(".error-msg");

    if (!paiementChecked) {
      paiementError.textContent = "Veuillez choisir une méthode de paiement.";
      valid = false;
    } else paiementError.textContent = "";

    const livraisonChecked = form.querySelector(
      'input[name="livraison"]:checked'
    );
    const livraisonError = form
      .querySelector('fieldset input[name="livraison"]')
      .closest("fieldset")
      .querySelector(".error-msg");
    if (!livraisonChecked) {
      livraisonError.textContent = "Veuillez choisir un mode de livraison.";
      valid = false;
    } else livraisonError.textContent = "";

    if (valid) {
      form.submit();
    }
  });
});
