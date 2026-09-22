// login.js — Admin Login logic

const API_BASE = 'http://localhost:3001/api';

const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');
const loginBtn = document.getElementById('loginBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  errorMsg.classList.add('d-none');
  errorMsg.classList.remove('alert-success');
  errorMsg.classList.add('alert-danger');
  loginBtn.disabled = true;
  loginBtn.textContent = 'Checking...';

  try {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminInfo', JSON.stringify(data.admin));

    errorMsg.classList.remove('alert-danger');
    errorMsg.classList.add('alert-success');
    errorMsg.classList.remove('d-none');
    errorMsg.textContent = 'Login Successful! Welcome, ' + data.admin.name;

  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.classList.remove('d-none');
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = 'Login';
  }
});