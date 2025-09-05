const mobileBtn = document.getElementById('mobile');
const mobileMenu = document.getElementById('list-mobile');

// ouverture/fermeture avec le bouton fa-bars
mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});