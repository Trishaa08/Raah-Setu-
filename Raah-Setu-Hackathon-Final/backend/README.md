# Raah-Setu Python Backend

FastAPI backend with a trained `sklearn.linear_model.LinearRegression` model.

Run:
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API:
- `GET /api/health`
- `POST /api/traffic/predict`
- `POST /api/simulation/run`

The model is trained at startup on a reproducible synthetic traffic dataset. Replace `train_model()` with real Nagpur traffic-counter/ANPR data for production.
