import { useState, useEffect } from "react";
import axios from "axios";
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

  const [status, setStatus] = useState(true);

  // console.log(status);
  return error ? (
    <span classNameName="error-message">{error}</span>
  ) : (
    <>
      <div style={{ background: "green", color: "white" }}>{privateData}</div>
      <FilterV2 />
    </>
  );
};

export default PrivateScreen;
