

const Todo = ({ text, removeTodo, id }) => {

    const handleClick = evt => {
        removeTodo(evt.target.id)
    }

    return (<li>{text}<button id={id} onClick={handleClick}>X</button></li>)
}

export default Todo;