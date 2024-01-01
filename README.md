# Weather Application
This Application has features for Weather Conditions and Air Quality Visualization . The backend of application fetches weather data from the OpenWeatherMap API for a given
city.
Visualize air quality index (AQI) and pollutant concentration data from the OpenWeatherMap
Air Pollution API.

## Tech Stack

**Frontend:** React, React Material UI

**Backend:** Django , Django Rest Framework

**Unit Testing:** Pytest


## Environment Variables

To run this project, you will need to add the following environment variables

`API_key`

## Installation and Run Locally
Frontend Installation - Navigate to Frontend folder on master branch 
```
1. Run command
    npm i 

2. Command to run server
    npm run dev
```
Navigate to Backend folder on master branch

```bash
1. cd Backend
2. Make virtual environment
    py -m venv env
3. Activate the virtual env using command
    env\Scripts\Activate
4. Install requirements.txt file 
    pip install -r requirements.txt
5. Run command to apply django migration
    python manage.py migrate
6.Create account on https://openweathermap.org/ and get the API key 

7. Set `API_key` environment variable and value from openweathermap website
                org
Navigate to Backend/weatherApp/views.py file and update `API_key` variable to your key
8.Run Backend server using command 
    python manage.py runserver

```

Steps to get Backend unit test coverage 
```
1. Navigate to Backend folder and run below command
    coverage run --source=weatherApi,weatherApp  manage.py test
    coverage report
2. To get coverage report in HTML file Run 
    coverage html
    open htmlcov/index.html   # for macOS
    start htmlcov/index.html  # for Windows
3. Current Unit test case coverage for backend is 88%
    `Please refer below report for reference`
    
    Module	statements	missing	excluded	coverage
    weatherApi\__init__.py	0	0	0	100%
    weatherApi\asgi.py	4	4	0	0%
    weatherApi\settings.py	19	0	0	100%
    weatherApi\urls.py	4	0	0	100%
    weatherApi\wsgi.py	4	4	0	0%
    weatherApp\__init__.py	0	0	0	100%
    weatherApp\admin.py	1	0	0	100%
    weatherApp\apps.py	4	0	0	100%
    weatherApp\helper.py	68	29	0	57%
    weatherApp\migrations\__init__.py	0	0	0	100%
    weatherApp\models.py	1	0	0	100%
    weatherApp\tests_weatherApp.py	183	2	0	99%
    weatherApp\urls.py	4	0	0	100%
    weatherApp\views.py	93	8	0	91%
    Total	385	47	0	88%

```





