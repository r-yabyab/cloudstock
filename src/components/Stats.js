import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StatsRow from './StatsRow'
import Draggable from 'react-draggable'

// import Draggable from 'react-draggable'
  
const STOCK_SHAPES = 'https://stockshapes.net'
// const STOCK_SHAPES = 'http://localhost:3001'

function Stats ({symbolName, setSymbolName,
  //  reducerValue, forceUpdate, 
   openMarket, clearSymbol}) {

    const [stockData, setStockData] = useState([])
    // const [symbolName, setSymbolName] = useState('')
    const [yourStocks, setYourStocks] = useState([
        // {id:0,  stock: 'NDAQ'},
        // {id:1,  stock: 'TSLA'},
        // {id: 3,  stock: 'PCG'}
    ])


        const addSymbol = () => {
            if (symbolName !== '' && yourStocks.length < 11) {
                const alreadyAdded = yourStocks.some(stock => stock.stock === symbolName)
        
                if (!alreadyAdded) {
                    let maxId = yourStocks.length > 0 ? Math.max(...yourStocks.map(item => item.id)) : -1;
         
                    let newEntry = {id: maxId + 1, stock: symbolName}
                    setYourStocks([...yourStocks, newEntry])
                    setSymbolName('')


                } else {
                    alert(`${symbolName} is already on your list.`)
                    setSymbolName('')
                }
            } else {
                alert("Max 3 stocks allowed Free User")
                setSymbolName('')
            }
        }

        const removeSymbol = (e) => {
            let x = e.target.getAttribute("selectnums")
            setYourStocks(yourStocks.filter(items=>items.id!=x))
            setQuotes(quotes => quotes.filter(q => q.symbol !== yourStocks.filter(x=>x.stock)));
            console.log('removed')
        }


// Fetches on initial load and changing yourStocks.
// Only auto fetches every x seconds when markets are OPEN
        useEffect(() => {
          const fetchData = async () => {
            try {
              // const response = await axios.get('https://stockshapes-server.vercel.app/api/news', {
                // const response = await axios.get(`https://stockshapes.net/api/news`, 
                const response = await axios.get(`${STOCK_SHAPES}/api/news`, 
                // const response = await axios.get('http://localhost:3001/api/news', 
              {
                params: {
                  yourStocks
                }
              });
              setStockData(response.data);
              // console.log('fetched from server');
              // console.log(response.data)
            } catch (error) {
              console.error(error);
            }
          };
        
          fetchData();
        
          if ([1, 2, 3].includes(openMarket)) {
          const intervalId = setInterval(() => {
            fetchData();
          }, 3000000);
        
          setTimeout(() => {
            clearInterval(intervalId);
          }, 10000000);
          // 600000 == 10 minutes
        
          return () => {
            clearInterval(intervalId);
          };}
        }, [yourStocks, openMarket]);


// SSE STREAMING
const [quotes, setQuotes] = useState([]);
const [hasError, setHasError] = useState(false);
const [connectedSSE, setConnectedSSE] = useState('')
const [showRawQuotes, setShowRawQuotes] = useState(false)
// const [symbolsSSE, setSymbolsSSE] = useState('pcg,ndaq,spy,tsla,gme')
// this string is how NodeJS can process the SSE stream URL
// console.log(symbolsSSE) output --> pcg,ndaq,spy,tsla,gme

        // shows log of quotes, every update shows their own quote
        // overloads after a bit and lags everything even with overflow-hidden
// const [rawQuotes, setRawQuotes] = useState([])
  // const rawHandler = () => {
  //   setShowRawQuotes(!showRawQuotes)
  // }


  // vv OLD CONNECTION
  // vv OLD CONNECTION
  useEffect(() => {
    //replaces yourStocks with a string for NodeJS to accept as params (qs: _____)
    if ([1,2,3].includes(openMarket)) {
    const symbols = (`${JSON.stringify(yourStocks.map(stock => stock.stock))}`)
    const symbolsURL = symbols.replace(/['"]+/g, '').replace(/\[/g, '').replace(/\]/g, "")
    console.log('symbolsURL:' + symbolsURL)
    const source = new EventSource(`${STOCK_SHAPES}/stream?symbols=${symbolsURL}`);

      source.addEventListener('message', event => {
        if (event.data) {
          const quote = JSON.parse(event.data)[0];
          // displays current and previous quotes
          // 'if (quote)' used to mitigate returning NaN & crashing when SSE returns the occasional undefined

          // This one works but I think it doesn't close connection
          // ..> it hits the 429 on several page refreshes
          if (quote) {
            // setRawQuotes(quotes => [...quotes, quote]);
            setQuotes(quotes => {
              const updatedQuotes = [...quotes];
              const index = updatedQuotes.findIndex(q => q.symbol === quote.symbol);
              // console.log(`SSE data${updatedQuotes}`)
              if (index > -1) {
                updatedQuotes[index] = quote;
              } else {
                updatedQuotes.push(quote);
              }
              console.log(updatedQuotes)
              return updatedQuotes;
            });
            // // // // When delete, it returns all the quotes again except deleted, previous ones stay on the screen
            // setQuotes(quotes => {
            //   const filteredQuotes = quotes.filter(q => yourStocks.some(stock => stock.stock === q.symbol));
            //   return [...filteredQuotes, quote];
            // });

          }
        } 
        // else {
        //   return null
        // }
      }
      );

      source.addEventListener('open', event => {
        console.log('Connection to server opened.');
        setConnectedSSE('Connected (live updates)')
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
    }

    else {
      setHasError(true)
      setConnectedSSE('Awaiting market open for live updates')
    }
  }, [yourStocks]);

  // // ^^^^^^^ OLD CONNECTION
  // // ^^^^^^^ OLD CONNECTION

  // new connection  vvvvvvvvvvvvvvvvvv
  // new connection  vvvvvvvvvvvvvvvvvv
  // new connection  vvvvvvvvvvvvvvvvvv
  // useEffect(() => {
  //   let source = null;
  
  //   const connectToServer = () => {
  //     const symbols = (`${JSON.stringify(yourStocks.map(stock => stock.stock))}`)
  //     const symbolsURL = symbols.replace(/['"]+/g, '').replace(/\[/g, '').replace(/\]/g, "")
  //     console.log('symbolsURL:' + symbolsURL)
  //     source = new EventSource(`${STOCK_SHAPES}/api/stream?symbols=${symbolsURL}`);
  
  //     source.addEventListener('message', event => {
  //       if (event.data) {
  //         const quote = JSON.parse(event.data)[0];
  
  //         if (quote) {
  //           // setRawQuotes(quotes => [...quotes, quote]);
  //           setQuotes(quotes => {
  //             const updatedQuotes = [...quotes];
  //             const index = updatedQuotes.findIndex(q => q.symbol === quote.symbol);
  
  //             if (index > -1) {
  //               updatedQuotes[index] = quote;
  //             } else {
  //               updatedQuotes.push(quote);
  //             }
  //             // console.log(updatedQuotes)
  //             return updatedQuotes;
  //           });
  //         }
  //       }
  //     });
  
  //     source.addEventListener('open', event => {
  //       console.log('Connection to server opened.');
  //       setConnectedSSE('Connected (live updates)')
  //       setHasError(false)
  //       console.log(hasError)
  //     });
  
  //     source.addEventListener('error', event => {
  //       console.error('Error connecting to server.');
  //       setHasError(true);
  //       setConnectedSSE('Awaiting input...')
  //       console.log(hasError)
  //     });
  //   };
  
  //   connectToServer();
  
  //   return () => {
  //     if (source) {
  //       source.close();
  //     }
  //   };
  // }, [yourStocks]);
  // new connection   ^^^^^^^^^^^^^^^^^^^^^^^
  // new connection   ^^^^^^^^^^^^^^^^^^^^^^^
  // new connection   ^^^^^^^^^^^^^^^^^^^^^^^


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

    // get localStorage
  useEffect(() => {
    const data = window.localStorage.getItem('_STOCK_list')
    if (data !== null) {
      setYourStocks(JSON.parse(data))
    } else {
      setYourStocks([
        { id: 0, stock: 'NDAQ' },
        { id: 1, stock: 'TSLA' },
        // { id: 2, stock: 'AAPL' }
      ])
      setPositions({
        0: { x: 20, y: 130 },
        1: { x: 0, y: 219 },
        2: { x: 0, y: 308 }
      })
    }
  }, [])


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
    
        return yourStocks.reduce((acc, { id }) => ({ ...acc, [id]: { x: 0, y:0 } }), {});
      });

      useEffect(() => {
        localStorage.setItem('_STOCK_positions', JSON.stringify(positions));
      }, [positions]);
    
      const handleDrag = (id, { x, y }) => {
        setPositions({ ...positions, [id]: { x, y } });
      };


      //heights
      // const [height, setHeight] = useState(0);
      // const [width, setWidth] = useState(0)
      // const [mouse, setMouse] = useState(false)
      // const elementRef = useRef(0);

      // useEffect(() => {

      //   setWidth(elementRef.current.clientWidth)
      //   setHeight(elementRef.current.clientHeight)
      //   console.log(height)
        
      //  },[mouse])



    return (
        <>

<div className=''
>
                {combinedData.map((stock) => (
                 <Draggable 
                 handle=".handle"
                 key={stock.id}
                 position={positions[stock.id]}
                 onDrag={(e, {x,y}) => handleDrag(stock.id, {x,y})}

            > 
                    <div 
                //  ref={elementRef}
                //  onMouseUp={(e) => setMouse(!mouse)}
                    >
                        <StatsRow
                        //from REST API
                        symbol={stock.symbol}
                              // FROM IEX CLOUD APPERATE, REQUIRES $1,500 BUNDLE AS OF MID MARCH 2023
                              // latestPrice={stock[0].latestPrice}
                              // change={stock[0].change}
                              // changePercent={stock[0].changePercent}
                              // iexOpen={stock[0].iexOpen}
                              // open={stock[0].open}
                                // from FinnHub
                              c={stock.c}
                              change={stock.d}
                              changePercent={stock.dp}
                              iexOpen={stock.o}
                              previousClose={stock.pc}
                                // use this to get the typical market open percentage,
                                // ex] if NDAQ opens @ 3%, the session's percentage will continue the 3% instead of
                                // resetting to 0
                              // previousClose={stock[0].previousClose}
                        
                        // // for LAST SSE Stream
                        // lastSalePrice={stock.lastSalePrice}
                        // lastSaleSize={stock.lastSaleSize}
                        // from SSE Stream, for LAST
                        // price={stock.price}
                        // size={stock.size}
                        // time={stock.time}
                        // // for TOPS SSE Stream
                        price={stock.lastSalePrice}
                        size={stock.lastSaleSize}
                        time={stock.lastSaleTime}

                        bidSize={stock.bidSize}
                        bidPrice={stock.bidPrice}
                        askSize={stock.askSize}
                        askPrice={stock.askPrice}
                        // volume={stock[0].volume}
                        // price={stock[0].price}
                        // iexClose={stock[0].iexClose}
                        // companyName={stock[0].companyName}
                            // reducerValue={reducerValue} 
                            // forceUpdate={forceUpdate}
                            yourStocks={yourStocks}
                            removeSymbol={removeSymbol}
                            stock={stock.id}
                            openMarket={openMarket}
                            
                            // width={width}
                            // height={height}
                            // mouse={mouse}
                            // setMouse={setMouse}
                        
                    />
                    {/* <div className='' selectnums={stock.id} onClick={removeSymbol}>x</div> */}
                    
                    {/* {"close " + stock[0].iexClose} */}
                    </div>
</Draggable>

                ))}
</div>

        {/* <div onClick={rawHandler} className={[1, 2, 3].includes(openMarket) ? 'absolute hover:cursor-pointer max-h-[400px] overflow-hidden hover:bg-zinc-400 right-0 bg-blue-100 bg-opacity-20 m-auto select-none ' : 'hidden'}>SSE Streaming History
          <ul className={showRawQuotes ? 'flex flex-col-reverse ' : 'hidden'}>
            {rawQuotes && rawQuotes.map((x, index1) => (
              <div className='' key={index1}>
                <div>
                  <span>{x.symbol}</span>
                  <span>{` $${x.lastSalePrice} `}</span>
                  <div className='text-red-400'>{`Ask ${x.askSize} ${x.askPrice}`}</div>
                  <div className='text-green-400'>{`Bid ${x.bidSize} ${x.bidPrice}`}</div>
                  <div className='text-zinc-200'>Time {x.lastUpdated}</div>
                </div>

              </div>
            ))}
          </ul>
        </div> */}

{/* add Symbol BUTTON */}
<p onClick={clearSymbol} className={symbolName ? 'absolute -mt-12 pr-[119px] pl-[119px] left-[50%] -translate-x-1/2 text-red-600 hover:text-white hover:bg-red-600 hover:cursor-pointer hover:font-bold' : "hidden"}>Remove</p>

<div onClick={addSymbol} className={symbolName ? 'absolute -mt-6 pr-[134px] pl-[134px] left-[50%] -translate-x-1/2 text-green-600 hover:bg-green-600 hover:cursor-pointer hover:text-white hover:font-bold' : "hidden"}>
    Add
<p className='absolute pb-[56px] w-[300px] left-[50%] -translate-x-1/2 hover:bg-yellow-300 hover:bg-opacity-0'></p>
    {/* </button> */}
</div>


<div draggable='false' className={hasError ? 'absolute select-none bottom-0 text-gray-400 animate-pulse' : 'absolute select-none bottom-0 text-green-400 animate-pulse'}>{connectedSSE}</div>


{/* <div onClick={update1} className='absolute top-28 select-none right-4 bg-slate-400 p-4 hover:cursor-pointer hover:bg-slate-300'>Refresh</div> */}

        </>
    )
}

export default Stats;