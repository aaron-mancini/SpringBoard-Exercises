const Tweet = (props) => {
    return <div>
        <h1>{props.username}</h1>
        <p>Date: {props.date}</p>
        <p>Message: {props.message}</p>
    </div>
}