let baseURL = "http://numbersapi.com"
let numbers = [86, 54, 3, 8]

async function getNumbers() {
    let resp = await axios.get(`${baseURL}/86,54,3,8?json`)
    for (let num of numbers) {
        let fact = $("<p></p>").text(resp.data[num])
        $("body").append(fact)
    }
}

getNumbers();


let numFacts = [];
async function getFourFacts() {
    for (let i = 0; i < 4; i++) {
        let fact = await axios.get(`${baseURL}/86?json`)
        numFacts.push(fact.data.text)
    }
    for (let fact of numFacts) {
        let p = $("<p></p>").text(fact)
        $("body").append(p)
    }

}

getFourFacts();