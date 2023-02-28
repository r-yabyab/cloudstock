import React from "react";
import { Link } from "react-router-dom";
import logo512 from '../photos/logo512.png'

function TopNav () {
    return (
        <>
            {/* <div className="relative pt-2 pb-2 bg-black border-y-[1px] border-slate-600 flex justify-evenly pl-4 pr-4 text-neutral-300"> */}
            <div className="relative pt-2 pb-2 bg-black border-y-[1px] border-slate-600 flex justify-between pl-4 pr-4 text-neutral-300">
                <Link to='/about' className="hover:text-white"><div className="absolute right-4 ">Info</div></Link>
                {/* <Link to='/refpage' className="hover:bg-blue-300"><div>Ref Pics</div></Link> */}
                <Link to='/' className="hover:text-white"><div className="mr-[80px] pr-0 pl-0">Home</div></Link>
                {/* <div>Sign up</div> */}
                <div className="absolute top-1 left-2 text-2xl tracking-tighter font-semibold italic">
                    {/* STOCK SHAPES */}
                    <Link to='/' className="hover:text-white ml-10"><img src={logo512} alt='logo' className="absolute mt-[2px] w-[30px]"/>
                    STOCK SHAPES</Link>
                    
                </div>
            </div>
        </>
    )
}

export default TopNav;