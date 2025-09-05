// pour activer et desactiver le dark mode via son bouton 
const mobtoggle = document.querySelector("#mobile-dark-toggle");

// Charger la préférence
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  mobtoggle.checked = true;
}

mobtoggle.addEventListener("change", () => {
  if (mobtoggle.checked) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});