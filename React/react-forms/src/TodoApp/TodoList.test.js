import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";


it("renders without crashing", function() {
    render(<TodoList />);
});

it("matches snapshot", function() {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it("creates a new todo", function() {
    const todoList = render(<TodoList />)

    expect(todoList.queryByText("test")).not.toBeInTheDocument();

    const textInput = todoList.getByLabelText("Todo:");
    fireEvent.change(textInput, { target: { value: "test"} })
    const button = todoList.getByText("Add");
    fireEvent.click(button);

    expect(todoList.queryByText("test")).toBeInTheDocument();
})

it("removes a todo", function() {
    const todoList = render(<TodoList />)

    const textInput = todoList.getByLabelText("Todo:");
    fireEvent.change(textInput, { target: { value: "test"} })
    const button = todoList.getByText("Add");
    fireEvent.click(button);

    const removeBtn = todoList.getByText("X");
    fireEvent.click(removeBtn);
    expect(todoList.queryByText("test")).not.toBeInTheDocument();
})