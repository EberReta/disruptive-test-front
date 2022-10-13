import React, { useEffect, useState } from 'react'
import CurrencyConverter from './CurrencyConverter'
import ProyectionTable from './ProyectionTable';

export default function Simulador() {
    /* CONSTS */
    const MONTS = 12;
    const BTC_INTEREST = 0.05;
    const ETH_INTEREST = 0.03;

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
            projectionsTemp.push({
                month: index + 1,
                amount_btc: parseFloat(currencies.BTC.rate + (currencies.BTC.rate * ((index + 1) * BTC_INTEREST))).toFixed(9),
                amount_eth: parseFloat(currencies.ETH.rate + (currencies.ETH.rate * ((index + 1) * ETH_INTEREST))).toFixed(9),
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
                    <div className='input-group mx-auto' style={{width:'fit-content'}}>
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
