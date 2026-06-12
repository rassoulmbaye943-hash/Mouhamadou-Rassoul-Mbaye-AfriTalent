//commit 6
/* Dark mode */
function appliquerTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  let darkIcon = document.getElementById("darkIcon");
  darkIcon.classList.toggle("bi-moon-fill", theme === "light");
  darkIcon.classList.toggle("bi-sun-fill", theme === "dark");
}
function basculerTheme() {
  let themeCourant = document.documentElement.getAttribute("data-theme");
  let nouveauTheme;
  if (themeCourant === "dark") {
    nouveauTheme = "light";
  } else {
    nouveauTheme = "dark";
  }
  appliquerTheme(nouveauTheme);
  localStorage.setItem("theme", nouveauTheme);
}
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
if (btnDark) btnDark.addEventListener("click", basculerTheme);

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
if (btnRetourHaut) {
  btnRetourHaut.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
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
            clearInterval(intervalle);
          } else {
            compteur.textContent = "+" + valeurActuelle;
          }
        }, 10);
        observateurCompteurs.unobserve(compteur);
      }
    });
  },
  { threshold: 0.5 },
);
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
function afficherErreur(champ, message) {
  champ.classList.add("is-invalid");
  champ.classList.remove("is-valid");
  const erreur = champ.parentElement.querySelector(".field-error");
  erreur.textContent = message;
  erreur.classList.add("show");
}
function afficherValide(champ) {
  champ.classList.remove("is-invalid");
  champ.classList.add("is-valid");
  const erreur = champ.parentElement.querySelector(".field-error");
  erreur.textContent = "";
  erreur.classList.remove("show");
}
function validerNom() {
  const champNom = document.getElementById("nom");
  if (!champNom.value.trim()) {
    afficherErreur(champNom, "Veuillez saisir votre nom.");
    return false;
  }
  afficherValide(champNom);
  return true;
}
function validerPrenom() {
  const champPrenom = document.getElementById("prenom");
  if (!champPrenom.value.trim()) {
    afficherErreur(champPrenom, "Veuillez saisir votre prénom.");
    return false;
  }
  afficherValide(champPrenom);
  return true;
}
function emailValide(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
function validerEmail() {
  const champEmail = document.getElementById("email");
  if (!champEmail.value.trim()) {
    afficherErreur(champEmail, "Veuillez saisir votre adresse email.");
    return false;
  }
  if (!emailValide(champEmail.value.trim())) {
    afficherErreur(champEmail, "Format invalide. Exemple : nom@domaine.com");
    return false;
  }
  afficherValide(champEmail);
  return true;
}
function validerSujet() {
  const champSujet = document.getElementById("sujet");
  if (!champSujet.value) {
    afficherErreur(champSujet, "Veuillez sélectionner un sujet.");
    return false;
  }
  afficherValide(champSujet);
  return true;
}
function validerMessage() {
  const champMessage = document.getElementById("message");
  const texteMessage = champMessage.value.trim();
  if (!texteMessage) {
    afficherErreur(champMessage, "Veuillez saisir votre message.");
    return false;
  }
  if (texteMessage.length < 20) {
    afficherErreur(champMessage, "Message trop court.");
    return false;
  }
  afficherValide(champMessage);
  return true;
}
function validerFormulaire() {
  let valide = true;
  if (!validerNom()) valide = false;
  if (!validerPrenom()) valide = false;
  if (!validerEmail()) valide = false;
  if (!validerSujet()) valide = false;
  if (!validerMessage()) valide = false;
  return valide;
}
const formulaireContact = document.getElementById("contactForm");
formulaireContact.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validerFormulaire()) {
    const msgSucces = document.getElementById("successMsg");
    msgSucces.classList.add("show");
    msgSucces.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
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
