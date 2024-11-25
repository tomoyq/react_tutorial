import {useState} from 'react';
import './assets/styles/style.css';
import defaultDataset  from './dataset';

function App() {
  //回答コンポーネントに渡すデータ
  const [ansers, setAnsers] = useState([]);

  //チャットコンポーネントに渡すデータ
  const [chats, setChats] = useState([]);

  //現在の質問ID
  const [currentId, setCurrentId] = useState('init');

  //質問と回答のデータセット
  const [dataset, setDataset] = useState(defaultDataset);

  //問い合わせフォーム用モーダルの開閉を管理
  const [open, setOpen] = useState(false);
 
  return (
    <section className='c-section'>
      <div className='c-box'>
        {currentId}
      </div>
    </section>
  );
}

export default App;
