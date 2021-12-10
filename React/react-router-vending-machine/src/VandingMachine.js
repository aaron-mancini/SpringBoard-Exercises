import { Link } from "react-router-dom";

const VendingMachine = () => {
    return (
        <div>
            <h1>Vanding Machine</h1>
            <h3>Hello! Please Select a Snack!</h3>
            <Link to="/chips">Chips</Link>
            <Link to="/candy">Candy</Link>
            <Link to="/soda">Soda</Link>
        </div>
    )
}

export default VendingMachine;