const DogList = ({dogs}) => {
    const dogList = dogs.map(dog => {
        return (
            <div>
                <img src={dog.src} alt={dog.name}></img>
                <h1>Name: {dog.name}</h1>
                <p>Age: {dog.age}</p>
                <ul>
                    {dog.facts.map(f => <li>{f}</li>)}
                </ul>    
            </div>
        )
    })
    return (
        <div>
            {dogList}
        </div>
    )
}

export default DogList;