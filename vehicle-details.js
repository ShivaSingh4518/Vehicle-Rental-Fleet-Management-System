(function () {
  "use strict";
  function closeModal() {
    const root = document.getElementById("appModalRoot");
    root.innerHTML = "";
    document.body.classList.remove("modal-open");
  }
  function show(vehicle) {
    const root = document.getElementById("appModalRoot");
    const records = VRAFMMaintenanceData.all().filter(r => r.vehicleId === vehicle.id);
    const recordList = records.length ? records.map(r =>
      `<li><strong>${escapeHtml(r.serviceType)}</strong> · ${VRAFMDates.formatDate(r.serviceDate)} · ₹${Number(r.cost).toLocaleString("en-IN")} · ${escapeHtml(r.status)}</li>`
    ).join("") : "<li>No maintenance records found for this vehicle.</li>";
    root.innerHTML = `
      <div class="vrafm-modal-backdrop" data-close-modal>
        <section class="vrafm-modal" role="dialog" aria-modal="true" aria-labelledby="vehicleModalTitle">
          <button class="vrafm-modal-close" type="button" aria-label="Close">×</button>
          <h2 id="vehicleModalTitle">${escapeHtml(vehicle.name)}</h2>
          <img class="vrafm-modal-image" src="${escapeHtml(vehicle.image)}" alt="${escapeHtml(vehicle.name)}">
          <div class="vrafm-modal-grid">
            <p><span>Registration</span><strong>${escapeHtml(vehicle.registration)}</strong></p>
            <p><span>Category</span><strong>${escapeHtml(vehicle.category)}</strong></p>
            <p><span>Status</span><strong>${escapeHtml(vehicle.status)}</strong></p>
            <p><span>Last service</span><strong>${VRAFMDates.formatDate(vehicle.lastService)}</strong></p>
            <p><span>Next service</span><strong>${VRAFMDates.formatDate(vehicle.nextService)}</strong></p>
            <p><span>Maintenance cost</span><strong>₹${Number(vehicle.maintenanceCost).toLocaleString("en-IN")}</strong></p>
          </div>
          <h3>Maintenance history</h3><ul class="vrafm-history">${recordList}</ul>
          <button class="add-btn" type="button" data-add-for-vehicle="${vehicle.id}">+ Add Maintenance for this vehicle</button>
        </section>
      </div>`;
    document.body.classList.add("modal-open");
    root.querySelector(".vrafm-modal-close").addEventListener("click", closeModal);
    root.querySelector("[data-close-modal]").addEventListener("click", e => { if (e.target.matches("[data-close-modal]")) closeModal(); });
    root.querySelector("[data-add-for-vehicle]").addEventListener("click", () => {
      closeModal(); window.VRAFMMaintenanceForm.open(vehicle.id);
    });
  }
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  }
  window.VRAFMVehicleDetails = { show, close: closeModal };
})();
