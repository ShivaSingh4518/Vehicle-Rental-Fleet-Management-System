(function () {
  "use strict";
  function open(vehicleId = "", recordId = "") {
    const root = document.getElementById("appModalRoot");
    const record = recordId ? VRAFMMaintenanceData.all().find(r => r.id === recordId) : null;
    const selectedVehicle = vehicleId || (record && record.vehicleId) || "";
    const vehicleOptions = VRAFMVehicles.all().map(v => `<option value="${v.id}" ${v.id === selectedVehicle ? "selected" : ""}>${escapeHtml(v.name)} (${escapeHtml(v.registration)})</option>`).join("");
    root.innerHTML = `
      <div class="vrafm-modal-backdrop" data-close-form>
        <section class="vrafm-modal vrafm-form-modal" role="dialog" aria-modal="true" aria-labelledby="maintenanceFormTitle">
          <button class="vrafm-modal-close" type="button" aria-label="Close">×</button>
          <h2 id="maintenanceFormTitle">${record ? "Edit Maintenance Record" : "Add Maintenance"}</h2>
          <form id="maintenanceForm" novalidate>
            <label>Vehicle <select name="vehicleId" required><option value="">Select vehicle</option>${vehicleOptions}</select></label>
            <label>Service Type <input name="serviceType" required maxlength="80" placeholder="e.g. Oil Change" value="${escapeHtml(record?.serviceType || "")}"></label>
            <div class="vrafm-form-row">
              <label>Service Date <input name="serviceDate" type="date" required value="${record?.serviceDate || todayISO()}"></label>
              <label>Next Service Date <input name="nextServiceDate" type="date" required value="${record?.nextServiceDate || ""}"></label>
            </div>
            <label>Cost (₹) <input name="cost" type="number" min="0" step="0.01" required value="${record?.cost ?? ""}" placeholder="0"></label>
            <label>Status <select name="status" required><option ${record?.status === "Completed" ? "selected" : ""}>Completed</option><option ${record?.status === "In Progress" ? "selected" : ""}>In Progress</option><option ${record?.status === "Pending" ? "selected" : ""}>Pending</option></select></label>
            <label>Notes <textarea name="notes" rows="3" maxlength="500" placeholder="Optional notes">${escapeHtml(record?.notes || "")}</textarea></label>
            <div id="maintenanceFormErrors" class="vrafm-errors" role="alert"></div>
            <div class="vrafm-form-actions"><button class="add-btn" type="submit">${record ? "Save Changes" : "Add Record"}</button><button class="vrafm-cancel-btn" type="button">Cancel</button></div>
          </form>
        </section>
      </div>`;
    document.body.classList.add("modal-open");
    root.querySelector(".vrafm-modal-close").addEventListener("click", close);
    root.querySelector(".vrafm-cancel-btn").addEventListener("click", close);
    root.querySelector("[data-close-form]").addEventListener("click", e => { if (e.target.matches("[data-close-form]")) close(); });
    root.querySelector("#maintenanceForm").addEventListener("submit", e => submit(e, record));
  }
  function submit(event, existing) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const errors = VRAFMValidation.validateMaintenance(data);
    const errorsBox = document.getElementById("maintenanceFormErrors");
    if (errors.length) { errorsBox.innerHTML = errors.map(escapeHtml).join("<br>"); return; }
    const records = VRAFMMaintenanceData.all();
    const id = existing?.id || `rec-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
    const entry = { id, vehicleId:data.vehicleId, serviceType:data.serviceType.trim(), serviceDate:data.serviceDate, nextServiceDate:data.nextServiceDate, cost:Number(data.cost), status:data.status, notes:data.notes.trim() };
    const index = records.findIndex(r => r.id === id);
    if (index >= 0) records[index] = entry; else records.unshift(entry);
    if (!VRAFMMaintenanceData.save(records)) return;
    const vehicle = VRAFMVehicles.get(data.vehicleId);
    if (vehicle) {
      const completed = data.status === "Completed";
      VRAFMVehicles.update(vehicle.id, {
        lastService: completed && data.serviceDate >= vehicle.lastService ? data.serviceDate : vehicle.lastService,
        nextService: data.nextServiceDate,
        maintenanceCost: Number(data.cost),
        status: data.status === "In Progress" ? "Maintenance" : vehicle.status === "Maintenance" && completed ? "Available" : vehicle.status
      });
    }
    close();
    VRAFMMaintenance.refreshAll();
  }
  function close() { VRAFMVehicleDetails.close(); }
  function todayISO() { return VRAFMDates.toISODate(new Date()); }
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  }
  window.VRAFMMaintenanceForm = { open };
})();
