(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    VRAFMMaintenance.init();
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") VRAFMVehicleDetails.close();
    });
  });
})();
