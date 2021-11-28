import React, { useState } from 'react';
import './EightBall.css';

function EightBall(props) {
    const [color, setColor] = useState("black")
    const [answer, setAnswer] = useState("Think of a Question")
    const giveAnswer = () => {
        let randIdx = Math.floor(Math.random() * props.answers.length);
        let answer = props.answers[randIdx];
        setColor(answer.color);
        setAnswer(answer.msg);
    }

    return <div onClick={giveAnswer} style={{backgroundColor: color}}  className="EightBall">
        <p className="EightBall-text">{answer}</p>
    </div>
}

export default EightBall;