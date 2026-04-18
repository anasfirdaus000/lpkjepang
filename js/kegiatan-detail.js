/* ================================================
   KEGIATAN DETAIL — Dynamic Content Loader
   Loads from Firebase first, falls back to static data
   ================================================ */
import { activities as staticActivities } from './data.js';
import { loadActivities, loadContact } from './content-loader.js';
import { setLang, getLang, initI18n } from './i18n.js';

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

async function initKegiatanDetail() {
  const activityId = getParam('id');

  // Try Firebase first
  let allActivities = await loadActivities();
  let activity = null;

  if (allActivities && allActivities.length > 0) {
    activity = allActivities.find(a => a.id === activityId);
  }

  // Fallback to static data
  if (!activity) {
    activity = staticActivities[activityId];
    allActivities = Object.values(staticActivities);
  }

  if (!activity) {
    document.getElementById('heroTitle').textContent = 'Artikel Tidak Ditemukan';
    document.getElementById('articleContent').innerHTML = '<p>Artikel yang Anda cari tidak tersedia. <a href="/kegiatan.html" style="color:var(--primary);font-weight:600;">Kembali ke halaman kegiatan</a></p>';
    return;
  }

  const tVal = (obj) => typeof obj === 'string' ? obj : (obj ? obj[getLang()] || obj.id || '' : '');
  const tArr = (obj) => Array.isArray(obj) && typeof obj[0] === 'string' ? obj : (obj ? obj[getLang()] || obj.id || [] : []);

  function renderDOM() {
    const curTitle = tVal(activity.title);

    // Update page title
    document.title = `${curTitle} — LPK Fujisaki Gakuin Center`;

    // Hero
    document.getElementById('heroBg').style.backgroundImage = `url(${activity.image})`;
    document.getElementById('heroBadge').textContent = activity.category;
    document.getElementById('heroTitle').textContent = curTitle;
    document.getElementById('heroMeta').innerHTML = `
      <span class="material-symbols-outlined">calendar_today</span> ${activity.date}
    `;

    // Article content
    const content = tArr(activity.content);
    document.getElementById('articleContent').innerHTML = content.map(p => `<p>${p}</p>`).join('');

    // Highlights
    const highlights = tArr(activity.highlights);
    document.getElementById('highlightsContent').innerHTML = highlights.map(h => `
      <li><span class="material-symbols-outlined">check_circle</span> ${h}</li>
    `).join('');

    // Related activities
    const related = (allActivities || []).filter(a => a.id !== activity.id).slice(0, 3);
    document.getElementById('relatedActivities').innerHTML = related.map(a => `
      <a href="/kegiatan-detail.html?id=${a.id}" class="detail-related">
        <div class="detail-related__image">
          <img src="${a.image}" alt="${tVal(a.title)}" loading="lazy" />
        </div>
        <div>
          <div class="detail-related__title">${tVal(a.title)}</div>
          <div class="detail-related__date">${a.date}</div>
        </div>
      </a>
    `).join('');

    // Share buttons
    const shareUrl = window.location.href;
    const shareText = `${curTitle} — LPK Fujisaki Gakuin Center`;

    // Replace old event listeners by cloning node to avoid dupes (since renderDOM runs multiple times)
    const shareWaBtn = document.getElementById('shareWa');
    const newShareWa = shareWaBtn.cloneNode(true);
    shareWaBtn.parentNode.replaceChild(newShareWa, shareWaBtn);
    newShareWa.addEventListener('click', () => {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\\n' + shareUrl)}`, '_blank');
    });

    const shareCopyBtn = document.getElementById('shareCopy');
    const newShareCopy = shareCopyBtn.cloneNode(true);
    shareCopyBtn.parentNode.replaceChild(newShareCopy, shareCopyBtn);
    newShareCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(shareUrl).then(() => {
        newShareCopy.innerHTML = '<span class="material-symbols-outlined">check</span> Tersalin!';
        setTimeout(() => {
          newShareCopy.innerHTML = '<span class="material-symbols-outlined">content_copy</span> Salin Link';
        }, 2000);
      });
    });
  }

  renderDOM();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(renderDOM, 50);
    });
  });

  // Update WA links with contact data
  await loadContact();
  setLang(getLang());
}

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
  initKegiatanDetail();
  initScrollReveal();
  initI18n();
});
