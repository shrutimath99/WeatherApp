from django.urls import path
from django.urls import include, path
from . import views

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path("get_weather_data/", views.get_weather_info.as_view()),
    path("get_current_aqi_info/",views.get_current_aqi_info.as_view()),
    path("get_qualitative_data/",views.get_qualitative_names.as_view()),
    path("get_historical_aqi/",views.get_historical_aqi.as_view()),
    path("get_forecast_aqi/",views.get_forecast_aqi.as_view()),
]