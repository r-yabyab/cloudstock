import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StatsRow from './StatsRow'
import Draggable from 'react-draggable'


// import Draggable from 'react-draggable'


// ex url 'https://ryabyab.iex.cloud/v1/data/core/quote/${symbolName}?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e'

const BASE_URL='https://ryabyab.iex.cloud/v1/data/core/quote/'
const TOKEN='?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e'

function Stats ({symbolName, setSymbolName, reducerValue, forceUpdate}) {

    const [stockData, setStockData] = useState([])
    // const [symbolName, setSymbolName] = useState('')
    const [yourStocks, setYourStocks] = useState([
        {id:0,  stock: 'NDAQ'},
        {id:1,  stock: 'TSLA'},
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

        const removeSymbol = (e) => {
            let x = e.target.getAttribute("selectnums")
            setYourStocks(yourStocks.filter(items=>items.id!=x))
            console.log('removed')
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

    }, [yourStocks, reducerValue])


    const update1 = () => {
        forceUpdate()
    }

    // get localStorage
    useEffect(() => {
        const data = window.localStorage.getItem('_STOCK_list')
        if (data !== null) setYourStocks(JSON.parse(data))
    },[])


    // stores user's stock list
    useEffect(() => {
        window.localStorage.setItem('_STOCK_list', JSON.stringify(yourStocks))
    },[yourStocks])

// // // // // // // // // // // TEST
// // // // // // // // // // // TEST
// // // // // // // // // // // TEST    vvvvvvvvvv

    // const [positions, setPositions] = useState({})
    // const [hasLoaded, setHasLoaded] = useState(false)

    // const handleStop = (e, data) => {
    //     console.log('works')
    //     console.log(positions)
    //     const dummyPositions = {...positions}
    //     const stockId=e.target.id
    //     dummyPositions[stockId] = {}
    //     dummyPositions[stockId]["x"] = data.x
    //     dummyPositions[stockId]["y"] = data.y
    //     setPositions(dummyPositions)
    // }

    // useEffect(() => {
    //     const existingDivPositions = window.localStorage.getItem('positions_div')
    //     setPositions(JSON.parse(existingDivPositions))
    //     setHasLoaded(true)
    // }, [])

    // useEffect(() => {
    //     window.localStorage.setItem('positions_div', JSON.stringify(positions))
    // }, [positions])




// // // // // // // // // // // TEST  ^^^^^
// // // // // // // // // // // TEST
// // // // // // // // // // // TEST
// // // // // // // // // // // TEST

 
    // const [selectedQuote, setSelectedQuote] = useState(null)

    // const handleSelect = (stock) => {
    //     selectedQuote(stock)
    // }

    const [defaultPosition, setDefaultPosition] = useState ({x:0, y:0})

    const onStopHandler = (e, data) => {
        setDefaultPosition({defaultPosition: {x:data.x, y:data.y}})
        console.log(defaultPosition)
    }


    return (
        <>

<div className=''>
                {stockData.map((stock) => (
                 <Draggable 
                 handle=".handle"
                 key={stock.id}
                 defaultPosition={defaultPosition}
                 onStop={onStopHandler}
                //                  defaultPosition={
                //     positions ===null ?
                //     {x:0, y:0}
                //     : !positions[stock.id] ?
                //     {x:0, y:0} :
                //     {x: positions[stock[0].id].x, y: positions[stock[0].id].y}
                // }
                // onStop={handleStop}
            > 
                    <div 
                    >
                        <StatsRow
                        symbol={stock.symbol}
                        open={stock[0].iexOpen}
                        volume={stock[0].volume}
                        price={stock[0].price}
                        change={stock[0].change}
                        iexClose={stock[0].iexClose}
                        latestPrice={stock[0].latestPrice}
                        companyName={stock[0].companyName}
                            reducerValue={reducerValue} 
                            forceUpdate={forceUpdate}
                            yourStocks={yourStocks}
                            removeSymbol={removeSymbol}
                        
                    />
                    <div className='' selectnums={stock.id} onClick={removeSymbol}>x</div>
                    
                    {/* {"close " + stock[0].iexClose} */}
                    </div>
</Draggable>

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

<div onClick={update1} className='absolute left-0 top-0 bg-yellow-400 p-4 m-4 hover:bg-green-300'>Refresh</div>

        </>
    )
}

export default Stats;