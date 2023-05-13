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
            const response = await fetch(`${STOCK_SHAPES}/api/tickers`)
            const json = await response.json()

            if (response.ok) {
                setSymbolList(json)
                console.log(json)
                // object
                    // date: "2023-05-12"
                    // isEnabled: true
                    // name: "ALCOA CORP"
                    // symbol: "AA"
            }
        }
        fetchSymbolList()
    }, [])

    //fetch single stock's information
    useEffect(() => {
        if (symbolName) {
          const fetchStock = async () => {
            try {
                    const response = await axios.get(`${STOCK_SHAPES}/api/tickerquote`, {
                params: {
                  symbolName
                }
              });
              setStock(response.data);
            //   console.log('fetched symbol quote');
            //   console.log(stock)
            //   console.log(response.data)
            } catch (error) {
              console.error(error);
            }
          };
          fetchStock();
        }
      }, [symbolName]);

    const clearSymbol = () => {
        setSymbolName('')
    }
  
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

                        <input className="text-black rounded-sm" type="text"
                            value={searchTerm}
                            placeholder=" Search stock symbol..." onChange={handlerFilter} onKeyDown={handleKeyDown} />
                        {/* <div className="bg-white text-black pt-[4px] pl-[4px]"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg></div> */}
                    {filteredData.length !== 0 && (
                        <div className="text-white flex-col gap-2 text-left    absolute  left-[50%] -translate-x-1/2 w-[182px] ">
                            
                            <div className="font-bold text-lg mt-4">Symbols</div>
                            <div className="overflow-y-scroll max-h-[300px]">
                            {filteredData && filteredData.slice(0, 10).map((x, index) => {
                            return (
                                <div
                                    className="hover:bg-zinc-900 border-t-[1px] border-zinc-700  hover:cursor-pointer"
                                    key={index}
                                    onClick={() => selectSearch(x.symbol)}
                                >
                                    <div className="font-bold">{x.symbol}</div>
                                    <div className="overflow-hidden text-sm text-zinc-400">{x.name}</div>
                                </div>
                            )
                        })}</div>
                        </div>
                    )}

                    <span className="text-red-500 absolute flex left-[50%] -translate-x-1/2">{searchError}</span>

                </div>
            </div>

            <div>

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
        </>
    )
}

export default React.memo(DataFetch)