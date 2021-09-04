function cupcakeHTMLMarkup(cupcake) {
    return $(
        `<img src="${cupcake.image}"><br>
        <h3>${cupcake.flavor}</h3><br>
        <p>${cupcake.size}</p><br>
        <p>${cupcake.rating}</p>
    `);
}   

async function getCupcakes() {
    respJson = await axios.get("http://localhost:5000/api/cupcakes");
    return respJson;
}

async function displayCupcakes() {
    let cupcakes = await getCupcakes();
    for (let cupcake of cupcakes.data.cupcakes) {
        let $item = $(cupcakeHTMLMarkup(cupcake));
        $('body').append($item);
    }
}

displayCupcakes();


$("#cupcake-form").on('submit', async function(e){
    e.preventDefault();
    let flavor = $('#flavor').val();
    let size = $('#size').val();
    let rating = $('#rating').val();
    let img = $('#img').val();

    resp = await axios.post("http://localhost:5000/api/cupcakes", {flavor, rating, size, img});
    let newCupcake = $(cupcakeHTMLMarkup(resp.data.cupcake));
    $("body").append(newCupcake);
    $("#cupcake-form").trigger("reset");
})