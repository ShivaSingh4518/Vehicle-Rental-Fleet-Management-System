import { getSession, clearSession } from "../utils/storage.js";

export function requireLogin() {
  if (!getSession()) {
    window.location.href = "login.html?next=vehicle-booking.html";
    return false;
  }
  return true;
}
export function renderAuthLinks() {
  const session = getSession();
  const slot = document.querySelector("[data-auth-slot]");
  if (!slot) return;
  if (session) {
    slot.innerHTML = `<span class="nav-link">Hi, ${escapeHtml(session.name)}</span><button class="btn btn-outline-danger btn-sm ms-lg-2" id="logoutButton">Logout</button>`;
    document.querySelector("#logoutButton").addEventListener("click", () => {
      clearSession();
      window.location.href = "index.html";
    });
  }
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
