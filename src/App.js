import './App.css';
import Header from './section/header/Header';
import Horloge from './section/horloge/Horloge';
import ToDoList from './section/toDoList/ToDoList';

function App() {
  return (
    <div className="App">
      <Header/>
      <Horloge/>
      <ToDoList/>
    </div>
  );
}

export default App;
