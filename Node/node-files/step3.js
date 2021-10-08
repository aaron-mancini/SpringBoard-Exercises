const fs = require('fs');
const axios = require('axios');

function cat(path, out) {
    let text;
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            catWrite(data, out)
        } 
    });
};

async function webCat(url, out) {
    try {
        const resp = await axios.get(url);
        catWrite(resp.data, out)
    } catch(err) {
        console.error(err)
        process.exit(1);
    } 
};

function catWrite(data, filename) {
    if (filename) {
        fs.writeFile(filename, data, "utf8", function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log("Successfully wrote to file!");
        });
    } else {
        console.log(data);
    }
}


let path;
let out;

if(process.argv[2] === "--out") {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.includes("http://")) {
    webCat(path, out);
} else {
    cat(path, out);
};