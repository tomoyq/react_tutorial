import { useState } from "react";

import PublishedButton from "./PublishedButton";

const Article = (props) => {
    const [isPublished, setIsPublished] = useState(false);
    //state更新関数はクリックイベントなどに直接渡すのではなく、関数化して渡す
    const publishedArticle = () => {
        //ボタンを押すとtrueとfalseが交互に描画される(もっと上手い書き方があるはず)
        // if (isPublished === true){
        //     setIsPublished(false);
        // }else{
        //     setIsPublished(true);
        // };

        setIsPublished(prevState => !prevState)
    };

    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.content}</p>

            <PublishedButton isPublished={isPublished} onClick={publishedArticle} />
        </div>
    );
};

export default Article