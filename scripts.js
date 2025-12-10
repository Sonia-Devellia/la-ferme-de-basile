// La Ferme de Basile - JavaScript global

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // MENU BURGER MOBILE
  // ========================================
 

// Sélection des éléments
const mobileMenuBtn = document.getElementById('mobileMenuBtn'); // Bouton burger
const mobileNavList = document.getElementById('mobileNavList'); // Liste du menu mobile
const dropdown = document.getElementById('dropdown'); // Liens du dropdown
const dropdownLink = dropdown.querySelector('a'); // Lien "La Boutique"

// Ouvrir/fermer le menu mobile (toggle burger)
mobileMenuBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Empêche la propagation du clic à d'autres éléments
  mobileNavList.classList.toggle('active'); // Ajoute ou enlève la classe "active"
});

// Ouvrir/fermer le dropdown mobile (uniquement au clic sur "La Boutique")
dropdownLink.addEventListener('click', (e) => {
  e.preventDefault(); // Empêche la navigation du lien
  dropdown.classList.toggle('active'); // Ajoute ou enlève la classe "active" pour le dropdown
});

// Fermer menu et dropdown au clic ailleurs
document.addEventListener('click', (e) => {
  // Si le clic n'est pas dans le menu mobile ni dans le dropdown, alors on ferme tout
  if (!mobileNavList.contains(e.target) && !dropdown.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileNavList.classList.remove('active'); // Ferme le menu mobile
    dropdown.classList.remove('active'); // Ferme le dropdown
  }
});

// Fermer le menu lorsque l'on clique sur un autre lien (exclut le lien "La Boutique")
mobileNavList.querySelectorAll('a').forEach(link => {
  if (!link.closest('.dropdown')) { // Exclut "La Boutique"
    link.addEventListener('click', () => {
      mobileNavList.classList.remove('active'); // Ferme le menu
      dropdown.classList.remove('active'); // Ferme le dropdown
    });
  }
});


  // ========================================
  // CAROUSEL (uniquement sur la home)
  // ========================================
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const carouselTrack = document.getElementById("carouselTrack");
  const carouselContainer = document.querySelector(".carousel-container");
  const dots = document.querySelectorAll(".carousel-dot");

  if (prevBtn && nextBtn && carouselTrack && carouselContainer && dots.length) {
    let currentIndex = 0;
    const totalCards = 6;

    const getCardWidth = () => {
      return window.innerWidth <= 768 ? 240 : 280;
    };

    const getMaxIndex = () => {
      const containerWidth = carouselContainer.offsetWidth;
      const cardWidth = getCardWidth();
      const visibleCards = Math.floor(containerWidth / cardWidth);
      return Math.max(0, totalCards - visibleCards);
    };

    const updateDots = () => {
      const maxIndex = getMaxIndex();
      dots.forEach((dot, index) => {
        dot.style.display = index <= maxIndex ? "inline-block" : "none";
        dot.classList.toggle("active", index === currentIndex);
      });
    };

    const updateCarousel = () => {
      const cardWidth = getCardWidth();
      carouselTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
      updateDots();
    };

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener("click", () => {
      const maxIndex = getMaxIndex();
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        const maxIndex = getMaxIndex();
        if (index <= maxIndex) {
          currentIndex = index;
          updateCarousel();
        }
      });
    });

    window.addEventListener("resize", () => {
      const maxIndex = getMaxIndex();
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      updateCarousel();
    });

    // Initialisation du carousel
    updateCarousel();
  }

  // ========================================
  // SCROLL TO TOP
  // ========================================
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
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
  const footerNavToggle = document.getElementById("footerNavToggle");
  const footerNavCol = document.getElementById("footerNavCol");
  const footerInfoToggle = document.getElementById("footerInfoToggle");
  const footerInfoCol = document.getElementById("footerInfoCol");

  if (footerNavToggle && footerNavCol) {
    footerNavToggle.addEventListener("click", () => {
      footerNavCol.classList.toggle("active");
    });
  }

  if (footerInfoToggle && footerInfoCol) {
    footerInfoToggle.addEventListener("click", () => {
      footerInfoCol.classList.toggle("active");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.");
    form.reset();
  });
});
  // ========================================
  // FONCTION POUR CHARGER LE HEADER
  // ========================================


// Fonction pour charger le contenu du header
function loadHeader() {
  // Utilisation de fetch() pour charger le fichier header.html
  fetch('header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Le fichier header.html est introuvable');
      }
      return response.text(); // Récupérer le texte du fichier HTML
    })
    .then(data => {
      // Insérer le contenu du header dans l'élément avec id="header-container"
      document.getElementById('header-container').innerHTML = data;
    })
    .catch(error => {
      console.error('Erreur de chargement du header:', error);
    });
}

// Appel de la fonction pour charger le header
loadHeader();


