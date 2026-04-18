/* ================================================
   ADMIN DASHBOARD — Full CRUD Logic
   ================================================ */
import { db, auth, uploadToCloudinary } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  collection, doc, getDocs, getDoc, setDoc, addDoc, updateDoc, deleteDoc, orderBy, query
} from 'firebase/firestore';
import { seedAllData } from './seed-data.js';
import { setLang, getLang } from './i18n.js';

// ---- Admin Language Toggle ----
function applyAdminLang(lang) {
  setLang(lang);
  document.body.setAttribute('data-admin-lang', lang);
  
  // Re-sync sidebar text if active
  const activeLink = document.querySelector('.sidebar__link.active');
  if (activeLink && topbarTitle) {
    topbarTitle.textContent = activeLink.textContent.trim();
  }
}

document.querySelectorAll('.admin-lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyAdminLang(btn.dataset.lang);
  });
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  applyAdminLang(getLang());
});

// ---- Auth Guard ----
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = '/admin.html';
    return;
  }
  document.getElementById('adminUserEmail').textContent = user.email;
  loadAllData();
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = '/admin.html';
});

// ---- Utils ----
function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  const icon = document.getElementById('toastIcon');
  const msgEl = document.getElementById('toastMsg');
  t.className = 'toast' + (isError ? ' error' : '');
  icon.textContent = isError ? 'error' : 'check_circle';
  msgEl.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function showLoading(show) {
  document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
}

function setupImageUpload(uploadId, previewId, placeholderId, fileInputId) {
  const wrap = document.getElementById(uploadId);
  const preview = document.getElementById(previewId);
  const placeholder = document.getElementById(placeholderId);
  const fileInput = document.getElementById(fileInputId);

  wrap.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        preview.src = ev.target.result;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  });
}

async function handleImageUpload(fileInputId, existingUrl = '') {
  const fileInput = document.getElementById(fileInputId);
  if (fileInput.files.length > 0) {
    return await uploadToCloudinary(fileInput.files[0]);
  }
  return existingUrl;
}

function clearForm(formId) {
  document.getElementById(formId).reset();
  // Clear image previews
  document.querySelectorAll(`#${formId} .image-upload img`).forEach(img => { img.style.display = 'none'; img.src = ''; });
  document.querySelectorAll(`#${formId} .image-upload__placeholder`).forEach(p => { p.style.display = 'flex'; });
}

// ---- Sidebar Navigation ----
const sidebarLinks = document.querySelectorAll('.sidebar__link[data-section]');
const panels = document.querySelectorAll('.admin-panel');
const topbarTitle = document.getElementById('topbarTitle');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');

sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebarLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    panels.forEach(p => p.style.display = 'none');
    document.getElementById(`panel-${link.dataset.section}`).style.display = 'block';
    topbarTitle.textContent = link.textContent.trim();
    sidebar.classList.remove('open');
  });
});

sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));

// ---- Setup Image Uploads ----
setupImageUpload('heroImageUpload', 'heroImagePreview', 'heroImagePlaceholder', 'heroImageFile');
setupImageUpload('aboutImageUpload', 'aboutImagePreview', 'aboutImagePlaceholder', 'aboutImageFile');
setupImageUpload('progImageUpload', 'progImagePreview', 'progImagePlaceholder', 'progImageFile');
setupImageUpload('testiImageUpload', 'testiImagePreview', 'testiImagePlaceholder', 'testiImageFile');
setupImageUpload('galImageUpload', 'galImagePreview', 'galImagePlaceholder', 'galImageFile');
setupImageUpload('actImageUpload', 'actImagePreview', 'actImagePlaceholder', 'actImageFile');

// ====================================================
// LOAD ALL DATA
// ====================================================
async function loadAllData() {
  showLoading(true);
  try {
    await Promise.allSettled([
      loadHero(), loadAbout(), loadStats(), loadPrograms(), loadAdvantages(),
      loadTestimonials(), loadGallery(), loadActivities(), loadContact()
    ]);
    updateOverviewStats();
  } catch (e) {
    console.error('Data load error:', e);
  }
  showLoading(false);
}

// ---- Language Switcher Listeners ----
document.querySelectorAll('.admin-lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    document.querySelectorAll('.admin-lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyAdminLang(lang);
  });
});

// ---- Overview Stats ----
function updateOverviewStats() {
  const getV = (id) => document.getElementById(id)?.value || '';
  
  const heroStatus = (getV('heroTitleId') || getV('heroTitleJa')) ? '✅ Aktif' : '❌ Kosong';
  document.getElementById('ovHero').textContent = heroStatus;
  
  const aboutStatus = (getV('aboutDesc1Id') || getV('aboutDesc1Ja')) ? '✅ Aktif' : '❌ Kosong';
  document.getElementById('ovAbout').textContent = aboutStatus;
  
  document.getElementById('ovStats').textContent = (statsData || []).length;
  document.getElementById('ovPrograms').textContent = (programsData || []).length;
  document.getElementById('ovAdvantages').textContent = (advantagesData || []).length;
  document.getElementById('ovTestimonials').textContent = (testimonialsData || []).length;
  document.getElementById('ovGallery').textContent = (galleryData || []).length;
  document.getElementById('ovActivities').textContent = (activitiesData || []).length;
  
  const contactStatus = getV('contactWa').length > 5 ? '✅ Aktif' : '❌ Kosong';
  document.getElementById('ovContact').textContent = contactStatus;
}

