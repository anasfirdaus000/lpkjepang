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
  apiKey: '476627687116893',
  apiSecret: 'LjnjEf34WDNBZiiCnx35u1-L6jQ'
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
