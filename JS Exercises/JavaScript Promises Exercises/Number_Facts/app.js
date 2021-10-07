let baseURL = "http://numbersapi.com"
let numbers = [86, 54, 3, 8]

let resp = axios.get(`${baseURL}/86,54,3,8`)

resp.then(data => {
    console.log(data.data)
    for (let num of numbers) {
        let fact = $("<p></p>").text(data.data[num])
        $("body").prepend(fact)
    }
});


let numFacts = [];
for (let i = 0; i < 4; i++) {
    numFacts.push(axios.get(`${baseURL}/86?json`));
};

Promise.all(numFacts).then(fact => fact.forEach(f => {
    let fact = $("<p></p>").text(f.data.text)
    $("body").append(fact)
}))