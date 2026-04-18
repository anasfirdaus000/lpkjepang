/* ================================================
   CONTENT LOADER — Load Firebase data to public pages
   ================================================ */
import { db } from './firebase-config.js';
import { collection, doc, getDocs, getDoc, query, orderBy } from 'firebase/firestore';

// Cache to avoid duplicate fetches
const cache = {};

async function fetchCollection(name, orderField = null) {
  if (cache[name]) return cache[name];
  const ref = orderField
    ? query(collection(db, name), orderBy(orderField))
    : collection(db, name);
  const snap = await getDocs(ref);
  cache[name] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return cache[name];
}

async function fetchDoc(collectionName, docId) {
  const key = `${collectionName}/${docId}`;
  if (cache[key]) return cache[key];
  const snap = await getDoc(doc(db, collectionName, docId));
  cache[key] = snap.exists() ? snap.data() : null;
  return cache[key];
}

// ====================================================
// CONTACT / WHATSAPP — used across all pages
// ====================================================
export async function loadContact() {
  const data = await fetchDoc('settings', 'contact');
  if (!data) return;

  const waNumber = data.whatsapp || '6285858000088';
  const waText = encodeURIComponent(data.whatsappText || 'Halo Fujisaki Gakuin, saya tertarik untuk mendaftar');

  // Update all WhatsApp links
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    const customText = link.dataset.waText;
    const text = customText ? encodeURIComponent(customText) : waText;
    link.href = `https://wa.me/${waNumber}?text=${text}`;
  });

  // Update floating WA
  const floatingWa = document.querySelector('.floating-wa');
  if (floatingWa) floatingWa.href = `https://wa.me/${waNumber}`;

  // Update footer contact
  const footerContact = document.querySelector('.footer__contact');
  if (footerContact) {
    footerContact.innerHTML = `
      <h5 class="footer__heading">Kontak</h5>
      <p>📍 ${data.address || ''}</p>
      <p>📞 ${data.phone || ''}</p>
      <p>✉️ ${data.email || ''}</p>
    `;
  }

  return data;
}

// ====================================================
// ABOUT TENTANG KAMI
// ====================================================
export async function loadAbout() {
  const data = await fetchDoc('settings', 'about');
  if (!data) return;

  const { updateTranslation } = await import('./i18n.js');

  if (data.desc1) updateTranslation('about.desc1', data.desc1.id, data.desc1.ja);
  if (data.desc2) updateTranslation('about.desc2', data.desc2.id, data.desc2.ja);

  const wrapper = document.getElementById('aboutImageWrapper');
  const img = document.getElementById('aboutImage');
  if (data.image && wrapper && img) {
    img.src = data.image;
    wrapper.style.display = 'block';
  }
}

// ====================================================
// HERO SECTION
// ====================================================
export async function loadHero() {
  const data = await fetchDoc('settings', 'hero');
  if (!data) return;

  const badge = document.querySelector('.hero__badge');
  if (badge && data.badge) {
    badge.innerHTML = `<span class="material-symbols-outlined" style="font-size:16px">auto_awesome</span> ${data.badge}`;
  }

  const title = document.querySelector('.hero__title');
  if (title && data.title) {
    const highlight = data.highlight || '';
    if (highlight) {
      title.innerHTML = data.title.replace(highlight, `<span class="text-gradient">${highlight}</span>`);
    } else {
      title.textContent = data.title;
    }
  }

  const subtitle = document.querySelector('.hero__subtitle');
  if (subtitle) subtitle.textContent = data.subtitle || '';

  const statNumber = document.querySelector('.hero__stat-number');
  if (statNumber) statNumber.textContent = data.statNumber || '';

  const statLabel = document.querySelector('.hero__stat-label');
  if (statLabel) statLabel.textContent = data.statLabel || '';

  const heroImage = document.querySelector('.hero__image');
  if (heroImage && data.image) heroImage.src = data.image;
}

