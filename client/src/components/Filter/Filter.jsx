import "./Filter.css";
// la prop options espero un array de objs -> {id: to use as value, name: to show the user}
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
    <div className="filter-wrap">
      <select
        onChange={(e) => onChangeHandler(e)}
        name={`selec_${filter.type}`}
        id={`selec_${filter.type}`}
      >
        <option value="" onClick={() => turnOffFilter(filter)}>
          {title}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
