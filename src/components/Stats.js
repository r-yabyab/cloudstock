import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StatsRow from './StatsRow'
import Draggable from 'react-draggable'
// import { v4 as uuidv4 } from 'uuid'
// import useWebSocket from 'react-use-websocket'


// import Draggable from 'react-draggable'


function Stats ({symbolName, setSymbolName,
  //  reducerValue, forceUpdate, 
   open}) {

    const [stockData, setStockData] = useState([])
    // const [symbolName, setSymbolName] = useState('')
    const [yourStocks, setYourStocks] = useState([
        // {id:0,  stock: 'NDAQ'},
        // {id:1,  stock: 'TSLA'},
        // {id: 3,  stock: 'PCG'}
    ])


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
            setQuotes(quotes => quotes.filter(q => q.symbol !== yourStocks.filter(x=>x.stock)));
            console.log('removed')
        }

        // let newEntry = {id: num, symbol: newTask}
        // setList([...list, newEntry])

        // const symbolHandler = () => {
        //     setSymbolName("GME")
        //     console.log(symbolName)
        // }


// Fetches on initial load and changing yourStocks.
// Only auto fetches every x seconds when markets are OPEN
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:3001/api/news', {
                params: {
                  yourStocks
                }
              });
              setStockData(response.data);
              console.log('fetched from server');
            } catch (error) {
              console.error(error);
            }
          };
        
          fetchData();
        
          if (open) {
          const intervalId = setInterval(() => {
            fetchData();
          }, 5000);
        
          setTimeout(() => {
            clearInterval(intervalId);
          }, 600000);
          // 600000 == 10 minutes
        
          return () => {
            clearInterval(intervalId);
          };}
        }, [yourStocks, open]);


// SSE STREAMING
const [quotes, setQuotes] = useState([]);
const [hasError, setHasError] = useState(false);
const [connectedSSE, setConnectedSSE] = useState('')
// const [symbolsSSE, setSymbolsSSE] = useState('pcg,ndaq,spy,tsla,gme')
        // this string is how NodeJS can process the SSE stream URL
        // console.log(symbolsSSE) output --> pcg,ndaq,spy,tsla,gme

