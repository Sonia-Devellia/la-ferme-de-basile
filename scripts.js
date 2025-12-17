// La Ferme de Basile - JavaScript global

document.addEventListener("DOMContentLoaded", () => {
  const boutonBurger = document.getElementById("mobileMenuBtn");
  const menuMobile = document.getElementById("mobileNavList");
  const blocDropdown = document.getElementById("dropdown");

  if (!boutonBurger || !menuMobile) return;

  // Ouvrir / fermer le menu mobile
  boutonBurger.addEventListener("click", () => {
    menuMobile.classList.toggle("active");
  });

  // Ouvrir / fermer le dropdown "Boutique" (mobile)
  if (blocDropdown) {
    const lienBoutique = blocDropdown.querySelector("a.header-lien-boutique");
    if (lienBoutique) {
      lienBoutique.addEventListener("click", (e) => {
        // Empêche d'aller sur boutique.html, on veut dérouler
        e.preventDefault();
        blocDropdown.classList.toggle("active");
      });
    }
  }

  // Fermer le menu au clic sur un lien (sauf "La Boutique")
  menuMobile.addEventListener("click", (event) => {
    const lien = event.target.closest("a");
    if (!lien) return;

    const estLienBoutique = lien.classList.contains("header-lien-boutique");
    if (!estLienBoutique) {
      menuMobile.classList.remove("active");
      if (blocDropdown) blocDropdown.classList.remove("active"); // optionnel : referme aussi le dropdown
    }
  });
});

// Mise en avant nav active

// Récupère le nom du fichier de la page actuelle
const currentPage = window.location.pathname.split("/").pop() || 'index.html'; // si pas de fichier, default index.html

// Sélectionne tous les liens du menu
const menuLinks = document.querySelectorAll('.header-nav-desktop a');

