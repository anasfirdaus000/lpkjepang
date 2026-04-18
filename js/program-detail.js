/* ================================================
   PROGRAM DETAIL — Dynamic Content Loader
   Loads from Firebase first, falls back to static data
   ================================================ */
import { programs as staticPrograms } from './data.js';
import { loadProgramBySlug, loadContact } from './content-loader.js';
import { setLang, getLang, initI18n } from './i18n.js';

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

async function initProgramDetail() {
  const programId = getParam('id');

  // Try Firebase first, fallback to static data
  let program = await loadProgramBySlug(programId);
  if (!program) {
    program = staticPrograms[programId];
  }

  if (!program) {
    document.getElementById('heroTitle').textContent = 'Program Tidak Ditemukan';
    document.getElementById('overviewContent').innerHTML = '<p>Program yang Anda cari tidak tersedia. <a href="/#program" style="color:var(--primary);font-weight:600;">Kembali ke halaman utama</a></p>';
    return;
  }

  // Normalize field names (Firebase uses different field names)
  const title = program.title || '';
  const tagline = program.tagline || '';
  const heroImage = program.heroImage || '';
  const badge = program.badge || (programId === 'tokutei_ginou' ? 'Flagship Program' : programId === 'magang' ? 'Popular' : 'Specialized');
  const duration = program.duration || '';
  const level = program.level || '';
  const seats = program.seats || '';
  const certificate = program.certificate || '';
  const description = program.description || '';
  const overview = program.overview || [];
  const curriculum = program.curriculum || [];
  const sectors = program.sectors || [];
  const benefits = program.benefits || [];
  const requirements = program.requirements || [];
  const features = program.features || [];
  const whatsappText = program.whatsappText || `Halo Fujisaki Gakuin, saya tertarik dengan program ${title}`;

  // Update page title
  document.title = `${title} — LPK Fujisaki Gakuin Center`;

  // Hero
  document.getElementById('heroBg').style.backgroundImage = `url(${heroImage})`;
  document.getElementById('heroBadge').textContent = badge;
  document.getElementById('heroTitle').textContent = title;
  document.getElementById('heroTagline').textContent = tagline;

  // Meta badges
  document.getElementById('heroMeta').innerHTML = `
    <div class="detail-hero__meta-item"><span class="material-symbols-outlined">schedule</span> ${duration}</div>
    <div class="detail-hero__meta-item"><span class="material-symbols-outlined">translate</span> ${level}</div>
    <div class="detail-hero__meta-item"><span class="material-symbols-outlined">group</span> ${seats}</div>
  `;

  // Overview
  document.getElementById('overviewContent').innerHTML =
    `<p>${description}</p>` + overview.map(p => `<p>${p}</p>`).join('');

  // Curriculum
  if (curriculum.length > 0) {
    document.getElementById('curriculumContent').innerHTML = curriculum.map(phase => `
      <div class="detail-curriculum-phase">
        <div class="detail-curriculum-phase__header">
          <h3 class="detail-curriculum-phase__title">${phase.phase}</h3>
          <span class="detail-curriculum-phase__duration">${phase.duration}</span>
        </div>
        <ul>${phase.items.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
    `).join('');
  } else if (features.length > 0) {
    // Firebase format — use features as simple list
    document.getElementById('curriculumContent').innerHTML = `
      <div class="detail-curriculum-phase">
        <ul>${features.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>
    `;
  }

  // Sectors (SSW only)
  if (sectors.length > 0) {
    document.getElementById('sectorsBlock').style.display = 'block';
    document.getElementById('sectorsContent').innerHTML = sectors.map(s => `
      <div class="detail-sector-chip"><span class="material-symbols-outlined">check_circle</span> ${s}</div>
    `).join('');
  }

  // Requirements
  document.getElementById('requirementsContent').innerHTML = requirements.map(req => `
    <li><span class="material-symbols-outlined">task_alt</span> ${req}</li>
  `).join('');

  // Sidebar info
  const waLink = `https://wa.me/6285858000088?text=${encodeURIComponent(whatsappText)}`;
  document.getElementById('sidebarInfo').innerHTML = `
    <div class="detail-sidebar__info-item">
      <div class="detail-sidebar__info-icon"><span class="material-symbols-outlined">schedule</span></div>
      <div><div class="detail-sidebar__info-label">Durasi</div><div class="detail-sidebar__info-value">${duration}</div></div>
    </div>
    <div class="detail-sidebar__info-item">
      <div class="detail-sidebar__info-icon"><span class="material-symbols-outlined">translate</span></div>
      <div><div class="detail-sidebar__info-label">Level Bahasa</div><div class="detail-sidebar__info-value">${level}</div></div>
    </div>
    <div class="detail-sidebar__info-item">
      <div class="detail-sidebar__info-icon"><span class="material-symbols-outlined">workspace_premium</span></div>
      <div><div class="detail-sidebar__info-label">Sertifikat</div><div class="detail-sidebar__info-value">${certificate}</div></div>
    </div>
    <div class="detail-sidebar__info-item">
      <div class="detail-sidebar__info-icon"><span class="material-symbols-outlined">group</span></div>
      <div><div class="detail-sidebar__info-label">Kapasitas</div><div class="detail-sidebar__info-value">${seats}</div></div>
    </div>
  `;
  document.getElementById('sidebarCta').href = waLink;

  // Benefits
  document.getElementById('benefitsContent').innerHTML = benefits.map(b => `
    <div class="detail-benefit">
      <div class="detail-benefit__icon"><span class="material-symbols-outlined">${b.icon}</span></div>
      <div><div class="detail-benefit__title">${b.title}</div><div class="detail-benefit__desc">${b.desc}</div></div>
    </div>
  `).join('');

  // Bottom CTA
  document.getElementById('bottomCta').href = waLink;

  // Update WA links with contact data
  await loadContact();
  setLang(getLang());
}

// Shared navbar logic
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

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initProgramDetail();
  initScrollReveal();
  initI18n();
});
