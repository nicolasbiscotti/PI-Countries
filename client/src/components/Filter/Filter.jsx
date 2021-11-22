import "./Filter.css";

export default function Filter({
  title,
  filter,
  options,
  applyFilter,
  filterOn,
  turnOffFilter,
}) {
  const onChangeHandler = (e) => {
    filter.value = e.target.value;
    applyFilter(filter);
  };
  return (
    <div id="filter-wrap">
      {!filterOn ? (
        <select
          onChange={(e) => onChangeHandler(e)}
          name="continent"
          id="selec_continent"
        >
          <option value="">{title}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <span onClick={() => turnOffFilter(filter)}>{filterOn} X</span>
      )}
    </div>
  );
}
