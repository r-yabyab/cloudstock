import React from "react";
import { DataFetch } from "./DataFetch";

function HomePage ({hide}) {
    return (
        <>
        <div className={hide ? "hidden" : null}>
            
<div className="[&>div]:text-xl text-center">
    <div>Stock Shapes</div>
    <p className="italic">Resize your stocks!</p>
</div>

<div className="absolute top-6 text-white flex space-x-6">
    <div>Market <span className="text-green-400">OPEN</span></div>
    <div>01:43</div>
</div>



        </div>

<DataFetch />
        </>
    )
}

export default HomePage;