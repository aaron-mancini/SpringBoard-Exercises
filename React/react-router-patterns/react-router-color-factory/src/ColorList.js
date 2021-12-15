import { Link } from "react-router-dom";

const ColorList = ({colors}) => {
    return (
        <>
            <h1>Welcome to the color factory.</h1>
            <Link to="/colors/new">Add a color</Link>
            <br></br>
            {colors.map(c => <Link key={c.id} to={`/colors/${c.name}`}>{c.name}</Link>)}
        </>
    )
}

export default ColorList;