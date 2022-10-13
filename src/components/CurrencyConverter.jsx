import React, { useEffect, useState } from 'react'
import useCurrency from '../hooks/useCurrency';
import btcIcon from '../assets/btc-icon.png';
import ethIcon from '../assets/eth-icon.png';
export default function CurrencyConverter({ amount, from, to, setCurrencies }) {
  const [value, setValue] = useState(0)
  
  const currency = useCurrency(to);
  const symbols = {
    BTC: {
      name: 'Bitcoin',
      icon:btcIcon,
    },
    ETH: {
      name: 'Ethereum',
      icon: ethIcon
    }
  }



  useEffect(() => {
    if (currency.price) {
      const rate = (1 / currency.price) * amount;
      setValue(rate);
      setCurrencies((prev) => ({
        ...prev,
        [to]: {
          ...currency.price,
          rate: rate,
        }
      }))
    }
  }, [currency, amount, setCurrencies, to]);

  return (
    <div className='d-flex justify-content-between'>
      {
        currency.price ?
          (
            <>
              <div className='d-flex align-items-center mx-auto'>
                <img src={symbols[to].icon} alt={to} className="symbol-icon"/>
                <p className='mb-0 ms-2'><b>{symbols[to].name}</b> <span className='text-secondary'>{to}</span></p>
              </div>
              <p className='mb-0 mx-auto'>1 {to} = {parseFloat(currency.price).toFixed(2)} {from}</p>
              <p className='mb-0 mx-auto'>{amount} USD = {parseFloat(value).toFixed(9)} {to}</p>
            </>

          )
          : <p className='text-secondary'>Cargando...</p>
      }
    </div>
  )
}