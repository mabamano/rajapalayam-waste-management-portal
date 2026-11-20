# Project Essentials & Setup Guide: Rajapalayam Municipality

Welcome to the **Smart Waste 360 - Rajapalayam Municipality** codebase.

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js**: v18.0 or higher
* **npm**: v9.0 or higher
* **Python**: v3.8+ (for IoT sensor simulation scripts)

### 1. Web Application Setup
```bash
# 1. Install NPM packages
npm install

# 2. Configure environment variables (.env)
cp .env.example .env
# Set VITE_GEMINI_API_KEY in .env

# 3. Start development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### 2. IoT Sensor Simulation Setup
To simulate smart bins pushing fill level and weight data to Firebase:

```bash
# 1. Install Python requirements
pip install -r requirements.txt

# 2. Run the Raspberry Pi / Smart Bin sensor push script
python scripts/rpi_sensor_push.py
```

The script publishes telemetry for demo smart bin `RAJ-BIN-001` located at **Gandhi Kalai Mandram (Rajapalayam Municipal Office)**.

---

## 🏢 Rajapalayam Municipal Profiles
* **Municipality:** Special Grade Municipality, Virudhunagar District, Tamil Nadu
* **Administrative Wards:** 42 Wards (`W01` to `W42`)
* **Sanitary Divisions:** 9 Sanitary Divisions (monitored by Sanitary Inspectors)
* **Average Daily MSW:** 48.5 TPD (~28 TPD Wet, ~20.5 TPD Dry)
* **Primary Disposal Site:** Arasiarpatti Municipal Compost Yard (20.37 Acres)
