import sys
import os
# Append the /app directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from datetime import datetime
from tabulate import tabulate
import pandas as pd
import db
import dummy


now = datetime.now()
# dummy data
class Recommendation:
    def __init__(self):
        self.data = [...]

    def now(self):
        city_data = db.get_city_data()
        return dummy.result_dict_now

    def set_date(self, start_date: str, end_date: str):
        recommended_destinations = {'출발 일자':start_date, '도착 일자':end_date}
        return dummy.result_dict_set_date
    
# 도시 컬렉션
city_all = db.get_city_all()
# 추천 순위 비교용 데이터 프레임
df = pd.DataFrame()
# 도큐먼트 하나씩 조회
for city in city_all.find():
    name = city.get('name')
    country = city.get('country')
    exchange = city.get('exchange_rate').get(now.date().strftime("%Y-%m-%d"))
    crime = city.get('crime_rate')
    climate_dict = next((item for item in city.get('climate') if item['date'] == now.date().strftime("%Y-%m-01")), None)
    temp = 99999
    rainy_days = 99999
    if climate_dict is not None:
        temp = climate_dict.get('temp_avg')
        rainy_days = climate_dict.get('rainy_days')
    price = city.get('price_index').get(now.date().strftime("%Y"))
    traveler = city.get('traveler').get(now.date().strftime("%Y-%m-01"))
    city_dict = {
        'city' : name,
        'country' : country,
        'exchange' : exchange,
        'crime' : crime,
        'temp' : temp,
        'rainy_days' : rainy_days,
        'price' : price,
        'traveler' : traveler,
        'total_score' : 0
    }
    df = df._append(city_dict, ignore_index=True)

df['temp_Rank'] = df['temp'].rank().astype(int)
df['crime_rank'] = df['crime'].rank(ascending=True).astype(int)
print(tabulate(df, headers='keys', tablefmt='psql', showindex=True))




