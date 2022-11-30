import './App.css';
import Home from './serverUrl/Home'
import Add from './serverUrl/Add'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/create" element={<Add/>} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
