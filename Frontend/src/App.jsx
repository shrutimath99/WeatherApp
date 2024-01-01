import { Route, Routes } from "react-router";
import HomePage from './HomePage';
import AnalysisPage from './AnalysisPage';
import AQIPage from "./AQIPage";
import NotFoundPage from './NotFoundPage';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/analysis" element={<AnalysisPage/>} />
        <Route path="/aqi" element={<AQIPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </div>
  )
}

export default App;
