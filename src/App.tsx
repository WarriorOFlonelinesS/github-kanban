import './App.css';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Github Kanban';
  }, []); 
  return (
    <>
      <Header />
      <Board/>
    </>
  );
}

export default App;
