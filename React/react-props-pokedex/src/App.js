import pokemon from './pokemon';
import Pokedex from './pokedex';
import './App.css';

function App() {
  return (
    <div className="App">
      <Pokedex pokemon={pokemon}/>
    </div>
  );
}

export default App;
