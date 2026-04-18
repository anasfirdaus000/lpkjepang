/* ================================================
   LPK FUJISAKI GAKUIN CENTER — MAIN JAVASCRIPT
   ================================================ */
import { loadHomePage } from './content-loader.js';
import { initI18n, setLang, getLang } from './i18n.js';

// ------------------------------------------------
// 1. NAVBAR — Sticky, Scroll, Mobile Menu
// ------------------------------------------------
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const navLinks = document.querySelectorAll('.navbar__link');
  const mobileCloseLinks = document.querySelectorAll('[data-nav-close]');
  
  // Scroll behavior
  let lastScrollY = 0;
  
  function handleScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScrollY = scrollY;
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
  
  // Hamburger toggle
  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
  }
  
  hamburger.addEventListener('click', toggleMobileMenu);
  
  // Close mobile menu on link click
  mobileCloseLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close on overlay click
  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
      hamburger.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink, { passive: true });
}

// ------------------------------------------------
// 2. SCROLL REVEAL ANIMATIONS
// ------------------------------------------------
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-right, .reveal-left');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });
  
  revealElements.forEach(el => observer.observe(el));
}

// ------------------------------------------------
// 3. STATS COUNT-UP ANIMATION
// ------------------------------------------------
function initCountUp() {
  const counters = document.querySelectorAll('.trust__number');
  let hasAnimated = false;
  
  function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(easeProgress * target);
      
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target.toLocaleString();
      }
    }
    
    requestAnimationFrame(update);
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach((counter, index) => {
          setTimeout(() => animateCounter(counter), index * 200);
        });
        observer.disconnect();
      }
    });
  }, {
    threshold: 0.5
  });
  
  const trustSection = document.getElementById('trust');
  if (trustSection) {
    observer.observe(trustSection);
  }
}

// ------------------------------------------------
// 4. TESTIMONIAL CAROUSEL
// ------------------------------------------------
function initCarousel() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!track) return;
  
  const cards = track.querySelectorAll('.testimonials__card');
  const totalCards = cards.length;
  let currentIndex = 0;
  let cardsPerView = 1;
  let autoPlayInterval;
  
  function getCardsPerView() {
    if (window.innerWidth >= 768) return 2;
    return 1;
  }
  
  function buildDots() {
    dotsContainer.innerHTML = '';
    const totalDots = Math.ceil(totalCards / cardsPerView);
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.classList.add('testimonials__dot');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  function goToSlide(index) {
    const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 24;
    const offset = currentIndex * (cardWidth + gap) * cardsPerView;
    
    track.style.transform = `translateX(-${offset}px)`;
    
    // Update dots
    const dots = dotsContainer.querySelectorAll('.testimonials__dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  function nextSlide() {
    const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;
    goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  }
  
  function prevSlide() {
    const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;
    goToSlide(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  }
  
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, 5000);
  }
  
  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoPlay();
  });
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoPlay();
  });
  
  // Pause on hover
  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);
  
  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  }, { passive: true });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    
    startAutoPlay();
  }, { passive: true });
  
  // Handle resize
  function handleResize() {
    const newCardsPerView = getCardsPerView();
    if (newCardsPerView !== cardsPerView) {
      cardsPerView = newCardsPerView;
      currentIndex = 0;
      buildDots();
      goToSlide(0);
    }
  }
  
  window.addEventListener('resize', handleResize);
  
  // Init
  cardsPerView = getCardsPerView();
  buildDots();
  goToSlide(0);
  startAutoPlay();
}

// ------------------------------------------------
// 5. GALLERY LIGHTBOX
// ------------------------------------------------
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery__item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.dataset.caption || '';
      
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightboxCaption.textContent = caption;
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  lightboxClose.addEventListener('click', closeLightbox);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// ------------------------------------------------
// 6. STICKY MOBILE CTA
// ------------------------------------------------
function initStickyMobileCta() {
  const stickyBar = document.getElementById('stickyMobileCta');
  const hero = document.getElementById('hero');
  
  if (!stickyBar || !hero) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stickyBar.classList.remove('visible');
      } else {
        stickyBar.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  observer.observe(hero);
}

// ------------------------------------------------
// 7. SMOOTH SCROLL for Anchor Links
// ------------------------------------------------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      
      const navHeight = document.getElementById('navbar').offsetHeight;
      const targetPosition = targetEl.offsetTop - navHeight - 16;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// ------------------------------------------------
// 8. INITIALIZE EVERYTHING
// ------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCountUp();
  initCarousel();
  initGallery();
  initStickyMobileCta();
  initSmoothScroll();

  // Load dynamic content from Firebase (overrides static HTML)
  loadHomePage().then(() => {
    // Re-init components that depend on dynamic content
    initScrollReveal();
    initCountUp();
    initCarousel();
    initGallery();
    setLang(getLang());
  });

  // Initialize bilingual system
  initI18n();
});
