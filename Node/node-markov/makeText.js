/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');


let fileType = process.argv[2];
let path = process.argv[3];

async function getURLData(url) {
    try {
        const resp = await axios.get(url);
        let markov = new MarkovMachine(resp.data);
        console.log(markov.makeText());
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}

if (fileType === "file") {
    fs.readFile(path,  'utf8', function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1)
        } else {
            let markov = new MarkovMachine(data);
            console.log(markov.makeText())
        }
    })
} else if (fileType === "url") {
    getURLData(path);
} else {
    process.exit(1);
}

