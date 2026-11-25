(function () {
  "use strict";
  function renderStats() {
    const vehicles = VRAFMVehicles.all();
    const count = status => vehicles.filter(v => v.status === status).length;
    document.getElementById("statTotal").textContent = vehicles.length;
    document.getElementById("statAvailable").textContent = count("Available");
    document.getElementById("statRented").textContent = count("Rented");
    document.getElementById("statMaintenance").textContent = count("Maintenance");
  }
  function renderVehicles(status = "All Vehicles") {
    const grid = document.getElementById("vehicleGrid");
    const filtered = VRAFMVehicleFilter.filter(VRAFMVehicles.all(), status);
    if (!filtered.length) {
      grid.innerHTML = `<p class="vrafm-empty">No vehicles match this filter.</p>`;
      return;
    }
    grid.innerHTML = filtered.map(v => `
      <article class="vehicle-card">
        <div class="vehicle-image"><img src="${escapeHtml(v.image)}" alt="${escapeHtml(v.name)}" loading="lazy"></div>
        <div class="vehicle-content">
          <div class="vehicle-title"><div><h3>${escapeHtml(v.name)}</h3><p>${escapeHtml(v.registration)}</p></div>
            <span class="status ${statusClass(v.status)}">${escapeHtml(v.status)}</span>
          </div>
          <div class="vehicle-info"><div><span>Category</span><strong>${escapeHtml(v.category)}</strong></div>
            <div><span>Last Service</span><strong>${VRAFMDates.formatDate(v.lastService)}</strong></div></div>
          <div class="vehicle-info"><div><span>Next Service</span><strong>${VRAFMDates.formatDate(v.nextService)}</strong></div>
            <div><span>Maintenance Cost</span><strong>₹${Number(v.maintenanceCost).toLocaleString("en-IN")}</strong></div></div>
          <p class="vrafm-schedule ${scheduleClass(v.nextService)}">${VRAFMDates.scheduleLabel(v.nextService)}</p>
          <button class="details-btn" type="button" data-vehicle-details="${v.id}">View Details</button>
        </div>
      </article>`).join("");
    grid.querySelectorAll("[data-vehicle-details]").forEach(btn => {
      btn.addEventListener("click", () => VRAFMVehicleDetails.show(VRAFMVehicles.get(btn.dataset.vehicleDetails)));
    });
  }
  function statusClass(status) {
    return status.toLowerCase().replace(/\s+/g, "-");
  }
  function scheduleClass(date) {
    const days = VRAFMDates.daysUntil(date);
    return days !== null && days < 0 ? "overdue" : days !== null && days <= 30 ? "due-soon" : "";
  }
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  }
  window.VRAFMDashboard = { renderStats, renderVehicles, refresh() { renderStats(); renderVehicles(document.getElementById("vehicleStatusFilter").value); } };
})();
