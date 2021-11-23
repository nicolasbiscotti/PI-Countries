import { useDispatch, useSelector } from "react-redux";
import { forwardPage, goBackPage } from "../../actions";
import "./PaginationBar.css";

export default function PaginationBar({countries}) {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.pagination);

  const goForward = () => {
    dispatch(forwardPage());
  };

  const goBack = () => {
    dispatch(goBackPage());
  };

  const hasNext = () => {
    return pagination.end > countries.length ? false : true;
  };
  const hasPrev = () => {
    return pagination.start > 0 ? true : false;
  };

  return (
    <div id="pagination-wrap">
      {hasPrev() ? (
        <span onClick={goBack}>Previous</span>
      ) : (
        <span className="disabled">Nathing here</span>
      )}
      {hasNext() ? (
        <span onClick={goForward}>Next</span>
      ) : (
        <span className="disabled">Nathing here</span>
      )}
    </div>
  );
}
