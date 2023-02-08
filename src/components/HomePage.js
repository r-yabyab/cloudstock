import React, { useEffect, useState } from "react";
import DataFetch from "./DataFetch";
import { format } from "date-fns"

function HomePage ({hide}) {




    return (
        <>
            <div className={hide ? "hidden" : null}>

                <div className="[&>div]:text-xl text-center">
                    {/* <div>Stock Shapes</div> */}
                    {/* <p className="italic">Resize your stocks!</p> */}
                </div>
            </div>

            <div className={hide ? "absolute top-0 select-none text-white flex" : "absolute top-10 select-none text-white flex space-x-6"}>
                <div className={hide ? "hidden" : null}>Market <span className="text-green-400">OPEN</span></div>
                {/* <div>{format(Date.now(), 'k:mm:ss:S')}</div> */}
                {/* <div>{clock}</div> */}
                <div><TopTimer /></div>
            </div>
            <DataFetch />
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

export default HomePage;