import React from 'react';
import './App.css';
import FilterableProductTable from './Product/FilterableProductTable';


// const Update = ({id, name, age}) => {
//   const [newName, setNewName] = useState(name);
//   const [newAge, setNewAge] = useState(age);

//   const updateEmployeeAge = () => {
//     axios.put("http://localhost:3001/update", { id: id, name: newName, age: newAge }).then(
//       response => {
//         setEmployeeList(
//           employeeList.map(val => {
//             return val.id === id
//               ? {
//                   id: val.id,
//                   age: val.age,
//                   name: val.name,
//                 }
//               : val;
//           })
//         );
//       }
//     );
//   };

//   return (
//       <form onSubmit={updateEmployeeAge}>
//         New name:<input type="text" value={newName} onChange={event => {setNewName(event.target.value) }}/>
//         <br/>
//         New age:<input type="number" value={newAge} onChange={event => {setNewAge(event.target.value)}}/>
//         <br/>
//         <input type="submit" value="UPDATE" />
//       </form>
//   )
// };

function App() {

  return (
    <div className="App">
        <FilterableProductTable />
    </div>
  );
}

export default App;
