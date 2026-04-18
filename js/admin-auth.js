/* ================================================
   ADMIN AUTH — Login/Logout Logic
   ================================================ */
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

// Check if on login page
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  // LOGIN PAGE
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = '/admin-dashboard.html';
    }
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('loginBtn');
    const errorDiv = document.getElementById('loginError');

    btn.disabled = true;
    btn.innerHTML = '<span class="material-symbols-outlined">hourglass_top</span> Memproses...';
    errorDiv.style.display = 'none';

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/admin-dashboard.html';
    } catch (err) {
      errorDiv.style.display = 'block';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        errorDiv.textContent = 'Email atau password salah.';
      } else if (err.code === 'auth/too-many-requests') {
        errorDiv.textContent = 'Terlalu banyak percobaan. Coba lagi nanti.';
      } else {
        errorDiv.textContent = 'Login gagal: ' + err.message;
      }
      btn.disabled = false;
      btn.innerHTML = '<span class="material-symbols-outlined">login</span> Masuk';
    }
  });
}
