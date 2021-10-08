let baseURL = "http://deckofcardsapi.com/api/deck"

// async function drawACard() {
//     let resp = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
//     let card = await axios.get(`${baseURL}/${resp.data.deck_id}/draw/?count=1`)
//     console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`)
// }

// drawACard();

// async function drawTwoCards() {
//     let resp = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
//     let card = await axios.get(`${baseURL}/${resp.data.deck_id}/draw/?count=1`)
//     let card2 = await axios.get(`${baseURL}/${resp.data.deck_id}/draw/?count=1`)

//     console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`)
//     console.log(`${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`)
// }

// drawTwoCards();

async function createDeck() {
    let deck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
    let deckId = deck.data.deck_id

    $("button").on("click", async function() {
        let card = await axios.get(`${baseURL}/${deckId}/draw/?count=1`)
        $("img").remove()
        let img = $("<img>").attr("src", card.data.cards[0].image)
        $("#content").append(img)
    })
}

createDeck();


