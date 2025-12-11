/**
 * CAROUSEL DE TESTIMONIOS
 *
 * Este carousel muestra testimonios de clientes con:
 * - Navegación automática cada 5 segundos
 * - Indicadores clickeables para cambiar de testimonio
 * - Transiciones suaves entre slides
 * - Actualización automática del indicador activo
 */

// Elementos del DOM
const testimonialsSlideContainerEl = document.querySelector("#testimonials-slide-container");
const testimonialsIndicatorsContainerEl = document.querySelector(".testimonials-indicators");

// Índice del slide actual
let testimonialsCurrentSlideIndex = 0;

// Intervalo de autoplay (5 segundos = 5000ms)
let testimonialsAutoplayInterval;

/**
 * Cambia al slide especificado por el índice
 * @param {number} slideIndex - Índice del slide al que queremos ir (0, 1, 2, etc.)
 */
function goToTestimonialSlide(slideIndex) {
  // Calculamos el desplazamiento: cada slide ocupa el 100% del ancho del contenedor
  // Si slideIndex = 0 → 0%, slideIndex = 1 → 100%, slideIndex = 2 → 200%
  const scrollAmount = slideIndex * testimonialsSlideContainerEl.clientWidth;

  // Desplazamos el contenedor usando scrollLeft
  testimonialsSlideContainerEl.scrollLeft = scrollAmount;

  // Actualizamos el índice actual
  testimonialsCurrentSlideIndex = slideIndex;

  // Actualizamos los indicadores visuales
  updateTestimonialIndicators();
}

/**
 * Actualiza el estado visual de los indicadores
 * Quita la clase 'active' de todos y la agrega solo al indicador actual
 */
function updateTestimonialIndicators() {
  const indicators = document.querySelectorAll(".testimonial-indicator");

  // Recorremos todos los indicadores
  indicators.forEach((indicator, index) => {
    // Si el índice coincide con el slide actual, agregamos 'active', sino la quitamos
    if (index === testimonialsCurrentSlideIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

/**
 * Avanza al siguiente slide
 * Si estamos en el último, vuelve al primero (loop infinito)
 */
function nextTestimonialSlide() {
  const totalSlides = document.querySelectorAll(".testimonial-slide").length;

  // Si estamos en el último slide (2), volvemos al primero (0)
  // Si no, avanzamos al siguiente
  const nextIndex = (testimonialsCurrentSlideIndex + 1) % totalSlides;

  goToTestimonialSlide(nextIndex);
}

/**
 * Inicia el autoplay del carousel
 * Cambia de slide automáticamente cada 5 segundos
 */
function startTestimonialsAutoplay() {
  // Limpiamos cualquier intervalo existente para evitar duplicados
  if (testimonialsAutoplayInterval) {
    clearInterval(testimonialsAutoplayInterval);
  }

  // Creamos un nuevo intervalo que avanza al siguiente slide cada 5000ms
  testimonialsAutoplayInterval = setInterval(() => {
    nextTestimonialSlide();
  }, 5000);
}

/**
 * Detiene el autoplay del carousel
 * Se usa cuando el usuario interactúa manualmente con los indicadores
 */
function stopTestimonialsAutoplay() {
  if (testimonialsAutoplayInterval) {
    clearInterval(testimonialsAutoplayInterval);
    testimonialsAutoplayInterval = null;
  }
}

/**
 * Reinicia el autoplay
 * Se llama después de una interacción manual del usuario
 */
function resetTestimonialsAutoplay() {
  stopTestimonialsAutoplay();
  startTestimonialsAutoplay();
}

/**
 * Inicialización: Agregamos eventos a los indicadores
 */
function initTestimonialsCarousel() {
  const indicators = document.querySelectorAll(".testimonial-indicator");

  // Agregamos evento click a cada indicador
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      // Vamos al slide correspondiente
      goToTestimonialSlide(index);

      // Reiniciamos el autoplay para que no se cambie inmediatamente después del click
      resetTestimonialsAutoplay();
    });
  });

  // Iniciamos el autoplay automático
  startTestimonialsAutoplay();
}

// Ejecutamos la inicialización cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTestimonialsCarousel);
} else {
  initTestimonialsCarousel();
}