// ---- Repair/Sync Database Button ----
document.getElementById('repairDbBtn').addEventListener('click', async () => {
  if (!confirm('Apakah Anda yakin ingin menyinkronkan ulang seluruh database? Data lama Anda akan diperbarui ke format bilingual (ID/JA) sesuai standar sistem baru. Pastikan Anda telah mencadangkan data penting jika ada.')) return;
  
  showLoading(true);
  const logEl = document.getElementById('seedLog');
  logEl.innerHTML = '';

  try {
    const result = await seedAllData((msg) => {
      const line = document.createElement('div');
      line.textContent = msg;
      logEl.appendChild(line);
      logEl.scrollTop = logEl.scrollHeight;
    }, true); // true = overwrite mode

    if (result.errors.length > 0) {
      showToast('Sinkronisasi selesai dengan beberapa error', true);
    } else {
      showToast('Database berhasil disinkronkan & diperbaiki!');
      await loadAllData();
    }
  } catch (e) {
    showToast('Gagal sinkronisasi: ' + e.message, true);
  }
  showLoading(false);
});

// ====================================================
// 1. HERO SECTION
// ====================================================
async function loadHero() {
  const snap = await getDoc(doc(db, 'settings', 'hero'));
  if (snap.exists()) {
    const d = snap.data();
    const v = (field) => (typeof field === 'object' && field !== null) ? field : { id: field || '', ja: '' };
    
    document.getElementById('heroBadgeId').value = v(d.badge).id;
    document.getElementById('heroBadgeJa').value = v(d.badge).ja;
    document.getElementById('heroTitleId').value = v(d.title).id;
    document.getElementById('heroTitleJa').value = v(d.title).ja;
    document.getElementById('heroHighlightId').value = v(d.highlight).id;
    document.getElementById('heroHighlightJa').value = v(d.highlight).ja;
    document.getElementById('heroSubtitleId').value = v(d.subtitle).id;
    document.getElementById('heroSubtitleJa').value = v(d.subtitle).ja;
    document.getElementById('heroStatNumber').value = d.statNumber || '';
    document.getElementById('heroStatLabelId').value = v(d.statLabel).id;
    document.getElementById('heroStatLabelJa').value = v(d.statLabel).ja;
    
    if (d.image) {
      document.getElementById('heroImagePreview').src = d.image;
      document.getElementById('heroImagePreview').style.display = 'block';
      document.getElementById('heroImagePlaceholder').style.display = 'none';
    }
  }
}

document.getElementById('heroForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading(true);
  try {
    const existing = (await getDoc(doc(db, 'settings', 'hero'))).data() || {};
    const image = await handleImageUpload('heroImageFile', existing.image || '');
    await setDoc(doc(db, 'settings', 'hero'), {
      badge: { id: document.getElementById('heroBadgeId').value, ja: document.getElementById('heroBadgeJa').value },
      title: { id: document.getElementById('heroTitleId').value, ja: document.getElementById('heroTitleJa').value },
      highlight: { id: document.getElementById('heroHighlightId').value, ja: document.getElementById('heroHighlightJa').value },
      subtitle: { id: document.getElementById('heroSubtitleId').value, ja: document.getElementById('heroSubtitleJa').value },
      statNumber: document.getElementById('heroStatNumber').value,
      statLabel: { id: document.getElementById('heroStatLabelId').value, ja: document.getElementById('heroStatLabelJa').value },
      image
    });
    showToast('Hero section berhasil disimpan!');
    updateOverviewStats();
  } catch (e) { showToast('Gagal menyimpan: ' + e.message, true); }
  showLoading(false);
});

// ====================================================
// 1.5 TENTANG KAMI SECTION
// ====================================================
async function loadAbout() {
  const snap = await getDoc(doc(db, 'settings', 'about'));
  if (snap.exists()) {
    const d = snap.data();
    document.getElementById('aboutDesc1Id').value = d.desc1?.id || '';
    document.getElementById('aboutDesc1Ja').value = d.desc1?.ja || '';
    document.getElementById('aboutDesc2Id').value = d.desc2?.id || '';
    document.getElementById('aboutDesc2Ja').value = d.desc2?.ja || '';
    if (d.image) {
      document.getElementById('aboutImagePreview').src = d.image;
      document.getElementById('aboutImagePreview').style.display = 'block';
      document.getElementById('aboutImagePlaceholder').style.display = 'none';
    }
  }
}

