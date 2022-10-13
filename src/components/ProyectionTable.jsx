import React, { useEffect, useState } from 'react'
import { saveCSV, saveJson } from '../utils/exportData'
import btcIcon from '../assets/btc-icon.png';
import ethIcon from '../assets/eth-icon.png';
export default function ProyectionTable({ amount, projections, currencies }) {
    const [nameExportable, setNameExportable] = useState("")

    useEffect(() => {
        setNameExportable(`Proyección Inversión ${amount}USD a BTC-ETH`)
    }, [amount])


    return (
        <div className="card mt-3">
            <div className="card-body">
                {
                    (currencies.BTC.rate && currencies.ETH.rate) &&
                    <div className='text-end'>
                        <a href="#" onClick={() => { saveCSV(projections, nameExportable) }} className='me-3'>Export CSV</a>
                        <a href="#" onClick={() => { saveJson(projections, nameExportable) }}>Export JSON</a>
                    </div>
                }
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='text-center text-success' colSpan={3}>Inversión: {amount} USD</th>
                        </tr>
                        <tr>
                            <th className='text-center'>Tiempo</th>
                            <th className='text-center'>
                                <img src={btcIcon} className="symbol-icon" alt=""/>
                                <span className='ms-2'>BTC</span>
                            </th>
                            <th className='text-center'>
                            <img src={ethIcon} className="symbol-icon" alt=""/>
                            <span className='ms-2'>ETH</span>
                                </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projections.map((projection, index) => (
                                <tr key={index}>
                                    <td className='text-center'>Mes {projection.month}</td>
                                    <td className='text-center'>{(currencies.BTC.rate) && `${projection.amount_btc} BTC`} </td>
                                    <td className='text-center'>{(currencies.ETH.rate) && `${projection.amount_eth} ETH`} </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
