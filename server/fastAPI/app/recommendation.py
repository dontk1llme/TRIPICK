from datetime import datetime
import db
import dummy

now = datetime.now()
# dummy data

class Recommendation:
    def __init__(self):
        self.data = [...]

    def now(self):
        result = db.get_db()
        return dummy.result_dict_now

    def set_date(self, start_date: str, end_date: str):
        recommended_destinations = {'출발 일자':start_date, '도착 일자':end_date}
        return dummy.result_dict_set_date




