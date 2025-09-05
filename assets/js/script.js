// script pour l'animation de defilement: pour dupliquer les svg sans les faire manuellement dans le html 
document.addEventListener('DOMContentLoaded', function () {
    const anime = document.getElementById('animate');
    const originalItems = anime.innerHTML;

    // Dupliquer les éléments pour assurer la continuité parfaite
    // On duplique suffisamment de fois pour remplir l'écran et plus
    const duplications = 5; // Nombre de duplications

    for (let i = 0; i < duplications; i++) {
        anime.innerHTML += originalItems;
    }

});