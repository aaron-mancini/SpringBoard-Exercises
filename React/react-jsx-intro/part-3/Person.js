const Person = (props) => {
    let message;
    if (props.age >= 18) {
        message = "please go vote!";
    } else {
        message = "you must be 18";
    }
    
    return <div>
        <p>Learn some information about this person.</p>
        <h1>{(props.name.length > 8) ? props.name.slice(0,6) : props.name}</h1>
        <h3>{message}</h3>
        <ul>
            {props.hobbies.map(hob => <li>{hob}</li>)}
        </ul>
    </div>
}