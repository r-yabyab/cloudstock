import React, { useState, useRef, useEffect} from "react";
import Draggable from 'react-draggable'

function StatsRow (props) {



    const ExitClick = () => {
        console.log('clicked on ExitClick via refExit useRef()')
    }

    return (
        <>
            <div 
                        
            className=" text-white select-none
            [&>div]:shadow-xl [&>div]:m-4 [&>div]:min-w-[300px] [&>div]:min-h-[30px] [&>div]:resize [&>div]:overflow-hidden
            ">
                
                <div 
                className={props.change > 0 ? "relative bg-green-400 m-auto flex [&>div]:border-x-[1px] [&>div]:text-center [&>div]:border-slate-300" : "bg-red-400 m-auto flex [&>div]:border-x-[1px] [&>div]:text-center [&>div]:border-slate-300"} draggable="false">
                    <div className="bg-slate-700 text-white  p-4 min-w-[120px]">
                        <div className="font-semibold text-2xl tracking-wider">{props.symbol}</div>
                        {/* <div className="max-w-[120px]">{props.companyName}</div> */}
                    </div>
                    <div className="bg-slate-700 w-[100px] p-4">{props.latestPrice}</div>
                    <div>{"change " + props.change}</div>
                    <div>{"open " + props.open}</div>
                    <div onClick={ExitClick} className=" border-none hover:cursor-pointer absolute right-0 top-0 text-2xl"> X </div>
                    {/* <div>{"close " + props.iexClose}</div> */}
                </div>
            </div>

        </>
    )
}

export default StatsRow;