import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StatsRow from './StatsRow'
// import Draggable from 'react-draggable'


// ex url 'https://ryabyab.iex.cloud/v1/data/core/quote/${symbolName}?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e'

const BASE_URL='https://ryabyab.iex.cloud/v1/data/core/quote/'
const TOKEN='?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e'

function Stats ({symbolName, setSymbolName}) {

    const [stockData, setStockData] = useState([])
    // const [symbolName, setSymbolName] = useState('')
    const [yourStocks, setYourStocks] = useState([
        "AAPL", 
        "MSFT", 
        "TSLA", 
        "PCG", 
        "AMZN"
    ])

        // {id: 0,  symbol: 'AAPL'},
        // {id: 1,  symbol: 'AMZN'},
        // {id: 2,  symbol: 'PCG'}

        const addSymbol = () => {
            // let num = list.length + 1
            // let newEntry = {symbolName}
            // setYourStocks([...yourStocks, newEntry])
            setYourStocks([...yourStocks, symbolName])
            setSymbolName('')
        }

        const symbolHandler = () => {
            setSymbolName("GME")
            console.log(symbolName)
        }

    const getStockData = (stock) => {
        return axios
            .get(`${BASE_URL}${stock}${TOKEN}`)
            .catch((error) => {
                console.error("Error", error.message)
            })
    }

    useEffect(() => {
        let tempStockData = []
        // const stockList = ["AAPL", "MSFT", "TSLA", "PCG", "AMZN"];
        // const stockList = (yourStocks.symbol)
        const stockList = yourStocks


        let promises = [];
        stockList.map((stock) => (
            promises.push(
                getStockData(stock)
                    .then((res) => {
                        tempStockData.push({
                            symbol: stock,
                            ...res.data
                        })
                    })
            )
        ))

        Promise.all(promises).then(() => {
            setStockData(tempStockData)
            console.log(tempStockData)
        })

    }, [yourStocks])



    // const [selectedQuote, setSelectedQuote] = useState(null)

    // const handleSelect = (stock) => {
    //     selectedQuote(stock)
    // }



    return (
        <>

                {stockData.map((stock) => (
                    <div key={stock.symbol}>
                        <StatsRow
                        symbol={stock.symbol}
                        open={stock[0].iexOpen}
                        volume={stock[0].volume}
                        price={stock[0].price}
                        change={stock[0].change}
                        iexClose={stock[0].iexClose}
                        latestPrice={stock[0].latestPrice}
                        companyName={stock[0].companyName}
                    />
                    
                    {/* {"close " + stock[0].iexClose} */}
                    </div>
                ))}




<div className='text-purple-700'>
    <button onClick={symbolHandler} className='bg-green-400 p-4 rounded-md border-2 border-black mt-2 mb-10 ml-4'>set to GME</button>
    <button onClick={addSymbol} className='bg-slate-400 p-4 rounded-md border-2 border-black mt-2 mb-10 ml-4'>add symbol</button>
</div>

        </>
    )
}

export default Stats;