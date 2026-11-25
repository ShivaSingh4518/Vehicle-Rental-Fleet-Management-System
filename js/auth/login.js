import { getUsers, saveSession } from "../utils/storage.js";
import { validEmail, showMessage, clearMessage, hashText } from "../utils/validation.js";

const form = document.querySelector("#loginForm");
if (form) {
  const message = document.querySelector("#formMessage");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    clearMessage(message);
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    if (!validEmail(email)) return showMessage(message, "Enter a valid email address.");
    const user = getUsers().find(item => item.email === email);
    if (!user || user.passwordHash !== await hashText(password)) {
      return showMessage(message, "Incorrect email or password.");
    }
    saveSession({ id:user.id, name:user.name, email:user.email, signedInAt:new Date().toISOString() });
    showMessage(message, "Login successful. Redirecting...", "success");
    const next = new URLSearchParams(location.search).get("next");
    setTimeout(() => window.location.href = next === "vehicle-booking.html" ? "vehicle-booking.html" : "index.html", 600);
  });
}
