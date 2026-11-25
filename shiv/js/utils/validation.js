(function () {
  "use strict";
  function validateMaintenance(data) {
    const errors = [];
    if (!data.vehicleId) errors.push("Select a vehicle.");
    if (!data.serviceType || data.serviceType.trim().length < 2) errors.push("Enter a service type.");
    if (!data.serviceDate) errors.push("Select the service date.");
    if (!data.nextServiceDate) errors.push("Select the next service date.");
    if (data.serviceDate && data.nextServiceDate && data.nextServiceDate < data.serviceDate)
      errors.push("Next service date cannot be before the service date.");
    if (data.cost === "" || !Number.isFinite(Number(data.cost)) || Number(data.cost) < 0)
      errors.push("Cost must be a valid non-negative amount.");
    if (!data.status) errors.push("Choose a maintenance status.");
    return errors;
  }
  window.VRAFMValidation = { validateMaintenance };
})();
