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

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".openPdf").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        // Récupère le lien du PDF
        modalImage.src = this.getAttribute("href");

        // Ouvre la fenêtre
        imageModal.classList.add("show");
    });
});

closeBtn.addEventListener("click", e => {
    console.log("ok");
    imageModal.classList.remove("show");
    modalImage.src = "";
});

imageModal.addEventListener("click", e => {
    if (e.target === imageModal) {
        console.log("bis");
        imageModal.classList.remove("show");
        modalImage.src = "";
    }
});

const section = document.querySelector("#arbre");
const photo = document.querySelector("#photo-arbre");

function animationArbre() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    if (window.innerWidth <= 550) {
        // Téléphone : animation plus lente
        start = vh - rect.height * 0.15;
        end = vh - rect.height * 1.75;
    } else {
        // Ordinateur : comportement actuel
        start = vh - rect.height * 0.1;
        end = vh - rect.height;
    }

    let progress = (start - rect.top) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    // Interpolation de -75% à -35%
    const y = -45 + progress * 45;

    photo.style.transform = `translateX(${y}%)`;
}

window.addEventListener("scroll", animationArbre);
window.addEventListener("resize", animationArbre);

animationArbre();

const sections = document.querySelectorAll("section")
const liens = document.querySelectorAll(".bouton");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const rect = section.getBoundingClientRect();

        // La section devient active quand son haut
        // passe sous 75% du viewport
        if (rect.top <= window.innerHeight * 0.4) {
            current = section.id;
        }

    });

    liens.forEach(lien => {
        lien.classList.remove("PageActive");

        if (lien.getAttribute("href") === "#" + current) {
            lien.classList.add("PageActive");
        }

    });

});





const lignes = document.querySelectorAll(".ligne");

function animationLignes() {
    const vh = window.innerHeight;

    lignes.forEach(ligne => {
        const rect = ligne.getBoundingClientRect();

        // Début de l'animation à 95% de l'écran
        const start = vh * 0.95;

        // Fin de l'animation à 80% de l'écran
        const end = vh * 0.8;

        let progress = (start - rect.top) / (start - end);
        progress = Math.max(0, Math.min(1, progress));

        ligne.style.opacity = progress;
        ligne.style.transform = `translateY(${30 * (1 - progress)}px)`;
    });
}

window.addEventListener("scroll", animationLignes);
window.addEventListener("resize", animationLignes);
animationLignes();

const form = document.querySelector("form");
const confirmation = document.getElementById("confirmation");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const response = await fetch("/", {
        method: "POST",
        body: data
    });

    if (response.ok) {
        confirmation.style.display = "block";
        form.reset();
    } else {
        alert("Une erreur est survenue.");
    }
});