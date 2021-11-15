import "./App.css";
import CountriesDisplay from "./components/CountriesDisplay/CountriesDisplay";
import Search from "./components/Search/Search";

function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Search />
      <CountriesDisplay />
    </div>
  );
}

export default App;