document.getElementById('aboutForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading(true);
  try {
    const existing = (await getDoc(doc(db, 'settings', 'about'))).data() || {};
    const image = await handleImageUpload('aboutImageFile', existing.image || '');
    await setDoc(doc(db, 'settings', 'about'), {
      desc1: {
        id: document.getElementById('aboutDesc1Id').value,
        ja: document.getElementById('aboutDesc1Ja').value
      },
      desc2: {
        id: document.getElementById('aboutDesc2Id').value,
        ja: document.getElementById('aboutDesc2Ja').value
      },
      image
    });
    showToast('Tentang Kami berhasil disimpan!');
  } catch (e) { showToast('Gagal menyimpan: ' + e.message, true); }
  showLoading(false);
});

// ====================================================
// 2. STATS / PENCAPAIAN
// ====================================================
let statsData = [];

async function loadStats() {
  const snap = await getDocs(query(collection(db, 'stats'), orderBy('order')));
  statsData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  renderStats();
}

function renderStats() {
  const container = document.getElementById('statsItems');
  container.innerHTML = statsData.map(s => {
    const sLabel = (typeof s.label === 'object') ? s.label.id : s.label;
    return `
    <div class="admin-item">
      <span class="material-symbols-outlined admin-item__icon">${s.icon}</span>
      <div class="admin-item__info">
        <div class="admin-item__title">${s.number}${s.suffix} — ${sLabel}</div>
      </div>
      <div class="admin-item__actions">
        <button class="btn-admin-icon btn-admin-icon--edit" onclick="editStat('${s.id}')"><span class="material-symbols-outlined">edit</span></button>
        <button class="btn-admin-icon btn-admin-icon--delete" onclick="deleteStat('${s.id}')"><span class="material-symbols-outlined">delete</span></button>
      </div>
    </div>
  `}).join('');
}

document.getElementById('addStatBtn').addEventListener('click', () => {
  clearForm('statForm');
  document.getElementById('statId').value = '';
  document.getElementById('statFormTitle').textContent = 'Tambah Pencapaian';
  document.getElementById('statFormWrap').style.display = 'block';
});
document.getElementById('cancelStat').addEventListener('click', () => {
  document.getElementById('statFormWrap').style.display = 'none';
});

window.editStat = function(id) {
  const s = statsData.find(x => x.id === id);
  if (!s) return;
  const v = (field) => typeof field === 'object' && field !== null ? field : { id: field || '', ja: '' };
  
  document.getElementById('statId').value = s.id;
  document.getElementById('statIcon').value = s.icon;
  document.getElementById('statNumber').value = s.number;
  document.getElementById('statSuffix').value = s.suffix;
  document.getElementById('statLabel').value = v(s.label).id;
  document.getElementById('statLabelJa').value = v(s.label).ja;
  document.getElementById('statFormTitle').textContent = 'Edit Pencapaian';
  document.getElementById('statFormWrap').style.display = 'block';
};

window.deleteStat = async function(id) {
  if (!confirm('Hapus item ini?')) return;
  showLoading(true);
  await deleteDoc(doc(db, 'stats', id));
  await loadStats();
  showToast('Item dihapus');
  showLoading(false);
};

document.getElementById('statForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading(true);
  try {
    const id = document.getElementById('statId').value;
    const data = {
      icon: document.getElementById('statIcon').value,
      number: parseInt(document.getElementById('statNumber').value),
      suffix: document.getElementById('statSuffix').value,
      label: { 
        id: document.getElementById('statLabel').value, 
        ja: document.getElementById('statLabelJa').value 
      },
      order: statsData.length
    };
    if (id) { await updateDoc(doc(db, 'stats', id), data); }
    else { await addDoc(collection(db, 'stats'), data); }
    document.getElementById('statFormWrap').style.display = 'none';
    await loadStats();
    showToast('Pencapaian berhasil disimpan!');
  } catch (e) { showToast('Gagal: ' + e.message, true); }
  showLoading(false);
});

// ====================================================
// 3. PROGRAMS
// ====================================================
let programsData = [];

async function loadPrograms() {
  const snap = await getDocs(collection(db, 'programs_v2'));
  programsData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  renderPrograms();
}

function renderPrograms() {
  const container = document.getElementById('programItems');
  container.innerHTML = programsData.map(p => {
    const pTitle = (typeof p.title === 'object') ? p.title.id : p.title;
    return `
    <div class="admin-item">
      <span class="material-symbols-outlined admin-item__icon">school</span>
      <div class="admin-item__info">
        <div class="admin-item__title">${pTitle}</div>
        <div class="admin-item__meta">${p.slug} — ${ (typeof p.duration === 'object') ? p.duration.id : (p.duration || '') }</div>
      </div>
      ${p.heroImage ? `<img src="${p.heroImage}" class="admin-item__thumb" alt="" />` : ''}
      <div class="admin-item__actions">
        <button class="btn-admin-icon btn-admin-icon--edit" onclick="editProgram('${p.id}')"><span class="material-symbols-outlined">edit</span></button>
        <button class="btn-admin-icon btn-admin-icon--delete" onclick="deleteProgram('${p.id}')"><span class="material-symbols-outlined">delete</span></button>
      </div>
    </div>
  `}).join('');
}

