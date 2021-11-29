import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderByName } from "../../helperFunctions/filters";
import "./ActivityForm.css";

export default function ActivityForm() {
  const countriesList = useSelector((state) => state.countriesList);

  const difficulty = [1, 2, 3, 4, 5];
  const season = ["Winter", "Spring", "Summer", "Autumn"];

  const initialState = {
    name: "",
    duration: "",
    difficulty: "",
    season: "",
    countriesId: [],
  };

  const [activity, setActivity] = useState(initialState);
  const [errors, setError] = useState({});
  const [disabled, setDisabled] = useState(true);

  const validate = (input) => {
    const errors = {};
    if (!input.name) {
      errors.name = "Activity name is required";
    }
    if (
      Number.parseInt(input.duration) < 15 ||
      Number.parseInt(input.duration) > 240
    ) {
      errors.duration = "Duration is invalid";
    }
    if (!input.difficulty) {
      errors.difficulty = "Difficulty is required";
    }
    if (!input.season) {
      errors.season = "Season is invalid";
    }
    if (!input.countriesId.length) {
      errors.countriesId = "No countries selected";
    }
    return errors;
  };
  const disableCreateButton = (activity) => {
    let errors = validate(activity);
    for (const error in errors) {
      return true;
    }
    return false;
  };

  const activityHandler = (e) => {
    let input = {};
    setActivity((activity) => {
      input = {
        ...activity,
        [e.target.name]: e.target.value,
      };
      return input;
    });
    setError((errors) => {
      let res = {
        ...errors,
        [e.target.name]: validate(input)[e.target.name],
      };
      return res;
    });
    setDisabled(() => disableCreateButton(input));
  };

  const addCountry = (e) => {
    setActivity((activity) => {
      // to avoid repetitions
      return activity.countriesId.indexOf(e.target.value) >= 0
        ? { ...activity }
        : {
            ...activity,
            countriesId: [...activity.countriesId, e.target.value],
          };
    });
  };
  const removeCountry = (e) => {
    setActivity((activity) => {
      return {
        ...activity,
        countriesId: activity.countriesId.filter(
          (c) => c !== e.target.dataset.value
        ),
      };
    });
  };

  const resetHandler = () => {
    setActivity(initialState);
    setDisabled(() => disableCreateButton(initialState));
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:3001/activity", activity)
      .then((r) => r.data)
      .then((d) => console.log(d));
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
              key="name-imput"
              required
            />
            <label
              htmlFor="name"
              className={errors.name ? "warning" : "hidden"}
            >
              {errors.name}
            </label>
          </div>
          <div className="field-set">
            <label htmlFor="minutes">Activity duration:</label>
            <input
              onChange={(e) => activityHandler(e)}
              type="number"
              placeholder="duracion debe ser de 15 a 240 minutos"
              name="duration"
              id="minutes"
              value={activity.duration}
              key="durantion-inpu"
              required
            />
            <label
              htmlFor="minutes"
              className={errors.duration ? "warning" : "hidden"}
            >
              {errors.duration}
            </label>
          </div>
          <fieldset>
            <legend>How difficult is:</legend>
            <div>
              {difficulty.map((diff) => (
                <>
                  <input
                    key={`difficulty ${diff}`}
                    onChange={(e) => activityHandler(e)}
                    type="radio"
                    id={`difficulty ${diff}`}
                    name="difficulty"
                    value={diff}
                  />
                  <label htmlFor={`difficulty ${diff}`}>{diff}</label>
                </>
              ))}
              <label className={errors.difficulty ? "warning" : "hidden"}>
                {errors.difficulty}
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Choose the season in which take place:</legend>
            <div>
              {season.map((season, index) => (
                <>
                  <input
                    key={`season${index + 1}`}
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
              <option key="c-0" value="">
                --Please choose one or more countries--
              </option>
              {orderByName(countriesList, 1).map((country) => (
                <option key={`country-${country.id}`} value={country.id}>
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
                data-value={country}
              >
                {
                  countriesList.find((c) => c.id === Number.parseInt(country))
                    .name
                }{" "}
                X
              </span>
            ))}
          </div>
        </section>

        <section>
          <p>
            <button type="reset" onClick={resetHandler}>
              Reset
            </button>
            <button onClick={onSubmit} type="button" disabled={disabled}>
              Create
            </button>
          </p>
          <Link to="../countries">Go Back</Link>
        </section>
      </form>
    </div>
  );
}
