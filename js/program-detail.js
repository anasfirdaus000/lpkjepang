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

  const tVal = (obj) => typeof obj === 'string' ? obj : (obj ? obj[getLang()] || obj.id || '' : '');
  const tArr = (obj) => Array.isArray(obj) && typeof obj[0] === 'string' ? obj : (obj ? obj[getLang()] || obj.id || [] : []);

  const title = program.title || '';
  const tagline = program.tagline || '';
  const heroImage = program.heroImage || '';
  const badge = program.badge || (programId === 'tokutei_ginou' ? 'Flagship Program' : programId === 'magang' ? 'Popular' : 'Specialized');
  const duration = program.duration || '';
  const level = program.level || '';
  const seats = program.seats || '';
  const certificate = program.certificate || '';
  const overview = program.overview || [];
  const curriculum = program.curriculum || [];
  const sectors = program.sectors || [];
  const requirements = program.requirements || [];
  const features = program.features || [];
  const benefits = program.benefits || [];
  const whatsappText = program.whatsappText || `Halo Fujisaki Gakuin, saya tertarik...`;

  function renderDOM() {
    const curTitle = tVal(title);
    
    // Update page title
    document.title = `${curTitle} — LPK Fujisaki Gakuin Center`;

    // Hero
    document.getElementById('heroBg').style.backgroundImage = `url(${heroImage})`;
    document.getElementById('heroBadge').textContent = badge;
    document.getElementById('heroTitle').textContent = curTitle;
    document.getElementById('heroTagline').textContent = tVal(tagline);

    // Meta badges
    document.getElementById('heroMeta').innerHTML = `
      <div class="detail-hero__meta-item"><span class="material-symbols-outlined">schedule</span> ${tVal(duration)}</div>
      <div class="detail-hero__meta-item"><span class="material-symbols-outlined">translate</span> ${tVal(level)}</div>
      <div class="detail-hero__meta-item"><span class="material-symbols-outlined">group</span> ${tVal(seats)}</div>
    `;

    // Overview
    const curDesc = tVal(program.description);
    const curOverview = tArr(overview);
    document.getElementById('overviewContent').innerHTML =
      `<p>${curDesc}</p>` + curOverview.map(p => `<p>${p}</p>`).join('');

    // Curriculum
    const curFeatures = tArr(features);
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
    } else if (curFeatures.length > 0) {
      document.getElementById('curriculumContent').innerHTML = `
        <div class="detail-curriculum-phase">
          <ul>${curFeatures.map(f => `<li>${f}</li>`).join('')}</ul>
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
    document.getElementById('requirementsContent').innerHTML = tArr(requirements).map(req => `
      <li><span class="material-symbols-outlined">task_alt</span> ${tVal(req)}</li>
    `).join('');

    // Sidebar info
    const waLink = `https://wa.me/6285858000088?text=${encodeURIComponent(whatsappText)}`;
    document.getElementById('sidebarCta').href = waLink;
    document.getElementById('bottomCta').href = waLink;

    document.getElementById('sidebarInfo').innerHTML = `
      <div class="detail-sidebar__info-item">
        <span class="material-symbols-outlined">schedule</span>
        <div><strong>Durasi:</strong><br>${tVal(duration)}</div>
      </div>
      <div class="detail-sidebar__info-item">
        <span class="material-symbols-outlined">translate</span>
        <div><strong>Level JP:</strong><br>${tVal(level)}</div>
      </div>
      <div class="detail-sidebar__info-item">
        <span class="material-symbols-outlined">workspace_premium</span>
        <div><strong>Sertifikat:</strong><br>${tVal(certificate)}</div>
      </div>
    `;

    const curBenefits = tArr(benefits);
    if (curBenefits && curBenefits.length > 0) {
      document.getElementById('benefitsContent').innerHTML = curBenefits.map(b => `
        <div class="benefit-item">
          <div class="benefit-item__icon"><span class="material-symbols-outlined">${b.icon || 'star'}</span></div>
          <div class="benefit-item__text">
            <h4>${tVal(b.title)}</h4>
            <p>${tVal(b.desc)}</p>
          </div>
        </div>
      `).join('');
    } else {
      document.getElementById('benefitsCard').style.display = 'none';
    }
  }

  // Initial render
  renderDOM();

  // Re-render when language switches (we tap into the body click event, or re-bind)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(renderDOM, 50); // small delay to let i18n change the getLang state
    });
  });

  // Ensure contact variables are loaded so whatsapp links work
  await loadContact();
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
