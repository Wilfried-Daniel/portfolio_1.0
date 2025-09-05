// pour activer et desactiver le dark mode via son bouton 
const toggle = document.querySelector("#dark-toggle");

// Charger la préférence
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});



// pour mettre le lien active sur le menu de la page affichée 
const path = window.location.pathname.split("/").pop(); // ex: 'index.html'
const menuLinks = document.querySelectorAll('ul li a');

menuLinks.forEach(link => {
  if(link.getAttribute('href').includes(path)){
    link.parentElement.setAttribute('data-active', 'true');
  }
});