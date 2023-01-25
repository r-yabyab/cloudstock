import React from "react";

function StatsRow (props) {
    return (
        <>
        <div>
        penis1111
        <div className="text-red-400">{props.symbol}</div>
        <div className="text-red-400">{"change " + props.change}</div>
        </div>
        </>
    )
}

export default StatsRow;