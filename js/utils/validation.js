export function showMessage(container, message, type="danger") {
  if (!container) return;
  container.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
}
export function clearMessage(container) {
  if (container) container.innerHTML = "";
}
export function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
export function validIndianPhone(value) {
  return /^[6-9]\d{9}$/.test(value);
}
export async function hashText(value) {
  if (!window.crypto?.subtle) return value;
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map(byte => byte.toString(16).padStart(2,"0")).join("");
}