document.getElementById('addProgramBtn').addEventListener('click', () => {
  clearForm('programForm');
  document.getElementById('progId').value = '';
  document.getElementById('programFormTitle').textContent = 'Tambah Program';
  document.getElementById('programFormWrap').style.display = 'block';
});
document.getElementById('cancelProgram').addEventListener('click', () => {
  document.getElementById('programFormWrap').style.display = 'none';
});

window.editProgram = function(id) {
  const p = programsData.find(x => x.id === id);
  if (!p) return;
  document.getElementById('progId').value = p.id;
  document.getElementById('progSlug').value = p.slug || '';
  document.getElementById('progBadge').value = p.badge || '';
  const v = (field) => typeof field === 'object' && field !== null ? field : { id: field || '', ja: '' };
  document.getElementById('progBadge').value = p.badge || '';
  document.getElementById('progTitle').value = v(p.title).id;
  document.getElementById('progTitleJa').value = v(p.title).ja;
  document.getElementById('progTagline').value = v(p.tagline).id;
  document.getElementById('progTaglineJa').value = v(p.tagline).ja;
  document.getElementById('progDesc').value = v(p.description).id;
  document.getElementById('progDescJa').value = v(p.description).ja;
  document.getElementById('progDuration').value = v(p.duration).id;
  document.getElementById('progDurationJa').value = v(p.duration).ja;
  document.getElementById('progLevel').value = v(p.level).id;
  document.getElementById('progLevelJa').value = v(p.level).ja;
  document.getElementById('progCertificate').value = p.certificate || '';
  document.getElementById('progSeats').value = p.seats || '';
  
  const vArr = (field) => {
    if (!field) return { id: [], ja: [] };
    if (field.id && field.ja) return field;
    if (Array.isArray(field)) return { id: field, ja: [] };
    return { id: [], ja: [] };
  };

  const toCleanArr = (arr) => arr.map(item => (typeof item === 'object' && item !== null) ? (item.id || '') : item);

  document.getElementById('progOverview').value = toCleanArr(vArr(p.overview).id).join('\n\n');
  document.getElementById('progOverviewJa').value = toCleanArr(vArr(p.overview).ja).join('\n\n');
  document.getElementById('progFeatures').value = toCleanArr(vArr(p.features).id).join('\n');
  document.getElementById('progFeaturesJa').value = toCleanArr(vArr(p.features).ja).join('\n');
  document.getElementById('progRequirements').value = toCleanArr(vArr(p.requirements).id).join('\n');
  document.getElementById('progRequirementsJa').value = toCleanArr(vArr(p.requirements).ja).join('\n');
  document.getElementById('progCurriculum').value = toCleanArr(vArr(p.curriculum).id).join('\n');
  document.getElementById('progCurriculumJa').value = toCleanArr(vArr(p.curriculum).ja).join('\n');
  
  const parseBen = (b) => {
    const bTitle = (typeof b.title === 'object') ? b.title.id : b.title;
    const bDesc = (typeof b.desc === 'object') ? b.desc.id : b.desc;
    return `${b.icon || ''}|${bTitle || ''}|${bDesc || ''}`;
  };
  const parseBenJa = (b) => {
    const bTitle = (typeof b.title === 'object') ? b.title.ja : b.title;
    const bDesc = (typeof b.desc === 'object') ? b.desc.ja : b.desc;
    return `${b.icon || ''}|${bTitle || ''}|${bDesc || ''}`;
  };

  document.getElementById('progBenefits').value = vArr(p.benefits).id.map(parseBen).join('\n');
  document.getElementById('progBenefitsJa').value = vArr(p.benefits).ja.map(parseBenJa).join('\n');
  
  document.getElementById('progWaText').value = p.whatsappText || '';
  if (p.heroImage) {
    document.getElementById('progImagePreview').src = p.heroImage;
    document.getElementById('progImagePreview').style.display = 'block';
    document.getElementById('progImagePlaceholder').style.display = 'none';
  }
  document.getElementById('programFormTitle').textContent = 'Edit Program';
  document.getElementById('programFormWrap').style.display = 'block';
};

window.deleteProgram = async function(id) {
  if (!confirm('Hapus program ini?')) return;
  showLoading(true);
  await deleteDoc(doc(db, 'programs_v2', id));
  await loadPrograms();
  showToast('Program dihapus');
  showLoading(false);
};

