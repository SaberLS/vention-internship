const form = document.querySelector(".newsletter-form");

const dialog = document.querySelector("#success-dialog");
const closeButton = document.querySelector("#close-dialog");

const dialogName = document.querySelector("#dialog-name");
const dialogEmail = document.querySelector("#dialog-email");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);

  dialogName.textContent = formData.get("firstName");
  dialogEmail.textContent = formData.get("email");

  dialog.showModal();

  form.reset();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