// ====================================================
// STATS / PENCAPAIAN
// ====================================================
export async function loadStats() {
  const items = await fetchCollection('stats', 'order');
  if (!items.length) return;

  const grid = document.querySelector('.trust__grid');
  if (!grid) return;

  grid.innerHTML = items.map((s, i) => `
    <div class="trust__card reveal-up" ${i > 0 ? `style="--delay: ${i * 0.1}s"` : ''}>
      <span class="material-symbols-outlined trust__icon">${s.icon}</span>
      <div class="trust__value">
        <span class="trust__number" data-target="${s.number}">0</span><span class="trust__suffix">${s.suffix}</span>
      </div>
      <p class="trust__label">${s.label}</p>
    </div>
  `).join('');
}

// ====================================================
// PROGRAMS — Home Page (Bento Grid)
// ====================================================
export async function loadHomePrograms() {
  const items = await fetchCollection('programs_v2');
  if (!items.length) return;

  const bento = document.querySelector('.programs__bento');
  if (!bento) return;

  // Build cards based on number of programs
  const icons = ['work_history', 'translate', 'health_and_safety', 'school'];
  const iconColorClasses = ['--blue', '--white', '--green', '--purple'];

  let html = '';

  items.forEach((p, i) => {
    const icon = icons[i % icons.length];
    const delay = i * 0.15;

    if (i === 0) {
      // Large Card
      html += `
        <div class="programs__card programs__card--large reveal-up">
          <div class="programs__card-content">
            <div class="programs__card-icon-wrap programs__card-icon-wrap--blue">
              <span class="material-symbols-outlined">${icon}</span>
            </div>
            <h3 class="programs__card-title">${p.title}</h3>
            <p class="programs__card-desc">${p.description || ''}</p>
            <ul class="programs__card-features">
              ${(p.features || []).slice(0, 3).map(f => `
                <li><span class="material-symbols-outlined">check_circle</span> ${f}</li>
              `).join('')}
            </ul>
            <a href="/program-detail.html?id=${p.slug}" class="programs__card-link">
              <span data-i18n="programs.learn_more">Pelajari Selengkapnya</span> <span class="material-symbols-outlined">trending_flat</span>
            </a>
          </div>
          <div class="programs__card-bg-image">
            <img src="${p.heroImage}" alt="${p.title}" loading="lazy" />
          </div>
        </div>`;
    } else if (i === 1) {
      // Accent Card
      html += `
        <div class="programs__card programs__card--accent reveal-up" style="--delay: ${delay}s">
          <div class="programs__card-content">
            <div class="programs__card-icon-wrap programs__card-icon-wrap--white">
              <span class="material-symbols-outlined">${icon}</span>
            </div>
            <h3 class="programs__card-title">${p.title}</h3>
            <p class="programs__card-desc">${p.tagline || p.description || ''}</p>
            <a href="/program-detail.html?id=${p.slug}" class="btn btn--white btn--full">
              <span data-i18n="programs.join">Join Program</span>
            </a>
          </div>
          <div class="programs__card-glow"></div>
        </div>`;
    } else {
      // Wide Card
      html += `
        <div class="programs__card programs__card--wide reveal-up" style="--delay: ${delay}s">
          <div class="programs__card-content">
            <span class="programs__badge">${p.badge || 'Program'}</span>
            <h3 class="programs__card-title">${p.title}</h3>
            <p class="programs__card-desc">${p.description || ''}</p>
            <div class="programs__card-tags">
              ${(p.benefits || []).slice(0, 2).map(b => `
                <div class="programs__tag">
                  <span class="material-symbols-outlined">${b.icon}</span>
                  ${b.title}
                </div>
              `).join('')}
            </div>
            <a href="/program-detail.html?id=${p.slug}" class="programs__card-link">
              <span data-i18n="programs.learn_more">Pelajari Selengkapnya</span> <span class="material-symbols-outlined">trending_flat</span>
            </a>
          </div>
          <div class="programs__card-image">
            <img src="${p.heroImage}" alt="${p.title}" loading="lazy" />
          </div>
        </div>`;
    }
  });

  bento.innerHTML = html;
}

export async function loadPrograms() {
  const items = await fetchCollection('programs_v2');
  return items;
}

