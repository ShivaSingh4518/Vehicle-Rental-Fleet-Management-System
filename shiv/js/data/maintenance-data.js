(function () {
  "use strict";
  const DEFAULT_RECORDS = [
    { id:"rec-xuv-20260910", vehicleId:"veh-xuv700", serviceType:"Regular Service", serviceDate:"2026-09-10", nextServiceDate:"2026-12-10", cost:4500, status:"Completed", notes:"Existing record from project page." },
    { id:"rec-creta-20260802", vehicleId:"veh-creta", serviceType:"Oil Change", serviceDate:"2026-08-02", nextServiceDate:"2026-11-02", cost:3800, status:"Completed", notes:"Existing record from project page." },
    { id:"rec-nexon-20260915", vehicleId:"veh-nexon", serviceType:"Brake Service", serviceDate:"2026-09-15", nextServiceDate:"2026-09-20", cost:8200, status:"In Progress", notes:"Existing record from project page." }
  ];
  const result = VRAFMStorage.getWithMeta("maintenanceRecords", DEFAULT_RECORDS);
  if (!result.exists) VRAFMStorage.set("maintenanceRecords", DEFAULT_RECORDS);
  window.VRAFMMaintenanceData = {
    defaults: DEFAULT_RECORDS,
    all() { return VRAFMStorage.get("maintenanceRecords", DEFAULT_RECORDS); },
    save(records) { return VRAFMStorage.set("maintenanceRecords", records); }
  };
})();
