export function calculateRentalDays(start, end) {
  if (!start || !end) return 0;
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const difference = endDate.getTime() - startDate.getTime();
  return difference > 0 ? Math.ceil(difference / 86400000) : 0;
}
export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(amount);
}
