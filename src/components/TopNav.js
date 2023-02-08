import React from "react";
import { Link } from "react-router-dom";

function TopNav () {
    return (
        <>
            <div className="relative pt-2 pb-2 bg-black border-y-[1px] border-slate-600 flex justify-evenly pl-4 pr-4 text-neutral-300">
                <Link to='/' className="hover:bg-blue-300"><div>Home</div></Link>
                <Link to='/refpage' className="hover:bg-blue-300"><div>Ref Pics</div></Link>
                <Link to='/about' className="hover:bg-blue-300"><div>About</div></Link>
                <div>Sign up</div>
                <div className="absolute top-1 left-2 text-2xl tracking-tighter font-semibold italic">
                    STOCK SHAPES
                </div>
            </div>
        </>
    )
}

export default TopNav;