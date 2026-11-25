import { getBookings } from "../utils/storage.js";
import { formatINR } from "../utils/price-calculator.js";
const target = document.querySelector("#confirmationDetails");
if (target) {
  const id = sessionStorage.getItem("vrafm_latest_booking");
  const booking = getBookings().find(item => item.id === id);
  if (!booking) {
    target.innerHTML = `<div class="alert alert-info">No recent booking was found. <a href="vehicles.html">Browse vehicles</a>.</div>`;
  } else {
    target.innerHTML = `
      <div class="alert alert-success">Your booking request has been saved successfully.</div>
      <h2 class="h4">Booking ID: ${booking.id}</h2>
      <dl class="row">
        <dt class="col-sm-5">Customer</dt><dd class="col-sm-7">${booking.customerName}</dd>
        <dt class="col-sm-5">Vehicle</dt><dd class="col-sm-7">${booking.vehicleName}</dd>
        <dt class="col-sm-5">Pickup</dt><dd class="col-sm-7">${booking.pickupDate} · ${booking.pickupLocation}</dd>
        <dt class="col-sm-5">Return</dt><dd class="col-sm-7">${booking.returnDate}</dd>
        <dt class="col-sm-5">Duration</dt><dd class="col-sm-7">${booking.days} day(s)</dd>
        <dt class="col-sm-5">Total</dt><dd class="col-sm-7 fw-bold">${formatINR(booking.total)}</dd>
        <dt class="col-sm-5">Status</dt><dd class="col-sm-7">${booking.status}</dd>
      </dl>`;
  }
}
