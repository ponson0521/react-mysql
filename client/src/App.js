import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [employeeList , setEmployeeList] = useState([]);

  const addEmployee = () => {
    axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
        },
      ]);
    });
  };

  const getEmployees = () => {
    axios.get("http://localhost:3001/employee").then((response) => {
      setEmployeeList(response.data);
    });
  };

  return (
    <div className="App">
      <label>Name:</label>
      <input type="text" onChange={Event =>{setName(Event.target.value)}}/>
      <label>Age:</label>
      <input type="number" onChange={Event =>{setAge(Event.target.value)}}/>
      <button onClick={addEmployee}>ADD</button>
      <button onClick={getEmployees}>Show Employees</button>
      <br/>
      {employeeList.map((val, key) => {
        return <ul key={val.id} style={{float:'left'}}>                
          <li>Name: {val.name}</li>
          <li>Age: {val.age}</li>
        </ul>;
      })}
    </div>
  );
}

export default App;
