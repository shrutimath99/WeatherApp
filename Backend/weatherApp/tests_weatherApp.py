
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from unittest.mock import patch
from .helper import get_co_qualitative_name,get_no2_qualitative_name,\
    get_pm10_qualitative_name,get_pm25_qualitative_name,get_o3_qualitative_name,\
    get_so2_qualitative_name
class GetWeatherData(APITestCase):
    def setUp(self):
        pass
    def test_get_weather_data_invalid_input(self):
        url = '/weather/get_weather_data/'
        data = {"city":""}
        response = self.client.post(url,data, format="json")

        # Check if the request was successful (status code 200)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], "Please enter valid city name")

    def test_get_weather_api_success(self):
        url = '/weather/get_weather_data/'
        data = {"city":"Pune"}
        with patch("requests.get") as mock_get:
        # Mock the requests.get response
            mock_get.return_value.status_code = 200
            mock_get.return_value.json.return_value = {"cityName":"Pune","weatherData": "sunny"}
            response = self.client.post(url,data, format="json")

        # Check assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('cityName', response.data)
        self.assertIn('weatherData',response.data)
        self.assertEqual(response.data['cityName'], data["city"])

    def test_get_weather_api_failed(self):
        url = '/weather/get_weather_data/'
        data = {"city":"Pune"}
        with patch("requests.get") as mock_get:
        # Mock the requests.get response
            mock_get.return_value.status_code = 401
            mock_get.return_value.json.return_value = {"message":"Invalid API key"}
            response = self.client.post(url,data, format="json")

        # Check assert
        self.assertEqual(response.status_code, 401)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], "Invalid API key")

    
class GetAQIInfo(APITestCase):
    def setUp(self):
        pass
    def test_get_aqi_invalid_input(self):
        url = '/weather/get_current_aqi_info/'
        data = {"city":""}
        response = self.client.post(url,data, format="json")

        # Check if the request was successful (status code 200)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], "Please enter valid city name")

    def test_get_aqi_success(self):
        url = '/weather/get_current_aqi_info/'
        data = {"city":"Pune"}
        with patch("requests.get") as mock_get:
        # Mock the requests.get response
            mock_get.return_value.status_code = 200
            mock_get.return_value.json.return_value = {"coord":{"lat":"14","lon": "15"}}
            response = self.client.post(url,data, format="json")

        # Check assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('cityName', response.data)
        self.assertIn('aqi',response.data)
        self.assertEqual(response.data['cityName'], data["city"])

    def test_get_aqi_invalid_resp(self):
        url = '/weather/get_current_aqi_info/'
        data = {"city":"Pune"}
        with patch("requests.get") as mock_get:
        # Mock the requests.get response
            mock_get.return_value.status_code = 500
            mock_get.return_value.json.return_value = {"lat":"14","lon": "15"}
            response = self.client.post(url,data, format="json")

        # Check assert
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'],"Internal Server Error")

    def test_get_aqi_api_WeatherAPI(self):
        url = '/weather/get_current_aqi_info/'
        data = {"city":"Pune"}
        with patch("requests.get") as mock_get:
        # Mock the requests.get response
            mock_get.return_value.status_code = 401
            mock_get.return_value.json.return_value = {"message":"Invalid API key"}
            response = self.client.post(url,data, format="json")

        # Check assert
        self.assertEqual(response.status_code, 401)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], "Invalid API key")

    
