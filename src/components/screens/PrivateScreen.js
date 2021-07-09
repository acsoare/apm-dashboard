import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import GetData from "../pages/GetData";
import FilterPastData from "../pages/FilterPastData";
import CardScripts from "../models/card_scripts";
import FilterV2 from "../pages/FilterV2";

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [input, setInput] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("login");
    }

    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      setStatus(false);
      var x = document.getElementById("input").value;
      // console.log(x);

      axios.post("/temp", { x }).then(function (response) {
        // console.log(response);
      });
    }
  };

  const [status, setStatus] = useState(true);
  const options = ["one", "two", "three"];

  // console.log(status);
  return error ? (
    <span classNameName="error-message">{error}</span>
  ) : (
    <>
      <div style={{ background: "green", color: "white" }}>{privateData}</div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div onClick={logoutHandler} className="button" id="button-2">
          <div id="slide"></div>
          Logout
        </div>
        <div
          onClick={() => setStatus(!status)}
          className="button"
          id="button-2"
        >
          <div id="slide"></div>
          {status ? "Search" : "BACK"}
        </div>
      </div>

      {status ? (
        <>
          <div
            style={{
              display: "flex",
            }}
          >
            <div>
              <GetData />
            </div>
            <CardScripts />
          </div>
        </>
      ) : (
        // <FilterPastData />
        <FilterV2 />
      )}
    </>
  );
};

export default PrivateScreen;
