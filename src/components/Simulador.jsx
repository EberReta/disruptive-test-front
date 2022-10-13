import React, { useEffect, useState } from 'react'
import CurrencyConverter from './CurrencyConverter'
import ProyectionTable from './ProyectionTable';

export default function Simulador() {
    /* CONSTS */
    const MONTS = 12;
    const BTC_INTEREST = process.env.REACT_APP_BTC_INTEREST;
    const ETH_INTEREST = process.env.REACT_APP_ETH_INTEREST;

    /* STATES */
    const [amount, setAmount] = useState(100)
    const [projections, setProjections] = useState([]);
    const [currencies, setCurrencies] = useState({
        BTC: { rate: undefined },
        ETH: { rate: undefined },
    })

    /* EFFECTS */
    useEffect(() => {
        const projectionsTemp = [];
        for (let index = 0; index < MONTS; index++) {
            const price_btc = index == 0 ? currencies.BTC.rate : projectionsTemp[index - 1].amount_btc;
            const price_eth = index == 0 ? currencies.ETH.rate : projectionsTemp[index - 1].amount_eth;
            projectionsTemp.push({
                month: index + 1,
                amount_btc: (price_btc + (price_btc * BTC_INTEREST)),
                amount_eth: (price_eth + (price_eth * ETH_INTEREST)),
            })
        }
        setProjections(projectionsTemp)
    }, [amount, currencies])

    /* FUNCTIONS */
    const changeAmount = (evt) => {
        setAmount(evt.target.value)
    }

    return (
        <>
            <h1 className='text-center py-2'>Simulador de inversiones</h1>
            <div className='card'>
                <div className='card-body px-0'>
                    <p className='text-center'><b>Ingresa la cantidad a invertir en dolares</b></p>
                    <div className='input-group mx-auto' style={{ width: 'fit-content' }}>
                        <span className="input-group-text">$</span>
                        <input type="number" className='form-control text-center  simulador-input' onChange={changeAmount} value={amount} />
                        <span className="input-group-text" >USD</span>
                    </div>

                    <hr />
                    <div className='mx-3'>
                        <CurrencyConverter amount={amount} from="USD" to="BTC" setCurrencies={setCurrencies} />
                    </div>
                    <hr />
                    <div className='mx-3'>
                        <CurrencyConverter amount={amount} from="USD" to="ETH" setCurrencies={setCurrencies} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ProyectionTable projections={projections} amount={amount} currencies={currencies}></ProyectionTable>
                </div>
            </div>
        </>
    )
}
