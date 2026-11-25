import { getUsers, saveUsers } from "../utils/storage.js";
import { validEmail, validIndianPhone, showMessage, clearMessage, hashText } from "../utils/validation.js";

const form = document.querySelector("#registerForm");
if (form) {
  const message = document.querySelector("#formMessage");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    clearMessage(message);
    const name = form.fullName.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const phone = form.phone.value.trim();
    const password = form.password.value;
    const confirm = form.confirmPassword.value;
    if (name.length < 2) return showMessage(message, "Please enter your full name.");
    if (!validEmail(email)) return showMessage(message, "Enter a valid email address.");
    if (!validIndianPhone(phone)) return showMessage(message, "Enter a valid 10-digit Indian mobile number.");
    if (password.length < 8) return showMessage(message, "Password must contain at least 8 characters.");
    if (password !== confirm) return showMessage(message, "Passwords do not match.");
    if (!form.terms.checked) return showMessage(message, "Please accept the terms and conditions.");
    const users = getUsers();
    if (users.some(user => user.email === email)) return showMessage(message, "An account with this email already exists.");
    users.push({ id: crypto.randomUUID(), name, email, phone, passwordHash: await hashText(password) });
    saveUsers(users);
    showMessage(message, "Account created successfully. Redirecting to login...", "success");
    form.reset();
    setTimeout(() => window.location.href = "login.html", 900);
  });
}
