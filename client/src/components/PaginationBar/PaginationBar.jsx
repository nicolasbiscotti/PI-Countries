import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { forwardPage, showCountries, gobackPage } from "../../actions";

import "./PaginationBar.css";

export default function PaginationBar(props) {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.pagination);

  const nextHandler = () => {
    dispatch(forwardPage(pagination.page));
    console.log(`SOY nextHandler - currentPage: ${pagination.page}`);
    dispatch(showCountries(pagination.page + 1, pagination.name));
  };
  const prevHandler = () => {
    dispatch(gobackPage(pagination.page));
    console.log(`SOY prevHandler - currentPage: ${pagination.page}`);
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
