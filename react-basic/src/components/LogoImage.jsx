const Image = (props) => {
    return (
        <div>
            <img src={props.img} />
            <p>
                Edit <code>{props.src}</code> and save to reload.
            </p>
        </div>
    );
};

export default Image