document.getElementById('programForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading(true);
  try {
    const id = document.getElementById('progId').value;
    const existing = id ? (programsData.find(x => x.id === id) || {}) : {};
    const heroImage = await handleImageUpload('progImageFile', existing.heroImage || '');
    const parseBenVal = (raw) => raw.map(line => {
      const [icon, title, desc] = line.split('|');
      return { icon: icon?.trim(), title: title?.trim(), desc: desc?.trim() };
    });
    
    const data = {
      slug: document.getElementById('progSlug').value,
      badge: document.getElementById('progBadge').value,
      title: { id: document.getElementById('progTitle').value, ja: document.getElementById('progTitleJa').value },
      tagline: { id: document.getElementById('progTagline').value, ja: document.getElementById('progTaglineJa').value },
      description: { id: document.getElementById('progDesc').value, ja: document.getElementById('progDescJa').value },
      heroImage,
      duration: { id: document.getElementById('progDuration').value, ja: document.getElementById('progDurationJa').value },
      level: { id: document.getElementById('progLevel').value, ja: document.getElementById('progLevelJa').value },
      certificate: document.getElementById('progCertificate').value,
      seats: document.getElementById('progSeats').value,
      overview: { 
        id: document.getElementById('progOverview').value.split('\n\n').filter(Boolean),
        ja: document.getElementById('progOverviewJa').value.split('\n\n').filter(Boolean)
      },
      features: { 
        id: document.getElementById('progFeatures').value.split('\n').filter(Boolean),
        ja: document.getElementById('progFeaturesJa').value.split('\n').filter(Boolean)
      },
      requirements: { 
        id: document.getElementById('progRequirements').value.split('\n').filter(Boolean),
        ja: document.getElementById('progRequirementsJa').value.split('\n').filter(Boolean)
      },
      curriculum: { 
        id: document.getElementById('progCurriculum').value.split('\n').filter(Boolean),
        ja: document.getElementById('progCurriculumJa').value.split('\n').filter(Boolean)
      },
      benefits: {
        id: parseBenVal(document.getElementById('progBenefits').value.trim().split('\n').filter(Boolean)),
        ja: parseBenVal(document.getElementById('progBenefitsJa').value.trim().split('\n').filter(Boolean))
      },
      whatsappText: document.getElementById('progWaText').value
    };
    if (id) { await updateDoc(doc(db, 'programs_v2', id), data); }
    else { await addDoc(collection(db, 'programs_v2'), data); }
    document.getElementById('programFormWrap').style.display = 'none';
    await loadPrograms();
    showToast('Program berhasil disimpan!');
  } catch (e) { showToast('Gagal: ' + e.message, true); }
  showLoading(false);
});

// ====================================================
// 4. ADVANTAGES
// ====================================================
let advantagesData = [];

async function loadAdvantages() {
  const snap = await getDocs(query(collection(db, 'advantages'), orderBy('order')));
  advantagesData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  renderAdvantages();
}

function renderAdvantages() {
  const container = document.getElementById('advantageItems');
  container.innerHTML = advantagesData.map(a => {
    const aTitle = (typeof a.title === 'object') ? a.title.id : a.title;
    const aDesc = (typeof a.description === 'object') ? a.description.id : (a.description || '');
    return `
    <div class="admin-item">
      <span class="material-symbols-outlined admin-item__icon">${a.icon}</span>
      <div class="admin-item__info">
        <div class="admin-item__title">${aTitle}</div>
        <div class="admin-item__meta">${aDesc.substring(0, 60)}...</div>
      </div>
      <div class="admin-item__actions">
        <button class="btn-admin-icon btn-admin-icon--edit" onclick="editAdvantage('${a.id}')"><span class="material-symbols-outlined">edit</span></button>
        <button class="btn-admin-icon btn-admin-icon--delete" onclick="deleteAdvantage('${a.id}')"><span class="material-symbols-outlined">delete</span></button>
      </div>
    </div>
  `}).join('');
}

document.getElementById('addAdvantageBtn').addEventListener('click', () => {
  clearForm('advantageForm');
  document.getElementById('advId').value = '';
  document.getElementById('advantageFormTitle').textContent = 'Tambah Keunggulan';
  document.getElementById('advantageFormWrap').style.display = 'block';
});
document.getElementById('cancelAdvantage').addEventListener('click', () => {
  document.getElementById('advantageFormWrap').style.display = 'none';
});

window.editAdvantage = function(id) {
  const a = advantagesData.find(x => x.id === id);
  if (!a) return;
  const v = (field) => typeof field === 'object' && field !== null ? field : { id: field || '', ja: '' };
  
  document.getElementById('advId').value = a.id;
  document.getElementById('advIcon').value = a.icon;
  document.getElementById('advTitle').value = v(a.title).id;
  document.getElementById('advTitleJa').value = v(a.title).ja;
  document.getElementById('advDesc').value = v(a.description).id;
  document.getElementById('advDescJa').value = v(a.description).ja;
  document.getElementById('advantageFormTitle').textContent = 'Edit Keunggulan';
  document.getElementById('advantageFormWrap').style.display = 'block';
};

