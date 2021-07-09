import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function Search(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    // console.log(ranges.selection.startDate);
    // console.log(ranges.selection.endDate);
  }

  return (
    <div>
      <DateRangePicker ranges={[selectionRange]} />
      <button onClick={handleSelect}>OK</button>
    </div>
  );
}

export default Search;
