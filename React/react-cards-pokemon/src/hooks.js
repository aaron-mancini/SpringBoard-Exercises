import { useState } from "react";
import axios from "axios";
import uuid from "uuid";

function useFlip() {
    const [isFacingUp, setIsFacingUp] = useState(true);
    const flipCard = () => {
      setIsFacingUp(isUp => !isUp);
    };
    return [isFacingUp, flipCard];
}

function useAxios(url) {
    const [cards, setCards] = useState([]);
    const addCard = async (addUrl) => {
      const response = await axios.get(typeof addUrl === 'string' ? `${url}${addUrl}/` : url);
      setCards(cards => [...cards, { ...response.data, id: uuid() }]);
    };
    return [cards, addCard];
}

export {useFlip, useAxios};