class QualitativeNames(APITestCase):
    def setUp(self):
        pass

    def test_qualitative_names_invalid_input(self):
        url = '/weather/get_qualitative_data/'
        data = {"city":""}
        response = self.client.post(url,data, format="json")

        # Check if the request was successful (status code 200)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], "Please enter valid city name")

    def test_get_qualitative_success(self):
        url = '/weather/get_qualitative_data/'
        data = {"city":"Pune"}
        mock_resp = {"cityName":"Pune","aqi":{"list":[{"components":
                                            {"co":2323.15,"no":25.03,
                                             "no2":67.17,"o3":0.02,
                                             "so2":55.31,"pm2_5":189.4,
                                             "pm10":230.93,"nh3":102.34}}
                                            ]}}
        # Mock the requests.get response
        with patch("requests.post") as mock_get:
            mock_get.return_value.status_code = 200
            mock_get.return_value.json.return_value = mock_resp
            response = self.client.post(url,data, format="json")

        # Check assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('cityName', response.data)
        self.assertIn('qualitative_names',response.data)
        self.assertIn('aqi_components',response.data)
        self.assertEqual(response.data['cityName'], data["city"])

    def test_get_qualitative_data_invalid_resp(self):
        url = '/weather/get_qualitative_data/'
        data = {"city":"Pune"}
        with patch("requests.post") as mock_get:
        # Mock the requests.get response
            mock_get.return_value.status_code = 500
            mock_get.return_value.json.return_value = {"lat":"14","lon": "15"}
            response = self.client.post(url,data, format="json")

        # Check assert
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'],"Internal Server Error")

    def test_get_qualitative_data_api_WeatherAPI(self):
        url = '/weather/get_qualitative_data/'
        data = {"city":"Pune"}
        with patch("requests.post") as mock_post:
        # Mock the requests.get response
            mock_post.return_value.status_code = 401
            mock_post.return_value.json.return_value = {"message":"Invalid API key"}
            response = self.client.post(url,data, format="json")

        # Check assert
        self.assertEqual(response.status_code, 401)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], "Invalid API key")

class GetHistoricalAqi(APITestCase):
    def setUp(self):
        pass
    def test_get_historical_aqi_invalid_input(self):
        url = '/weather/get_historical_aqi/'
        data = {"city":""}
        response = self.client.post(url,data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], "Please enter valid city name")

    def test_get_historical_aqi_success(self):
        url = '/weather/get_historical_aqi/'
        data = {"city":"Pune"}
        with patch("requests.post") as mock_get:
        # Mock the requests.get response
            mock_get.return_value.status_code = 200
            mock_get.return_value.json.return_value = {"cityName":"Pune",
                                                        "weatherData": "sunny",
                                                        "aqi":{"coord":{"lat":30,
                                                                    "lon":40}}}
            response = self.client.post(url,data, format="json")

        # Check assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('cityName', response.data)
        self.assertIn('historical_data',response.data)
        self.assertEqual(response.data['cityName'], data["city"])


class GetForecastAqi(APITestCase):
    def setUp(self):
        pass
    def test_get_forecast_invalid_input(self):
        url = '/weather/get_forecast_aqi/'
        data = {"city":""}
        response = self.client.post(url,data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], "Please enter valid city name")

    def test_get_historical_aqi_success(self):
        url = '/weather/get_forecast_aqi/'
        data = {"city":"Pune"}
        with patch("requests.post") as mock_get:
        # Mock the requests.get response
            mock_get.return_value.status_code = 200
            mock_get.return_value.json.return_value = {"cityName":"Pune",
                                                        "weatherData": "sunny",
                                                        "aqi":{"coord":{"lat":30,
                                                                    "lon":40}}}
            response = self.client.post(url,data, format="json")

        # Check assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('cityName', response.data)
        self.assertIn('forecast_resp',response.data)
        self.assertEqual(response.data['cityName'], data["city"])

      
class TestHelperFunction(APITestCase):
    def setUp(self):
        pass
    def test_get_co_qualitative_name(self):
        result = get_co_qualitative_name(16000)
        assert result =="Very Poor"

    def test_get_o3_qualitative_name(self):
        result = get_o3_qualitative_name(70)
        assert result =="Fair"

    def test_get_pm25_qualitative_name(self):
        result = get_pm25_qualitative_name(40)
        assert result =="Moderate"

    def test_get_pm10_qualitative_name(self):
        result = get_pm10_qualitative_name(150)
        assert result =="Poor"

    def test_no2_qualitative_name(self):
        result = get_no2_qualitative_name(20)
        assert result =="Good"
    
    def get_so2_qualitative_name(self):
        result = get_so2_qualitative_name(400)
        assert result =="Very Poor"