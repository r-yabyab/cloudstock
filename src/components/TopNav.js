import React from "react";
import { Link } from "react-router-dom";

function TopNav () {
    return (
        <>
        <div className="bg-slate-400 flex justify-evenly pl-4 pr-4">
        <Link to='/' className="hover:bg-blue-300"><div>Home</div></Link>
        <div>Sign up</div>
        <Link to='/refpage' className="hover:bg-blue-300"><div>Ref Pics</div></Link>
        <Link to='/about' className="hover:bg-blue-300"><div>About</div></Link>
        </div>
        </>
    )
}

export default TopNav;