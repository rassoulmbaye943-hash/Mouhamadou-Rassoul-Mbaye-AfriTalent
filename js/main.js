//commit 6
/* Dark mode */
// mettre à jour l'icone du bouton en fonction du thème
function appliquerTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  let darkIcon = document.getElementById("darkIcon");
  darkIcon.classList.toggle("bi-moon-fill", theme === "light");
  darkIcon.classList.toggle("bi-sun-fill", theme === "dark");
}
// basculer entre les thèmes
function basculerTheme() {
  let themeCourant = document.documentElement.getAttribute("data-theme");
  let nouveauTheme;
  if (themeCourant === "dark") {
    nouveauTheme = "light";
  } else {
    nouveauTheme = "dark";
  }
  // appliquer le thème et le sauvegarder dans le localStorage
  appliquerTheme(nouveauTheme);
  localStorage.setItem("theme", nouveauTheme);
}
// initialiser le thème au chargement de la page
function initialiserTheme() {
  let themeSauvegarde = localStorage.getItem("theme");
  if (themeSauvegarde) {
    appliquerTheme(themeSauvegarde);
  } else {
    appliquerTheme("light");
  }
}
initialiserTheme();
let btnDark = document.getElementById("darkToggle");
btnDark.addEventListener("click", basculerTheme);

/* Navbar dynamique au scroll */
let navbar = document.querySelector(".navbar");
function gererNavbarScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
}
window.addEventListener("scroll", gererNavbarScroll);

/* Bouton retour en haut */
let btnRetourHaut = document.getElementById("backToTop");
function gererBoutonRetourHaut() {
  if (window.scrollY > 200) {
    btnRetourHaut.classList.add("visible");
  } else {
    btnRetourHaut.classList.remove("visible");
  }
}
btnRetourHaut.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", gererBoutonRetourHaut);
// commit 7
// compteur animé au scroll
let compteurs = document.querySelectorAll(".counter");
let observateurCompteurs = new IntersectionObserver(
  (elements) => {
    elements.forEach((element) => {
      if (element.isIntersecting) {
        let compteur = element.target;
        let valeurCible = parseInt(compteur.getAttribute("data-target"));
        let valeurActuelle = 0;
        let increment = Math.ceil(valeurCible / 200);
        let intervalle = setInterval(function () {
          valeurActuelle += increment;
          if (valeurActuelle >= valeurCible) {
            compteur.textContent = "+" + valeurCible;
            // s'assurer que le compteur n'affiche pas une valeur supérieure à la cible
            clearInterval(intervalle);
          } else {
            compteur.textContent = "+" + valeurActuelle;
          }
        }, 10);
        // arrêter d'observer le compteur une fois qu'il a commencé à s'animer pour éviter de relancer l'animation si l'utilisateur fait défiler vers le haut et vers le bas
        observateurCompteurs.unobserve(compteur);
      }
    });
  },
  // le seuil de 0.5 signifie que l'animation commencera lorsque 50% du compteur sera visible dans la fenêtre
  { threshold: 0.5 },
);
// observer les compteurs pour déclencher l'animation lorsqu'ils entrent dans la fenêtre
for (let compteur of compteurs) {
  observateurCompteurs.observe(compteur);
}
/* Animations fade-in-up au scroll */
let elementsAnimer = document.querySelectorAll(".fade-in-up");

