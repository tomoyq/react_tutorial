import { useEffect, useState } from "react";

const Unsplash = () => {
    const [image, setImage] = useState();
    const [click, setClick] = useState(false);

    //クリックされたら状態を更新
    const changeClick = () => {
        setClick(prevState => !prevState);
    };

    //写真がランダムに表示されるサイトからimgのsrcをとる
    useEffect(() => {
        fetch('https://picsum.photos/800')
        .then(res => res.blob())
        .then(data => {
            console.log(data);
            setImage(URL.createObjectURL(data));
        })
        .catch(error => {
            console.error(error);
        });
    }, [click])

    return (
        <div>
            <button onClick={changeClick}>ランダム</button>
            <img src={image} className="img" />
        </div>
    );
};

export default Unsplash