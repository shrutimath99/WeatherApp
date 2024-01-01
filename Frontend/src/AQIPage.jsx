import { useState, useEffect  } from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import { PieChart } from '@mui/x-charts/PieChart';
import CircularProgress from '@mui/material/CircularProgress';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

function AQIPage() {

  const [aqi, setAQI] = useState({
    city:"",
    components:"",
    aqi_index:0,
    pie_data: []
  });

  const [loading, setLoading] = useState(false);
  let[aqiErr, setAqisErr] = useState(false)
  let [aqiSuccess,setAqiSuccess] = useState(false)
  let [aqiError,setError] = useState({})
  const handleSubmit = (event) =>{
    event.preventDefault();
    setLoading(true);
    axios({
      method: "post",
      url:
        "http://127.0.0.1:8000/weather/get_current_aqi_info/",
      data: {city: aqi.city},
    })
      .then((data) => {
        console.log("Data", data.data);
        console.log("AQI", data.data.aqi.list[0].components)
        setAQI({
          ...aqi,
          components: data.data.aqi.list[0].components,
          aqi_index: data.data.aqi.list[0].main.aqi
        });
        setAqisErr(false)
        setAqiSuccess(true)
      })
      .catch((error) => {
        console.log("error", error);
        setError(error.response.data)
        setLoading(false);
        setAqisErr(true)
        setAqiSuccess(false)
      });
  
};

useEffect(() => {
  const pie_data = Object.entries(aqi.components).map(([label, value], index) => ({
    id: index,
    value: value,
    label: label.toUpperCase()
  }));
  console.log("dataArray", pie_data)
  setAQI({
    ...aqi,
    pie_data: pie_data
  });
  setLoading(false);
}, [aqi.components]);

function handleChange({ target }) {
  setAQI({
    ...aqi,
    [target.name]: target.value,
  });
}



  return (
    <>
      <h2 style = {{textAlign:"center", fontFamily:"serif"}} >
      <span style={{color: "#4285F4" }}>AQI Details Page</span> 
      </h2>
 
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 ,margin: 'auto'}}
      >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search City"
        inputProps={{ 'aria-label': 'Search City' }}
        label="city" name="city" id="city" onChange={handleChange} value={aqi.city}
      />
      
      <IconButton type="button" sx={{ p: '10px' , color:"#4285F4"}} aria-label="search" onClick={handleSubmit} >
         <SearchIcon />
      </IconButton> 
      </Paper>
      <Button variant="contained" href="/">Back</Button>
      <div>
        
        {loading && <CircularProgress color="primary" />}
      </div>
      <div>
        {aqiSuccess ?(
          <div>
          {aqi.aqi_index ? <div>The AQI Index for {aqi.city} city is {aqi.aqi_index}</div> : <div></div>}
          {aqi.pie_data ? <PieChart
          series={[
            {
              data: aqi.pie_data,
            },
          ]}
          width={800}
          height={500}
    />: <p>No data to display</p>}
    </div>
    ):(<p></p>)}
    </div>
    <div>
      {aqiErr?(<p><Container maxWidth="sm">
          <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">{aqiError.message}</Alert>
          </Stack>
        </Container></p>):(<p></p>)}
    </div>
    </>
  )
}

export default AQIPage;

