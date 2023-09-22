import sys
import os
# Append the /app directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import pymongo
import pandas as pd 
import json


client = pymongo.MongoClient("mongodb://j9a305.p.ssafy.io/",
                             username = 'm1z5',
                             password='ssafy1357')
db = client.tripickDB
cities = db.cities
counties = db.countries

# db의 전체 데이터 불러오기
# all = list(cities.find({}, {'_id':False}))
# for city in all :
#     print(city)

def get_city_all():
    return cities
    
def get_city_data():
    city =  cities.find_one({'name':'프랑크푸르트'},{'_id':False})
    return city
