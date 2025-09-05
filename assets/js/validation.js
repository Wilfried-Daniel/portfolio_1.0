// On attend que tout le contenu de la page soit chargé avant d'exécuter le script.
document.addEventListener('DOMContentLoaded', () => {

    // --- On sélectionne les éléments du formulaire dont on a besoin ---
    const form = document.getElementById('contact-form'); // Le formulaire lui-même, grâce à son ID.
    const nomInput = document.getElementById('nom'); // Le champ de saisie pour le nom.
    const emailInput = document.getElementById('email'); // Le champ de saisie pour l'email.
    const messageInput = document.getElementById('message'); // Le champ de saisie pour le message.

    // --- On sélectionne les éléments où afficher les messages d'erreur et de statut ---
    const nomError = document.getElementById('nom-error'); // Le paragraphe pour l'erreur du nom.
    const emailError = document.getElementById('email-error'); // Le paragraphe pour l'erreur de l'email.
    const messageError = document.getElementById('message-error'); // Le paragraphe pour l'erreur du message.
    const formStatus = document.getElementById('form-status'); // Le div pour afficher si l'envoi a réussi ou échoué.
    const submitButton = form.querySelector('button[type="submit"]'); // Le bouton d'envoi.

    // On ajoute un "écouteur d'événement" sur le formulaire.
    // Il va déclencher une fonction chaque fois que l'utilisateur essaie de l'envoyer (clic sur le bouton).
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // --- PARTIE 1 : VALIDATION DES CHAMPS ---

        // On réinitialise les messages d'erreur à chaque tentative d'envoi.
        nomError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        formStatus.textContent = '';

        // On part du principe que le formulaire est valide.
        // Si on trouve une seule erreur, cette variable passera à `false`.
        let isValid = true;

        // Validation du nom : on vérifie si le champ est vide (après avoir retiré les espaces).
        if (nomInput.value.trim() === '') {
            nomError.textContent = 'Veuillez entrer votre nom.';
            isValid = false; // Le formulaire n'est pas valide.
        }

        // Validation de l'email : on vérifie si le champ est vide.
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Une adresse email est requise.';
            isValid = false; // Le formulaire n'est pas valide.
        }
        // Si l'email n'est pas vide, on vérifie son format avec une expression régulière.
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            emailError.textContent = "Le format de l'email est invalide.";
            isValid = false; // Le formulaire n'est pas valide.
        }

        // Validation du message : on vérifie si le champ est vide.
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'N\'oubliez pas votre message.';
            isValid = false; // Le formulaire n'est pas valide.
        }

        // --- PARTIE 2 : ENVOI AVEC EMAILJS (uniquement si la validation est réussie) ---

        // On exécute ce bloc de code seulement si la variable `isValid` est restée `true`.
        if (isValid) {

            // On affiche un message pour faire patienter l'utilisateur.
            formStatus.classList.remove('hidden');
            formStatus.textContent = 'Envoi en cours...';
            formStatus.style.color = 'blue';
            // On désactive le bouton pour éviter les clics multiples.
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi...';

            // On prépare les paramètres pour EmailJS.
            // Les noms des propriétés (nom, email, message) DOIVENT correspondre
            // aux variables que vous avez mises dans votre template EmailJS : {{nom}}, {{email}}, etc.
            const templateParams = {
                nom: nomInput.value,
                email: emailInput.value,
                message: messageInput.value
            };

            // 🚀 C'est ici que la magie opère !
            // On appelle la fonction `send` d'EmailJS.
            emailjs.send(
                'service_4x3wh8q',      // Remplacez par votre Service ID
                'template_byq37il',     // Remplacez par votre Template ID
                templateParams,
                'KPSPNlIu9hIkORtAU'       // Remplacez par votre Public Key
            )
                .then(function (response) {
                    // Cette partie `.then()` s'exécute si l'email a été envoyé avec succès.
                    console.log('SUCCÈS!', response.status, response.text);
                    formStatus.textContent = 'Message envoyé avec succès !';
                    formStatus.style.color = 'green';
                    setTimeout(() => {
                        formStatus.textContent = '';
                        formStatus.classList.add('hidden'); // on masque le div
                    }, 5000); // 5000 ms = 5 secondes
                    form.reset(); // On vide les champs du formulaire.
                }, function (error) {
                    // Cette partie `function(error)` s'exécute s'il y a eu une erreur.
                    console.log('ÉCHEC...', error);
                    formStatus.textContent = 'Une erreur est survenue. Veuillez réessayer.';
                    formStatus.style.color = 'red';
                })
                .finally(function () {
                    // Cette partie `.finally()` s'exécute toujours, que ce soit un succès ou un échec.
                    // On réactive le bouton pour que l'utilisateur puisse réessayer.
                    submitButton.disabled = false;
                    submitButton.textContent = 'Envoyer message';
                });

        }
    })
})