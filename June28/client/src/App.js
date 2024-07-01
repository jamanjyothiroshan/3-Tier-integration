import { useState } from "react";
import './App.css';

function App() {

  let [students, setStudents] = useState([]);

  let getStudentsFromServer = async () => {
    let requestType = {
      method: "GET"
    };

    let JSONData = await fetch("http://localhost:4567/getStudents", requestType);
    let JSOData = JSONData.json();
    setStudents(JSOData);
    console.log(JSOData);
  }
  return (
    <div className="App">
      <button onClick={() => {
        getStudentsFromServer();
      }}>Get Students</button>
      {students.map((ele, i)=>{
        return (
        <div key={i}>
          <h2>{ele.firstName} {ele.lastName}</h2>
          <h2>{ele.email}</h2>
        </div>
      );
      })}
    </div>
  );
}

export default App;
