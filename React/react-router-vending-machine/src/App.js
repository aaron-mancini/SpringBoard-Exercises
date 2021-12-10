import VendingMachine from './VandingMachine';
import Chips from './Chips';
import Candy from './Candy';
import Soda from './Soda';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VendingMachine />} />
          <Route path="/chips" element={<Chips />} />
          <Route path="/candy" element={<Candy />} />
          <Route exact path="/soda" element={<Soda />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
