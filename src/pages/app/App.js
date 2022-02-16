import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "../home/home.js"
import Spot from "../spot/spot.js"
import Create from "../create/create.js"
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/:id' element={<Spot />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