menuLinks.forEach(link => {
  // Récupère le fichier du lien
  const linkPage = link.getAttribute('href').split("/").pop();

  // Si le lien correspond à la page actuelle
  if (linkPage === currentPage) {
    link.classList.add('active');  // ajoute active au lien courant
  } else {
    link.classList.remove('active'); // enlève active des autres
  }
});




  // ========================================
  // SLIDER (uniquement sur la home)
  // ========================================
  (() => {
  const slider = document.querySelector('[data-nivo-slider]');
  if (!slider) return;

  const slides = slider.querySelectorAll('.nivo-slide');
  const prevBtn = slider.querySelector('.nivo-prev');
  const nextBtn = slider.querySelector('.nivo-next');
  const dotsContainer = slider.querySelector('.nivo-control-nav');

  let currentIndex = 0;
  let isPaused = false;
  const SLIDE_DURATION = 4000;

  /* =========================
     Création des dots
     ========================= */
  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'nivo-control';

    // Dot spécial Noël
    if (slide.classList.contains('noel-slide')) {
      dot.classList.add('noel');
    }

    dot.setAttribute('aria-label', `Aller au slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.nivo-control');

  /* =========================
     Fonctions
     ========================= */
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
  }

  /* =========================
     Autoplay
     ========================= */
  setInterval(() => {
    if (!isPaused) {
      nextSlide();
    }
  }, SLIDE_DURATION);

  /* =========================
     Events
     ========================= */
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  slider.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  slider.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  /* =========================
     Init
     ========================= */
  showSlide(currentIndex);
})();


  // ========================================
  // SCROLL TO TOP
  // ========================================

const boutonRemonter = document.getElementById("boutonRemonter");

if (boutonRemonter) {
  boutonRemonter.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}


  // ========================================
  // SMOOTH SCROLL POUR LES LIENS D'ANCRAGE
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#" || href === "#contact") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

  // ========================================
  // FOOTER ACCORDIONS (mobile)
  // ========================================

console.log("Script accordéons du footer chargé ");

function initialiserAccordeonsPiedDePage() {
  console.log("initialiserAccordeonsPiedDePage() ");

  const POINT_RUPTURE_DESKTOP = 1200;

  const accordeons = [
    {
      idBouton: "boutonNavigation",
      idColonne: "colonneNavigation",
    },
    {
      idBouton: "boutonInformations",
      idColonne: "colonneInformations",
    },
  ];

  accordeons.forEach(({ idBouton, idColonne }) => {
    const bouton = document.getElementById(idBouton);
    const colonne = document.getElementById(idColonne);

    console.log("Liaison :", idBouton, !!bouton, idColonne, !!colonne);

    if (!bouton || !colonne) return;

    bouton.addEventListener("click", () => {
      console.log("CLIC", idBouton, "largeur =", window.innerWidth);

      // Sur desktop, l’accordéon est désactivé
      if (window.innerWidth >= POINT_RUPTURE_DESKTOP) return;

      colonne.classList.toggle("is-open");
      console.log(
        "État ouvert =",
        colonne.classList.contains("is-open")
      );
    });
  });

  // Réinitialisation automatique en mode desktop
  const reinitialiserSurDesktop = () => {
    if (window.innerWidth >= POINT_RUPTURE_DESKTOP) {
      document
        .querySelectorAll(".colonne-accordeon")
        .forEach((colonne) => {
          colonne.classList.remove("is-open");
        });
    }
  };

  window.addEventListener("resize", reinitialiserSurDesktop);
  reinitialiserSurDesktop();
}

// Initialisation selon l’état du DOM
if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initialiserAccordeonsPiedDePage
  );
} else {
  initialiserAccordeonsPiedDePage();
}


 // ========================================
  // FORMULAIRE
  // ========================================

 document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const confirmationMessage = document.querySelector('.confirmation-message');

  // Vérifier si un message de confirmation a déjà été affiché pendant la session
  if (sessionStorage.getItem('messageShown') === 'true') {
    // Si un message a déjà été montré, on le masque à chaque rechargement
    confirmationMessage.style.display = 'none'; // Masquer le message
    sessionStorage.removeItem('messageShown'); // Réinitialiser la session pour éviter qu'il réapparaisse
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Afficher le message de confirmation
    confirmationMessage.style.display = 'block';

    // Ajouter une classe pour l'animation d'apparition
    confirmationMessage.classList.add('fade-in');

    // Réinitialiser le formulaire
    form.reset();

    // Marquer que le message a été montré dans la session
    sessionStorage.setItem('messageShown', 'true');

    // Ajouter une classe pour faire disparaître le message après 15 secondes
    setTimeout(() => {
      confirmationMessage.classList.add('fade-out');
    }, 15000); // Après 15 secondes, commence la disparition

    // Supprimer complètement le message après la fin de la transition (1 seconde après)
    setTimeout(() => {
      confirmationMessage.style.display = 'none';
    }, 16000); // 1 seconde après la disparition de l'élément (fin de la transition)
  });
});

 // ========================================
  // COOKIE 
  // ========================================

  const CLE_COOKIES = "consentement_cookies";

  const bandeauCookies = document.getElementById("bandeauCookies");
  const boutonAccepter = document.getElementById("accepterCookies");
  const boutonRefuser = document.getElementById("refuserCookies");

  // Vérifier si un choix a déjà été fait
  function verifierConsentement() {
    return localStorage.getItem(CLE_COOKIES);
  }

  // Enregistrer le choix
  function enregistrerConsentement(valeur) {
    localStorage.setItem(CLE_COOKIES, valeur);
    masquerBandeau();
    appliquerConsentement(valeur);
  }

  // Masquer le bandeau
  function masquerBandeau() {
    bandeauCookies.style.display = "none";
  }

  // Appliquer le consentement
  function appliquerConsentement(valeur) {
    if (valeur === "accepte") {
      activerStatistiques();
    } else {
      desactiverStatistiques();
    }
  }

  // Exemple : activer analytics
  function activerStatistiques() {
    console.log("Cookies acceptés : statistiques activées");

    // Exemple réel :
    // const script = document.createElement("script");
    // script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXX";
    // script.async = true;
    // document.head.appendChild(script);
  }

  function desactiverStatistiques() {
    console.log("Cookies refusés : aucune statistique chargée");
  }

  // Événements
  boutonAccepter.addEventListener("click", () => {
    enregistrerConsentement("accepte");
  });

  boutonRefuser.addEventListener("click", () => {
    enregistrerConsentement("refuse");
  });

  // Initialisation
  const consentement = verifierConsentement();

  if (consentement) {
    masquerBandeau();
    appliquerConsentement(consentement);
  }


