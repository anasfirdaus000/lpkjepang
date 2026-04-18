/* ================================================
   LISTING PAGES — Shared JS (Navbar, Filter, Reveal)
   + Firebase Content Loading
   ================================================ */
import { loadPrograms, loadActivities, loadContact } from './content-loader.js';
import { initI18n, setLang, getLang } from './i18n.js';

// ------------------------------------------------
// Navbar
// ------------------------------------------------
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileCloseLinks = document.querySelectorAll('[data-nav-close]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
  });

  mobileCloseLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
      hamburger.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ------------------------------------------------
// Scroll Reveal
// ------------------------------------------------
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-right, .reveal-left');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

// ------------------------------------------------
// Kegiatan Filter
// ------------------------------------------------
function initKegiatanFilter() {
  const filterBtns = document.querySelectorAll('.kegiatan-filter__btn');
  const grid = document.getElementById('kegiatanGrid');
  if (!filterBtns.length || !grid) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const cards = grid.querySelectorAll('.kegiatan-card');

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.classList.remove('revealed');
          setTimeout(() => card.classList.add('revealed'), 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ------------------------------------------------
// Load Programs from Firebase (program.html)
// ------------------------------------------------
async function loadProgramsPage() {
  const programs = await loadPrograms();
  if (!programs || programs.length === 0) return;

  const container = document.querySelector('.page-section .container');
  if (!container || !document.getElementById('cardMagang')) return;

  // Clear static cards
  container.querySelectorAll('.program-list-card').forEach(c => c.remove());

  const iconColors = ['', '--blue', '--green', '--purple'];
  const icons = ['work_history', 'translate', 'health_and_safety', 'school'];

  programs.forEach((p, i) => {
    const isReverse = i % 2 === 1;
    const colorVariant = iconColors[i % iconColors.length];
    const icon = icons[i % icons.length];

    const card = document.createElement('a');
    card.href = `/program-detail.html?id=${p.slug}`;
    card.className = `program-list-card ${isReverse ? 'program-list-card--reverse' : ''} reveal-up`;
    card.innerHTML = `
      <div class="program-list-card__image">
        <img src="${p.heroImage}" alt="${p.title}" loading="lazy" />
        <div class="program-list-card__image-overlay"></div>
        <span class="program-list-card__badge">${p.badge || 'Program'}</span>
      </div>
      <div class="program-list-card__body">
        <div class="program-list-card__icon-row">
          <div class="program-list-card__icon-wrap program-list-card__icon-wrap${colorVariant}">
            <span class="material-symbols-outlined">${icon}</span>
          </div>
          <div class="program-list-card__meta-pills">
            <span class="program-list-card__pill"><span class="material-symbols-outlined">schedule</span> ${p.duration}</span>
            <span class="program-list-card__pill"><span class="material-symbols-outlined">translate</span> ${p.level}</span>
          </div>
        </div>
        <h2 class="program-list-card__title">${p.title}</h2>
        <p class="program-list-card__desc">${p.description || ''}</p>
        <ul class="program-list-card__features">
          ${(p.features || []).slice(0, 4).map(f => `<li><span class="material-symbols-outlined">check_circle</span> ${f}</li>`).join('')}
        </ul>
        <div class="program-list-card__footer">
          <span class="program-list-card__cta">Lihat Detail Program <span class="material-symbols-outlined">arrow_forward</span></span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  initScrollReveal();
  setLang(getLang());
}

// ------------------------------------------------
// Load Activities from Firebase (kegiatan.html)
// ------------------------------------------------
async function loadActivitiesPage() {
  const activities = await loadActivities();
  if (!activities || activities.length === 0) return;

  const grid = document.getElementById('kegiatanGrid');
  if (!grid) return;

  grid.innerHTML = activities.map((a, i) => {
    const catClass = a.category === 'Culture' ? 'kegiatan-card__category--culture' :
                     a.category === 'Update'  ? 'kegiatan-card__category--update' : '';
    return `
      <a href="/kegiatan-detail.html?id=${a.id}" class="kegiatan-card reveal-up" data-category="${a.category}" ${i > 0 ? `style="--delay: ${Math.min(i * 0.1, 0.3)}s"` : ''}>
        <div class="kegiatan-card__image">
          <img src="${a.image}" alt="${a.title}" loading="lazy" />
          <span class="kegiatan-card__category ${catClass}">${a.category}</span>
        </div>
        <div class="kegiatan-card__body">
          <div class="kegiatan-card__date">
            <span class="material-symbols-outlined">calendar_today</span> ${a.date}
          </div>
          <h3 class="kegiatan-card__title">${a.title}</h3>
          <p class="kegiatan-card__desc">${a.summary}</p>
          <span class="kegiatan-card__read-more">Baca selengkapnya <span class="material-symbols-outlined">arrow_forward</span></span>
        </div>
      </a>
    `;
  }).join('');

  initScrollReveal();
  initKegiatanFilter();
  setLang(getLang());
}

// ------------------------------------------------
// Init
// ------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  initNavbar();
  initScrollReveal();
  initKegiatanFilter();

  // Load Firebase content
  try {
    await loadContact();
    if (document.getElementById('cardSsw')) {
      await loadProgramsPage();
    }
    if (document.getElementById('kegiatanGrid')) {
      await loadActivitiesPage();
    }
  } catch (e) {
    console.warn('Firebase belum tersedia, menggunakan konten statis.', e);
  }

  // Initialize bilingual
  initI18n();
});
