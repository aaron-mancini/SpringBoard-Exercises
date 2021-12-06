import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const CardDraw = () => {
    const timerId = useRef(null);
    const [deckId, setDeckId] = useState();
    const [card, setCard] = useState(null);
    const [timerStatus, setTimerStatus] = useState(false);

    useEffect(() => {
        async function newDeckId() {
            const newDeck = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            setDeckId(newDeck.data.deck_id);
        }
        newDeckId();
    }, [setDeckId])

    useEffect(function startCardDrawer() {
            if (timerStatus) {
                timerId.current = setInterval(async () => {
                    let card = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                    if (!card.data.success) {
                        setTimerStatus(false);
                        return alert("Deck is empty!");
                    }
                    setCard(card.data.cards[0]);
                }, 1000);
            }


            return function cleanUp() {
                clearInterval(timerId.current);
            }
    }, [timerStatus, deckId]);
    
    // const handleClick = async function(deckId) {
    //     let card = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    //     if (!card.data.success) {
    //         return alert("Deck is empty!");
    //     }
    //     setCard(card.data.cards[0]);
    // }

    const handleClick = () => {
        clearInterval(timerId.current);
        setTimerStatus(!timerStatus);
    }

    return (
        <>
        <button onClick={() => {handleClick(deckId)}}>{timerStatus ? "Stop drawing" : "Start drawing"}</button>
        <br></br>
        {card ? <img src={card.image} alt={`${card.value} of ${card.suit}`}/> : <h1>Draw a Card!</h1>}
        </>
    )
}

export default CardDraw
