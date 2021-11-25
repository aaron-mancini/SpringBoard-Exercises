const App = () => (
    <div>
        <Tweet username="Aaron" date="Today" message="Hello everyone!"/>
        <Tweet username="Billy" date="11/23/2021" message="I am Billy"/>
        <Tweet username="ilikedogs123" date="Yesterday" message="I like dogs."/>
    </div>
);

ReactDOM.render(<App/>, document.getElementById("root"));