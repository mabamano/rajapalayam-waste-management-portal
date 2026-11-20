# Smart Waste 360 - Rajapalayam Municipality Edition 🏛️♻️

> **Official Municipal Solid Waste Management (SWM) Portal**  
> *ராஜபாளையம் நகராட்சி திடக்கழிவு மேலாண்மை அமைப்பு* (Special Grade Municipality • Virudhunagar District, Tamil Nadu)

---

## 1. Executive Summary & Problem Statement 🎯

### Local Urban Context: Rajapalayam
* **Population & Assessments:** ~47,497 residential buildings and 5,876 commercial establishments.
* **Administrative Scope:** **42 Administrative Wards** organized into **9 Sanitary Divisions**, overseen by the Municipal Commissioner and Sanitary Inspectors.
* **Waste Generation:** Approximately **46.5 to 48.5 TPD** (Tonnes Per Day) of municipal solid waste:
  * *Biodegradable / Wet Waste:* ~26.8 TPD (processed into organic manure for local farmers via Micro Composting Centres - MCC and a 5 MT Biomethanation Plant).
  * *Non-Biodegradable / Dry Waste:* ~21.7 TPD (segregated at Resource Recovery Centres - RRC / MRF).
  * *Centralized Processing Facility:* **Arasiarpatti Municipal Compost Yard** (20.37 Acres) with weighbridge and legacy waste remediation platforms.

### The Problem Solved
* **Route Efficiency:** Shift from fixed routes to dynamic, fill-level-optimized collection corridors across the 9 sanitary divisions.
* **100% Source Segregation:** Citizens are incentivized via civic reward points (redeemable for property tax rebates/discounts) to separate Wet, Dry, and Domestic Hazardous waste.
* **Tamper-Proof Service Proof:** QR-code verification at household gates ensures sanitary workers physically visit each premise, eliminating proxy collection logs.

---

## 2. Key Features ✨

* **👥 Role-Based Portals:** Tailored interfaces for Household Citizens, Waste Collectors (தூய்மை பணியாளர்கள்), Sanitary Inspectors (Division Officers), Department Leads (Sanitation, Logistics, Recycling), and the Municipal Commissioner.
* **🗺️ Real-Time Municipal Map (Leaflet / Google Maps):** Live GPS monitoring of smart bins and collection fleets centered on Rajapalayam (`9.4532° N, 77.5550° E`).
* **🤖 Rajapalayam Gemini 2.5 Flash AI:** Context-aware multilingual assistant (Tamil & English) trained on Rajapalayam's 42 wards, MCC locations, and segregation bylaws.
* **📈 Predictive Festival & Harvest Surges:** Early-warning surge modeling for local occasions (Panguni Pongal at Sri Maya Karuppasamy Temple, Ayyanar Kovil pilgrimage corridor, and summer cotton ginning mill packaging waste).
* **📱 QR Digital Handshake:** Secure verification between household gate QR codes and collector mobile scanners.
* **🏆 Green Champions Leaderboard:** Neighborhood gamification by street, ward (e.g., Ward 12 Mudangiar, Ward 08 Gandhi Kalai Mandram, Ward 24 Cotton Market), and municipality.

---

## 3. Demo Credentials 🔑

| Portal / Role | ID / Username | Password / PIN | Description |
| :--- | :--- | :--- | :--- |
| **Municipal Commissioner** | `MUN001` | `admin` | Full executive administration for Rajapalayam |
| **Sanitary Inspector** | `OFF001` | `admin123` | Supervisory access across 9 sanitary divisions |
| **Ward Officer** | `OFF002` | `officer123` | Ward-level compliance (Wards 08 & 12) |
| **Sanitation Dept Lead** | `SAN001` | `admin` | Sanitation operations & bin clearance dispatch |
| **Logistics Dept Lead** | `LOG001` | `admin` | Vehicle fleet & fuel optimization |
| **Recycling Dept Lead** | `REC001` | `admin` | Micro Composting Centres (MCC) & MRF sales |
| **Field Collector** | `COL001` | `collector123` | Route navigation & QR scan (Ward 08) |
| **Household User** | `W08-S02-H012` | `1234` | Tenkasi Road resident dashboard |

---

## 4. Setup & Running ⚙️

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create `.env` in root with:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   # Optional: Google Maps Platform Key (Leaflet works out-of-the-box without key)
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Run IoT Sensor Simulation:**
   ```bash
   python scripts/rpi_sensor_push.py
   ```

---
*Built with ❤️ for a Clean and Green Rajapalayam (தூய்மை ராஜபாளையம்).*
