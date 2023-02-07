import React, { useState, useEffect, useRef } from 'react'
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
        // {id:0,  stock: 'NDAQ'},
        // {id:1,  stock: 'TSLA'},
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

        // const addSymbol = () => {
        //     // if (symbolName = String) {
        //         if (symbolName !== '') {
        //         let maxId = yourStocks.length > 0 ? Math.max(...yourStocks.map(item => item.id)) : -1;
 

        // // Made by me, not chatGPT
        //     let newEntry = {id: maxId + 1, stock: symbolName}
        //     setYourStocks([...yourStocks, newEntry])
        //     // setYourStocks([...yourStocks, symbolName])
        //     setSymbolName('')
        // // } else {
        // //     console.log('please input symbol')
        // // }
        //     }
        // }

        const addSymbol = () => {
            if (symbolName !== '' && yourStocks.length < 5) {
                const alreadyAdded = yourStocks.some(stock => stock.stock === symbolName)
        
                if (!alreadyAdded) {
                    let maxId = yourStocks.length > 0 ? Math.max(...yourStocks.map(item => item.id)) : -1;
         
                    let newEntry = {id: maxId + 1, stock: symbolName}
                    setYourStocks([...yourStocks, newEntry])
        
                    setSymbolName('')
                } else {
                    alert(`${symbolName} is already on your list.`)
                }
            } else {
                alert("Max 5 stocks allowed Free User")
                setSymbolName('')
            }
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


    // from chatGPT
    const [positions, setPositions] = useState(() => {
        const savedPositions = localStorage.getItem('_STOCK_positions');
        if (savedPositions) {
          return JSON.parse(savedPositions);
        }
    
        return yourStocks.reduce((acc, { id }) => ({ ...acc, [id]: { x: 0, y: 0 } }), {});
      });

      useEffect(() => {
        localStorage.setItem('_STOCK_positions', JSON.stringify(positions));
      }, [positions]);
    
      const handleDrag = (id, { x, y }) => {
        setPositions({ ...positions, [id]: { x, y } });
      };


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

    // const [defaultPosition, setDefaultPosition] = useState ({x:0, y:0})

    // const onStopHandler = (e, data) => {
    //     setDefaultPosition({defaultPosition: {x:data.x, y:data.y}})
    //     console.log(defaultPosition)
    // }

    //test vvvvv

    // const [sizes, setSizes] = useState(() => {
    //     const savedSizes = localStorage.getItem('quote-sizes');
    //     if (savedSizes) {
    //       return JSON.parse(savedSizes);
    //     }
    
    //     return yourStocks.reduce((acc, { id }) => ({ ...acc, [id]: { width: 0, height: 0 } }), {});
    //   });

    //   useEffect(() => {
    //     localStorage.setItem('quote-sizes', JSON.stringify(sizes));
    //   }, [sizes]);


    //   const handleResize = (id, ref) => {
    //     setSizes({ ...sizes, [id]: { width: ref.offsetWidth, height: ref.offsetHeight } });
    //   };

    //       const ref = useRef(null);
    // useEffect(() => {
    //   onResize(ref.current);
    // }, []);

    

      //test ^^^^^


    return (
        <>

<div className=''>
                {stockData.map((stock) => (
                 <Draggable 
                 handle=".handle"
                 key={stock.id}
                 position={positions[stock.id]}
                 onDrag={(e, {x,y}) => handleDrag(stock.id, {x,y})}

                //  size={sizes[stock.id]}
                //  onResize={(e, direction, ref, delta) => handleResize(stock.id, ref.style)}

                //  position={positions[stock.id]}
                //  defaultPosition={defaultPosition}
                //  onStop={onStopHandler}
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
                        // price={stock[0].price}
                        change={stock[0].change}
                        changePercent={stock[0].changePercent}
                        iexClose={stock[0].iexClose}
                        latestPrice={stock[0].latestPrice}
                        companyName={stock[0].companyName}
                            reducerValue={reducerValue} 
                            forceUpdate={forceUpdate}
                            yourStocks={yourStocks}
                            removeSymbol={removeSymbol}
                            stock={stock.id}
                        
                    />
                    {/* <div className='' selectnums={stock.id} onClick={removeSymbol}>x</div> */}
                    
                    {/* {"close " + stock[0].iexClose} */}
                    </div>
</Draggable>

                ))}
</div>


{/* add Symbol BUTTON */}
<div onClick={addSymbol} className={symbolName ? 'absolute top-20 ml-[160px] -translate-x-1/2 text-blue-600 hover:cursor-pointer hover:text-yellow-200' : "hidden"}>
    {/* <button onClick={symbolHandler} className='bg-green-400 p-4 rounded-md border-2 border-black mt-2 mb-10 ml-4'>set to GME</button> */}
    {/* <button onClick={addSymbol} className='bg-slate-400 p-4 rounded-md border-2 border-black mt-2 mb-10 ml-4'> */}
    <svg xmlns="http://www.w3.org/2000/svg" width="40" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>

    {/* </button> */}
</div>

<div onClick={update1} className='absolute top-28 select-none right-4 bg-slate-400 p-4 hover:cursor-pointer hover:bg-slate-300'>Refresh</div>

        </>
    )
}

export default Stats;