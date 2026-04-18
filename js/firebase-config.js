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
  uploadPreset: 'lpk_fujisaki_unsigned' // Create this unsigned preset in Cloudinary dashboard
};

export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  formData.append('folder', 'lpk-fujisaki');

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) throw new Error('Upload gagal');
  const data = await res.json();
  return data.secure_url;
}
