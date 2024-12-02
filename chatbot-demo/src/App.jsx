import {useState, useEffect, createElement} from 'react';
import './assets/styles/style.css';
import defaultDataset  from './dataset';
import { AnswersList, Chats } from './components/index';
import FormDialog from './components/Forms/FormDialog';
import { db } from './firebase';

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

  //選んだ選択肢に紐づいている次の質問を表示させる
  const displayNextQuestion = (nextQuestionId) => {
    //次の質問文をdatasetからとってくる
    const nextChats = {
      text: dataset[nextQuestionId].question,
      type: 'question'
    };
    //今までのチャットステートに追加する
    setChats(prevState => [...prevState, nextChats]);
    //currentIdを変更
    setCurrentId(nextQuestionId);
    //次の質問の回答に更新
    setAnswers(dataset[nextQuestionId].answers);
  };

  //選択肢を選んだら実行
  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case (nextQuestionId === 'init'):
        //最初の質問も表示させる
        setTimeout(() => displayNextQuestion(nextQuestionId), 500);
        break;

      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        //aタグの遷移先を別タブで開く
        a.target = '_blank';
        a.click();
        break;

      case (nextQuestionId === 'contact'):
        handleClickOpen();
        break;

      default:
        //選択した文をanswerタイプで保持
        const answer = {
          text: selectedAnswer,
          type: 'answer'
        };
        //今までのチャットステートに追加する
        setChats(prevState => [...prevState, answer]);

        setTimeout(() => displayNextQuestion(nextQuestionId), 1000);
        break;
    };
  };

  //modalを開く
  const handleClickOpen = () => {
    setOpen(true);
  };

  //modalを閉じる
  const handleClose = () => {
    setOpen(false);
  };

  const initDataset = dataset => {
    setDataset(dataset);
  }

  useEffect(() => {
    (async() => {
      const dataset = dataset;

      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          const id = doc.id;
          const data = doc.data();
          dataset[id] = data;
        })
      })

      initDataset(dataset);

      //最初のロードが終わると何も回答していない状態で最初の質問が表示される
      const initAnswer = '';
      selectAnswer(initAnswer, currentId);

      return () => {
        setChats(
          chats.filter((index) => (index === 0))
        );
      };
    })();
  }, []);

  //chatsが増えると自動スクロールされる
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight; 
    };
  }, [chats]);
 
  return (
    <section className='c-section'>
      <div className='c-box'>
        <Chats chats={chats}/>
        <AnswersList answers={answers} select={selectAnswer}/>
        <FormDialog open={open} close={handleClose}/>
      </div>
    </section>
  );
}

export default App;
