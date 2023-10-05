import sys
import os
# Append the /app directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from datetime import datetime
from tabulate import tabulate
import pandas as pd
import db
import dummy
import uuid

now = datetime.now()
# dummy data
class Recommendation:
    def __init__(self):
        self.data = [...]

    def now(self, member_id):
        rank_df = db.get_rank_df(now.date())
        # 가중치 순서: temp, rainy, price, exchange, crime, traveler 
        w = [3,3,1,1,1,1]
        # 로그인 상태라면 찜 목록을 바탕으로 가중치 업데이트 
        if member_id is not None:
            total_w, weather_w, exchange_w, crime_w = Recommendation.update_weight(member_id)
            w = total_w
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

    def set_date(self, start_date: str, end_date: str, member_id):
        date_format = "%Y-%m-%d"
        start_date = datetime.strptime(start_date, date_format)
        rank_df = db.get_rank_df(start_date)
        # 가중치 순서: temp, rainy, price, exchange, crime, traveler 
        total_w = [2,2,1,1,1,1]
        weather_w = [3,3,1,1,1,1]
        exchange_w = [1,1,2,2,1,1]
        crime_w = [1,1,1,1,2,1]
        # 로그인 상태라면 찜 목록을 바탕으로 가중치 업데이트 
        if member_id is not None:
            total_w, weather_w, exchange_w, crime_w = Recommendation.update_weight(member_id)
        w_list = [total_w,weather_w,exchange_w,crime_w]
        rec_list = ['total','weather','exchange','crime'] 
        result_dict = {}
        result_id = 1
        result_list = []
        for i in range(0,4):
            w = w_list[i]
            result = pd.DataFrame(columns=['city', 'rank'])
            for index, row in rank_df.iterrows():
                y = (w[0]*row['temp_rank'] +  w[1]*row['rainy_days_rank'] + w[2]*row['price_rank'] 
                + w[3]*row['exchange_rank'] + w[4]*row['crime_rank'] + w[5]*row['traveler_rank'])
                result = result._append({'city': row['city'], 'y': y}, ignore_index=True)
            result['rank'] = result['y'].rank(ascending=True).astype(int)
            result_sorted = result.sort_values(by='rank', ascending=True)
            # print(tabulate(result_sorted, headers='keys', tablefmt='psql', showindex=True))
            # result_sorted = result_sorted.head(3)
            inner_dict = {}
            idx = 1
            for j, row in result_sorted.iterrows():
                if idx == 4:
                    break
                city_name = row['city']
                if city_name in result_list:
                    continue
                result_list.append(city_name)
                city_data = db.get_one_city(city_name,start_date)
                city_data['id'] = result_id
                city_data['uuid'] = uuid.uuid1()
                city_data['start_date'] = start_date.strftime("%Y-%m-%d")
                city_data['end_date'] = end_date
                inner_dict[f'recommendation_{idx}'] = city_data
                idx += 1
                result_id += 1
            result_dict[f'recommendation_{rec_list[i]}'] = inner_dict
            print(result_list)
        return result_dict
    
    def update_weight(member_id):
        # 가중치 초기값
        total_w = [2,2,1,1,1,1]
        weather_w = [3,3,1,1,1,1]
        exchange_w = [1,1,2,2,1,1]
        crime_w = [1,1,1,1,2,1]
        # 현재 로그인한 사용자의 여행지 찜 목록
        picked_trip = db.get_picked_trip(member_id)
        for picked_trip_dict in picked_trip:
            city = picked_trip_dict['city']
            date = picked_trip_dict['start_date']
            date_format = "%Y-%m-%d"
            start_date = datetime.strptime(date, date_format)
            rank_df = db.get_rank_df(start_date)
            city_rank = rank_df[rank_df['city']==city]
            city_rank = city_rank[['temp_rank','rainy_days_rank','price_rank','exchange_rank','crime_rank','traveler_rank']].iloc[0]
            # 가중치 학습률
            learning_rate = 0.5
            update_weight = (city_rank.rank(ascending=False)* learning_rate).tolist()
            # 가중치 업데이트
            total_w = [x + y for x, y in zip(total_w, update_weight)]
            weather_w = [x + y for x, y in zip(weather_w, update_weight)]
            exchange_w = [x + y for x, y in zip(exchange_w, update_weight)]
            crime_w = [x + y for x, y in zip(crime_w, update_weight)]
        print('updated weight')
        print('total: ',total_w)
        print('weather: ',weather_w)
        print('exchange: ',exchange_w)
        print('crime: ',crime_w)
        return total_w, weather_w, exchange_w, crime_w

Recommendation.update_weight(32)
