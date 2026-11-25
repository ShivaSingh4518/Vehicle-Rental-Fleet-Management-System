import { vehicles } from "../data/vehicles.js";
import { getBookings, saveBookings, getSession } from "../utils/storage.js";
import { calculateRentalDays, formatINR } from "../utils/price-calculator.js";
import { showMessage, clearMessage, validIndianPhone, validEmail } from "../utils/validation.js";
import { requireLogin } from "../auth/auth.js";

const form = document.querySelector("#bookingForm");
if (form) {
  if (!requireLogin()) throw new Error("Login required before booking.");
  const session = getSession();
  const params = new URLSearchParams(location.search);
  const vehicle = vehicles.find(item => item.id === params.get("id")) || vehicles[0];
  const message = document.querySelector("#bookingMessage");
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  const pickup = form.pickupDate;
  const dropoff = form.returnDate;

  document.querySelector("#selectedVehicle").innerHTML = `
    <img src="${vehicle.image}" alt="${vehicle.name}" class="img-fluid rounded mb-3">
    <h3>${vehicle.name}</h3><p>${vehicle.description}</p>
    <p class="fw-bold text-primary">${formatINR(vehicle.price)} / day</p>
    <p>${vehicle.features.join(" · ")}</p>`;
  form.customerName.value = session.name;
  form.email.value = session.email;
  pickup.min = todayString;
  dropoff.min = todayString;

  function updateSummary() {
    const days = calculateRentalDays(pickup.value, dropoff.value);
    document.querySelector("#rentalDays").textContent = days;
    document.querySelector("#totalPrice").textContent = formatINR(days * vehicle.price);
    document.querySelector("#summaryVehicle").textContent = vehicle.name;
    document.querySelector("#summaryDates").textContent = pickup.value && dropoff.value ? `${pickup.value} to ${dropoff.value}` : "Select rental dates";
    return days;
  }
  pickup.addEventListener("change", () => {
    dropoff.min = pickup.value || todayString;
    if (dropoff.value && dropoff.value <= pickup.value) dropoff.value = "";
    updateSummary();
  });
  dropoff.addEventListener("change", updateSummary);
  updateSummary();

  form.addEventListener("submit", event => {
    event.preventDefault();
    clearMessage(message);
    const name = form.customerName.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const phone = form.phone.value.trim();
    const days = updateSummary();
    if (name.length < 2) return showMessage(message, "Enter your full name.");
    if (!validEmail(email)) return showMessage(message, "Enter a valid email address.");
    if (!validIndianPhone(phone)) return showMessage(message, "Enter a valid 10-digit Indian mobile number.");
    if (!pickup.value || pickup.value < todayString) return showMessage(message, "Choose a valid pickup date.");
    if (!dropoff.value || days < 1) return showMessage(message, "Return date must be after pickup date.");
    if (!form.pickupLocation.value) return showMessage(message, "Select a pickup location.");
    if (!form.terms.checked) return showMessage(message, "Please accept the booking terms.");
    const bookings = getBookings();
    const conflict = bookings.some(existing =>
      existing.vehicleId === vehicle.id &&
      existing.status !== "Cancelled" &&
      pickup.value < existing.returnDate &&
      dropoff.value > existing.pickupDate
    );
    if (conflict) return showMessage(message, "This vehicle already has a booking that overlaps those dates. Please choose another date range.");

    const booking = {
      id:`VR-${new Date().getFullYear()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`,
      userId:session.id, customerName:name, email, phone, vehicleId:vehicle.id, vehicleName:vehicle.name,
      pickupDate:pickup.value, returnDate:dropoff.value, pickupLocation:form.pickupLocation.value,
      days, dailyPrice:vehicle.price, total:days*vehicle.price, status:"Pending Confirmation",
      createdAt:new Date().toISOString()
    };
    bookings.push(booking);
    saveBookings(bookings);
    sessionStorage.setItem("vrafm_latest_booking", booking.id);
    window.location.href = "booking-confirmation.html";
  });
}
