import answers from './answers';
import './App.css';
import EightBall from './EightBall';

function App() {
  return (
    <div>
      <EightBall answers={answers}/>
    </div>
  );
}

export default App;