window.deleteAdvantage = async function(id) {
  if (!confirm('Hapus keunggulan ini?')) return;
  showLoading(true);
  await deleteDoc(doc(db, 'advantages', id));
  await loadAdvantages();
  showToast('Keunggulan dihapus');
  showLoading(false);
};

document.getElementById('advantageForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading(true);
  try {
    const id = document.getElementById('advId').value;
    const data = {
      icon: document.getElementById('advIcon').value,
      title: { id: document.getElementById('advTitle').value, ja: document.getElementById('advTitleJa').value },
      description: { id: document.getElementById('advDesc').value, ja: document.getElementById('advDescJa').value },
      order: advantagesData.length
    };
    if (id) { await updateDoc(doc(db, 'advantages', id), data); }
    else { await addDoc(collection(db, 'advantages'), data); }
    document.getElementById('advantageFormWrap').style.display = 'none';
    await loadAdvantages();
    showToast('Keunggulan berhasil disimpan!');
  } catch (e) { showToast('Gagal: ' + e.message, true); }
  showLoading(false);
});

// ====================================================
// 5. TESTIMONIALS
// ====================================================
let testimonialsData = [];

async function loadTestimonials() {
  const snap = await getDocs(collection(db, 'testimonials'));
  testimonialsData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  renderTestimonials();
}

function renderTestimonials() {
  const container = document.getElementById('testimonialItems');
  container.innerHTML = testimonialsData.map(t => `
    <div class="admin-item">
      ${t.image ? `<img src="${t.image}" class="admin-item__thumb" style="border-radius:50%;width:44px;height:44px;" alt="" />` : '<span class="material-symbols-outlined admin-item__icon">person</span>'}
      <div class="admin-item__info">
        <div class="admin-item__title">${t.name}</div>
        <div class="admin-item__meta">${t.role} — ${'⭐'.repeat(t.rating || 5)}</div>
      </div>
      <div class="admin-item__actions">
        <button class="btn-admin-icon btn-admin-icon--edit" onclick="editTestimonial('${t.id}')"><span class="material-symbols-outlined">edit</span></button>
        <button class="btn-admin-icon btn-admin-icon--delete" onclick="deleteTestimonial('${t.id}')"><span class="material-symbols-outlined">delete</span></button>
      </div>
    </div>
  `).join('');
}

document.getElementById('addTestimonialBtn').addEventListener('click', () => {
  clearForm('testimonialForm');
  document.getElementById('testiId').value = '';
  document.getElementById('testimonialFormTitle').textContent = 'Tambah Testimoni';
  document.getElementById('testimonialFormWrap').style.display = 'block';
});
document.getElementById('cancelTestimonial').addEventListener('click', () => {
  document.getElementById('testimonialFormWrap').style.display = 'none';
});

window.editTestimonial = function(id) {
  const t = testimonialsData.find(x => x.id === id);
  if (!t) return;
  document.getElementById('testiId').value = t.id;
  document.getElementById('testiName').value = t.name;
  document.getElementById('testiRole').value = t.role;
  document.getElementById('testiQuote').value = t.quote;
  document.getElementById('testiRating').value = t.rating;
  if (t.image) {
    document.getElementById('testiImagePreview').src = t.image;
    document.getElementById('testiImagePreview').style.display = 'block';
    document.getElementById('testiImagePlaceholder').style.display = 'none';
  }
  document.getElementById('testimonialFormTitle').textContent = 'Edit Testimoni';
  document.getElementById('testimonialFormWrap').style.display = 'block';
};

window.deleteTestimonial = async function(id) {
  if (!confirm('Hapus testimoni ini?')) return;
  showLoading(true);
  await deleteDoc(doc(db, 'testimonials', id));
  await loadTestimonials();
  showToast('Testimoni dihapus');
  showLoading(false);
};

document.getElementById('testimonialForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading(true);
  try {
    const id = document.getElementById('testiId').value;
    const existing = id ? (testimonialsData.find(x => x.id === id) || {}) : {};
    const image = await handleImageUpload('testiImageFile', existing.image || '');
    const data = {
      name: document.getElementById('testiName').value,
      role: document.getElementById('testiRole').value,
      quote: document.getElementById('testiQuote').value,
      rating: parseInt(document.getElementById('testiRating').value),
      image
    };
    if (id) { await updateDoc(doc(db, 'testimonials', id), data); }
    else { await addDoc(collection(db, 'testimonials'), data); }
    document.getElementById('testimonialFormWrap').style.display = 'none';
    await loadTestimonials();
    showToast('Testimoni berhasil disimpan!');
  } catch (e) { showToast('Gagal: ' + e.message, true); }
  showLoading(false);
});

