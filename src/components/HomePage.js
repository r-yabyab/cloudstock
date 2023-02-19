import React, { useEffect, useState } from "react";
import DataFetch from "./DataFetch";
import { format } from "date-fns"

function HomePage ({hide}) {

    const [openMarket, setOpenMarket] = useState(false)


    useEffect (() => {
        // var date1 = Date.now(Date.UTC);
        // var date2 = Date.now()
        // console.log("UTC", date1)
        // console.log("your location:", date2)
        const date = new Date();
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    console.log(hours, minutes);
    
    if (hours >= 13 && hours <= 20) {
        setOpenMarket(true)
    }
    console.log(openMarket)
    
    },[])

    return (
        <>
            <div className={hide ? "hidden" : null}>

                <div className="[&>div]:text-xl text-center">
                    {/* <div>Stock Shapes</div> */}
                    {/* <p className="italic">Resize your stocks!</p> */}
                </div>
            </div>

            <div className={hide ? "absolute top-0 select-none text-white flex" : "absolute top-10 select-none text-white flex space-x-6"}>
                <div className={hide ? "hidden" : null}>Markets <span className={openMarket ? "text-green-400" : "text-red-400" }>{openMarket? "OPEN":"CLOSED"}</span></div>
                <div className={hide ? "hidden" : openMarket ? "hidden" : "absolute top-4 -left-[23px]"}>Futures <span className={openMarket ? "text-red-400" : "text-green-400" }>{openMarket ? "CLOSED":"OPEN"}</span></div>
                {/* <div>{format(Date.now(), 'k:mm:ss:S')}</div> */}
                {/* <div>{clock}</div> */}
                <div><TopTimer /></div>
                {/* <div><UniversalTime /></div> */}
            </div>
            <DataFetch openMarket={openMarket} />
            
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