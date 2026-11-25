(function () {
  "use strict";
  const DEFAULT_VEHICLES = [
    { id:"veh-xuv700", name:"Mahindra XUV700", registration:"HR 26 AB 1234", category:"SUV", image:"../images/Mahindra_XUV700.avif", status:"Available", lastService:"2026-09-10", nextService:"2026-12-10", maintenanceCost:4500, description:"Mahindra XUV700 — SUV fleet vehicle." },
    { id:"veh-creta", name:"Hyundai Creta", registration:"HR 29 CD 5678", category:"SUV", image:"../images/Hyundai_Creta.avif", status:"Rented", lastService:"2026-08-02", nextService:"2026-11-02", maintenanceCost:3800, description:"Hyundai Creta — SUV fleet vehicle." },
    { id:"veh-nexon", name:"Tata Nexon", registration:"HR 30 EF 9012", category:"Compact SUV", image:"../images/Tata_Nexon.avif", status:"Maintenance", lastService:"2026-09-15", nextService:"2026-09-20", maintenanceCost:8200, description:"Tata Nexon — compact SUV currently marked for maintenance." },
    { id:"veh-swift", name:"Maruti Swift", registration:"HR 38 GH 3456", category:"Hatchback", image:"../images/Maruti_Swift.avif", status:"Available", lastService:"2026-09-05", nextService:"2026-12-05", maintenanceCost:2900, description:"Maruti Swift — hatchback fleet vehicle." }
  ];
  const result = VRAFMStorage.getWithMeta("vehicles", DEFAULT_VEHICLES);
  if (!result.exists) VRAFMStorage.set("vehicles", DEFAULT_VEHICLES);
  window.VRAFMVehicles = {
    defaults: DEFAULT_VEHICLES,
    all() { return VRAFMStorage.get("vehicles", DEFAULT_VEHICLES); },
    get(id) { return this.all().find(v => v.id === id) || null; },
    update(id, changes) {
      const vehicles = this.all();
      const index = vehicles.findIndex(v => v.id === id);
      if (index < 0) return false;
      vehicles[index] = { ...vehicles[index], ...changes };
      return VRAFMStorage.set("vehicles", vehicles);
    }
  };
})();
