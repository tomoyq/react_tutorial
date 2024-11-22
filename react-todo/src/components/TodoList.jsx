const TodoList = ({id, props, func}) => {
    const deleteItem = () => {
        func(id);
    };

    return (
        <li>
            <span className="todo-title">{props.title} - </span>{props.content} , 日付：{props.date}<button onClick={deleteItem}>削除</button>
        </li>
    );
};

export default TodoList