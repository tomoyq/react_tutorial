import {useState, useEffect, useCallback} from 'react';
import './assets/styles/style.css';
import { AnswersList, Chats } from './components/index';
import FormDialog from './components/Forms/FormDialog';
import {db} from './firebase/index';
import { collection, getDocs, query } from 'firebase/firestore';

const App = () => {
  //回答コンポーネントに渡すデータ
  const [answers, setAnswers] = useState([]);

  //チャットコンポーネントに渡すデータ
  const [chats, setChats] = useState([]);

  //現在の質問ID
  const [currentId, setCurrentId] = useState('init');

  //質問と回答のデータセット
  const [dataset, setDataset] = useState({});

  //問い合わせフォーム用モーダルの開閉を管理
  const [open, setOpen] = useState(false);

  //選んだ選択肢に紐づいている次の質問を表示させる
  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    //次の質問文をdatasetからとってくる
    addChats({
      text: nextDataset.question,
      type: 'question'
    });

    //currentIdを変更
    setCurrentId(nextQuestionId);
    //次の質問の回答に更新
    setAnswers(nextDataset.answers);
  };

  //選択肢を選んだら実行
  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
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
        addChats({
          text: selectedAnswer,
          type: 'answer'
        });

        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 1000);
        break;
    };
  };

  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }

  //modalを開く
  const handleClickOpen = () => {
    setOpen(true);
  };

  //modalを閉じる
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    (async() => {
      const initDataset = dataset;

      await getDocs(query(collection(db, 'questions'))).then(snapshots => {
        snapshots.forEach(doc => {
          const id = doc.id;
          const data = doc.data();
          initDataset[id] = data;
        })
      })

      setDataset(initDataset);
      displayNextQuestion(currentId, initDataset[currentId]);
    })();
  }, []);

  //chatsが増えると自動スクロールされる
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight; 
    };
  });
 
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
