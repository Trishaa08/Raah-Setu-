from pathlib import Path
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error

BASE = Path(__file__).resolve().parent
DATA = BASE / 'data' / 'traffic_training_data.csv'
MODEL_PATH = BASE / 'traffic_linear_regression.joblib'
FEATURES = ['hour','day_of_week','rain_mm','temperature_c','humidity_percent','special_event','capacity_vph','inflow_vph','avg_speed_kmh','occupancy_percent']
TARGET = 'congestion_percent'

df = pd.read_csv(DATA)
X = df[FEATURES]
y = df[TARGET]
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression().fit(Xtr, ytr)
pred = model.predict(Xte)
print(f'Rows: {len(df):,}')
print(f'R2: {r2_score(yte,pred):.3f}')
print(f'MAE: {mean_absolute_error(yte,pred):.2f} percentage points')
joblib.dump(model, MODEL_PATH)
print(f'Saved: {MODEL_PATH}')
