import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Color = ({colors}) => {
    const {color} = useParams();

    const currentColor = colors.find(c => c.name === color);

    return (
        <div style={{backgroundColor: currentColor.color}}>
            <h1>This is {currentColor.name}</h1>
            <h1>Isn't it beautiful?</h1>
            <Link to="/colors">Go Back</Link>
        </div>
    )
}

export default Color;