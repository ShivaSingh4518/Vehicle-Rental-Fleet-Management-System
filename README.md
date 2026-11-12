# 🚗 Vehicle Rental & Fleet Management System

<p align="center">
  <strong>A Modern, Responsive Vehicle Rental & Fleet Management Platform UI</strong>
</p>

<p align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![BEM](https://img.shields.io/badge/CSS-BEM-4CAF50?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Design-8A2BE2?style=for-the-badge)
![4 Member Team](https://img.shields.io/badge/Team-4%20Members-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-UI%20Prototype-green?style=for-the-badge)

</p>

---

## 📌 Executive Overview

**VRAFM (Vehicle Rental & Fleet Management System)** is a frontend-based
web application UI designed to organize vehicle rental operations and
fleet management through a centralized and responsive interface.

The system provides separate interfaces for **customers and
administrators**, allowing the project to demonstrate the complete
visual workflow of a modern vehicle rental platform.

Built strictly with **HTML5 and CSS3**, the project focuses on semantic
HTML structure, responsive layouts, CSS Flexbox, CSS Grid, reusable
components, CSS custom properties, and a modular styling architecture.

The current version is a **frontend UI prototype** and does not include
JavaScript, backend services, database connectivity, authentication, or
online payment processing.

---

# 🚘 Vehicle & Fleet Coverage

VRAFM is designed to provide a unified interface for managing
different types of rental vehicles.

The vehicle categories represented in the UI may include:

- 🚗 **Cars:** Sedan, Hatchback, SUV, Luxury Cars.
- 🏍️ **Bikes:** Standard Bikes, Sports Bikes, Scooters.
- 🚐 **Vans:** Passenger Vans and Utility Vans.
- 🚙 **Premium Vehicles:** Luxury and High-End Rental Vehicles.
- 🚚 **Commercial Vehicles:** Utility and Transport Vehicles.

The interface is designed so that vehicle information such as
category, specifications, rental price and status can be displayed
in a structured format.

---

# 🚀 Key Functional Modules

| Module | Icon | Description | Owner |
|--------|------|-------------|-------|
| **Home & Vehicle Listing** | 🏠 | Landing page, navigation, vehicle categories, vehicle cards and vehicle browsing interface. | Dev 1 |
| **Vehicle Details & Booking** | 🚗 | Vehicle specifications, rental information, booking form and booking confirmation UI. | Dev 2 |
| **Admin Dashboard & Management** | 📊 | Dashboard overview, vehicle records, booking records and customer management interface. | Dev 3 |
| **Maintenance & Fleet Status** | 🛠️ | Maintenance records, service information, vehicle status and responsive integration. | Dev 4 |

---

# 👤 Customer Interface

The customer-facing portion of VRAFM provides a structured interface
for users who want to explore and rent vehicles.

### Customer Modules

```
Customer Interface
│
├── Home
│
├── Vehicle Listing
│
├── Vehicle Details
│
└── Booking
```


---

# 📂 Repository File Structure

```text

VRAFM-System/
│
├── index.html                          # Homepage (Dev 1 - Shiva)
├── README.md                           # Master Project Documentation
├── IMPLEMENTATION_PLAN.md              # Four-Member Development Plan
├── .gitignore                           # Git ignored files
│
├── pages/
│   │
│   ├── vehicles.html                    # Vehicle Listing (Dev 1)
│   │
│   ├── vehicle-details.html             # Vehicle Details (Dev 2)
│   ├── booking.html                     # Booking Interface (Dev 2)
│   ├── booking-confirmation.html        # Booking Confirmation (Dev 2)
│   │
│   ├── admin.html                       # Admin Dashboard (Dev 3)
│   ├── customers.html                   # Customer Management (Dev 3)
│   │
│   ├── maintenance.html                 # Maintenance & Fleet (Dev 4)
│   │
│   ├── login.html                       # User Login
│   └── register.html                    # User Registration
│
├── assets/
│   │
│   ├── images/
│   │   ├── logo/
│   │   │   └── logo.png
│   │   │
│   │   ├── vehicles/
│   │   │   └── vehicle-placeholder.png
│   │   │
│   │   ├── cars/
│   │   │   ├── TOYOTA.png
│   │   │   ├── TOYOTA_4x3.png
│   │   │   ├── Hyundai_Creta.avif
│   │   │   ├── Mahindra_XUV700.avif
│   │   │   ├── Maruti_Swift.avif
│   │   │   └── Tata_Nexon.avif
│   │   │
│   │   └── bikes/
│   │
│   └── icons/
│       └── (UI icons)
│
├── css/
│   │
│   ├── main.css                        # Shared CSS aggregator
│   │
│   ├── tokens/
│   │   └── variables.css               # Colors, fonts, spacing
│   │
│   ├── base/
│   │   ├── reset.css                   # CSS normalization
│   │   └── layout.css                  # Global layout
│   │
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── forms.css
│   │   ├── tables.css
│   │   ├── badges.css
│   │   └── navbar.css
│   │
│   └── pages/
│       ├── home.css                    # Dev 1
│       ├── vehicles.css                # Dev 1
│       ├── vehicle-details.css         # Dev 2
│       ├── booking.css                 # Dev 2
│       ├── booking-confirmation.css    # Dev 2
│       ├── admin.css                   # Dev 3
│       ├── customers.css               # Dev 3
│       ├── maintenance.css             # Dev 4
│       ├── login.css
│       └── register.css
│
└── js/
    │
    ├── main.js                         # Common initialization
    │
    ├── data/
    │   └── vehicles.js                 # Vehicle data
    │
    ├── components/
    │   ├── navbar.js                   # Navigation functionality
    │   └── vehicle-card.js             # Reusable vehicle cards
    │
    ├── utils/
    │   ├── validation.js               # Form validation
    │   └── storage.js                  # Local storage utilities
    │
    └── pages/
        ├── home.js                     # Dev 1
        ├── vehicles.js                 # Dev 1
        ├── vehicle-details.js          # Dev 2
        ├── booking.js                  # Dev 2
        ├── booking-confirmation.js     # Dev 2
        ├── admin.js                    # Dev 3
        ├── customers.js                # Dev 3
        ├── maintenance.js              # Dev 4
        ├── login.js
        └── register.js

```

---
## 👥 Team Member Task Distribution

The project is divided among four team members. Each member is responsible for specific HTML pages, CSS components, and page-level styling.

| Team Member | Role | Module | Main Responsibilities | Branch |
|---|---|---|---|---|
| **Shiva Singh** | Dev 1 | 🏠 Home & Vehicle Listing | Homepage, navigation, vehicle listing, vehicle cards, responsive layout | `feature/Shiva` |
| **Saurabh Tomar** | Dev 2 | 🚗 Vehicle Details & Booking | Vehicle details, booking form, confirmation page, form styling | `feature/Saurabh` |
| **Shivam Rawat** | Dev 3 | 🛠️ Admin & Customer Management | Admin dashboard, customer management, tables, status badges | `feature/Shivam` |
| **Shivansh Pandey** | Dev 4 | 🔧 Maintenance & Fleet Status | Maintenance page, fleet status, reusable cards, responsive testing | `feature/Shivansh` |

---



---
