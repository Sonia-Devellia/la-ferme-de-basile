// La Ferme de Basile - JavaScript global

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // MENU BURGER MOBILE
  // ========================================
 
console.log('Script chargé et exécuté');

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNavList = document.getElementById('mobileNavList');
console.log ('mobileMenuBtn')

// Vérifie que le bouton burger existe
if (!mobileMenuBtn) {
  console.log('Le bouton burger n\'a pas été trouvé');
} else {
  console.log('Bouton burger trouvé');
}

// Vérifie que le menu est bien récupéré
if (!mobileNavList) {
  console.log('Le menu mobile n\'a pas été trouvé');
}

mobileMenuBtn.addEventListener('click', (e) => {
  console.log("burger menu click");
  mobileNavList.classList.toggle('active');
  console.log(mobileNavList.classList);
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
  document.addEventListener("DOMContentLoaded", () => {
// 1. Récupérer l'élément h3
const footerNavToggle = document.getElementById('footerNavToggle');
  });
// 2. Fonction qui gère le toggle de l'accordéon
const handleFooterNavToggle = () => {
  const footerNavCol = document.getElementById('footerNavCol');
  if (footerNavCol) {
    footerNavCol.classList.toggle('active');
  }
};

// 3. Ajouter l'event listener au clic
if (footerNavToggle) {
  footerNavToggle.addEventListener('click', handleFooterNavToggle);
};

// 4. Nettoyage lors du démontage du composant (dans le return du useEffect)
return () => {
  if (footerNavToggle) {
    footerNavToggle.removeEventListener('click', handleFooterNavToggle);
  }
};
});


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

