import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCountries, resetPagination, showCountries } from "../../actions";
import "./NavBar.css";

export default function NavBar() {
  const dispatch = useDispatch();

  const goHomeHandler = () => {
    dispatch(resetPagination());
    dispatch(showCountries());
  }

  const goTaAddActivity = () => {
    dispatch(fetchCountries());
  }

  return (
    <div id="navbar-wrap">
      <div id="navbar-center">
        <Link to="/countries" onClick={goHomeHandler} id="navbar-title">
          Henry Countries
        </Link>
        <Link to="/add_activity" onClick={goTaAddActivity} >Add Activity</Link>
      </div>
    </div>
  );
}
