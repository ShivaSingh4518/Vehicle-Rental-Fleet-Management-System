(function () {
  "use strict";
  window.VRAFMVehicleFilter = {
    filter(vehicles, status) {
      return status === "All Vehicles" ? vehicles : vehicles.filter(v => v.status === status);
    }
  };
})();
