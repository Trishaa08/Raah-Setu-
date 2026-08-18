# Raah-Setu traffic data

## Current training dataset
`traffic_training_data.csv` is a **synthetic benchmark dataset** generated from road-specific Nagpur corridor profiles. It is included so the hackathon prototype can train and run offline without inventing a claim of live traffic access.

It contains 12 Nagpur corridors, planning-authority labels, hourly profiles, vehicle inflow, average speed, occupancy, weather variables, event flags and a congestion target.

## Road/map source
The interactive map uses OpenStreetMap road tiles through CARTO's dark basemap. OpenStreetMap provides the geographic road network; it does **not** provide live vehicle counts by itself.

## Real-data upgrade path
For production/hackathon validation, replace or augment the CSV with observed traffic counts from CCTV/ANPR, GPS/fleet feeds, signal controllers or published traffic/toll datasets. Maharashtra State Road Development Corporation publishes Nagpur IRDP traffic/toll datasets that can be used as an additional public source, subject to their coverage and licensing.
