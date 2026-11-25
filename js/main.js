import { initTheme } from "./utils/theme.js";
import { renderAuthLinks } from "./auth/auth.js";
import "./auth/login.js";
import "./auth/register.js";
import "./vehicles/vehicle-list.js";
import "./booking/booking.js";
import "./booking/confirmation.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderAuthLinks();
});
