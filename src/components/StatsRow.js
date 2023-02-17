import React, { useState, useEffect } from "react";
// import { format } from "date-fns"
// import Draggable from 'react-draggable'

function StatsRow (props) {
    const { stock, removeSymbol } = props;
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
        let interval = setInterval(() => {
            setCounter(x => x + 10)
        },100)
        if (props.price !== previousPrice) {
            setCounter(0)
            clearInterval(interval)
        }
    },[props.price])
    
    const [sizeCount, setSizeCount] = useState(1);
    const [previousSize, setPreviousSize] = useState(props.size);
    const [displaySize, setDisplaySize] = useState(props.size);
    
    useEffect(() => {
        if (props.size === previousSize) {
            setSizeCount(count => count + 1);
            if (props.size === previousSize) {
                setDisplaySize(`${props.size}(${sizeCount +1})`);
            }
        } else {
            setSizeCount(0);
            setDisplaySize(props.size);
        }
        setPreviousSize(props.size);
    }, [props.size]);
    
    // const [percentage, setPercentage] = useState(0)
    // useEffect(() => {
    //     const remainder = props.price - props.open
    //     const percent = remainder/props.price
    //     setPercentage(percent * 100)
        
    // }, [props.price])

    
    
    return (
        <>
            <div
                className=" text-white select-none  
                [&>div]:resize [&>div]:overflow-hidden [&>div]:absolute
            [&>div]:shadow-xl [&>div]:m-4 [&>div]:min-w-[180px] [&>div]:min-h-[30px] [&>div]:w-[380px]
            "
            >
                <div
                    // style={{ width: sizes[stock].width, height: sizes[stock].height }}
                    className={props.change > 0 ? "relative bg-green-400 m-auto flex [&>div]:text-center [&>div]:border-x-[1px] [&>div]:border-gray-700" : "bg-red-400 m-auto flex [&>div]:border-x-[1px] [&>div]:text-center [&>div]:border-gray-700"} draggable="false">
                    <div className="bg-zinc-700  text-white p-4 min-w-[120px]">
                        <div className="font-semibold absolute text-2xl tracking-wider top-[50%] -translate-y-1/2 left-[40px]">{props.symbol}</div>
                        {/* <div className="max-w-[120px]">{props.companyName}</div> */}
                    </div>
                    <div  id={`price-${props.symbol}`} className="bg-zinc-700 price  w-[100px] p-4">
                        {/* ${parseFloat(props.latestPrice).toFixed(2)}
                    <br></br> */}
                        ${props.price.toFixed(2)}
                        <br></br>
                        {/* {`[${props.size}] ${displaySize}`} */}
                        {`${displaySize}`}
                        <br></br>
                        {/* {format((props.time),'k:mm:ss')}
                        <br></br> */}
                        {/* {Math.floor(counter % 1000 / 100)} */}
                        {Math.floor(counter)}
                    </div>
                    <div className="flex-col pt-1 w-[60px] divide-solid divide-y-[1px] divide-black">
                        {/* <div>{parseFloat(props.change).toFixed(2)}</div> */}
                        <div>{parseFloat(props.price - props.open).toFixed(2)}</div>
                        {/* <div>open{props.open} + price{props.price}</div> */}
                        <div>%{parseFloat(((props.price - props.open)/props.open)*100).toFixed(2)}</div>
                        <div>{"%" +
                            parseFloat(props.changePercent * 100).toFixed(2)
                            // props.changePercent
                        }
                        <br></br>
                        {props.change}
                        <br></br>
                        open{props.open} iexOpen{props.iexOpen} change{props.change}
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