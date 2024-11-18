import logo from './logo.svg';
import './App.css';
import { TodoForm } from './components';

import Container from '@mui/material/Container'


function App() {
  return (
    <Container fixed>
      <TodoForm/>
    </Container>
  );
}

export default App;
