import React from "react";
import "../pages/FilterPastData.css";

const {
  Stitch,
  RemoteMongoClient,
  UserPasswordCredential,
} = require("mongodb-stitch-browser-sdk");
const client = Stitch.initializeDefaultAppClient("backup_data-fhymv");

export default class Test extends React.Component {
  state = {
    loading: true,
    getData: null,
    value: null,
    getInputTextFromSearchBox: null,
  };

  //   async componentWillMount() {
  //     this.getData();
  //   }

  async getData() {
    this.setState({
      getInputTextFromSearchBox: this.state.value,
    });

    const db = client
      .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
      .db("backup");

    var email = "acsoare@ymail.com";
    var password = "Underground22!!";
    const credentials = new UserPasswordCredential(
      email.toString(),
      password.toString()
    );
    var oneQuery = false;
    var twoQuery = false;
    var dateQuery = false;
    var statusQuery = false;

    var searchQuery1 = false;
    var searchQuery2WithDate = false;
    var searchQuery2WithStatus = false;
    var searchQuery3WithStatusAndDate = false;
    var searchQuery4MultipleScriptNames = false;
    var searchQuery5DateWithFailed = false;

    // /////////////////////////////////////////
    //LOGIC FOR FILTERS, BASED ON INPUT TEXT
    if (this.state.value.toString().includes("-")) {
      //   console.log("l-am gasit");
      searchQuery4MultipleScriptNames = true;
    }
    if (this.state.value.toString().includes(",")) {
      if (this.state.value.toString().split(",")[0].length === 8) {
        searchQuery5DateWithFailed = true;
      }
      //   console.log(this.state.value.toString());
      twoQuery = true;
      const afterDelimiterString = this.state.value
        .toString()
        .split(/,(.*)/)[1];
      //   console.log(afterDelimiterString);
      if (afterDelimiterString.includes(",")) {
        searchQuery3WithStatusAndDate = true;
        // console.log(
        //   "cazul 4 - DATE - STATUS - SCRIPT NAME",
        //   afterDelimiterString
        // );
      }
      //   console.log("SCRIPT NAME: ", scriptNameString);
      //   console.log("AFTER DELIMITER STRING: ", afterDelimiterString);
      if (afterDelimiterString.length === 8) {
        // console.log("DATE STRING: ", dateString);
        dateQuery = true;
      } else {
        if (
          afterDelimiterString === "GOOD" ||
          afterDelimiterString === "FAILED"
        ) {
          statusQuery = true;
        }
      }
    } else {
      this.scriptNameString = this.state.value.toString();
      oneQuery = true;
    }

    if (oneQuery === true) {
      searchQuery1 = true;
    } else {
      if (twoQuery === true && dateQuery === true) {
        searchQuery2WithDate = true;
      } else {
        if (twoQuery === true && statusQuery === true) {
          searchQuery2WithStatus = true;
        }
      }
    }

    //  END
    /////////////////////////////////////////

    //CONSTRUCT FINAL SEARCH QUERY BASED ON INPUT
    if (searchQuery1 === true) {
      var date = new Date().toISOString();
      const endInterval = date.split("T")[0] + "T00:00:00.000+03:00";
      const endIntervalX = new Date(endInterval);

      client.auth
        .loginWithCredential(credentials)
        .then(() =>
          db
            .collection("backup")
            .find(
              {
                scriptName: { $regex: this.state.getInputTextFromSearchBox },

                time: { $gte: endIntervalX },
              },

              { sort: { time: -1 } },

              { limit: 10 }
            )

            .asArray()
        )
        .then((data) => {
          this.setState({
            getData: data,
            loading: false,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      if (searchQuery2WithDate === true) {
        const finalDateQuery = this.state.value.toString().split(",")[1];
        const DateQuerySTART =
          finalDateQuery.substring(4, 8) +
          "-" +
          finalDateQuery.substring(2, 4) +
          "-" +
          finalDateQuery.substring(0, 2) +
          "T00:00:00.000+03:00";

        const DateQueryEND =
          finalDateQuery.substring(4, 8) +
          "-" +
          finalDateQuery.substring(2, 4) +
          "-" +
          finalDateQuery.substring(0, 2) +
          "T23:59:59.999+03:00";

        // console.log(DateQuerySTART);
        // console.log(DateQueryEND);
        const startIntervalX = new Date(DateQuerySTART);
        const endIntervalX = new Date(DateQueryEND);
        const startInterval = startIntervalX;
        const endInterval = endIntervalX;
        // console.log(startInterval);
        // console.log(endInterval);

        client.auth
          .loginWithCredential(credentials)
          .then(() =>
            db
              .collection("backup")
              .find(
                {
                  scriptName: {
                    $regex: this.state.value.toString().split(",")[0],
                  },
                  time: {
                    $gte: startInterval,
                    $lt: endInterval,
                  },
                },
                { sort: { time: -1 } },
                { limit: 10 }
              )
              .asArray()
          )
          .then((data) => {
            this.setState({
              getData: data,
              loading: false,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        if (searchQuery2WithStatus === true) {
          client.auth
            .loginWithCredential(credentials)
            .then(() =>
              db
                .collection("backup")
                .find(
                  {
                    scriptName: {
                      $regex: this.state.value.toString().split(",")[0],
                    },
                    status: this.state.value.toString().split(",")[1],
                  },
                  { sort: { time: -1 } },
                  { limit: 10 }
                )
                .asArray()
            )
            .then((data) => {
              this.setState({
                getData: data,
                loading: false,
              });
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          if (searchQuery3WithStatusAndDate === true) {
            const dateStatusQuery = this.state.value
              .toString()
              .split(/,(.*)/)[1];
            var dateSplit = dateStatusQuery.split(",")[0];
            var statusSplit = dateStatusQuery.split(",")[1];
            // console.log(dateSplit);
            // console.log(statusSplit);
            const DateQuerySTART =
              dateSplit.substring(4, 8) +
              "-" +
              dateSplit.substring(2, 4) +
              "-" +
              dateSplit.substring(0, 2) +
              "T00:00:00.000+03:00";

            const DateQueryEND =
              dateSplit.substring(4, 8) +
              "-" +
              dateSplit.substring(2, 4) +
              "-" +
              dateSplit.substring(0, 2) +
              "T23:59:59.999+03:00";

            // console.log(DateQuerySTART);
            // console.log(DateQueryEND);
            const startIntervalX = new Date(DateQuerySTART);
            const endIntervalX = new Date(DateQueryEND);
            const startInterval = startIntervalX;
            const endInterval = endIntervalX;
            // console.log(startInterval);
            // console.log(endInterval);

            client.auth
              .loginWithCredential(credentials)
              .then(() =>
                db
                  .collection("backup")
                  .find(
                    {
                      scriptName: {
                        $regex: this.state.value.toString().split(",")[0],
                      },
                      status: statusSplit,
                      time: {
                        $gte: startInterval,
                        $lt: endInterval,
                      },
                    },
                    { sort: { time: -1 } },
                    { limit: 10 }
                  )
                  .asArray()
              )
              .then((data) => {
                this.setState({
                  getData: data,
                  loading: false,
                });
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }
      }
    }
    if (searchQuery4MultipleScriptNames === true) {
      let multipleValuesTemp = this.state.value.toString();

      var date2 = new Date().toISOString();
      const endInterval = date2.split("T")[0] + "T23:59:59.999+03:00";
      const endIntervalX = new Date(endInterval);

      function addDays(theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
      }

      const startInterval =
        addDays(new Date(), -1).toISOString().split("T")[0] +
        "T00:00:00.000+03:00";

      const startIntervalX = new Date(startInterval);

      //   console.log(startInterval);
      //   console.log(endInterval);

      multipleValuesTemp = multipleValuesTemp.replaceAll("-", "|^");
      //   console.log(multipleValuesTemp);
      const searchForMore = "[^" + multipleValuesTemp + "]";
      //   console.log(searchForMore);

      client.auth
        .loginWithCredential(credentials)
        .then(() =>
          db
            .collection("backup")
            .find(
              {
                scriptName: {
                  $regex: `${searchForMore}`,
                  //   $regex: "[^AAA|^AAB|^AAC]",
                },

                time: {
                  $gte: startIntervalX,
                  $lt: endIntervalX,
                },
              },
              { sort: { time: -1 } },
              { limit: 10 }
            )
            .asArray()
        )
        .then((data) => {
          this.setState({
            getData: data,
            loading: false,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (searchQuery5DateWithFailed === true) {
      //   console.log("data + FAILED");
      var datatemp =
        this.state.value.toString().substring(4, 8) +
        "-" +
        this.state.value.toString().substring(2, 4) +
        "-" +
        this.state.value.toString().substring(0, 2) +
        "T00:00:00.000+03:00";
      //   console.log(datatemp);
      const dataStart = datatemp;
      const dataEnd =
        this.state.value.toString().substring(4, 8) +
        "-" +
        this.state.value.toString().substring(2, 4) +
        "-" +
        this.state.value.toString().substring(0, 2) +
        "T23:59:59.999+03:00";
      //   console.log(dataStart, dataEnd);

      //   console.log(statusQuery);

      client.auth
        .loginWithCredential(credentials)
        .then(() =>
          db
            .collection("backup")
            .find(
              {
                status: "FAILED",

                time: {
                  $gte: new Date(dataStart),
                  $lt: new Date(dataEnd),
                },
              },
              { sort: { time: -1 } },
              { limit: 10 }
            )
            .asArray()
        )
        .then((data) => {
          this.setState({
            getData: data,
            loading: false,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  // GETTING THE INPUT VALUE FROM TEXT FIELD - START
  getValue = (event) => {
    // console.log("Event: ", event.target.value);

    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = () => {
    const value = this.state.value;
    const getInputTextFromSearchBox = this.state.value;

    this.getData();

    // console.log(value);
  };

  //  GETTING THE INPUT VALUE FROM TEXT FIELD - END
  render() {
    // console.log(this.state.value);
    return (
      <>
        <div>
          <input
            className="inputText"
            type="text"
            onBlur={this.getValue}
          ></input>
          <div className="buttonSubmit" onClick={this.handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="search"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {this.state.loading ? (
          <div
            style={{
              color: "black",
              position: "absolute",
              marginLeft: "10px",
              marginTop: "50px",
            }}
          >
            Search to get query results...
          </div>
        ) : (
          <div
            style={{
              marginTop: "60px",
            }}
          >
            <div
              style={{
                display: "flex",
                marginLeft: "20px",
                marginRight: "20px",
              }}
            >
              <div
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  position: "absolute",
                  color: "black",
                  fontFamily: "Roboto",
                  fontWeight: "700",
                }}
              >
                ID
              </div>
              <div
                style={{
                  marginLeft: "50px",
                  marginRight: "10px",
                  position: "absolute",
                  color: "black",
                  fontFamily: "Roboto",
                  fontWeight: "700",
                }}
              >
                Script Name
              </div>
              <div
                style={{
                  marginLeft: "230px",
                  marginRight: "10px",
                  position: "absolute",
                  color: "black",
                  fontFamily: "Roboto",
                  fontWeight: "700",
                }}
              >
                Status
              </div>
              <div
                style={{
                  marginLeft: "310px",
                  marginRight: "10px",
                  position: "absolute",
                  fontFamily: "Roboto",
                  color: "black",
                  fontWeight: "700",
                }}
              >
                Error Description
              </div>
              <div
                style={{
                  marginLeft: "530px",
                  marginRight: "10px",
                  color: "black",
                  position: "absolute",
                  fontFamily: "Roboto",
                  fontWeight: "700",
                }}
              >
                Elapsed time
              </div>
            </div>
            <div
              style={{
                marginLeft: "730px",
                color: "black",
                marginRight: "10px",
                position: "relative",
                fontFamily: "Roboto",
                fontWeight: "700",
              }}
            >
              Date
            </div>
            <div>
              {this.state.getData.map((item, key) => {
                return (
                  <div
                    style={{
                      marginLeft: "20px",
                      width: "815px",
                      marginRight: "20px",
                      marginTop: "5px",
                      borderRadius: "2em",
                      boxSizing: "border-box",
                      fontFamily: "Roboto",
                      fontWeight: "400",
                      textAlign: "center",
                      display: "flex",
                      background: item.status === "GOOD" ? "green" : "red",
                    }}
                  >
                    <div className="style_script-ID">
                      <div
                        className="script-ID"
                        style={{
                          marginLeft: "10px",
                          marginRight: "10px",
                          color: "white",
                        }}
                      >
                        {item.id}
                      </div>
                    </div>
                    <div
                      className="script-Name"
                      style={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        color: "white",
                      }}
                    >
                      {item.scriptName}
                    </div>
                    <div
                      className="scriptStatus"
                      style={{
                        marginLeft: "230px",
                        position: "absolute",
                        marginRight: "10px",
                        color: "white",
                      }}
                    >
                      {item.status}
                    </div>
                    <div
                      className="errorDescription"
                      style={{
                        marginLeft: "310px",
                        marginRight: "10px",
                        position: "absolute",
                        color: "white",
                      }}
                    >
                      {item.errorDescription}
                    </div>
                    <div
                      className="elapsedTime"
                      style={{
                        marginLeft: "550px",
                        position: "absolute",
                        marginRight: "10px",
                        color: "white",
                      }}
                    >
                      {item.elapsedTime.toString().substring(0, 6)}s
                    </div>
                    <div
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
                      }).format(item.time)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }
}