// ====================================================
// 6. GALLERY
// ====================================================
let galleryData = [];

async function loadGallery() {
  const snap = await getDocs(collection(db, 'gallery'));
  galleryData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  renderGallery();
}

function renderGallery() {
  const container = document.getElementById('galleryItems');
  container.innerHTML = galleryData.map(g => `
    <div class="admin-gallery-item">
      <img src="${g.image}" alt="${g.caption || ''}" />
      <div class="admin-gallery-item__overlay">
        <button class="btn-admin-icon btn-admin-icon--edit" onclick="editGallery('${g.id}')" style="background:rgba(255,255,255,0.2);"><span class="material-symbols-outlined" style="color:#fff;">edit</span></button>
        <button class="btn-admin-icon btn-admin-icon--delete" onclick="deleteGallery('${g.id}')" style="background:rgba(255,255,255,0.2);"><span class="material-symbols-outlined" style="color:#fff;">delete</span></button>
      </div>
    </div>
  `).join('');
}

document.getElementById('addGalleryBtn').addEventListener('click', () => {
  clearForm('galleryForm');
  document.getElementById('galId').value = '';
  document.getElementById('galleryFormTitle').textContent = 'Tambah Foto Galeri';
  document.getElementById('galleryFormWrap').style.display = 'block';
});
document.getElementById('cancelGallery').addEventListener('click', () => {
  document.getElementById('galleryFormWrap').style.display = 'none';
});

window.editGallery = function(id) {
  const g = galleryData.find(x => x.id === id);
  if (!g) return;
  document.getElementById('galId').value = g.id;
  document.getElementById('galCaption').value = g.caption || '';
  document.getElementById('galLayout').value = g.layout || 'normal';
  if (g.image) {
    document.getElementById('galImagePreview').src = g.image;
    document.getElementById('galImagePreview').style.display = 'block';
    document.getElementById('galImagePlaceholder').style.display = 'none';
  }
  document.getElementById('galleryFormTitle').textContent = 'Edit Foto Galeri';
  document.getElementById('galleryFormWrap').style.display = 'block';
};

window.deleteGallery = async function(id) {
  if (!confirm('Hapus foto ini?')) return;
  showLoading(true);
  await deleteDoc(doc(db, 'gallery', id));
  await loadGallery();
  showToast('Foto dihapus');
  showLoading(false);
};

document.getElementById('galleryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading(true);
  try {
    const id = document.getElementById('galId').value;
    const existing = id ? (galleryData.find(x => x.id === id) || {}) : {};
    const image = await handleImageUpload('galImageFile', existing.image || '');
    if (!image) { showToast('Gambar harus diupload', true); showLoading(false); return; }
    const data = {
      image,
      caption: document.getElementById('galCaption').value,
      layout: document.getElementById('galLayout').value
    };
    if (id) { await updateDoc(doc(db, 'gallery', id), data); }
    else { await addDoc(collection(db, 'gallery'), data); }
    document.getElementById('galleryFormWrap').style.display = 'none';
    await loadGallery();
    showToast('Foto berhasil disimpan!');
  } catch (e) { showToast('Gagal: ' + e.message, true); }
  showLoading(false);
});

// ====================================================
// 7. ACTIVITIES / KEGIATAN
// ====================================================
let activitiesData = [];

async function loadActivities() {
  const snap = await getDocs(collection(db, 'activities'));
  activitiesData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  renderActivities();
}

function renderActivities() {
  const container = document.getElementById('activityItems');
  container.innerHTML = activitiesData.map(a => {
    const aTitle = (typeof a.title === 'object') ? a.title.id : a.title;
    return `
    <div class="admin-item">
      ${a.image ? `<img src="${a.image}" class="admin-item__thumb" alt="" />` : '<span class="material-symbols-outlined admin-item__icon">newspaper</span>'}
      <div class="admin-item__info">
        <div class="admin-item__title">${aTitle}</div>
        <div class="admin-item__meta">${a.category} — ${a.date}</div>
      </div>
      <div class="admin-item__actions">
        <button class="btn-admin-icon btn-admin-icon--edit" onclick="editActivity('${a.id}')"><span class="material-symbols-outlined">edit</span></button>
        <button class="btn-admin-icon btn-admin-icon--delete" onclick="deleteActivity('${a.id}')"><span class="material-symbols-outlined">delete</span></button>
      </div>
    </div>
  `}).join('');
}

document.getElementById('addActivityBtn').addEventListener('click', () => {
  clearForm('activityForm');
  document.getElementById('actId').value = '';
  document.getElementById('activityFormTitle').textContent = 'Tambah Kegiatan';
  document.getElementById('activityFormWrap').style.display = 'block';
});
document.getElementById('cancelActivity').addEventListener('click', () => {
  document.getElementById('activityFormWrap').style.display = 'none';
});

