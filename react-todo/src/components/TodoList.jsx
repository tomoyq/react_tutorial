const TodoList = ({props}) => {
    return (
        <li>
            <span className="todo-title">{props.title} - </span>{props.content} , 日付：{props.date}
        </li>
    );
};

export default TodoList