import { useState } from "react";

const TodoForm = ({addItems}) => {
    const [todo, setTodo] = useState({title: '', content: '', date: ''});

    const changeTitle = (e) => {
        setTodo({...todo, title: e.target.value});
    };

    const changeContent = (content) => {
        setTodo({...todo, content: content.target.value});
    };

    const changeDate = (date) => {
        setTodo({...todo, date: date.target.value});
    };
 
    const addTodo = (event) => {
        //フォーム送信時のデフォルトのイベントを実行させない
        event.preventDefault();        

        //itemsにtodoを追加する
        addItems(todo);

        //stateを使って入力内容をクリアする
        setTodo({title: '', content: '', date: ''});
    };

    return (
        <form onSubmit={addTodo}>

            <input type="text" placeholder="タイトル" name="title" onChange={changeTitle} value={todo.title} />
            <input type="text" placeholder="詳細" name="content" onChange={changeContent} value={todo.content}/>
            <input type="date" name="date" onChange={changeDate} value={todo.date} />
            <button type="submit">追加</button>

        </form>
    );
};

export default TodoForm