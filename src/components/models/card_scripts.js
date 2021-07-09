import React from "react";
// import "../models/card_scripts.css";
import "../models/test.css";

export default class Test extends React.Component {
  render() {
    return (
      <>
        {/* <div className="DASHBOARD_PANEL">
          <div className="scripts_Running">
            <h2>SCRIPTS: </h2>
            <h1>46</h1>
          </div>
          <div className="overall_Health_Day">
            <h2>Overall Health Today: </h2>
            <h1>100%</h1>
          </div>
          <div className="overall_Health_Day">
            <h2>Overall Health Today: </h2>
            <h1>100%</h1>
          </div>
          <div className="overall_Health_Day">
            <h2>Overall Health Today: </h2>
            <h1>100%</h1>
          </div>
        </div> */}

        <div className="container">
          <div className="scriptsTotal">SCRIPTS: </div>
          <div className="uptime">UPTIME </div>
        </div>
      </>
    );
  }
}
