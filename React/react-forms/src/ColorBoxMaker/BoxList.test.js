import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

it("renders without crashing", function() {
    render(<BoxList />);
});

it("matches snapshot", function() {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});

it("can add a new box", function() {
    const { getByLabelText, queryByText } = render(<BoxList />)

    expect(queryByText("X")).not.toBeInTheDocument();

    const colorInput = getByLabelText("Color:");
    const submitBtn = queryByText("Add a new Box!");

    fireEvent.change(colorInput, { target: { value: "red" }})
    fireEvent.click(submitBtn);

    expect(queryByText("X")).toBeInTheDocument();
    expect(queryByText("X").previousSibling).toHaveStyle(`
        width: 100px;
        height: 100px;
        background-color: red;
    `)
})

it("can remove a box", function() {
    const { getByLabelText, queryByText } = render(<BoxList />)

    const colorInput = getByLabelText("Color:");
    const submitBtn = queryByText("Add a new Box!");

    fireEvent.change(colorInput, { target: { value: "red" }})
    fireEvent.click(submitBtn);

    const removeBtn = queryByText("X");

    fireEvent.click(removeBtn)
    
    expect(removeBtn).not.toBeInTheDocument();
})