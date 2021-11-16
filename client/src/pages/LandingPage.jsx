import { Link } from "react-router-dom";
import "./LandingPage.css";
export default function LandingPage() {
  return (
    <div id="landing-page-wrap">
      <h1 id="landing-page-title">Henry Countries</h1>
      <Link to="countries">Let's travel</Link>
    </div>
  );
}
