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
