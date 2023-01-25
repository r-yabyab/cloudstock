import React, { useEffect, useReducer, useState } from "react";
import { DraggableComp } from "./DraggableComp";
// import { Client } from "iexjs"

export function DataFetch () {
  
    // const [dbStock, setDbStock] = useState(null)
    const [symbolList, setSymbolList] = useState(null)
    const [symbolName, setSymbolName] = useState('')
    const [stock, setStock] = useState(null)
    //force updates Components
    const [reducerValue, forceUpdate] = useReducer(x => x+1, 0)
   
   
//
//testing
//testing
//testing
//testing
//
//vvvvvvvvvvvvvvvvvvvvvvv
//
//
// //
//     const [newFetch, setNewFetch] = useState('')
//     const [fetchLink, setFetchLink] = useState (
//         {
//             id:1,
//             symbol:'AAPL',
//             link: 'fetch(`https://ryabyab.iex.cloud/v1/data/core/quote/AAPL?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e`)',
//         },
//         {
//             id:2,
//             symbol:'AMZN',
//             link: 'fetch(`https://ryabyab.iex.cloud/v1/data/core/quote/AMZN?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e`)',
//         }
//     )


    // useEffect (() => {
    //     console.log('todo')
    // }, [])


    // const addLink = () => {
    // if (newFetch) {
    //     let num = fetchLink.length + 1
    //     let newEntry = {id: num, symbol:{symbolName}, link: 'fetch(`https://ryabyab.iex.cloud/v1/data/core/quote/${symbolName}?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e`)'}
    //     setFetchLink(...fetchLink, newEntry)
    //     setNewFetch('')
    // }
    // }

    // const fetchArrList = fetchLink && fetchLink.map((x, index) => {
    //     return (
    //         <div key={x.id}>
    //         {x.open}
    //         </div>
    //     )
    // })

    // // // group method
    // const urls = [
    //     'https://ryabyab.iex.cloud/v1/data/core/quote/AMZN?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e',
    //     'https://ryabyab.iex.cloud/v1/data/core/quote/AAPL?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e',
    //     'https://ryabyab.iex.cloud/v1/data/core/quote/PCG?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e',
    // ]

    // Promise.all(urls.map(x => 
    //     fetch(x)
    //         .then(JSON.parse)
    //         .catch(error => console.log('there was a problem', error))
    //     ))
    //         .then(x => {
    //             console.log(x.open)
    //         })



    // Promise.all([
    //     fetch("https://ryabyab.iex.cloud/v1/data/core/quote/AMZN?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e"),
    //     fetch("https://ryabyab.iex.cloud/v1/data/core/quote/AAPL?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e"),
    //     fetch("https://ryabyab.iex.cloud/v1/data/core/quote/PCG?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e")
    //   ]).then(allResponses => {
    //     console.log(allResponses)  
    //   })






//
//
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//
//
//testing
//testing
//testing
//testing
//testing
//testing
//
//
//
//



    const [list, setList] = useState([
        {id: 0,  symbol: 'AAPL'},
        {id: 1,  symbol: 'AMZN'},
        {id: 2,  symbol: 'PCG'}
    ])
    const [newTask, setNewTask] = useState('')

    const addTask = () => {
        if (newTask) {
            let num = list.length + 1
            let newEntry = {id: num, symbol: newTask}
            setList([...list, newEntry])
            setNewTask('')
        }
    }

    const addSymbol = () => {
        let num = list.length + 1
        let newEntry = {id: num, symbol: symbolName}
        setList([...list, newEntry])
    }

    const removeSymbol = (id) => {
        console.log("to do")
    }
    


    // const client = new Client({api_token: "TOKEN", version: "VERSION"});
    // client.quote({symbol: "AAPL"}).then((res) => {
    //     console.log(res)
    // })


//     // fetch from db, static numbers
//   useEffect (() => {
//     const fetchStock = async () => {
//         const response = await fetch('https://ryabyab.iex.cloud/v1/data/ryabyab/DATASET_2BRSXSLCA?last=1&token=sk_4b6ebe9d84b44fe48cbf602d2c70884e')
//         const json = await response.json()

//         if (response.ok) {
//             setDbStock(json)
//         }
//     }
//     fetchStock()
//   }, [])


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

    //maps symbols to Select Option
    const stockList = symbolList && symbolList.map((stock, indexStock) => {
        return (
            <option key={indexStock} value={stock.symbol}>{stock.symbol}</option>
        )
    })

//fetch single stock's information
  useEffect(() => {
    const fetchStock = async () => {
        const response = await fetch(`https://ryabyab.iex.cloud/v1/data/core/quote/${symbolName}?token=sk_4b6ebe9d84b44fe48cbf602d2c70884e`)
        const json = await response.json()

        if (response.ok) {
            setStock(json)
        }
    }
    fetchStock()
  }, [symbolName])

  const stockDescription = stock && stock.map((stock, indexDescription) => {
    return (
        <div key={indexDescription} className=
        {stock.change > 0 ? "relative bg-green-400 w-[300px] m-auto flex [&>div]:border-x-2 [&>div]:text-center [&>div]:border-slate-300" : "bg-red-400 w-[300px] m-auto flex [&>div]:border-x-2 [&>div]:text-center [&>div]:border-slate-300" }
        >
            <div>Ticker: <span className="font-bold">{stock.symbol}</span></div>
            <div>Open: {stock.open}</div>
            <div>Close: {stock.close}</div>
            <div>Change: {stock.change}</div>

        </div>
    )
  } )



  const clickHandler = () => {
    forceUpdate()
    // if (reducerValue== 10) {
    //     forceUpdate(reducerValue=-10)
    // }
    console.log(reducerValue)
  }

  const clickHandler2 = () => {{
    setSymbolName('AMZN')
    forceUpdate()
   
  }
  console.log(`symbolName state: ${symbolName}`)}


  const selectHandler = (e) => {
    setSymbolName(e.target.value)
  }

    return (
        <>
            <div className="relative m-auto">
                <button onClick={clickHandler}>penios</button>
                <div className="p-4">
                    Select Symbol:
                    {/* Click from dropdownlist --> setsSymbol */}
                    <select
                        onChange={selectHandler}
                        className="bg-slate-300 border-black border-2"
                    >{stockList}</select>
                    <div>
                        <button
                            onClick={clickHandler}
                            className="border-2 border-black bg-green-400">Update</button>

                        <button onClick={clickHandler2} className="border-2 border-black bg-blue-400">Set to AMZN
                        </button>
                    </div>
                </div>
            </div>

            <div>
                {stockDescription}
                {stock && <button onClick={addSymbol} className="absolute float-right bg-slate-400 hover:bg-green-300">++</button>}
                {stock && <button onClick={removeSymbol} className="absolute float-right translate-y-6 bg-slate-400 hover:bg-red-300">--</button>}
            </div>

<div>
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
</div>



{/* <DraggableComp /> */}
        </>
    )
}