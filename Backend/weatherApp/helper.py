"""
Helper Functions
"""
def get_so2_qualitative_name(so2_level):
    """This function takes so2 level from WeatherMap API response"""
    if so2_level<20:
        return "Good"
    elif so2_level<80 and so2_level>=20 :
        return "Fair"
    elif so2_level>=80 and so2_level<250:
        return "Moderate"
        
    elif so2_level>=250 and so2_level<350:
        return "Poor"
    elif so2_level>=350:
        return "Very Poor"

def get_no2_qualitative_name(no2_level):
    """This function takes no2 level from WeatherMap API response"""
    if no2_level<40:
        return "Good"
    elif no2_level<70 and no2_level>=40 :
        return "Fair"
    elif no2_level>=70 and no2_level<150:
        return "Moderate"
        
    elif no2_level>=150 and no2_level<200:
        return "Poor"
    elif no2_level>=200:
        return "Very Poor"
    
def get_pm10_qualitative_name(pm10_level):
    """This function takes pm10 level from WeatherMap API response"""
    if pm10_level<20:
        return "Good"
    elif pm10_level<50 and pm10_level>=20 :
        return "Fair"
    elif pm10_level>=50 and pm10_level<100:
        return "Moderate"
        
    elif pm10_level>=100 and pm10_level<200:
        return "Poor"
    elif pm10_level>=200:
        return "Very Poor"

def get_pm25_qualitative_name(pm25_level):
    """This function takes pm25 level from WeatherMap API response"""
    if pm25_level<10:
        return "Good"
    elif pm25_level<25 and pm25_level>=10 :
        return "Fair"
    elif pm25_level>=25 and pm25_level<50:
        return "Moderate"
    elif pm25_level>=50 and pm25_level<75:
        return "Poor"
    elif pm25_level>=75:
        return "Very Poor"
    
def get_o3_qualitative_name(o3_level):
    """This function takes pm25 level from WeatherMap API response"""
    if o3_level<60:
        return "Good"
    elif o3_level<100 and o3_level>=60 :
        return "Fair"
    elif o3_level>=100 and o3_level<140:
        return "Moderate"
    elif o3_level>=140 and o3_level<180:
        return "Poor"
    elif o3_level>=180:
        return "Very Poor"
    
def get_co_qualitative_name(co_level):
    
    """This function takes pm25 level from WeatherMap API response"""
    if co_level<4400:
        return "Good"
    elif co_level<9400 and co_level>=4400 :
        return "Fair"
    elif co_level>=9400 and co_level<12400:
        return "Moderate"
    elif co_level>=12400 and co_level<15400:
        return "Poor"
    elif co_level>=15400:
        return "Very Poor"

def hit_api(base_url,body):
    pass