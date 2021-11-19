import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forwardPage, showCountries, gobackPage } from "../../actions";

import "./PaginationBar.css";

export default function PaginationBar() {
  const countriesList = useSelector((state) => state.countriesList);

  const STEP = 10;
  const LENGTH = countriesList.length;

  const initPagination = {
    start: 0,
    end: STEP,
  };
  const [localPagination, setLocalPagination] = useState(initPagination);
  const [toShow, setToShow] = useState(
    countriesList.slice(localPagination.start, localPagination.end)
  );

  const forward = () => {
    setLocalPagination((localPagination) => {
      let start = localPagination.end;
      let end = start + STEP;
      return { start, end };
    });
  };
  const goback = () => {
    setLocalPagination((localPagination) => {
      let end = localPagination.start;
      let start = end - STEP > 0 ? end - STEP : 0;
      return { start, end };
    });
  };

  const hNext = () => {
    return localPagination.end > LENGTH ? false : true;
  };
  const hPrev = () => {
    return localPagination.start > 0 ? true : false;
  };

  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.pagination);

  const nextHandler = () => {
    dispatch(forwardPage(pagination.page));
    dispatch(showCountries(pagination.page + 1, pagination.name));
    
  };
  const prevHandler = () => {
    dispatch(gobackPage(pagination.page));
    dispatch(showCountries(pagination.page - 1, pagination.name));
  };

  return (
    <div id="pagination-wrap">
      {pagination.hasPrevious ? (
        <span onClick={prevHandler}>Previous</span>
      ) : (
        <span className="disabled">Nathing here</span>
      )}
      {pagination.hasNext ? (
        <span onClick={nextHandler}>Next</span>
      ) : (
        <span className="disabled">Nathing here</span>
      )}
    </div>
  );
}
