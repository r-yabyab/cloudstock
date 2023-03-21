import React, { useState, useEffect, useRef } from "react";
// import { format } from "date-fns"
// import Draggable from 'react-draggable'

function StatsRow (props) {
    const { stock, removeSymbol, openMarket } = props;
    const [previousPrice, setPreviousPrice] = useState(props.price)
    const [counter, setCounter] = useState(0)
    
    useEffect(() => {
        if (props.price !== previousPrice) {
            setPreviousPrice(props.price);
            const element = document.getElementById(`price-${props.symbol}`);
            element.classList.add(props.price > previousPrice ? 'price-up' : 'price-down');
            setTimeout(() => element.classList.remove('price-up', 'price-down'),200);
        }
    }, [props.price, previousPrice, props.symbol]);
    
    useEffect(() => {
        if ([1,2,3].includes(openMarket)) {
        let interval = setInterval(() => {
            setCounter(x => x + 10)
        },100)
        if (props.price !== previousPrice) {
            setCounter(0)
            clearInterval(interval)
        }
    }
    },[props.price])
    
    // // // // Doesn't really work, implement later
    // const [sizeCount, setSizeCount] = useState(1);
    // const [previousSize, setPreviousSize] = useState(props.size);
    // const [displaySize, setDisplaySize] = useState(props.size);
    
    // useEffect(() => {
    //     if (props.size === previousSize) {
    //         setSizeCount(count => count + 1);
    //         if (props.size === previousSize) {
    //             setDisplaySize(`${props.size}(${sizeCount +1})`);
    //         }
    //     } else {
    //         setSizeCount(0);
    //         setDisplaySize(props.size);
    //     }
    //     setPreviousSize(props.size);
    // }, [props.size]);
    
    // const [percentage, setPercentage] = useState(0)
    // useEffect(() => {
    //     const remainder = props.price - props.open
    //     const percent = remainder/props.price
    //     setPercentage(percent * 100)
        
    // }, [props.price])

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0)
    const [mouse, setMouse] = useState(false)
    const elementRef = useRef(0);

    useEffect(() => {

      setWidth(elementRef.current.clientWidth)
      setHeight(elementRef.current.clientHeight)
    //   console.log(height)
      
     },[mouse])
    
    
    return (
        <>
            <div
                className=" text-white select-none  
                [&>div]:resize [&>div]:overflow-hidden [&>div]:absolute
            [&>div]:shadow-xl [&>div]:m-4 [&>div]:min-w-[180px] [&>div]:min-h-[30px] [&>div]:h-[80px] [&>div]:w-[300px]
            "


            >
                <div
                            onMouseUp={(e) => setMouse(!mouse)}
            ref={elementRef}
                    // style={{ width: sizes[stock].width, height: sizes[stock].height }}
                    className={props.change > 0 ? "relative bg-green-400 m-auto flex [&>div]:text-center [&>div]:border-x-[1px] [&>div]:border-gray-700"
                     : 
                        "bg-red-400 m-auto flex [&>div]:border-x-[1px] [&>div]:border-r-0 [&>div]:text-center [&>div]:border-gray-700"} draggable="false">
                    <div className={`bg-zinc-700 relative text-white min-w-[120px]`}>
                        {/* <div className="absolute left-1 top-0">
                            {openMarket ? Math.floor(counter / 100) : null}
                        </div> */}
                        <div className="font-semibold resize1 text-2xl tracking-wider absolute top-[50%] -translate-y-1/2 right-[50%] translate-x-1/2">
                            {props.symbol}
                        </div>
                        {/* <div className="max-w-[120px]">{props.companyName}</div> */}
                    </div>
                    <div id={`price-${props.symbol}`} className={`  ${width > 500 && height > 170 ? "w-full text-[200px] price bg-zinc-700 relative overflow-hidden" : "relative bg-zinc-700 price min-w-[70px]  w-[100px] p-4"} `}>
                        <div className="absolute top-[50%] -translate-y-1/2 right-[50%] translate-x-1/2">
                            {/* ${parseFloat(props.latestPrice).toFixed(2)}
                    <br></br> */}
                            {/* ${openMarket ? parseFloat(props.price).toFixed(2) : props.latestPrice} */}
                            {/* vvv WORKS */}
                            {[1,2,3].includes(openMarket) ? `$${parseFloat(props.price).toFixed(2)}` : `$${parseFloat(props.c).toFixed(2)}`}
                             {/* FOR DEBUGGING EC2 INSTANCE vvvv */}
                             {/* $${parseFloat(props.price).toFixed(2)}` : `$${parseFloat(props.latestPrice).toFixed(2)} */}
                            <div className="absolute right-[50%] translate-x-1/2">{[1,2,3].includes(openMarket) && !(width > 500 && height > 170) ? <>{props.size}</> : null}</div>
                            <div className="absolute text-gray-500 -mt-[50px] right-[50%] translate-x-1/2">{[1,2,3].includes(openMarket) && !(width > 500 && height > 170) ? Math.floor(counter / 100) : null}</div>
                            
                        </div>
                        {/* {`${displaySize}`}
                        <br></br> */}
                        {/* {format((props.time),'k:mm:ss')}
                        <br></br> */}
                        {/* {Math.floor(counter % 1000 / 100)} */}
                        {/* {Math.floor(counter/100)} */}
                    </div>

                    <div className={`${width > 500 && height > 170 ? "hidden" : "flex-col  relative w-[98%] min-w-[60px]"} `}>
                        {/* <div className="absolute text-black top-[46%] -translate-y-1/2 right-[50%] translate-x-1/2 overflow-hidden">
                            __________________</div> */}
                        <div className="">
                            {/* <div>{parseFloat(props.change).toFixed(2)}</div> */}
                            <div className="absolute top-[30%] -translate-y-1/4 right-[50%] translate-x-1/2">
                                <div className="">{[1,2,3].includes(openMarket) ? parseFloat(props.price - props.previousClose).toFixed(2) : props.change}</div>
                            </div>
                            {/* <div>{parseFloat(props.price - props.open).toFixed(2)}</div> */}
                            {/* <div>open{props.open} + price{props.price}</div> */}
                            <div className={props.change > 0 ? "absolute top-[75%] -translate-y-3/4 right-[50%] translate-x-1/2 w-[98%] bg-green-400" : "absolute top-[75%] -translate-y-3/4 right-[50%] translate-x-1/2 w-[98%] bg-red-400"}>%{[1,2,3].includes(openMarket) ? parseFloat(((props.price - props.previousClose) / props.previousClose) * 100).toFixed(2) : parseFloat(props.changePercent).toFixed(2)}</div>

{/* WIDTH AND HEIGHT DEBUGGING */}
{/* WIDTH AND HEIGHT DEBUGGING */}
                            {/* <div>
                                width{width} height{height}
                            </div> */}
                        </div>
                    </div>

                    <div selectnums={stock} onClick={removeSymbol} className=" border-none text-slate-500 hover:text-white hover:cursor-pointer absolute right-0 top-0 -mt-3 text-2xl"> x </div>
                    {/* <div className="border-none hover:cursor-pointer absolute right-0 bottom-0 text-2xl bg-green-200">/</div> */}
                    <div className="absolute h-full opacity-0 w-[94%] handle hover:cursor-move bg-black top-0 "> click to drag</div>
                    {/* <div>{"close " + props.iexClose}</div> */}
                </div>
                {/* </Draggable> */}
            </div>

        </>
    )
}

export default StatsRow;