let observateurFade = new IntersectionObserver(
  (elements) => {
    elements.forEach((element, index) => {
      if (element.isIntersecting) {
        let ele = element.target;
        // ajouter un délai d'animation basé sur l'index de l'élément pour créer un effet de cascade
        ele.style.transitionDelay = index * 0.07 + "s";
        ele.classList.add("visible");
        observateurFade.unobserve(ele);
      }
    });
  },
  { threshold: 0.15 },
);
for (let ele of elementsAnimer) {
  observateurFade.observe(ele);
}
// commit 8
// Filtrage dynamique des freelances
let boutonsFiltres = document.querySelectorAll(".filter-btn");
let cartesFreelances = document.querySelectorAll(".freelance-card");
boutonsFiltres.forEach((bouton) => {
  bouton.addEventListener("click", function () {
    boutonsFiltres.forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");
    let filtre = this.getAttribute("data-filter");
    cartesFreelances.forEach((carte) => {
      // pour supprimer les cartes, on doit cibler le parent de la carte qui est le col-12, col-md-6 ou col-lg-4
      let Parent = carte.closest(".col-12, .col-md-6, .col-lg-4");
      let categorieCarte = carte.getAttribute("data-category");
      if (filtre === "all") {
        Parent.style.display = "";
      } else if (filtre === categorieCarte) {
        Parent.style.display = "";
      } else {
        Parent.style.display = "none";
      }
    });
  });
});
// Filtrage dynamique du blog
let boutonsBlogFiltres = document.querySelectorAll(".blog-filter-btn");
let cartesBlog = document.querySelectorAll(".blog-post-wrapper");
boutonsBlogFiltres.forEach((btn) => {
  btn.addEventListener("click", function () {
    boutonsBlogFiltres.forEach((bt) => {
      bt.classList.remove("active");
    });
    this.classList.add("active");
    let filtre = this.getAttribute("data-blog-filter");
    cartesBlog.forEach((carte) => {
      let catArticle = carte.getAttribute("data-blog-cat");
      if (filtre === "all") {
        carte.style.display = "";
      } else if (filtre === catArticle) {
        carte.style.display = "";
      } else {
        carte.style.display = "none";
      }
    });
  });
});
//Validation du formulaire
// pour afficher l'erreur et le message d'erreur associé au champ
function afficherErreur(champ, message) {
  champ.classList.add("is-invalid");
  champ.classList.remove("is-valid");
  const erreur = champ.parentElement.querySelector(".field-error");
  erreur.textContent = message;
  erreur.classList.add("show");
}
// pour afficher que le champ est valide et supprimer le message d'erreur associé au champ
function afficherValide(champ) {
  champ.classList.remove("is-invalid");
  champ.classList.add("is-valid");
  const erreur = champ.parentElement.querySelector(".field-error");
  erreur.textContent = "";
  erreur.classList.remove("show");
}
// pour valider le nom
function validerNom() {
  const champNom = document.getElementById("nom");
  // si le champ est vide, afficher un message d'erreur et retourner false
  if (!champNom.value.trim()) {
    afficherErreur(champNom, "Veuillez saisir votre nom.");
    return false;
  }
  afficherValide(champNom);
  return true;
}
// pour valider le prénom
function validerPrenom() {
  const champPrenom = document.getElementById("prenom");
  // si le champ est vide, afficher un message d'erreur et retourner false
  if (!champPrenom.value.trim()) {
    afficherErreur(champPrenom, "Veuillez saisir votre prénom.");
    return false;
  }
  afficherValide(champPrenom);
  return true;
}
// pour valider la structure de l'email
function emailValide(email) {
  // expression de regex pour valider l'email
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
// pour valider l'email
function validerEmail() {
  const champEmail = document.getElementById("email");
  if (!champEmail.value.trim()) {
    // si l'email est vide retourne false
    afficherErreur(champEmail, "Veuillez saisir votre adresse email.");
    return false;
  }
  // si l'email n'est pas valide retourne un message et false
  if (!emailValide(champEmail.value.trim())) {
    afficherErreur(champEmail, "Format invalide. Exemple : nom@domaine.com");
    return false;
  }
  afficherValide(champEmail);
  return true;
}
// pour valider le sujet
function validerSujet() {
  const champSujet = document.getElementById("sujet");
  // si elle est vide retourne un message et false
  if (!champSujet.value) {
    afficherErreur(champSujet, "Veuillez sélectionner un sujet.");
    return false;
  }
  afficherValide(champSujet);
  return true;
}
// pour valider le message
function validerMessage() {
  const champMessage = document.getElementById("message");
  const texteMessage = champMessage.value.trim();
  // si le champ est vide retourne un message et false
  if (!texteMessage) {
    afficherErreur(champMessage, "Veuillez saisir votre message.");
    return false;
  }
  // si le message est cout retourne un message et false
  if (texteMessage.length < 20) {
    afficherErreur(champMessage, "Message trop court.");
    return false;
  }
  afficherValide(champMessage);
  return true;
}
// retourne True si toutes les champs ont retournés true sinon false
function validerFormulaire() {
  let valide = true;
  if (!validerNom()) valide = false;
  if (!validerPrenom()) valide = false;
  if (!validerEmail()) valide = false;
  if (!validerSujet()) valide = false;
  if (!validerMessage()) valide = false;
  return valide;
}
// pour bloquer le fonctionnement de submit
const formulaireContact = document.getElementById("contactForm");
formulaireContact.addEventListener("submit", (e) => {
  e.preventDefault();
  // ajouter le message de succés si validerFormulaire retourne True
  if (validerFormulaire()) {
    const msgSucces = document.getElementById("successMsg");
    msgSucces.classList.add("show");
    msgSucces.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    // pour réinitialiser le formulaire sans raffraichir
    setTimeout(() => {
      formulaireContact.reset();
      formulaireContact
        .querySelectorAll(".form-control, .form-select")
        .forEach((champ) => champ.classList.remove("is-valid", "is-invalid"));
      msgSucces.classList.remove("show");
    }, 3000);
  }
});
// annee dynamique
let date = document.getElementById("year");
date.textContent = new Date().getFullYear();
