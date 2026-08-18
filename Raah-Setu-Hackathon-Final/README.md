# Raah-Setu — Nagpur Traffic Redistribution Simulator

Hackathon project for **uneven distribution of traffic over planning-authority jurisdictions**.

## What changed
- Renamed the command center to **Raah-Setu**.
- Vibrant dark command-center UI with cyan/violet/rose accents.
- Added a custom Raah-Setu logo.
- Kept the existing React/Leaflet UI and made its prediction/simulation actions call a real Python API.
- Added a **Traffic Simulation** page for peak-hour management.
- Nagpur map uses CartoDB Dark Matter + OpenStreetMap tiles, so the basemap displays the mapped road network rather than the old static-only map.
- Added a Python `scikit-learn` **Linear Regression** model for congestion prediction.
- Added jurisdiction-wise redistribution simulation with before/after congestion.
- Added `/api/health` so judges can demonstrate that the Python model is running.

## Run frontend
```bash
npm install
npm run dev
```

## Run Python backend
```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Open the frontend shown by Vite, then go to **Traffic Simulation**.

## Important for the hackathon
The included ML training data is **synthetic/reproducible**, because no real Nagpur traffic dataset was included in the uploaded project. For a stronger final submission, replace `train_model()` with real hourly traffic counts/ANPR data from Nagpur and add road-segment IDs, jurisdiction, capacity and timestamp.

The map's base layer is OpenStreetMap-derived through CartoDB. It is not a claim that every private/unmapped road is present; coverage depends on OpenStreetMap data.
