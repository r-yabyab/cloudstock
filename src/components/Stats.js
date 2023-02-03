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
        {id: 1,  stock: 'NDAQ'},
        {id: 2,  stock: 'VXX'},
        // {id: 3,  stock: 'PCG'}
    ])

        // {id: 0,  symbol: 'AAPL'},
        // {id: 1,  symbol: 'AMZN'},
        // {id: 2,  symbol: 'PCG'}

        // "AAPL", 
        // "MSFT", 
        // "TSLA", 
        // "PCG", 
        // "AMZN"

        const addSymbol = () => {
            // if (symbolName = String) {
            let num = yourStocks.length + 1
            let newEntry = {id: num, stock: symbolName}
            setYourStocks([...yourStocks, newEntry])
            // setYourStocks([...yourStocks, symbolName])
            setSymbolName('')
        // } else {
        //     console.log('please input symbol')
        // }
        }

        // let newEntry = {id: num, symbol: newTask}
        // setList([...list, newEntry])

        // const symbolHandler = () => {
        //     setSymbolName("GME")
        //     console.log(symbolName)
        // }

    const getStockData = (stock) => {
        return axios
            .get(`${BASE_URL}${stock.stock}${TOKEN}`)
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
                            symbol: stock.stock,
                            id: stock.id,
                            // symbol: stock,
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
<div className=''>
                {stockData.map((stock) => (
                    <div key={stock.id}>
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
</div>


{/* add Symbol BUTTON */}
<div onClick={addSymbol} className='absolute top-10 right-[60%] -translate-x-1/2 text-blue-600 hover:cursor-pointer hover:text-yellow-200  '>
    {/* <button onClick={symbolHandler} className='bg-green-400 p-4 rounded-md border-2 border-black mt-2 mb-10 ml-4'>set to GME</button> */}
    {/* <button onClick={addSymbol} className='bg-slate-400 p-4 rounded-md border-2 border-black mt-2 mb-10 ml-4'> */}
    <svg xmlns="http://www.w3.org/2000/svg" width="80" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>

    {/* </button> */}
</div>

        </>
    )
}

export default Stats;