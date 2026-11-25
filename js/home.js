import { vehicles } from "./data/vehicles.js";
import { formatINR } from "./utils/price-calculator.js";
import { initTheme } from "./utils/theme.js";
import { renderAuthLinks } from "./auth/auth.js";

const target = document.querySelector("#featuredVehicles");
if (target) {
  target.innerHTML = vehicles.slice(0,3).map(vehicle => `
    <div class="col-md-4">
      <div class="card vehicle-card h-100 border-0">
        <img src="${vehicle.image}" class="card-img-top" alt="${vehicle.name}" loading="lazy">
        <div class="card-body d-flex flex-column">
          <h5 class="vehicle-title">${vehicle.name}</h5>
          <div class="vehicle-price">${formatINR(vehicle.price)} / day</div>
          <div class="vehicle-features">${vehicle.features.join(" · ")}</div>
          <a href="vehicles.html" class="btn btn-outline-primary w-100 mt-auto">View Details</a>
        </div>
      </div>
    </div>`).join("");
}
initTheme();
renderAuthLinks();
