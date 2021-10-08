const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
};

async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch(err) {
        console.error(err)
        process.exit(1);
    } 
};

let arg = process.argv[2];

if (arg.includes("http://")) {
    webCat(arg);
} else {
    cat(arg);
};