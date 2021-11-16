import { Routes, Route } from "react-router-dom";
import "./App.css";
import CountryActivities from "./pages/CountryActivities/CountryActivities";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/countries/" element={<Home />} />
        <Route path="/countries/:countryId" element={<CountryActivities />} />
      </Routes>
    </div>
  );
}

export default App;
