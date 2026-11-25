(function () {
  "use strict";
  window.VRAFMMaintenance = {
    refreshAll() { VRAFMDashboard.refresh(); VRAFMMaintenanceRecords.render(); },
    init() {
      document.getElementById("addMaintenanceBtn").addEventListener("click", () => VRAFMMaintenanceForm.open());
      document.getElementById("vehicleStatusFilter").addEventListener("change", e => VRAFMDashboard.renderVehicles(e.target.value));
      this.refreshAll();
    }
  };
})();
