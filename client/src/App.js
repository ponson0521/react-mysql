import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [employeeList , setEmployeeList] = useState([]);
  const [newAge, setNewAge] = useState(null);

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

  const updateEmployeeAge = (id, age) => {
    console.log(id);
    axios.put("http://localhost:3001/update", { age: age, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                }
              : val;
          })
        );
      }
    );
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
      {employeeList.map((val) => {
        return <ul key={val.id} style={{float:'left'}}>                
          <li>Name: {val.name}</li>
          <li>Age: {val.age}</li>
          <input type="number" onChange={event => {
            setNewAge(event.target.value);
          }}
          />
          <button onClick={updateEmployeeAge(val.id, newAge)}>update</button>
        </ul>;
      })}
    </div>
  );
}

export default App;
