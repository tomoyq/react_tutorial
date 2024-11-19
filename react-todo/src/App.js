import { useState } from 'react';

import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList } from './components';

import Container from '@mui/material/Container'


function App() {
  const [items, setItems] = useState([]);

  return (
    <Container fixed>
      <TodoForm setItems={setItems}/>
      <TodoList />
    </Container>
  );
}

export default App;
