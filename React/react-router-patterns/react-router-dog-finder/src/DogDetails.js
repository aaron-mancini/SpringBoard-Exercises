import { useParams } from "react-router-dom"

const DogDetails = ({dogs}) => {
    const { name } = useParams();
    let index = dogs.findIndex(x => x.name.toLowerCase() === name)
    let dog = dogs[index]
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
}

export default DogDetails