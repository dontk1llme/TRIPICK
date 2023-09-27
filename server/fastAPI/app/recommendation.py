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
        rank_df = db.get_rank_df(now.date())
        # 가중치 순서: temp, rainy, price, exchange, crime, traveler 
        w = [1,1,1,1,1,1]
        result = pd.DataFrame(columns=['city', 'rank'])
        for index, row in rank_df.iterrows():
            y = (w[0]*row['temp_rank'] +  w[1]*row['rainy_days_rank'] + w[2]*row['price_rank'] 
            + w[3]*row['exchange_rank'] + w[4]*row['crime_rank'] + w[5]*row['traveler_rank']) 
            result = result._append({'city': row['city'], 'y': y}, ignore_index=True)
            result['rank'] = result['y'].rank(ascending=True).astype(int)
        result_sorted = result.sort_values(by='rank', ascending=True)
        result_sorted = result_sorted.head(5)
        result_dict = {}
        idx = 1
        for i, row in result_sorted.iterrows():
            city_name = row['city']
            result_dict[f'recommendation_{idx}'] = db.get_one_city(city_name,now.date())
            idx+=1
        return result_dict

    def set_date(self, start_date: str, end_date: str):
        date_format = "%Y-%m-%d"
        start_date = datetime.strptime(start_date, date_format)
        rank_df = db.get_rank_df(start_date)
        # 가중치 순서: temp, rainy, price, exchange, crime, traveler 
        total_w = [1,1,1,1,1,1]
        weather_w = [5,5,1,1,1,1]
        exchange_w = [1,1,5,5,1,1]
        crime_w = [1,1,1,1,5,1]
        w_list = [total_w,weather_w,exchange_w,crime_w]
        rec_list = ['total','weather','exchange','crime'] 
        result_dict = {}
        for i in range(0,4):
            w = w_list[i]
            result = pd.DataFrame(columns=['city', 'rank'])
            for index, row in rank_df.iterrows():
                y = (w[0]*row['temp_rank'] +  w[1]*row['rainy_days_rank'] + w[2]*row['price_rank'] 
                + w[3]*row['exchange_rank'] + w[4]*row['crime_rank'] + w[5]*row['traveler_rank'])
                result = result._append({'city': row['city'], 'y': y}, ignore_index=True)
            result['rank'] = result['y'].rank(ascending=True).astype(int)
            result_sorted = result.sort_values(by='rank', ascending=True)
            print(tabulate(result_sorted, headers='keys', tablefmt='psql', showindex=True))
            result_sorted = result_sorted.head(3)
            inner_dict = {}
            idx = 1;
            for j, row in result_sorted.iterrows():
                city_name = row['city']
                city_data = db.get_one_city(city_name,start_date)
                inner_dict[f'recommendation_{idx}'] = city_data
                idx += 1
            result_dict[f'recommendation_{rec_list[i]}'] = inner_dict
        return result_dict
