import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
    const [todos, setTodos] = useState([])

    const addTodo = (text) => {
        setTodos([...todos, { text: text, id: uuidv4() }])
    }

    const removeTodo = (id) => {
        setTodos(todos.filter(t => t.id !== id));
    }

    return (
        <div>
            <NewTodoForm addTodo={addTodo} />
            <ul>
                {todos.map(t => <Todo key={t.id} id={t.id} text={t.text} removeTodo={removeTodo}/>)}
            </ul>
        </div>
    )
}

export default TodoList;