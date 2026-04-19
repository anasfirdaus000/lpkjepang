/* ================================================
   FIREBASE CONFIG — LPK Fujisaki Gakuin
   ================================================ */
import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA-f8tRMbd3pWqL_dQ0lAtDoJy8ajMliiw",
  authDomain: "lpk-fujisaki-9e1ff.firebaseapp.com",
  projectId: "lpk-fujisaki-9e1ff",
  storageBucket: "lpk-fujisaki-9e1ff.firebasestorage.app",
  messagingSenderId: "549621172403",
  appId: "1:549621172403:web:26c542e172c3844ef588c6",
  measurementId: "G-ZY0G3F7DGT"
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
  cloudName: 'dvpauyqlw',
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
