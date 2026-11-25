const KEYS = { users:"vrafm_users", session:"vrafm_session", bookings:"vrafm_bookings", theme:"vrafm_theme" };

export function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Could not read ${key}:`, error);
    return fallback;
  }
}
export function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export const getUsers = () => read(KEYS.users, []);
export const saveUsers = value => write(KEYS.users, value);
export const getSession = () => read(KEYS.session, null);
export const saveSession = value => write(KEYS.session, value);
export const clearSession = () => localStorage.removeItem(KEYS.session);
export const getBookings = () => read(KEYS.bookings, []);
export const saveBookings = value => write(KEYS.bookings, value);
export const themeKey = KEYS.theme;
