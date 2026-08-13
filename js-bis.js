/*
    ----------------------------------------
    © Arnaud Aublet, Guillaume Pannetier
    ----------------------------------------
*/

/*
    =========================================
                    Hamburger
    =========================================
*/

const hamburgerToggler = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

function closeNav() {
    hamburgerToggler.classList.remove("open");
    nav.classList.remove("open");
    hamburgerToggler.setAttribute("aria-expanded", "false");
}

function openNav() {
    hamburgerToggler.classList.toggle("open");
    hamburgerToggler.setAttribute("aria-expanded", "true");

    nav.classList.toggle("open")
}

hamburgerToggler.addEventListener("click", openNav);

document.querySelectorAll("nav .bouton").forEach(link => {
    link.addEventListener("click", closeNav);
});

window.addEventListener("scroll", () => {
    if (nav.classList.contains("open")) {
        closeNav();
    }
});