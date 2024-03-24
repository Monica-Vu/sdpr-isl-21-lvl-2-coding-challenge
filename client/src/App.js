import React, { useState, useEffect } from "react";
import "./App.css";
import PaintAvailabilityTable from "./components/PaintAvailabilityTable.js";
import SelectionMenu from "./components/SelectionMenu.js";
import { USERS, SAMPLE_TABLE_DATA } from "./constants.js"

function App() {
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/paints`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData =>", responseData);
        setData(responseData);
        console.log("data =>", data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  };

  useEffect(() => { fetchData() }, []);

  return (
    <div className="App">
      <SelectionMenu users={USERS} user={user} handleChange={handleChange} />
      <PaintAvailabilityTable data={data} user={user} fetchDataFunc={fetchData} />
    </div>
  );
}

export default App;
