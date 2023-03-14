import React, { useEffect, useState } from "react";
import DataFetch from "./DataFetch";
import { format } from "date-fns"

function HomePage ({hide}) {

    const [openMarket, setOpenMarket] = useState(0)
    // const [alertMessage, setAlertMessage] = useState(true)
    //0: closed
    //1: open
    //2: premarket
    //3: after-hours
    //4: postmarket

    useEffect (() => {
        document.title = 'Stock Shapes';
      }, [])

    useEffect(() => {
        const date = new Date();
        const hours = date.getUTCHours()
        const minutes = date.getUTCMinutes()
        const days = date.getUTCDay()
        console.log(`UTC ${hours}:${minutes}, day:${days}`);
        if (days >= 1 && days <= 5) {
            if ((hours === 13 && minutes >=0) && (hours === 13 && minutes <=30)) {
                setOpenMarket(2)
            // } else if ((hours >= 14 && minutes >=30) && hours <= 21) {
            } else if (hours >= 13 && hours <= 19) {
                setOpenMarket(1)
            // } else if (hours >= 21 && hours <= 22) {
            } else if (hours === 20) {
                setOpenMarket(3)
            } else {
                // fires when markets are closed on weekdays
                setOpenMarket(0)
            }
        } else {
            setOpenMarket(0)
        }
        console.log(`Market: ${[1,2,3].includes(openMarket) ? "open" : "closed"} ...#${openMarket}`)
    }, [])

    // const alertHandler = (e) => {
    //     setAlertMessage(!alertMessage)
    //     console.log(alertMessage)
    // }

    // // for alert messages
    // useEffect(() => {
    //     const alertData = localStorage.getItem('_alerts')
    //     if (alertData !== null) setAlertMessage(JSON.parse(alertData))
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem('_alerts', JSON.stringify(alertMessage));
    //   }, [alertMessage]);



    return (
        <>
            <div className={hide ? "hidden" : null}>

                <div className="[&>div]:text-xl text-center">
                    {/* <div>Stock Shapes</div> */}
                    {/* <p className="italic">Resize your stocks!</p> */}
                </div>
            </div>

            <div className={hide ? "absolute top-0 select-none text-white flex" : "absolute top-14 select-none text-white flex space-x-6"}>
                <div className={hide ? "hidden" : null}>Markets <span className=
                {openMarket === 1 
                ? "text-green-400" : openMarket === 3 
                ? "text-orange-400" : openMarket === 2 
                ? "text-yellow-400" : "text-red-400" }>
                    {openMarket === 1
                    ? "OPEN": openMarket === 3 
                    ? "AFTERHOURS" : openMarket === 2 
                    ? "PREMARKET" : "CLOSED"}
                    </span></div>
                {/* <div className={hide ? "hidden" : openMarket ? "hidden" : "absolute top-4 -left-[23px]"}>Futures <span className={openMarket ? "text-red-400" : "text-green-400" }>{openMarket ? "CLOSED":"OPEN"}</span></div> */}
                {/* <div>{format(Date.now(), 'k:mm:ss:S')}</div> */}
                {/* <div>{clock}</div> */}
                <div><TopTimer /></div>
                {/* <div><UniversalTime /></div> */}
            </div>
            {/* <div className="absolute flex gap-2 mt-6">

                <svg onClick={alertHandler} className="hover:text-white absolute hover:cursor-pointer text-red-600 mt-1 ml-4" xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                </svg>
                <div className={alertMessage ? "ml-[40px] w-[300px] text-red-600" : 'hidden'}>Problem where live data won't update correctly, currently fixing <span onClick={alertHandler} className="hover:text-white hover:cursor-pointer text-red-200">DISMISS</span></div>
            </div> */}
            <DataFetch openMarket={openMarket} />
            
            {/* <div className="text-[200px] m-auto absolute top-0 pointer-events-none">fixing <span className="text-orange-200">HTTP</span> CONNECTION TO HTTPS</div> */}
            {/* <div className="text-[80px] m-auto absolute top-0 pointer-events-none w-[800px]">Fixing SSE reverse proxy, quotes still work for afterhours</div> */}
        </>
    )
}

function TopTimer () {
    const [clock, setClock] = useState()

    useEffect(() => {
        setInterval(() => {
            const date = Date.now()
            setClock(date)
        }, 1000)
    }, [])

    return (
        <>{format(Date.now(), 'k:mm:ss')}</>
    )
}

// function UniversalTime () {

//     const [open, setOpen] = useState(false)


// useEffect (() => {
//     // var date1 = Date.now(Date.UTC);
//     // var date2 = Date.now()
//     // console.log("UTC", date1)
//     // console.log("your location:", date2)
//     const date = new Date();
// const hours = date.getUTCHours()
// const minutes = date.getUTCMinutes()
// console.log(hours, minutes);

// if (hours >= 13 && hours <= 20) {
//     setOpen(true)
// }
// console.log(open)

// },[])

// return(
//     <><div className="bg-blue-400 absolute left-0 top-10">{open? "OPEN":"CLOSED"}</div></>
// )

// }

export default HomePage;