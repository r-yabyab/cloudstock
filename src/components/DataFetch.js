import React, { useEffect, useReducer, useState } from "react";
// import StockApp from "./chatGPT";
// import StockQuotes from "./chatGPT";
// import { DraggableComp } from "./DraggableComp";
import Stats from "./Stats";
import axios from 'axios'
// import { Client } from "iexjs"

const STOCK_SHAPES = 'https://stockshapes.net'
// const STOCK_SHAPES = 'http://localhost:3001'

function DataFetch ({openMarket}) {
  
    // const [dbStock, setDbStock] = useState(null)
    const [symbolList, setSymbolList] = useState(null)
    const [symbolName, setSymbolName] = useState('')
    const [stock, setStock] = useState(null)
    //force updates Components
    const [reducerValue, forceUpdate] = useReducer(x => x+1, 0)
    const [filteredData, setFilteredData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchError, setSearchError] = useState('')

    // fetch all stock symbols a to z
    useEffect(() => {
        const fetchSymbolList = async () => {
            // const response = await fetch('https://ryabyab.iex.cloud/v1/data/core/quote/sbux?token=...')
            // const response = await fetch('https://ryabyab.iex.cloud/v1/data/ref-data/iex/symbols')
            // const response = await fetch('http://localhost:3001/api/tickers')
            // const response = await fetch('https://stockshapes-server.vercel.app/api/tickers')
            // const response = await fetch('http://34.218.179.6:3001/api/tickers')
            // const response = await fetch('https://stockshapes.net/api/tickers')
            const response = await fetch(`${STOCK_SHAPES}/api/tickers`)
            const json = await response.json()
            
            if (response.ok) {
                setSymbolList(json)
                console.log(symbolList)
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
    //         const response = await fetch('https://cloud-sse.iexapis.com/stable/stocksUSNoUTP1Second?token=...&symbols=aapl', config)
    //         const json = await response.json()
            
    //         if (response.ok) {
    //             setSSE(json)
    //         }
    //     }
    //     fetchSSE()
    //     console.log(SSE)
    // }, [])

    //maps symbols to Select Option
    // const stockList = symbolList && symbolList.map((stock, indexStock) => {
    //     return (
    //         <option key={indexStock} value={stock.symbol}>{stock.symbol}</option>
    //     )
    // })

    //fetch single stock's information
    useEffect(() => {
        if (symbolName) {
          const fetchStock = async () => {
            try {
            //   const response = await axios.get('https://stockshapes-server.vercel.app/api/tickerquote', {
                // const response = await axios.get('http://34.218.179.6:3001/api/tickerquote', {
                    // const response = await axios.get('https://stockshapes.net/api/tickerquote', {
                        const response = await axios.get(`${STOCK_SHAPES}/api/tickerquote`, {
                    // const response = await axios.get('http://localhost:3001/api/tickerquote', {
                params: {
                  symbolName
                }
              });
              setStock(response.data);
            //   console.log('fetched symbol quote');
            //   console.log(stock)
              console.log(response.data)
            } catch (error) {
              console.error(error);
            }
          };
          fetchStock();
        }
      }, [symbolName]);

    //
    // const response = await axios.get(`http://localhost:3001/api/tickerquote/${symbolName}`);


    // const fetchData = async () => {
    //     try {
    //       const response = await axios.get('http://localhost:3001/api/news', {
    //         params: {
    //           yourStocks
    //         }
    //       });
    //       setStockData(response.data);
    //       console.log('fetched from server');
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    //


    const clearSymbol = () => {
        setSymbolName('')
    }
  


//   const selectHandler = (e) => {
//     setSymbolName(e.target.value)
//   }
  
  const handlerFilter = (event) => {
    const searchWord = event.target.value
    setSearchTerm(searchWord)
    const newFilter = symbolList.filter((x) => {
        return x.symbol.toLowerCase().includes(searchWord.toLowerCase())
    })
    if (searchWord === "") {
    setFilteredData([])
    } else {
        setFilteredData(newFilter)
        setSearchTerm(event.target.value)
    }
  }

  const selectSearch = (symbol) => {
    setSymbolName(symbol)
    setSearchTerm('')
    setFilteredData([])
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchTerm.length > 0) {
        if (filteredData.length > 0) {
            selectSearch(filteredData[0].symbol)
            setSearchTerm('')
            setFilteredData([])
        } else {
            if (event.key === 'Enter' && filteredData.length === 0)
             {
                setSearchTerm('')
                setSymbolName('')
                setSearchError('Inavlid symbol')
                setTimeout(() => {
                    setSearchError('')
                },1000)
            }
        }
        } else if (event.key === 'Backspace'){
            event.preventDefault();
            setSearchTerm(searchTerm.slice(0, -1));
            if (searchTerm.length === 1) {
                setFilteredData([]);
        }
    }
        };

    return (
        <>
            <div draggable="false" className="relative select-none mt-60 -mb-40 text-center">
                {/* <button onClick={clickHandler}>penios</button> */}
                <div className="p-4">
                    {/* Select Symbol: */}
                    {/* Click from dropdownlist --> setsSymbol */}
                    {/* <select
                        placeholder="hello"
                        value={symbolName}
                        onChange={selectHandler}
                        className="bg-black border-black border-2 shadow-lg mb-10"
                    >
                        <option value="hello">Select ticker</option>
                        {stockList}
                    </select> */}
                    <input className="text-black" type="text"
                        value={searchTerm}
                        placeholder="Enter stock symbol..." onChange={handlerFilter} onKeyDown={handleKeyDown} />
                    {filteredData.length !== 0 && (
                        <div className="text-white max-h-[200px] overflow-hidden absolute  left-[50%] -translate-x-1/2 w-[182px] ">{filteredData && filteredData.slice(0, 5).map((x, index) => {
                            return (
                                <div className="hover:bg-yellow-400 hover:text-black hover:font-semibold hover:cursor-pointer" key={index} onClick={() => selectSearch(x.symbol)}>
                                    {x.symbol}
                                </div>
                            )
                        })}</div>
                    )}

<span className="text-red-500 absolute flex left-[50%] -translate-x-1/2">{searchError}</span>

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
                {/* {stockPreview} */}

                {stock && symbolName ?
                    <div onClick={clearSymbol} className=
                        // {stock.change > 0 ? "absolute ratingAnimationWhite bg-green-400 w-[300px] m-auto flex [&>div]:text-center [&>div]:border-x-[1px] [&>div]:border-gray-700 left-[50%] -translate-x-1/2 [&>p]:hidden [&>p]:hover:inline-block" : "[&>p]:hidden [&>p]:hover:inline-block absolute ratingAnimationWhite bg-red-400 w-[300px] m-auto flex [&>div]:text-center [&>div]:border-x-[1px] [&>div]:border-gray-700 left-[50%] -translate-x-1/2"}
                        {stock.d > 0 ?
                            "absolute ratingAnimationWhite bg-green-400 w-[300px] m-auto flex [&>div]:text-center [&>div]:border-x-[1px] [&>div]:border-gray-700 left-[50%] -translate-x-1/2 [&>p]:hidden [&>p]:hover:inline-block"
                            : "[&>p]:hidden [&>p]:hover:inline-block absolute ratingAnimationWhite bg-red-400 w-[300px] m-auto flex [&>div]:text-center [&>div]:border-x-[1px] [&>div]:border-gray-700 left-[50%] -translate-x-1/2"}
                    >
                        <div className="bg-zinc-700 w-[90px] h-[56px] p-[1px]">Ticker: <span className="font-bold">{symbolName && symbolName}</span></div>
                        <div className="bg-zinc-700 w-[90px] h-[56px] p-[1px]">Price: {parseFloat(stock.c).toFixed(2)}</div>
                        <div className="w-[90px] h-[56px] p-[1px]">Open: {stock.o}</div>
                        <div className="w-[90px] h-[56px] p-[1px]">Change: {stock.d}</div>
                        <p className="absolute hover:cursor-pointer bg-blue-200 -mt-[6px] top-0 text-black font-bold right-0 text-2xl">X</p>

                    </div> : null
                }

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