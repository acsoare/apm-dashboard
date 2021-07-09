import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Grid, Divider } from "@material-ui/core";
import "./FilterV2.css";
import { makeStyles } from "@material-ui/core/styles";
import GetData from "../pages/GetData";
import HugeData from "../pages/FilterPastData";

export default function HackeroneDatepicker() {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [calendar, setCalendar] = useState(true);

  function onChangeStartDate(dateStart) {
    setDateStart(dateStart);
  }
  function onChangeEndDate(dateEnd) {
    setDateEnd(dateEnd);
  }

  function handleOk() {
    console.log(dateStart);
    console.log(dateEnd);
  }

  function handleClick() {
    setCalendar(!calendar);
    console.log(calendar);
  }

  return (
    <Grid container lg={12} spacing={0} item>
      <Grid item md={12}>
        <div className="header">
          <div className="logo">SENTINEL</div>
          <button className="logout">LOGOUT</button>
        </div>
      </Grid>

      <Grid item md={4}>
        <div className="item1">
          <div className="item1_1">Data Visualization</div>
        </div>
      </Grid>

      <Grid item md={4}>
        <div className="item2">My Data</div>
      </Grid>

      <Grid onClick={handleClick} style={{ cursor: "pointer" }} item md={4}>
        <div className="item3">
          {!calendar ? (
            <div
              style={{
                display: "flex",
              }}
            >
              <DatePicker
                selected={dateStart}
                onChange={onChangeStartDate}
                isClearable
              />
              <DatePicker
                selected={dateEnd}
                onChange={onChangeEndDate}
                isClearable
              />
              <button onClick={handleOk}>OK</button>
            </div>
          ) : null}
          <svg
            style={{
              color: "gray",
              width: "30px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Last 24 hours
          <div>
            <svg
              style={{
                color: "gray",
                width: "30px",
                cursor: "pointer",
                alignItems: "center",
                justifyItems: "end",

                display: "flex",
              }}
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </Grid>
      <Grid item md={12}>
        <div className="dashboard">
          <div>
            <div className="dashboard_general">
              Dashboards {" > "} Default Dashboard
            </div>
            <div className="dashboard_apm">APM DASHBOARD</div>
          </div>
        </div>
      </Grid>
      <Grid item md={3}>
        <div className="statsScripts">
          <div className="statsScripts_number">Number of running Scripts</div>
          <div className="statsScripts_number_TOTAL">3</div>
        </div>
      </Grid>
      <Grid item md={3}>
        <div className="statsIssues">
          <div className="statsIssues_number">FAILED Scripts</div>
          <div className="statsIssues_number_TOTAL">0</div>
        </div>
      </Grid>
      <Grid item md={6}>
        <div className="statsChart1">
          <div className="statsIssues_number">Uptime:</div>
          <div className="statsIssues_number_TOTAL">100%</div>
        </div>
      </Grid>
      <Grid item md={8}>
        <div className="statsChart2">
          <div className="statsIssues_number">Latest logs:</div>
          <div className="container_tabel">
            <div className="ID">ID</div>
            <div className="ScriptName">Name</div>
            <div className="Status">Status</div>
            <div className="Error">Error</div>
            <div className="Elapsed">Elapsed</div>
            <div className="RunTime">Run Time</div>
          </div>
          <div className="container_tranzactii">
            <GetData />
          </div>
        </div>
      </Grid>

      <Grid item md={4}>
        <div className="statsChart4">
          <div className="statsIssues_number">Errors by Browser, System:</div>
        </div>
      </Grid>
      <Grid item md={12}>
        <div className="DATA">Filter by Other:</div>
        <HugeData />
      </Grid>
    </Grid>
  );
}
