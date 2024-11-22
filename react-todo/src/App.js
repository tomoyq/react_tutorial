import { useState } from 'react';

import './App.css';
import { TodoForm, TodoList } from './components';

import Container from '@mui/material/Container'


function App() {
  const [items, setItems] = useState([]);

  //stateを更新する関数を定義
  const addItems = todo => {
    setItems((prevState) => [...prevState, {id: items.length + 1, todoContent: todo}]);
  };

  const deleteItems = id => {
    setItems(items => items.filter(item => item.id !== id));   
  };

  return (
    <Container className='container' maxWidth='sm'>
      <h1>勉強アプリ</h1>

      <h2>勉強したこと/ものを追加</h2>

      <TodoForm addItems={addItems}/>

      <h2>勉強した内容一覧</h2>

      <ul>
        {items.map((item) => (
          <TodoList key={item.id} id={item.id} props={item.todoContent} func={deleteItems} />
        ))}
      </ul>
      
    </Container>
  );
}

export default App;
