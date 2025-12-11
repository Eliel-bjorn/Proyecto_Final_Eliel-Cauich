function autoplayProductsCarousel() {
  const slideContainerEl = document.querySelector("#products-slide-container");
  const slideEl = document.querySelector(".product-slide");
  let slideWidth = slideEl.offsetWidth;
  const gap = 30;

  // Clonar slides para efecto infinito
  const slides = document.querySelectorAll(".product-slide");
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    slideContainerEl.appendChild(clone);
  });

  // Add resize handler
  window.addEventListener("resize", () => {
    slideWidth = slideEl.offsetWidth;
  });

  let autoplay;

  const navigate = () => {
    slideContainerEl.scrollLeft += slideWidth + gap;

    // Si llegamos cerca del final, volvemos al inicio sin que se note
    const maxScroll = slideContainerEl.scrollWidth / 2;
    if (slideContainerEl.scrollLeft >= maxScroll) {
      // Desactivar scroll suave temporalmente
      slideContainerEl.style.scrollBehavior = 'auto';
      slideContainerEl.scrollLeft = 0;
      // Reactivar scroll suave
      setTimeout(() => {
        slideContainerEl.style.scrollBehavior = 'smooth';
      }, 50);
    }
  };

  // Autoplay
  autoplay = setInterval(navigate, 3000);

  slideContainerEl.addEventListener("mouseenter", () => {
    clearInterval(autoplay);
  });

  slideContainerEl.addEventListener("mouseleave", () => {
    autoplay = setInterval(navigate, 3000);
  });
}

autoplayProductsCarousel();
