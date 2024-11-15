import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    //カウントを増やす関数
    const countUp = () => {
        //prevStateは更新前のstateを参照する
        setCount(prevState => prevState + 1);
    };

    //カウントを減らす関数
    const countDown = () => {
        setCount(prevState => prevState - 1);
    };

    return (
        <div>
            <p>現在のカウント数: {count}</p>

            <button onClick={countUp}>up</button>
            <button onClick={countDown}>down</button>
        </div>
    );
};

export default Counter