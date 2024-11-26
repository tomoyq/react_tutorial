import {useState, useEffect} from 'react';
import './assets/styles/style.css';
import defaultDataset  from './dataset';
import { AnswersList, Chats } from './components/index';

function App() {
  //回答コンポーネントに渡すデータ
  const [answers, setAnswers] = useState([]);

  //チャットコンポーネントに渡すデータ
  const [chats, setChats] = useState([]);

  //現在の質問ID
  const [currentId, setCurrentId] = useState('init');

  //質問と回答のデータセット
  const [dataset, setDataset] = useState(defaultDataset);

  //問い合わせフォーム用モーダルの開閉を管理
  const [open, setOpen] = useState(false);

  //回答の初期化
  const initAnswer = () => {
    //datasetからinitのvalueを取得
    const initDataset = dataset[currentId];
    //valueの中から回答を取得
    const initAnswers = initDataset.answers;
    setAnswers(initAnswers);
  };

  //チャットの初期化
  const initChat = () => {
    //datasetからinitのvalueを取得
    const initDataset = dataset[currentId];
    //本文とタイプというプロパティをもつ連想配列を作成
    const newChat = {
      text: initDataset.question,
      type: 'question'
    };
    //今までのチャットステートに追加する
    setChats([...chats, newChat]);
  };


  useEffect(() => {
    initChat();
    initAnswer();
  }, []);
 
  return (
    <section className='c-section'>
      <div className='c-box'>
        <Chats chats={chats}/>
        <AnswersList answers={answers}/>
      </div>
    </section>
  );
}

export default App;
