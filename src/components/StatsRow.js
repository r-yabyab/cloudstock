import React from "react";
// import Draggable from 'react-draggable'

function StatsRow (props) {
    const { stock, removeSymbol } = props;

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
                        <div className="bg-zinc-700 ratingAnimationYellow w-[100px] p-4">${parseFloat(props.latestPrice).toFixed(2)}</div>
                        <div>{"C " + parseFloat(props.change).toFixed(2)}</div>
                        <div>{"C %" + 
                        parseFloat(props.changePercent * 100).toFixed(2)
                        // props.changePercent
                        }</div>
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