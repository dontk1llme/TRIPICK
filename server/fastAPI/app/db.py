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
# same_ages = list(cities.find({}, {'_id':False}))
# for person in same_ages :
#     print(same_ages)

def get_db():
    same_ages =  cities.find_one({'name':'프랑크푸르트'},{'_id':False})
    return same_ages
