import { vehicles } from "../data/vehicles.js";
import { formatINR } from "../utils/price-calculator.js";

const grid = document.querySelector("#vehicleGrid");
if (grid) {
  const search = document.querySelector("#vehicleSearch");
  const category = document.querySelector("#categoryFilter");
  const sort = document.querySelector("#sortFilter");
  const count = document.querySelector("#vehicleCount");

  function render() {
    let filtered = vehicles.filter(vehicle => {
      const matchesSearch = `${vehicle.name} ${vehicle.description}`.toLowerCase().includes(search.value.trim().toLowerCase());
      const matchesCategory = category.value === "all" || vehicle.category === category.value;
      return matchesSearch && matchesCategory;
    });
    if (sort.value === "low") filtered.sort((a,b) => a.price-b.price);
    if (sort.value === "high") filtered.sort((a,b) => b.price-a.price);
    count.textContent = `${filtered.length} vehicle${filtered.length === 1 ? "" : "s"} found`;
    grid.innerHTML = filtered.length ? filtered.map(vehicle => `
      <div class="col-md-6 col-lg-4">
        <article class="card vehicle-card h-100 border-0">
          <img src="${vehicle.image}" class="card-img-top" alt="${vehicle.name}" loading="lazy">
          <div class="card-body d-flex flex-column">
            <span class="badge text-bg-success align-self-start mb-2">Available</span>
            <h5 class="vehicle-title">${vehicle.name}</h5>
            <div class="vehicle-price">${formatINR(vehicle.price)} / day</div>
            <p class="text-muted-custom">${vehicle.description}</p>
            <div class="vehicle-features">${vehicle.features.join(" · ")}</div>
            <a href="vehicle-booking.html?id=${encodeURIComponent(vehicle.id)}" class="btn btn-outline-primary w-100 mt-auto">Book this vehicle</a>
          </div>
        </article>
      </div>`).join("") : `<div class="col-12"><div class="alert alert-info">No vehicles match your search.</div></div>`;
  }
  [search, category, sort].forEach(control => control.addEventListener("input", render));
  render();
}
