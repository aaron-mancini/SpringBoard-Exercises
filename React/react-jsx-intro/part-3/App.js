const App = () => (
    <div>
        <Person name="Aaron" age={28} hobbies={["video games", "skiing", "music"]}/>
        <Person name="Thispersonwithalongname" age={17} hobbies={["video games", "skiing", "music"]}/>
        <Person name="John" age={42} hobbies={["poker", "crafts", "fishing"]}/>
    </div>
);

ReactDOM.render(<App/>, document.getElementById("root"));