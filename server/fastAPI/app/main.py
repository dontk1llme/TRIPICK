import sys
import os
# Append the /app directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from typing import Union
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from recommendation import Recommendation
from fastapi.responses import JSONResponse
from typing import Optional

app = FastAPI()

# origins = [
#     "http://localhost:3000",
#      "http://localhost",
#     "https://tripick.site",
#     "http://tripick.site",
# ]
# 모든 오리진에 대해 허용
origins = ["*"]

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드를 허용
    allow_headers=["*"],  # 모든 헤더를 허용
)

# 인스턴스 생성
recommendation = Recommendation()
now = datetime.now()

@app.get("/")
def read_root():
    return 'Tripick Fast API Server'

# 오늘 날짜에 추천하는 여행지 5개
@app.get("/recommendation/now")
def get_recommendation_now(member_id: Optional[int] = Query(None)):
    recommedation_now = recommendation.now(member_id)
    return recommedation_now

# 사용자 설정 날짜에 추천하는 여행지 12개 (통합, 환율, 날씨, 안전 각 3개씩)
@app.get("/recommendation/set-date")
def get_recommendation_set_date(startDate: str = Query(...), endDate: str = Query(...), member_id: Optional[int] = Query(None)):
    recommended_destination = recommendation.set_date(startDate, endDate, member_id)
    return recommended_destination