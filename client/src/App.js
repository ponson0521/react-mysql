import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './App.css';


const Update = ({id, name, age}) => {
  const [newName, setNewName] = useState(name);
  const [newAge, setNewAge] = useState(age);
  const {employeeList , setEmployeeList} = useContext(employeeListContext);

  const updateEmployeeAge = () => {
    axios.put("http://localhost:3001/update", { id: id, name: newName, age: newAge }).then(
      response => {
        setEmployeeList(
          employeeList.map(val => {
            return val.id === id
              ? {
                  id: val.id,
                  age: val.age,
                  name: val.name,
                }
              : val;
          })
        );
      }
    );
  };

  return (
      <form onSubmit={updateEmployeeAge}>
        New name:<input type="text" value={newName} onChange={event => {setNewName(event.target.value) }}/>
        <br/>
        New age:<input type="number" value={newAge} onChange={event => {setNewAge(event.target.value)}}/>
        <br/>
        <input type="submit" value="UPDATE" />
      </form>
  )
};

function App() {
  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [employeeList , setEmployeeList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/employee").then((response) => {
      setEmployeeList(response.data);
    });
    }, []
  );

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

  return (
    <div className="App">
      <employeeListContext.Provider value={{employeeList , setEmployeeList}}>
        <form onSubmit={addEmployee}>
          <h1>INSERT</h1>
          <label>Name:</label>
          <input type="text" onChange={Event =>{setName(Event.target.value)}}/>
          <label>Age:</label>
          <input type="number" onChange={Event =>{setAge(Event.target.value)}}/>
          <input type="submit" value="送出"/>
        </form>
        <br/>
        <h1>GET</h1>
        {employeeList.map(val => {
          return <ul key={val.id} style={{float:'left'}}>   
            <li>Name: {val.name}</li>
            <li>Age: {val.age}</li>
            <Update id={val.id} name={val.name} age={val.age} />
          </ul>;
        })}
      </employeeListContext.Provider>
    </div>
  );
}

export const employeeListContext = React.createContext();
export default App;