window.editActivity = function(id) {
  const a = activitiesData.find(x => x.id === id);
  if (!a) return;
  document.getElementById('actId').value = a.id;
  const v = (field) => typeof field === 'object' && field !== null ? field : { id: field || '', ja: '' };
  document.getElementById('actTitle').value = v(a.title).id;
  document.getElementById('actTitleJa').value = v(a.title).ja;
  document.getElementById('actCategory').value = a.category || '';
  document.getElementById('actDate').value = a.dateRaw || '';
  document.getElementById('actSummary').value = v(a.summary).id;
  document.getElementById('actSummaryJa').value = v(a.summary).ja;
  
  const vArr = (field) => field && field.id ? field : { id: Array.isArray(field)?field:[], ja: [] };
  document.getElementById('actContent').value = vArr(a.content).id.join('\n\n');
  document.getElementById('actContentJa').value = vArr(a.content).ja.join('\n\n');
  document.getElementById('actHighlights').value = vArr(a.highlights).id.join('\n');
  document.getElementById('actHighlightsJa').value = vArr(a.highlights).ja.join('\n');
  if (a.image) {
    document.getElementById('actImagePreview').src = a.image;
    document.getElementById('actImagePreview').style.display = 'block';
    document.getElementById('actImagePlaceholder').style.display = 'none';
  }
  document.getElementById('activityFormTitle').textContent = 'Edit Kegiatan';
  document.getElementById('activityFormWrap').style.display = 'block';
};

window.deleteActivity = async function(id) {
  if (!confirm('Hapus kegiatan ini?')) return;
  showLoading(true);
  await deleteDoc(doc(db, 'activities', id));
  await loadActivities();
  showToast('Kegiatan dihapus');
  showLoading(false);
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

document.getElementById('activityForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading(true);
  try {
    const id = document.getElementById('actId').value;
    const existing = id ? (activitiesData.find(x => x.id === id) || {}) : {};
    const image = await handleImageUpload('actImageFile', existing.image || '');
    const dateRaw = document.getElementById('actDate').value;
    const data = {
      title: { id: document.getElementById('actTitle').value, ja: document.getElementById('actTitleJa').value },
      category: document.getElementById('actCategory').value,
      dateRaw,
      date: formatDate(dateRaw),
      image,
      summary: { id: document.getElementById('actSummary').value, ja: document.getElementById('actSummaryJa').value },
      content: { 
        id: document.getElementById('actContent').value.split('\n\n').filter(Boolean),
        ja: document.getElementById('actContentJa').value.split('\n\n').filter(Boolean)
      },
      highlights: { 
        id: document.getElementById('actHighlights').value.split('\n').filter(Boolean),
        ja: document.getElementById('actHighlightsJa').value.split('\n').filter(Boolean)
      }
    };
    if (id) { await updateDoc(doc(db, 'activities', id), data); }
    else { await addDoc(collection(db, 'activities'), data); }
    document.getElementById('activityFormWrap').style.display = 'none';
    await loadActivities();
    showToast('Kegiatan berhasil disimpan!');
  } catch (e) { showToast('Gagal: ' + e.message, true); }
  showLoading(false);
});

// ====================================================
// 8. CONTACT / WHATSAPP
// ====================================================
async function loadContact() {
  const snap = await getDoc(doc(db, 'settings', 'contact'));
  if (snap.exists()) {
    const d = snap.data();
    const v = (field) => (typeof field === 'object' && field !== null) ? field : { id: field || '', ja: '' };
    
    document.getElementById('contactWa').value = d.whatsapp || '';
    document.getElementById('contactWaTextId').value = v(d.whatsappText).id;
    document.getElementById('contactWaTextJa').value = v(d.whatsappText).ja;
    document.getElementById('contactAddressId').value = v(d.address).id;
    document.getElementById('contactAddressJa').value = v(d.address).ja;
    document.getElementById('contactPhone').value = d.phone || '';
    document.getElementById('contactEmail').value = d.email || '';
  }
}

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading(true);
  try {
    await setDoc(doc(db, 'settings', 'contact'), {
      whatsapp: document.getElementById('contactWa').value,
      whatsappText: { id: document.getElementById('contactWaTextId').value, ja: document.getElementById('contactWaTextJa').value },
      address: { id: document.getElementById('contactAddressId').value, ja: document.getElementById('contactAddressJa').value },
      phone: document.getElementById('contactPhone').value,
      email: document.getElementById('contactEmail').value
    });
    showToast('Kontak berhasil disimpan!');
    updateOverviewStats();
  } catch (e) { showToast('Gagal: ' + e.message, true); }
  showLoading(false);
});

/* Admin Language Switcher Logic */
document.querySelectorAll('.admin-lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.body.setAttribute('data-admin-lang', btn.dataset.lang);
  });
});

