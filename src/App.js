import logo from './logo.svg';
import './App.css';
import  data  from './data/charList.json'
import { CharacterList } from "./Characters"

function App() {
  return (
      <div className="App">
        <CharacterList />
        </div>
  );
}

export default App;
