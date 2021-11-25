const App = () => (
    <div>
        <FirstComponent/>
        <NamedComponent name="Aaron"/>
    </div>
);

ReactDOM.render(<App/>, document.getElementById("root"));