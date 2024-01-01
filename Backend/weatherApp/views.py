from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
import os
from . import helper



API_key = os.environ.get("API_key")
WEATHERMAP_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
AIR_POLLUTION_BASE_URL = "http://api.openweathermap.org/data/2.5/air_pollution"
# Create your views here.
class get_weather_info(APIView):

    def post(self, request):
        try :
            city = request.data.get("city")
            if city is None or city == "":
                return Response(status=status.HTTP_400_BAD_REQUEST,
                        data={"message":"Please enter valid city name"})
            city=city.strip()
            resp =  requests.get(f"{WEATHERMAP_BASE_URL}?q={city}&appid={API_key}")
            if resp.status_code == 200:
                return Response({"cityName":city, "weatherData":resp.json()})
            else:
                return Response(status=resp.status_code,data={"message":resp.json()["message"]})
        except Exception as e :
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR,data={"message":"Internal Server Error"})



    
class get_current_aqi_info(APIView):

    def post(self, request):
        """
        API gives current AQI based on city Input 
        """
        try:
            city = request.data.get("city")
            if city is None or city == "":
                    return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={"message":"Please enter valid city name"})
            city=city.strip()
            resp =  requests.get(f"{WEATHERMAP_BASE_URL}?q={city}&appid={API_key}")
            if resp.status_code ==200 :

                lat = resp.json()["coord"]["lat"]
                lon = resp.json()["coord"]["lon"]

                resp2 = requests.get(f"{AIR_POLLUTION_BASE_URL}?lat={lat}&lon={lon}&appid={API_key}")
                if resp2.status_code ==200:
                    return Response({"cityName":city,"aqi":resp2.json()})
                else:
                    return Response(status=resp.status_code,data={"message":resp.json()["message"]})
            else:
                return Response(status=resp.status_code,data={"message":resp.json()["message"]})
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR,data={"message":"Internal Server Error"})

class get_qualitative_names(APIView):
    
    def post(self, request):
        """
        API gives the qualitative names(Good,Fair,Moderate,Very Poor,Poor)
        for AQI components like so2,o3,no2,
        pm10,pm2_5, based on predefined ranges
        """
        city = request.data.get("city")
        if city is None or city == "":
                    return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={"message":"Please enter valid city name"})
        city=city.strip()
        try:
            resp =  requests.post("http://127.0.0.1:8000/weather/get_current_aqi_info/",json={"city":city})
           
            if resp.status_code !=200:
                return Response(status=resp.status_code , data={"message":resp.json()["message"]})
            aqi = resp.json()["aqi"]
            components = aqi["list"][0]["components"]
            qualitative_names = {}
            qualitative_names["co"] = helper.get_co_qualitative_name(components["co"])
            qualitative_names["no2"] = helper.get_no2_qualitative_name(components["no2"])
            qualitative_names["pm10"] = helper.get_pm10_qualitative_name(components["pm10"])
            qualitative_names["pm2_5"] = helper.get_pm25_qualitative_name(components["pm2_5"])
            qualitative_names["o3"] = helper.get_o3_qualitative_name(components["o3"])
            qualitative_names["so2"] = helper.get_so2_qualitative_name(components["so2"])
            
            return Response({"cityName":city,"aqi_components":components ,"qualitative_names":qualitative_names})
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR,data={"message":"Internal Server Error"})

class get_historical_aqi(APIView):
   
    def post(self,request):
        """This perticular API needs Paid subscription
        This API requires paid supscription
        """
        try:
            city = request.data.get("city")
            if city is None or city == "":
                    return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={"message":"Please enter valid city name"})
            current_aqi_data =  requests.post("http://127.0.0.1:8000/weather/get_current_aqi_info/",json={"city":city})
            lat= current_aqi_data.json()["aqi"]["coord"]["lat"]
            lon= current_aqi_data.json()["aqi"]["coord"]["lon"]
            history_resp = requests.post(f"https://history.openweathermap.org/data/2.5/history/city?lat={lat}&lon={lon}&type=hour&appid={API_key}")
            if history_resp.status_code == 200:
                return Response({"cityName":city,"historical_data":history_resp.json()})
            else:
                return Response(status=history_resp.status_code,data={"error":history_resp.json()["message"]})
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR,data={"message":"Internal Server Error"})
            

class get_forecast_aqi(APIView):
    """This API Gives the weather Forcast pf a city
       This API requires paid supscription
    """
    def post(self,request):
        try:
            city = request.data.get("city")
            if city is None or city == "":
                    return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={"message":"Please enter valid city name"})
            city = request.data.get("city")
            current_aqi_data =  requests.post("http://127.0.0.1:8000/weather/get_current_aqi_info/",json={"city":city})
            lat= current_aqi_data.json()["aqi"]["coord"]["lat"]
            lon= current_aqi_data.json()["aqi"]["coord"]["lon"]
            forecast_resp = requests.post(f"https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API_key}")
            return Response({"cityName":city,"forecast_resp":forecast_resp.json()})
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR,data={"message":"Internal Server Error"})