import { useState } from 'react'
import axios from 'axios'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:"#4285F4",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));



function HomePage() {
  let [weather, setWeather] = useState({
    city:"",
    data:"",
    weather: ""
  });
  let [weatherErrResp,  setWeatherErrorResp] = useState(false)
  let [isWeatherdataRecv , setWeatherdata] = useState(false)
  let [weatherData, setApiResp] = useState([])

  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log("Weather EVenttt",weather.city);
    axios({
      method: "post",
      url:
        "http://127.0.0.1:8000/weather/get_weather_data/",
      data: {city: weather.city},
    })
      .then((data) => {
        console.log("Data", data.data);
        setWeatherdata(true)
        setWeatherErrorResp(false)
        weather=[
            {
            parameter:"lat",
            val: data.data.weatherData.coord.lat,
            unit :"Kelvin"
            },
            {
                parameter:"lon",
                val: data.data.weatherData.coord.lon,
                unit :"Kelvin"
            },
            {
                parameter:"MainWeather",
                val: data.data.weatherData.weather[0].main,
                unit :"Kelvin"
            },
            {
              parameter:"WeatherDescription",
              val: data.data.weatherData.weather[0].description,
              unit :"Kelvin"
            },
            {
              parameter:"temp",
              val: data.data.weatherData.main.temp,
              unit :"Kelvin",

            },
            {
              parameter:"temp_min",
              val: data.data.weatherData.main.temp_min,
              unit :"Kelvin"
            },
            {
              parameter:"temp_max",
              val: data.data.weatherData.main.temp_max,
              unit :"Kelvin"
            },
            {
              parameter:"pressure",
              val: data.data.weatherData.main.pressure,
              unit :"Kelvin"
            },
            {
              parameter:"humidity",
              val: data.data.weatherData.main.humidity,
              unit :"Kelvin"
            },
            {
              parameter:"sea_level",
              val: data.data.weatherData.main.sea_level,
              unit :"Kelvin"
            },
            {
              parameter:"grnd_level",
              val: data.data.weatherData.main.grnd_level,
              unit :"Kelvin"
            },
            {
              parameter:"visibility",
              val: data.data.weatherData.visibility,
              unit :"Kelvin"
            },
            {
              parameter:"wind",
              val: data.data.weatherData.wind.speed,
              unit :"Kelvin"

            },
            {
              parameter:"sunrise",
              val:data.data.weatherData.sys.sunrise,
              unit :"Kelvin"
            },
            {
              parameter:"sunset",
              val:data.data.weatherData.sys.sunset,
              unit :"Kelvin"
            },
            {
              parameter:"country",
              val:data.data.weatherData.sys.country,
              unit :"Kelvin"
            }          
        ]
        setApiResp(weather)

        console.log("This is Setweatherdata", weather)
      })
      .catch((error) => {
        setWeatherErrorResp(true)
        setWeatherdata(false)
        console.log("Error Keyss", Object.keys(error.response));
        console.log("Response message",error.response.data)
        setApiResp(error.response.data)
      });
  
    };


function handleChange({ target }) {
  // console.log("check target", target.value);
  setWeather({
    ...weather,
    [target.name]: target.value,
  });
}


  return (
    <>
      <div style={{marginTop:"100px",marginBottom:"50px"}}>
      <h2 style = {{textAlign:"center", fontFamily:"serif"}} >
      <span style={{color: "#4285F4" }}>Weather App</span> 
      </h2>
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 ,margin: 'auto'}}
      >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search City"
        inputProps={{ 'aria-label': 'Search City' }}
        label="city" name="city" id="city" onChange={handleChange} value={weather.city}
      />
      <IconButton type="button" sx={{ p: '10px' , color:"#4285F4"}} aria-label="search" onClick={handleSubmit} >
         <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical"/>
      </Paper>
      <Container maxWidth="sm" style={{marginTop:"50px",marginRight:"220px"}}>
      <Stack direction="row" spacing={2} style={{marginBottom:"50px",alignItems:"center"}}>
      <Button variant="contained" href="/aqi">AQI Data</Button>
      <Button variant="contained" href="/analysis">Anaylsis</Button>
      </Stack>
      </Container>
      </div>
      <div>
     
      </div>
      <div>
      {isWeatherdataRecv ?
       (
      <Container maxWidth="sm">
  
         <TableContainer component={Paper}>
         <Table sx={{ maxWidth: 500}} aria-label="customized table">
           <TableHead>
             <TableRow>
               <StyledTableCell>Parameter</StyledTableCell>
               <StyledTableCell align="right">Value</StyledTableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {weatherData ? weatherData.map((row) => (
               <StyledTableRow key={row.parameter}>
                 <StyledTableCell component="th" scope="row">
                   {row.parameter}
                 </StyledTableCell>
                 <StyledTableCell align="right">{row.val}</StyledTableCell>
               </StyledTableRow>
             )): <div>
              <p>No data to display</p>
              </div>}
           </TableBody>
         </Table>
       </TableContainer>
       </Container>
      ) : (
        <p></p>
        // <p>This content will be shown if the condition is false.</p>
      )}
      
    </div>
   
    <div>
    {weatherErrResp ?
       (
        <Container  maxWidth="sm">
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{weatherData.message}</Alert>
        </Stack>
        </Container>
      ) : (
        <p></p>
        // <p>This content will be shown if the condition is false.</p>
      )}
      
    </div>

      {/* ------------------------------------------------------------ */}
      {/* <div>Hello World</div>
      <input label="city" name="city" id="city" onChange={handleChange} value={weather.city}></input>
      <button onClick={handleSubmit}>Submit</button> */}
    </> 
  )
}

export default HomePage;

