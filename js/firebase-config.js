/* ================================================
   FIREBASE CONFIG — LPK Fujisaki Gakuin
   ================================================ */
import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAds-PUzhjCIeXX6-JI1duxmYVGYQyawgU",
  authDomain: "lpk-fujisaki.firebaseapp.com",
  projectId: "lpk-fujisaki",
  storageBucket: "lpk-fujisaki.firebasestorage.app",
  messagingSenderId: "817776679001",
  appId: "1:817776679001:web:40fe7445a255e3de8b3948",
  measurementId: "G-41N3TJVSZL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Enable offline persistence to severely reduce lag on subsequent visits
enableIndexedDbPersistence(db).catch((err) => {
  console.warn("Firebase persistence error:", err.code);
});

// Cloudinary config
export const cloudinaryConfig = {
  cloudName: 'doaarwjjs',
  apiKey: '792737298387886',
  apiSecret: 'sj80fmB_w9SVKvieYSfyJ-nJ7Zs'
};

export async function uploadToCloudinary(file) {
  const timestamp = Math.round((new Date).getTime() / 1000);
  const folder = 'lpk-fujisaki';
  
  // Create signature string
  const str = 'folder=' + folder + '&timestamp=' + timestamp + cloudinaryConfig.apiSecret;
  
  // Calculate SHA-1 hash for signature
  const msgBuffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', cloudinaryConfig.apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) throw new Error('Upload ke Cloudinary gagal, mohon periksa konfigurasi.');
  const data = await res.json();
  return data.secure_url;
}
