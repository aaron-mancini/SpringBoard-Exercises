import Pokecard from "./pokecard";
import './Pokedex.css'

function Pokedex(props) {
    return <div className="Pokedex-container">
        {props.pokemon.map(p => <Pokecard id={p.id} name={p.name} type={p.type} baseExp={p.base_experience}/>)}
    </div>
    
}

export default Pokedex;