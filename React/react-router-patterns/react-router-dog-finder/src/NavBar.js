import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ dogs }) => {
    
    return (
        <>
            <Link to="/dogs"><h1>Dog List!</h1></Link>
            {dogs.map(d => <Link key={d.name} to={`/dogs/${d.name.toLowerCase()}`}>{d.name}</Link>)}
        </>
    )
}

export default NavBar;