useEffect(() => {
  //replaces yourStocks with a string for NodeJS to accept as params (qs: _____)
  const symbols = (`${JSON.stringify(yourStocks.map(stock => stock.stock))}`)
  const symbolsURL = symbols.replace(/['"]+/g,'').replace(/\[/g, '').replace(/\]/g, "")
  console.log('symbols:'+symbols)
  const source = new EventSource(`http://localhost:3001/stream?symbols=${symbolsURL}`);



  source.addEventListener('message', event => {
    if (event.data) {
    const quote = JSON.parse(event.data)[0];
    if (quote) {
        // displays current and previous quotes
        setQuotes(quotes => {
          const updatedQuotes = [...quotes];
          const index = updatedQuotes.findIndex(q => q.symbol === quote.symbol);
          if (index > -1) {
            updatedQuotes[index] = quote;
          } else {
            updatedQuotes.push(quote);
          }
          return updatedQuotes;
        });
        // // // // When delete, it returns all the quotes again except deleted, previous ones stay on the screen
        // setQuotes(quotes => {
        //   const filteredQuotes = quotes.filter(q => yourStocks.some(stock => stock.stock === q.symbol));
        //   return [...filteredQuotes, quote];
        // });

    }
}
  });

  source.addEventListener('open', event => {
    console.log('Connection to server opened.');
    setConnectedSSE('Connected: SSE Stream opened')
    setHasError(false)
    console.log(hasError)
  });

  source.addEventListener('error', event => {
    console.error('Error connecting to server.');
    setHasError(true);
    setConnectedSSE('Awaiting input...')
    console.log(hasError)


  });

  return () => {
    source.close();
  };
}, [hasError, yourStocks]);


////////////////////////////////////////

const [combinedData, setCombinedData] = useState([]);

useEffect(() => {
  // fetch REST API data and setStockData
  // connect to SSE stream and setQuotes

  // merge the two arrays of data using the stock symbol as the common identifier
  const mergedData = stockData.map(stock => {
    const quote = quotes.find(q => q.symbol === stock.symbol);
    return { ...stock, ...quote };
  });

  // set the combined data in state
  setCombinedData(mergedData);
}, [stockData, quotes]);



        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT               vvvvvvvvvvvvvvvv
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
    //     // // // // // // WORKS ON CLIENT 


    // const getStockData = (stock) => {
    //     return axios
    //         .get(`${BASE_URL}${stock.stock}${TOKEN}`)
    //         .catch((error) => {
    //             console.error("Error", error.message)
    //         })
    // }

    // useEffect(() => {
    //     let tempStockData = []
    //     // const stockList = ["AAPL", "MSFT", "TSLA", "PCG", "AMZN"];
    //     // const stockList = (yourStocks.symbol)
    //     const stockList = yourStocks


    //     let promises = [];
    //     stockList.map((stock) => (
    //         promises.push(
    //             getStockData(stock)
    //                 .then((res) => {
    //                     tempStockData.push({
    //                         symbol: stock.stock,
    //                         id: stock.id,
    //                         // symbol: stock,
    //                         ...res.data
    //                     })
    //                 })
    //         )
    //     ))

    //     Promise.all(promises).then(() => {
    //         setStockData(tempStockData)
    //         console.log(tempStockData)
    //     })

    // }, [yourStocks, reducerValue])

    //     // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT     ^^^^^^^^
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 
        // // // // // // WORKS ON CLIENT 




    // const update1 = () => {
    //     forceUpdate()
    // }

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




    return (
        <>

<div className=''>
                {combinedData.map((stock) => (
                 <Draggable 
                 handle=".handle"
                 key={stock.id}
                 position={positions[stock.id]}
                 onDrag={(e, {x,y}) => handleDrag(stock.id, {x,y})}
                
            > 
                    <div 

                    >
                        <StatsRow
                        //from REST API
                        symbol={stock.symbol}
                        latestPrice={stock[0].latestPrice}
                        change={stock[0].change}
                        changePercent={stock[0].changePercent}
                        // from SSE Stream
                        lastSalePrice={stock.lastSalePrice}
                        lastSaleSize={stock.lastSaleSize}
                        // open={stock[0].iexOpen}
                        // volume={stock[0].volume}
                        // price={stock[0].price}
                        // iexClose={stock[0].iexClose}
                        // companyName={stock[0].companyName}
                            // reducerValue={reducerValue} 
                            // forceUpdate={forceUpdate}
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

<div className='absolute right-0 bg-blue-100 bg-opacity-20 m-auto select-none'>SSE Streaming History
<ul>
        {/* {hasError ? null: quotes.map((quote, index1) => ( */}
        {quotes.map((quote, index1) => (
    <div key={index1}>
    <div>
            <span>{quote.symbol}</span>
            <span>{` $${quote.lastSalePrice} `}</span>
            <span>{`[${quote.lastSaleSize}]`}</span>
          </div>
          {/* <StatsRow
          lastSalePrice={quote.lastSalePrice}
          lastSaleSize={quote.lastSaleSize}
          /> */}
       </div>
        ))}
      </ul>
</div>

{/* DOESNT WORK <div>penis
            {quotes.map((quote, index) => (
                <div key={index}>
                    Symbol: {quote.symbol} Price: {quote.price}
                </div>
            ))}
        </div> */}

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

<div draggable='false' className={hasError ? 'absolute select-none bottom-0 text-gray-400 animate-pulse' : 'absolute select-none bottom-0 text-green-400 animate-pulse'}>{connectedSSE}</div>


{/* <div onClick={update1} className='absolute top-28 select-none right-4 bg-slate-400 p-4 hover:cursor-pointer hover:bg-slate-300'>Refresh</div> */}

        </>
    )
}

export default Stats;