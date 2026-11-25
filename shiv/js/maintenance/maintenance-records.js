(function () {
  "use strict";
  function render() {
    const tbody = document.getElementById("maintenanceRecordsBody");
    const records = [...VRAFMMaintenanceData.all()].sort((a,b) => b.serviceDate.localeCompare(a.serviceDate));
    tbody.innerHTML = records.map(r => {
      const v = VRAFMVehicles.get(r.vehicleId);
      const status = r.status.toLowerCase().replace(/\s+/g, "-");
      return `<tr>
        <td>${escapeHtml(v ? v.name : "Unknown vehicle")}</td>
        <td>${escapeHtml(r.serviceType)}</td>
        <td>${VRAFMDates.formatDate(r.serviceDate)}</td>
        <td>${VRAFMDates.formatDate(r.nextServiceDate)}</td>
        <td>₹${Number(r.cost).toLocaleString("en-IN")}</td>
        <td><span class="table-status ${status}">${escapeHtml(r.status)}</span></td>
        <td class="vrafm-actions"><button type="button" class="vrafm-small-btn" data-edit-record="${r.id}">Edit</button>
        <button type="button" class="vrafm-small-btn danger" data-delete-record="${r.id}">Delete</button></td>
      </tr>`;
    }).join("");
    tbody.querySelectorAll("[data-edit-record]").forEach(b => b.addEventListener("click", () => VRAFMMaintenanceForm.open(null, b.dataset.editRecord)));
    tbody.querySelectorAll("[data-delete-record]").forEach(b => b.addEventListener("click", () => remove(b.dataset.deleteRecord)));
  }
  function remove(id) {
    if (!confirm("Delete this maintenance record? This cannot be undone.")) return;
    const records = VRAFMMaintenanceData.all().filter(r => r.id !== id);
    if (!VRAFMMaintenanceData.save(records)) return;
    VRAFMMaintenance.refreshAll();
  }
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  }
  window.VRAFMMaintenanceRecords = { render, remove };
})();