export async function loadProgramBySlug(slug) {
  const items = await fetchCollection('programs_v2');
  return items.find(p => p.slug === slug);
}

// ====================================================
// ADVANTAGES / KEUNGGULAN
// ====================================================
export async function loadAdvantages() {
  const items = await fetchCollection('advantages', 'order');
  if (!items.length) return;

  // Target the list container inside the section, not the outer grid
  const list = document.querySelector('.advantages__list');
  if (!list) return;

  list.innerHTML = items.map((a, i) => `
    <div class="advantages__item" style="--delay: ${(i + 1) * 0.1}s">
      <div class="advantages__item-icon">
        <span class="material-symbols-outlined">${a.icon}</span>
      </div>
      <div>
        <h4 class="advantages__item-title">${a.title}</h4>
        <p class="advantages__item-desc">${a.description}</p>
      </div>
    </div>
  `).join('');
}

// ====================================================
// TESTIMONIALS
// ====================================================
export async function loadTestimonials() {
  const items = await fetchCollection('testimonials');
  if (!items.length) return;

  const track = document.querySelector('.testimonials__track');
  if (!track) return;

  track.innerHTML = items.map(t => `
    <div class="testimonials__card">
      <div class="testimonials__header">
        ${t.image ? `<img src="${t.image}" alt="${t.name}" class="testimonials__avatar" loading="lazy" />` : `<div class="testimonials__avatar-placeholder">${(t.name || 'A')[0]}</div>`}
        <div>
          <h4 class="testimonials__name">${t.name}</h4>
          <p class="testimonials__role">${t.role}</p>
        </div>
      </div>
      <p class="testimonials__quote">"${t.quote}"</p>
      <div class="testimonials__stars">${'<span class="material-symbols-outlined">star</span>'.repeat(t.rating || 5)}</div>
    </div>
  `).join('');
}

// ====================================================
// GALLERY
// ====================================================
export async function loadGallery() {
  const items = await fetchCollection('gallery');
  if (!items.length) return;

  const grid = document.querySelector('.gallery__grid');
  if (!grid) return;

  grid.innerHTML = items.map(g => `
    <div class="gallery__item ${g.layout === 'tall' ? 'gallery__item--tall' : g.layout === 'wide' ? 'gallery__item--wide' : ''}" data-caption="${g.caption || ''}">
      <img src="${g.image}" alt="${g.caption || 'Galeri'}" loading="lazy" />
      <div class="gallery__overlay">
        <p>${g.caption || ''}</p>
      </div>
    </div>
  `).join('');
}

// ====================================================
// ACTIVITIES / KEGIATAN
// ====================================================
export async function loadActivities() {
  const items = await fetchCollection('activities');
  return items;
}

export async function loadHomeActivities() {
  const items = await fetchCollection('activities');
  if (!items.length) return;

  const grid = document.querySelector('.activities__grid');
  if (!grid) return;

  // Show max 3 on home
  const shown = items.slice(0, 3);
  grid.innerHTML = shown.map((a, i) => `
    <a href="/kegiatan-detail.html?id=${a.id}" class="activities__card reveal-up" ${i > 0 ? `style="--delay: ${i * 0.15}s"` : ''}>
      <div class="activities__card-image">
        <img src="${a.image}" alt="${a.title}" loading="lazy" />
      </div>
      <div class="activities__card-body">
        <span class="activities__tag">${a.category}</span>
        <h4 class="activities__card-title">${a.title}</h4>
        <p class="activities__card-desc">${a.summary}</p>
      </div>
    </a>
  `).join('');
}

// ====================================================
// LOAD ALL FOR HOME PAGE
// ====================================================
export async function loadHomePage() {
  try {
    await Promise.all([
      loadContact(),
      loadHero(),
      loadStats(),
      loadHomePrograms(),
      loadAdvantages(),
      loadTestimonials(),
      loadGallery(),
      loadHomeActivities()
    ]);
  } catch (e) {
    console.warn('Firebase belum tersedia, menggunakan konten statis.', e);
  }
}
