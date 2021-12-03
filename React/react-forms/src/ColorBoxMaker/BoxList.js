import React, { useState } from 'react';
import NewBoxForm from './NewBoxForm';
import Box from './Box';
import { v4 as uuidv4 } from "uuid";

const BoxList = () => {
    let [boxes, setBoxes] = useState([])

    const addBox = box => {
        let newBox = {...box, id: uuidv4() }
        setBoxes(boxes => [...boxes, newBox])
    }

    const removeBox = boxId => {
        let newBoxes = boxes.filter(b => b.id !== boxId)
        setBoxes(newBoxes);
    }

    return (
        <>
            <NewBoxForm addBox={addBox}/>
            {boxes.map(b => <Box key={b.id} backgroundcolor={b.color} height={b.height} width={b.width} removeBox={removeBox} id={b.id}/>)}
        </>
    )
}

export default BoxList;