import React, { useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import NewColorForm from "./NewColorForm";
import Color from "./Color";
import ColorList from "./ColorList";
import { v4 as uuidv4 } from "uuid";

const AppRoutes = () => {
    const [colors, setColors] = useState([{name: "red", color: "#ff0000", id: uuidv4()}]);
    const addColor = (data) => {
        let newColor = {...data, id: uuidv4() }
        setColors(c => ([
            ...c,
            newColor
        ]));
    }
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/colors" element={<ColorList colors={colors}/>}/>
            <Route path="/colors/new" element={<NewColorForm addColor={addColor}/>}/>
            <Route path="/colors/:color" element={<Color colors={colors}/>}/>
            <Route path="/" element={<Navigate replace to="/colors" />} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;