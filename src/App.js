import './App.css';
import axios from "axios";
import {useState} from "react";

function App() {

    const [computers, setComputers] = useState();

    axios.get('http://localhost:1030/api/computers')
        .then(res => {
            setComputers(res.data);
        })

    return (
    <div className="App">
      <header className="App-header">
          {( computers ) &&
              computers.map(computer =>
                  <div>{computer.name}</div>
              )
          }
      </header>
    </div>
  );
}

export default App;
