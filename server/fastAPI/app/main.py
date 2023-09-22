from typing import Union
from fastapi import FastAPI, Query
from pydantic import BaseModel
from recommendation import Recommendation
from datetime import datetime
import db

app = FastAPI()

# 인스턴스 생성
recommendation = Recommendation()
now = datetime.now()

@app.get("/")
def read_root():
    return 'Tripick Fast API Server'

# 오늘 날짜에 추천하는 여행지 5개
@app.get("/recommendation/now")
def get_recommendation_now():
    recommedation_now = recommendation.now()
    return recommedation_now

# 사용자 설정 날짜에 추천하는 여행지 12개 (통합, 환율, 날씨, 안전 각 3개씩)
@app.get("/recommendation/set-date")
def get_recommendation_set_date(startDate: str = Query(...), endDate: str = Query(...)):
    recommended_destination = recommendation.set_date(startDate, endDate)
    return recommended_destination