import React, { useEffect, useReducer, useState } from "react";
// import StockApp from "./chatGPT";
// import StockQuotes from "./chatGPT";
// import { DraggableComp } from "./DraggableComp";
import Stats from "./Stats";
// import { Client } from "iexjs"

function DataFetch ({openMarket}) {
  
    // const [dbStock, setDbStock] = useState(null)
    const [symbolList, setSymbolList] = useState(null)
    const [symbolName, setSymbolName] = useState('')
    const [stock, setStock] = useState(null)
    //force updates Components
    const [reducerValue, forceUpdate] = useReducer(x => x+1, 0)



  



    // const [list, setList] = useState([
    //     {id: 0,  symbol: 'AAPL'},
    //     {id: 1,  symbol: 'AMZN'},
    //     {id: 2,  symbol: 'PCG'}
    // ])
    // const [newTask, setNewTask] = useState('')

    // const addTask = () => {
    //     if (newTask) {
    //         let num = list.length + 1
    //         let newEntry = {id: num, symbol: newTask}
    //         setList([...list, newEntry])
    //         setNewTask('')
    //     }
    // }

    // const addSymbol = () => {
    //     let num = list.length + 1
    //     let newEntry = {id: num, symbol: symbolName}
    //     setList([...list, newEntry])
    // }

    // const removeSymbol = (id) => {
    //     console.log("to do")
    // }

    // fetch all stock symbols a to z
    useEffect(() => {
        const fetchSymbolList = async () => {
            // const response = await fetch('https://ryabyab.iex.cloud/v1/data/core/quote/sbux?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e')
            // const response = await fetch('https://ryabyab.iex.cloud/v1/data/ref-data/iex/symbols')
            const response = await fetch('https://ryabyab.iex.cloud/v1/ref-data/iex/symbols?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e')
            const json = await response.json()

            if (response.ok) {
                setSymbolList(json)
            }
        }
        fetchSymbolList()
    }, [])

// // Returns empty response, doesn't work
    // const [SSE, setSSE] = useState ('')

    // const config = {
    //     headers: {
    //         Accept: 'text/event-stream'
    //     }
    // };

    // // SSE streaming
    // useEffect(() => {
    //     const fetchSSE = async () => {
    //         const response = await fetch('https://cloud-sse.iexapis.com/stable/stocksUSNoUTP1Second?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e&symbols=aapl', config)
    //         const json = await response.json()
            
    //         if (response.ok) {
    //             setSSE(json)
    //         }
    //     }
    //     fetchSSE()
    //     console.log(SSE)
    // }, [])

    //maps symbols to Select Option
    const stockList = symbolList && symbolList.map((stock, indexStock) => {
        return (
            <option key={indexStock} value={stock.symbol}>{stock.symbol}</option>
        )
    })

    //fetch single stock's information
    useEffect(() => {
        if (symbolName) {
            const fetchStock = async () => {

                const response = await fetch(`https://ryabyab.iex.cloud/v1/data/core/quote/${symbolName}?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e`)
                const json = await response.json()

                if (response.ok) {
                    setStock(json)
                }
            }
            fetchStock()
        }
    }, [symbolName])

    const clearSymbol = () => {
        setSymbolName('')
    }

    const stockPreview = stock && stock.map((stock, indexDescription) => {
        return symbolName ? (
            <div onClick={clearSymbol} key={indexDescription} className=
                {stock.change > 0 ? "absolute ratingAnimationWhite bg-green-400 w-[300px] m-auto flex [&>div]:text-center [&>div]:border-x-[1px] [&>div]:border-gray-700 left-[50%] -translate-x-1/2 [&>p]:hidden [&>p]:hover:inline-block" : "[&>p]:hidden [&>p]:hover:inline-block absolute ratingAnimationWhite bg-red-400 w-[300px] m-auto flex [&>div]:text-center [&>div]:border-x-[1px] [&>div]:border-gray-700 left-[50%] -translate-x-1/2"}
            >
                    
                <div className="bg-zinc-700 w-[90px] h-[56px] p-[1px]">Ticker: <span className="font-bold">{stock.symbol}</span></div>
                <div className="bg-zinc-700 w-[90px] h-[56px] p-[1px]">Price: {parseFloat(stock.latestPrice).toFixed(2)}</div>
                <div className="w-[90px] h-[56px] p-[1px]">Open: {stock.open}</div>
                <div className="w-[90px] h-[56px] p-[1px]">Change: {stock.change}</div>
                <p className="absolute hover:cursor-pointer bg-blue-200 -mt-[6px] top-0 text-black font-bold right-0 text-2xl">X</p>

            </div>
        ): null
    })



//   const clickHandler = () => {
//     forceUpdate()
//     // if (reducerValue== 10) {
//     //     forceUpdate(reducerValue=-10)
//     // }
//     console.log(reducerValue)
//   }

//   const clickHandler2 = () => {
//     setSymbolName('AMZN')
//     forceUpdate()
//     console.log(`symbolName state: ${symbolName}`)
//   }
  


  const selectHandler = (e) => {
    setSymbolName(e.target.value)
  }
  

    return (
        <>
            <div draggable="false" className="relative select-none mt-40 -mb-40 text-center">
                {/* <button onClick={clickHandler}>penios</button> */}
                <div className="p-4">
                    {/* Select Symbol: */}
                    {/* Click from dropdownlist --> setsSymbol */}
                    <select
                        placeholder="hello"
                        value={symbolName}
                        onChange={selectHandler}
                        className="bg-black border-black border-2 shadow-lg mb-10"
                    >
                        <option value="hello">Select ticker</option>
                        {stockList}
                    </select>

                    <div>
                        {/* Updates Quotes */}
                        {/* <button
                            onClick={clickHandler}
                            className="border-2 border-black bg-green-400 hover:cursor-pointer hover:bg-green-100">Update Quotes
                            </button> */}

                        {/* <button onClick={clickHandler2} className="border-2 border-black bg-blue-400">Set to AMZN
                        </button> */}
                    </div>
                </div>
            </div>

            <div>
                {stockPreview}
                {/* {stock && <button onClick={addSymbol} className="absolute float-right bg-slate-400 hover:bg-green-300">++</button>}
                {stock && <button onClick={removeSymbol} className="absolute float-right translate-y-6 bg-slate-400 hover:bg-red-300">--</button>} */}
            </div>

{/* <div>
    {list && list.map((x,index) => {
        return(
            <div key={x.id}>
                {index}
                {x.symbol}
            </div>
        )
    })}
    <input placeholder="symbol" className="border-2" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
    <button onClick={addTask} className="bg-blue-200 rounded-lg p-2 m-2">Add Symbol</button>
</div> */}



<Stats clearSymbol={clearSymbol} openMarket={openMarket} symbolName={symbolName} setSymbolName={setSymbolName} reducerValue={reducerValue} forceUpdate={forceUpdate} />

{/* <StockApp /> */}

{/* <DraggableComp /> */}
{/* <div className="absolute left-0 bg-blue-400 text-2xl">penis{SSE}</div> */}
        </>
    )
}

export default React.memo(DataFetch)