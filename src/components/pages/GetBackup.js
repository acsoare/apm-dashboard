import React from "react";
import moment from "moment";
var axios = require("axios");
import "../pages/AllData.css";

export default class GetData extends React.Component {
  state = {
    loading: true,
    getData: null,
    getDataAAA: null,
  };

  async componentDidMount() {
    this.getDataBackup();
  }

  async getDataBackup() {
    const url =
      "https://webhooks.mongodb-realm.com/api/client/v2.0/app/getscriptsdata-bcojx/service/pastHour/incoming_webhook/pastHour";

    const response = await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json,  */*",
        "Content-type": "application/json, charset=utf-8",
      },
    });

    const data = await response.json();

    this.setState({
      getData: data,
      loading: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>Please wait. Data is loading.</div>
        ) : (
          <>
            <div className="containerTabelHeader">
              <div className="tabelID">ID</div>
              <div className="tabelScriptName">Script Name</div>
              <div className="tabelStatus">Status</div>
              <div className="tabelErrorDescription">Error Description</div>
              <div className="tabelElapsedTime">Run Time</div>
            </div>
            <div className="tabelLastRunTime">Last Run Time</div>
            {/* AICI MAPAM CE PRIMIM */}
            {this.state.getData.map((item, key) => {
              return (
                <div key={Math.random().toString().slice(2, 11)}>
                  <div className="style_script-ID">
                    <div
                      key={Math.random().toString().slice(2, 11)}
                      className="script-ID"
                    >
                      {item.id.$numberInt}
                    </div>
                  </div>
                  <div
                    key={Math.random().toString().slice(2, 11)}
                    className="script-Name"
                  >
                    {item.scriptName}
                  </div>
                  <div
                    key={Math.random().toString().slice(2, 11)}
                    className="scriptStatus"
                  >
                    {item.status}
                  </div>
                  <div
                    key={Math.random().toString().slice(2, 11)}
                    className="errorDescription"
                  >
                    {item.errorDescription}
                  </div>
                  <div
                    key={Math.random().toString().slice(2, 11)}
                    className="elapsedTime"
                  >
                    {item.elapsedTime.$numberDouble.substring(0, 5)} s
                  </div>
                  <div
                    key={Math.random().toString().slice(2, 11)}
                    className="timestamp"
                    style={{
                      marginLeft: "650px",
                      position: "absolute",
                      marginRight: "10px",
                      color: "white",
                    }}
                  >
                    {Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(item.time.$date.$numberLong)}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}
