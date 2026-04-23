document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const loginText = document.querySelector(".Login_text");
  const icon = document.querySelector(".icon_LG img");

  if (usuario && loginText) {
    loginText.textContent = usuario.Nome;
    loginText.href = "Usuario.html";

    if (icon) {
      icon.src = "icons/profile.png";
    }
  }
});