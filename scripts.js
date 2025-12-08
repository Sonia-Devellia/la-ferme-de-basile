// La Ferme de Basile - JavaScript global

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // MENU BURGER MOBILE
  // ========================================
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navList = document.getElementById("navList");

  if (mobileMenuBtn && navList) {
    mobileMenuBtn.addEventListener("click", () => {
      navList.classList.toggle("active");
    });

    // Fermer le menu mobile lors du clic sur un lien
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 1200) {
          navList.classList.remove("active");
        }
      });
    });
  }

  // Dropdown mobile (La Boutique)
  const dropdown = document.getElementById("dropdown");
  if (dropdown && navList) {
    dropdown.addEventListener("click", (e) => {
      if (window.innerWidth < 1200) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      }
    });
  }

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

