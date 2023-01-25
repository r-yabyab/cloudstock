import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StatsRow from './StatsRow'

// ex url 'https://ryabyab.iex.cloud/v1/data/core/quote/${symbolName}?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e'

const BASE_URL='https://ryabyab.iex.cloud/v1/data/core/quote/'
const TOKEN='?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e'

function Stats () {

    const [stockData, setStockData] = useState([])

    const getStockData = (stock) => {
        return axios
            .get(`${BASE_URL}${stock}${TOKEN}`)
            .catch((error) => {
                console.error("Error", error.message)
            })
    }

    useEffect(() => {
        let tempStockData = []
        const stockList = ["AAPL", "MSFT", "TSLA", "PCG", "AMZN"];
        
        let promises = [];
        stockList.map((stock) => {
            promises.push(
                getStockData(stock)
                .then((res) => {
                    tempStockData.push({
                        symbol: stock,
                        ...res.data
                    })
                })
            )
        })

        Promise.all(promises).then(() => {
            setStockData(tempStockData)
            console.log(tempStockData)
        })

    }, [])

    return (
        <>
            penis
            <div className='bg-blue-400'>
                {stockData.map((stock) => (
                    <div key={stock.symbol}>
                        <StatsRow
                        key={stock.symbol}
                        symbol={stock.symbol}
                        open={stock.open}
                        volume={stock.volume}
                        price={stock.price}
                        change={stock[0].change}
                        iexClose={stock.iexClose}
                    />
                    {stock.symbol}
                    {stock[0].iexClose}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Stats;