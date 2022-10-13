import { useEffect, useMemo, useRef, useState } from 'react'
import useWebSocket from "react-use-websocket";

export default function useCurrency(symbol) {
    const socketUrl = process.env.REACT_APP_WSS_URL;
    const [currency, setCurrency] = useState({})

    const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl);

    const messageHistory = useRef([]);

    messageHistory.current = useMemo(() => {
        if (lastJsonMessage && lastJsonMessage.data) {
            setCurrency({
                symbol: symbol,
                price: lastJsonMessage.data['c'],
                price_change_percent: lastJsonMessage.data['P'],
            });
        }
    },
    [lastJsonMessage, symbol]);

    useEffect(() => {
        sendJsonMessage({
            method: "SUBSCRIBE",
            params: [`${symbol.toLowerCase()}usdt@ticker`],
            id: 1
        })
    }, [symbol, sendJsonMessage]);

    return currency;
}
