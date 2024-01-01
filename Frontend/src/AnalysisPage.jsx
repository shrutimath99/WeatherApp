import { useState } from 'react'
import axios from 'axios'
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4285F4",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};


function AnalysisPage() {
  const [anaylsis, setAnaylsis] = useState({
    city:"",
    data:""
  });
  let [anaylsisResp , setAnaylsisResp] = useState({})
  let [aqiComponents, setAqiComponents] = useState({})
  let[ analysisErr, setAnalysisErr] = useState(false)
  let [analysisSuccess,setAnalysisSuccess] = useState(false)
  const bar_graph_keys = {
    hazardous:0,
    "Very Poor" :1,
    Poor :2,
    Moderate :3,
    Fair:4,
    Good: 5,

  }

  function createData(component, good, fair, moderate, poor, verypoor) {
    return { component, good, fair, moderate, poor, verypoor };
  }
  
  const rows = [
    createData('SO2', '[0; 20)', '[20; 80)','[80; 250)', '[250; 350)', '⩾350'),
    createData('NO2', '[0; 40)', '[40; 70)', '[70; 150)','[150; 200)','	⩾200'),
    createData('PM10', '[0; 20)', '	[20; 50)', '[50; 100)', '[100; 200)','⩾200'),
    createData('PM25', '[0; 10)', '[10; 25)', '[25; 50)', '[50; 75)','⩾75'),
    createData('O3', '[0; 60)', '[60; 100)','[100; 140)','[140; 180)','	⩾180'),
    createData('CO', '[0; 4400)', '[4400; 9400)','[9400-12400))','[12400; 15400)','⩾15400'),
  ];

  const handleSubmit = (event) =>{
    event.preventDefault();
    axios({
      method: "post",
      url:
        "http://127.0.0.1:8000/weather/get_qualitative_data/",
      data: {city: anaylsis.city},
    })
      .then((data) => {
        console.log("Data", data.data);
        anaylsisResp = data.data.qualitative_names
        setAnaylsisResp(anaylsisResp)
        setAnalysisErr(false)
        setAnalysisSuccess(true)
        setAqiComponents(data.data.aqi_components)
        console.log("Analysis Response Is", anaylsisResp)
      })
      .catch((error) => {
        setAnalysisErr(true)
        setAnalysisSuccess(false)
        setAnaylsisResp(error.response.data)
        console.log("error", error);
      });
  
};

function handleChange({ target }) {
  setAnaylsis({
    ...anaylsis,
    [target.name]: target.value,
  });
}


  return (
    <>
      <h2 style = {{textAlign:"center", fontFamily:"serif"}} >
      <span style={{color: "#4285F4" }}>Analysis Details Page</span> 
      </h2>
 
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 ,margin: 'auto'}}
      >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search City"
        inputProps={{ 'aria-label': 'Search City' }}
        label="city" name="city" id="city" onChange={handleChange} value={anaylsis.city}
      />
      
      <IconButton type="button" sx={{ p: '10px' , color:"#4285F4"}} aria-label="search" onClick={handleSubmit} >
         <SearchIcon />
      </IconButton> 
      </Paper>
      <div>
      {analysisErr?(
           <Container maxWidth="sm">
          <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">{anaylsisResp.message}</Alert>
          </Stack>
        </Container>
      ):(
        <p></p>
        )
      }
     </div>
     <div>
     
     {analysisSuccess?(
    
          <Container maxWidth="sm">
          <h4>AQI componet Analysis representation {anaylsis.city}  </h4>
          <div style={{ width: '100%' }}>
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            <Item>CO&nbsp;&nbsp;&nbsp;{aqiComponents.co}</Item>
            <Item>NO2&nbsp;&nbsp;&nbsp;{aqiComponents.no2}</Item>
            <Item>SO2&nbsp;&nbsp;&nbsp;{aqiComponents.so2}</Item>
            <Item>PM10&nbsp;&nbsp;&nbsp;{aqiComponents.pm10}</Item>
            <Item>PM25&nbsp;&nbsp;&nbsp;{aqiComponents.pm2_5}</Item>
            <Item>O3&nbsp;&nbsp;&nbsp;{aqiComponents.o3}</Item>
          </Box>
          </div>
          </Container>
      
     ):(
       <p></p>
       )
     }
    </div>

      <h4> AQI Table with Qualitative name Pollutant concentration in μg/m3</h4>

      <Box
        sx={{
          display: 'inline-flex'
          }}>      
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700  }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>AQI Component</StyledTableCell>
            <StyledTableCell align="right">Good</StyledTableCell>
            <StyledTableCell align="right">Fair </StyledTableCell>
            <StyledTableCell align="right">Moderate</StyledTableCell>
            <StyledTableCell align="right">Poor</StyledTableCell>
            <StyledTableCell align="right">Very Poor</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.component}>
              <StyledTableCell component="th" scope="row">
                {row.component}
              </StyledTableCell>
              <StyledTableCell align="right">{row.good}</StyledTableCell>
              <StyledTableCell align="right">{row.fair}</StyledTableCell>
              <StyledTableCell align="right">{row.moderate}</StyledTableCell>
              <StyledTableCell align="right">{row.poor}</StyledTableCell>
              <StyledTableCell align="right">{row.verypoor}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
   
      <div style={{ paddingLeft: "20px"}}>
        {analysisSuccess? (
      <div>
      <h4>Bar chart for Analysis data</h4>
      <Box sx={{ '& button': { m: 1 }} }>
      <div>
        <Button size="small"style={{color:"#02B2AF"}}>0 - Hazardous</Button>
        <Button size="small" style={{color:"#02B2AF"}}>1 - Very Poor</Button>
        <Button size="small" style={{color:"#02B2AF"}}>2 -  Poor</Button>
        <Button size="small" style={{color:"#02B2AF"}}>3 - Moderate </Button>
        <Button size="small" style={{color:"#02B2AF"}}>4 - Fair </Button>
        <Button size="small" style={{color:"#02B2AF"}}>5 - Good </Button>
      </div>
      </Box>
      <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: ["co","no2","pm10","o3","so2","pm2_5"],
          scaleType: 'band',
        },
        
      ]}
      series={[
        {
          data: [
          bar_graph_keys[anaylsisResp["co"]],
          bar_graph_keys[anaylsisResp["no2"]],
          bar_graph_keys[anaylsisResp["pm10"]],
          bar_graph_keys[anaylsisResp["o3"]],
          bar_graph_keys[anaylsisResp["so2"]],
          bar_graph_keys[anaylsisResp["pm2_5"]]
        ],
        },
      ]}
      width={500}
      height={300}/>
     
     
     </div>):(
      <p></p>
     )
     }
     </div>
     </Box>
     <div>
     <Button variant="contained" href="/">Back</Button>
     </div>

    </>
  )
}

export default AnalysisPage;

