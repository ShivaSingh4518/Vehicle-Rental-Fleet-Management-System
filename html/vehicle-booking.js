const pickupDate = document.getElementById("pickup-date");
const returnDate = document.getElementById("return-date");
const pickupLocation = document.getElementById("pickup-location");
const bookingForm = document.getElementById("booking-form");

const summaryLocation = document.getElementById("summary-location");
const summaryPickup = document.getElementById("summary-pickup");
const summaryReturn = document.getElementById("summary-return");
const summaryDays = document.getElementById("summary-days");
const summaryBase = document.getElementById("summary-base");
const summaryTotal = document.getElementById("summary-total");

const fullName = document.getElementById("full-name");
const phone = document.getElementById("phone");

const dailyRate = 4500;

function getLocalDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatCurrency(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function formatDate(value) {
  if (!value) {
    return "Not selected";
  }

  const date = new Date(value + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function calculateRentalDays(startValue, endValue) {
  if (!startValue || !endValue) {
    return 0;
  }

  const start = new Date(startValue + "T00:00:00Z");
  const end = new Date(endValue + "T00:00:00Z");
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const difference = end.getTime() - start.getTime();

  if (difference < 0) {
    return 0;
  }

  return Math.max(1, Math.round(difference / millisecondsPerDay));
}

function updateBookingSummary() {
  const selectedOption = pickupLocation.options[pickupLocation.selectedIndex];

  summaryLocation.textContent =
    pickupLocation.value && selectedOption
      ? selectedOption.text
      : "Not selected";
  summaryPickup.textContent = formatDate(pickupDate.value);
  summaryReturn.textContent = formatDate(returnDate.value);

  const rentalDays = calculateRentalDays(pickupDate.value, returnDate.value);

  if (!rentalDays) {
    summaryDays.textContent = "—";
    summaryBase.textContent = "—";
    summaryTotal.textContent = "—";
    return;
  }

  const baseAmount = rentalDays * dailyRate;
  summaryDays.textContent = rentalDays + (rentalDays === 1 ? " day" : " days");
  summaryBase.textContent = formatCurrency(baseAmount);
  summaryTotal.textContent = formatCurrency(baseAmount);
}

const today = getLocalDate();
pickupDate.min = today;
returnDate.min = today;

pickupDate.addEventListener("change", () => {
  returnDate.min = pickupDate.value || today;

  if (returnDate.value && returnDate.value < pickupDate.value) {
    returnDate.value = "";
  }

  updateBookingSummary();
});

returnDate.addEventListener("change", updateBookingSummary);
pickupLocation.addEventListener("change", updateBookingSummary);

fullName.addEventListener("input", () => {
  fullName.setCustomValidity(fullName.value.trim().length >= 2 ? "" : "Please enter at least 2 characters.");
});

phone.addEventListener("input", () => {
  phone.value = phone.value.replace(/\D/g, "").slice(0, 10);
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  fullName.setCustomValidity(fullName.value.trim().length >= 2 ? "" : "Please enter at least 2 characters.");
  pickupDate.setCustomValidity(
    !pickupDate.value || pickupDate.value < today
      ? "Please select a valid pickup date."
      : ""
  );
  returnDate.setCustomValidity(
    !returnDate.value || returnDate.value < pickupDate.value
      ? "Please select a return date on or after pickup."
      : ""
  );

  bookingForm.classList.add("was-validated");

  if (!bookingForm.checkValidity()) {
    const firstInvalid = bookingForm.querySelector(":invalid");
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  const rentalDays = calculateRentalDays(pickupDate.value, returnDate.value);
  const total = rentalDays * dailyRate;
  const selectedLocation = pickupLocation.options[pickupLocation.selectedIndex].text;
  const bookingId = "VR-" + new Date().getFullYear() + "-" +
    String(Math.floor(1000 + Math.random() * 9000));

  document.getElementById("confirmation-id").textContent = bookingId;
  document.getElementById("confirmation-name").textContent = fullName.value.trim();
  document.getElementById("confirmation-email").textContent =
    document.getElementById("email").value.trim();
  document.getElementById("confirmation-phone").textContent = phone.value;
  document.getElementById("confirmation-pickup").textContent =
    selectedLocation + " · " + formatDate(pickupDate.value);
  document.getElementById("confirmation-return").textContent =
    formatDate(returnDate.value);
  document.getElementById("confirmation-total").textContent = formatCurrency(total);
  document.getElementById("confirmation-message").textContent =
    "Your demo booking request has been prepared below.";

  document.querySelector(".confirmation-card").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});
