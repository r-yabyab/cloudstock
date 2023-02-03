import React from "react";
import { DataFetch } from "./DataFetch";

function HomePage () {
    return (
        <>
        <div>
            
<div className="[&>div]:text-xl text-center">
    <div>Stock Shapes</div>
    <p className="italic">Resize your stocks!</p>
</div>



        </div>

<DataFetch />
        </>
    )
}

export default HomePage;