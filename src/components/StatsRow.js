import React, { useEffect, useState } from "react";
import Draggable from 'react-draggable'

function StatsRow (props, {reducerValue, forceUpdate, yourStocks, removeSymbol}) {
    // const [pressed, setPressed] = useState(false)
    // const [position, setPosition] = useState({x: 0, y: 0})
    // const ref = useRef()
    
    // useEffect(() => {
    // if (ref.current) {
    //     ref.current.style.transform= `translate(${position.x}px, ${position.y}.px)`
    //     ref.current.style.zIndex = 100;
    // }
    // }, [position])
    
    // const onMouseMove = (e) => {
    // if (pressed) {
    //     setPosition({
    //         x: position.x + e.movementX,
    //         y: position.y + e.movementY
    //     })
    // }
    // 
    
    
    // // DOESN't WORK WITH ARRAYS WITH MORE THAN 1 OBJECT
    // const [positions, setPositions] = useState({})
    // const [hasLoaded, setHasLoaded] = useState(false)

    // const handleStop = (e, data) => {
    //     console.log('works')
    //     console.log(positions)
    //     const dummyPositions = {...positions}
    //     const propsId=e.target.id
    //     dummyPositions[propsId] = {}
    //     dummyPositions[propsId]["x"] = data.x
    //     dummyPositions[propsId]["y"] = data.y
    //     setPositions(dummyPositions)
    // }

    // useEffect(() => {
    //     const existingDivPositions = JSON.parse(
    //     localStorage.getItem('positions_div')
    //     )
    //     setPositions(existingDivPositions)
    //     setHasLoaded(true)
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem('positions_div', JSON.stringify(positions))
    // }, [positions])
    // // 

    const [position, setPosition] = useState({x:0, y:0})

    const handleStop = () => {
        console.log('handlestop')
    }

    const ExitClick = () => {
        console.log('clicked on ExitClick via refExit useRef()')
    }

    return (
        <>
            <div 
                                        // onMouseMove={onMouseMove}
                                        // onMouseDown={() => setPressed(true)}
                                        // onMouseUp={() => setPressed(false)}
                                        // ref={ref} 
                                        // [&>div]:absolute
                className=" text-white select-none  
            [&>div]:resize [&>div]:overflow-hidden [&>div]:absolute
            [&>div]:shadow-xl [&>div]:m-4 [&>div]:min-w-[180px] [&>div]:min-h-[30px] [&>div]:w-[380px]
            ">
                {/* <Draggable 
                handle=".handle"
                // defaultPosition={
                //     positions ===null ?
                //     {x:0, y:0}
                //     : !positions[props.id] ?
                //     {x:0, y:0} :
                //     {x: positions[props.id].x, y: positions[props.id].y}
                // }
                // onStop={handleStop}
                onStop={handleStop}
                > */}
                    <div
                        className={props.change > 0 ? "relative bg-green-400 m-auto flex [&>div]:border-x-[1px] [&>div]:text-center [&>div]:border-gray-700" : "bg-red-400 m-auto flex [&>div]:border-x-[1px] [&>div]:text-center [&>div]:border-gray-700"} draggable="false">
                        <div className="bg-zinc-700  text-white p-4 min-w-[120px]">
                            <div className="font-semibold absolute text-2xl tracking-wider top-[50%] -translate-y-1/2 left-[40px]">{props.symbol}</div>
                            {/* <div className="max-w-[120px]">{props.companyName}</div> */}
                        </div>
                        <div className="bg-zinc-700 ratingAnimationYellow w-[100px] p-4">${props.latestPrice}</div>
                        <div>{"O " + props.open}</div>
                        <div>{"C " + props.change}</div>
                        <div onClick={removeSymbol} className=" border-none text-slate-500 hover:text-white hover:cursor-pointer absolute right-0 top-0 -mt-3 text-2xl"> x </div>
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