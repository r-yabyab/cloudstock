import React from "react";
import refPic1 from '../photos/c0414f4c13c70adabaf8ea673b9a537f.png'
import refPic2 from '../photos/e5ab165b4d0e671ec15a56d1bdf7f564.png'


function RefPage () {
    return(
        <>

<div className="ml-8 mt-4 mb-4">
            <ul>Todo</ul>
            <li>Make pop up</li>
            <li>Make resizeable</li>
            <li>SSE streaming</li>
        </div>

        <div>
<span className="text-3xl ml-10 bg-purple-300">Reference Photos</span>
        <img src={refPic1} alt="refpic1" />
        <img src={refPic2} alt="refpic2" />
        </div>


        </>
    )
}

export default RefPage;