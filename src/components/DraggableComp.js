import React, { useEffect, useState, useRef } from "react"

export function DraggableComp () {

const [pressed, setPressed] = useState(false)
const [position, setPosition] = useState({x: 0, y: 0})
const ref = useRef()

useEffect(() => {
if (ref.current) {
    ref.current.style.transform= `translate(${position.x}px, ${position.y}.px)`
}
}, [position])

const onMouseMove = (e) => {
if (pressed) {
    setPosition({
        x: position.x + e.movementX,
        y: position.y + e.movementY
    })
}
}

return (
    <>
    <div className="absolute bg-slate-200 w-full h-full"
                    onMouseMove={onMouseMove}
                    onMouseDown={() => setPressed(true)}
                    onMouseUp={() => setPressed(false)}
    >
                <div 
                                    // onMouseMove={onMouseMove}
                                    // onMouseDown={() => setPressed(true)}
                                    // onMouseUp={() => setPressed(false)}
                                    ref={ref}
                className="
                w-[200px]
                h-[200px]
                bg-yellow-300
                flex resize overflow-hidden
                justify-center
                "
            >
                <p className=" select-none">{pressed ? "dragging..." : "press to drag"}</p>
            </div>
            </div>
            <button onClick={() => setPosition({x: 0, y: 0})} className="absolute bg-blue-400">Reset position</button>
    </>
)}