import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./ActivityForm.css";

export default function ActivityForm() {
  const countriesList = useSelector((state) => state.countriesList);

  const difficulty = [1, 2, 3, 4, 5];
  const season = ["Winter", "Spring", "Summer", "Autumn"];

  const initialState = {
    name: "",
    duration: 15,
    difficulty: difficulty[0],
    season: season[0],
    countriesId: [],
  };

  const [activity, setActivity] = useState(initialState);

  const activityHandler = (e) => {
    setActivity((activity) => {
      return {
        ...activity,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addCountry = (e) => {
    setActivity((activity) => {
      // to avoid repetitions
      const countriesId =
        activity.countriesId.indexOf(e.target.value) >= 0
          ? activity.countriesId
          : [...activity.countriesId, e.target.value];
      console.log(`ActivityForm: ${activity.countriesId}`);
      return {
        ...activity,
        countriesId,
      };
    });
  };
  const removeCountry = (e) => {
    setActivity((activity) => {
      console.log(e.target);
      return {
        ...activity,
        countriesId: activity.countriesId.filter(
          (c) => c !== e.target.getAttribute("name")
        ),
      };
    });
  };

  const resetHandler = () => {
    setActivity(initialState);
  };

  const onSubmit = () => {
    axios.post("http://localhost:3001/activity", activity);
  };

  return (
    <div id="activity-form-wrap">
      <form action="" id="activity-form">
        <h2>Create an Activity</h2>
        <section>
          <div className="field-set">
            <label htmlFor="name">Activity name:</label>
            <input
              onChange={(e) => activityHandler(e)}
              type="text"
              name="name"
              id="name"
              value={activity.name}
              required
            />
          </div>
          <div className="field-set">
            <label htmlFor="duration">Activity duration:</label>
            <input
              onChange={(e) => activityHandler(e)}
              type="number"
              min="15"
              max="300"
              name="duration"
              id="minutes"
              value={activity.duration}
              required
            />
          </div>
          <fieldset>
            <legend>How difficult is:</legend>
            <div>
              {difficulty.map((diff) => (
                <>
                  <input
                    key={diff}
                    onChange={(e) => activityHandler(e)}
                    type="radio"
                    id={`difficulty ${diff}`}
                    name="difficulty"
                    value={diff}
                  />
                  <label htmlFor="">{diff}</label>
                </>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Choose the season in which take place:</legend>
            <div>
              {season.map((season, index) => (
                <>
                  <input
                    key={index}
                    onChange={(e) => activityHandler(e)}
                    type="radio"
                    id={`season${index + 1}`}
                    name="season"
                    value={season}
                  />
                  <label htmlFor={`season${index + 1}`}>{season}</label>
                </>
              ))}
            </div>
          </fieldset>
        </section>

        <section>
          <div className="field-set">
            <select onChange={(e) => addCountry(e)} name="country" id="country">
              <option value="">--Please choose one or more countries--</option>
              {countriesList.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field-set">
            {activity.countriesId.map((country) => (
              <span
                onClick={(e) => removeCountry(e)}
                className="selected-countries"
                key={country}
                name={country}
              >
                {country} X
              </span>
            ))}
          </div>
        </section>

        <section>
          <p>
            <button type="reset" onClick={resetHandler}>
              Reset
            </button>
            <button onClick={onSubmit} type="button">
              Create
            </button>
          </p>
        </section>
      </form>
    </div>
  );
}
