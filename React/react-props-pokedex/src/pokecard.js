import './Pokecard.css';

function Pokecard(props) {
    return <div className="Pokecard">
        <p className="Pokecard-name"><b>{props.name}</b></p>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} alt="Pokemon img"/>
        <p>Type: {props.type}</p>
        <p>EXP: {props.baseExp}</p>
    </div>
}

export default Pokecard;