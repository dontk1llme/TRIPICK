import sys
import os
# Append the /app directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import pymongo
import pandas as pd 
import json
import warnings
import math
from tabulate import tabulate
from datetime import datetime
warnings.filterwarnings("ignore", category=FutureWarning)


client = pymongo.MongoClient("mongodb://j9a305.p.ssafy.io/",
                             username = 'm1z5',
                             password='ssafy1357')
db = client.tripickDB
cities = db.cities
counties = db.countries
picked_trip = db.picked_trip

# db의 전체 데이터 불러오기
# all = list(cities.find({}, {'_id':False}))
# for city in all :
#     print(city)

# 정규화 함수
def normalize_column(column):
    min_val = column.min()
    max_val = column.max()
    return (column - min_val) / (max_val - min_val) 

def get_city_all():
    return cities
    
def get_city_data():
    city =  cities.find_one({'name':'프랑크푸르트'},{'_id':False})
    return city

def get_rank_df(date):
    df = get_cities_df(date)
    # print(tabulate(df, headers='keys', tablefmt='psql', showindex=True))
    # 오름차순 - 기온 절대값, 환율, 가격, 강우일수 
    df['temp_rank'] = df['temp'].rank(ascending=True).astype(int)
    df['exchange_rank'] = df['exchange'].rank(ascending=True).astype(int)
    df['price_rank'] = df['price'].rank(ascending=True).astype(int)
    df['rainy_days_rank'] = df['rainy_days'].rank(ascending=True).astype(int)
    # 내림차순 - 여행객 동향, 안전 지수
    df['traveler_rank'] = df['traveler'].rank(ascending=False).astype(int)
    df['crime_rank'] = df['crime'].rank(ascending=False).astype(int)
    rank_df =  df[['city','country','temp_rank','rainy_days_rank','price_rank','exchange_rank','crime_rank','traveler_rank']]
    # 'city'와 'country' 열은 문자열이므로 제외하고 나머지 열 정규화
    columns_to_normalize = ['temp_rank', 'rainy_days_rank', 'price_rank', 'exchange_rank', 'crime_rank', 'traveler_rank']
    rank_df[columns_to_normalize] = rank_df[columns_to_normalize].apply(normalize_column)
    print(tabulate(rank_df, headers='keys', tablefmt='psql', showindex=True))
    return rank_df

def get_cities_df(date):
    df = pd.DataFrame()
    for city in cities.find():
        exchange_now = 99999
        temp = 99999
        rainy_days = 99999
        price = 99999
        traveler = 99999
        crime = 99999
        name = city.get('name')
        if name == '멕시코시티':
            continue
        country = city.get('country')
        exchange_std = city.get('exchange_rate').get("2023-09-01")
        exchange_now = city.get('exchange_rate').get(date.strftime("%Y-%m-%d"))
        if exchange_now is not None:
            exchange_now = round(exchange_now, 2)
        if exchange_now > exchange_std:
            exchange_trends = '강세'
        else:
            exchange_trends = '약세'
        crime = city.get('crime_rate')
        climate_dict = next((item for item in city.get('climate') if item['date'] == date.strftime("%Y-%m-01")), None)
        if climate_dict is not None:
            temp = abs(climate_dict.get('temp_avg') - 21)
            rainy_days = climate_dict.get('rainy_days')
        price = city.get('price_index').get(date.strftime("%Y"))
        traveler = city.get('traveler').get(date.strftime("%Y-%m-01"))
        city_dict = {
            'city' : name,
            'country' : country,
            'exchange' : exchange_now,
            'exchange_trends' : exchange_trends,
            'crime' : crime,
            'temp' : temp,
            'rainy_days' : rainy_days,
            'price' : price,
            'traveler' : traveler,
            'total_score' : 0
        }
        for key, value in city_dict.items():
            if value is None or isinstance(value, float) and math.isnan(value):
                city_dict[key] = 99999  
        df = df._append(city_dict, ignore_index=True)
    # print(tabulate(df, headers='keys', tablefmt='psql', showindex=True))
    return df

def get_one_city(name, date):
    city =  cities.find_one({'name':name},{'_id':False})
    country = city['country']
    crime = city.get('crime_rate')
    exchange_std = city.get('exchange_rate').get("2023-09-01")
    exchange_now = city.get('exchange_rate').get(date.strftime("%Y-%m-%d"))
    if exchange_now > exchange_std:
        exchange_trends = '강세'
    else:
        exchange_trends = '약세'
    if exchange_now is not None:
        exchange_now = round(exchange_now, 2)
    price = city.get('price_index').get(date.strftime("%Y"))
    traveler = city.get('traveler').get(date.strftime("%Y-%m-01"))
    image_url = city.get('image_url')
    climate_dict = next((item for item in city.get('climate') if item['date'] == date.strftime("%Y-%m-01")), None)
    city_dict = {
        'name':name,
        'country':country,
        'traveler': traveler,
        'price' : price,
        'crime' : crime,
        'exchange': exchange_now,
        'exchange_trends' : exchange_trends,
        'climate' : {
              'month':  datetime.strptime(climate_dict['date'], "%Y-%m-%d").strftime("%Y-%m"), 
              'temp_avg': climate_dict['temp_avg'], 
              'temp_max': climate_dict['temp_max'], 
              'temp_min': climate_dict['temp_min']
              },
        'image_url' : image_url
    }
    # 오름차순 - 기온차, 강우일수, 환율, 물가, 범죄율
    return city_dict

def get_picked_trip(memberId):
    picked_trip_dict = picked_trip.find({"member_id": memberId})
    return picked_trip_dict

def get_country_name(city_name):
    city =  cities.find_one({'name':city_name},{'_id':False})
    return city['country']
