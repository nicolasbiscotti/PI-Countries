import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div id="navbar-wrap">
      <div id="navbar-center">
        <Link to="/countries" id="navbar-title">
          Henry Countries
        </Link>
        <Link to="/add_activity">Add Activity</Link>
      </div>
    </div>
  );
}
