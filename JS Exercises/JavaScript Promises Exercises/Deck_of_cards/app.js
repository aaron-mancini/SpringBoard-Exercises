let baseURL = "http://deckofcardsapi.com/api/deck"

let resp = axios.get(`${baseURL}/new/shuffle/?deck_count=1`)

// resp.then(data => {
//     console.log(data.data.deck_id)
//     let card = axios.get(`${baseURL}/${data.data.deck_id}/draw/?count=1`)
//     card.then(data => console.log(`${data.data.cards[0].value} of ${data.data.cards[0].suit}`))
// })

$("button").on("click", function() {
    resp.then(data => {
        let card = axios.get(`${baseURL}/${data.data.deck_id}/draw/?count=1`)
        card.then(data => {
            $("img").remove()
            let img = $("<img>").attr("src", data.data.cards[0].image)
            $("#content").append(img)
        })
    })
})