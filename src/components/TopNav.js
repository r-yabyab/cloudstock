import React from "react";
import { Link } from "react-router-dom";
import logo512 from '../photos/logo512.png'

function TopNav () {
    return (
        <>
            {/* <div className="relative pt-2 pb-2 bg-black border-y-[1px] border-slate-600 flex justify-evenly pl-4 pr-4 text-neutral-300"> */}
            <div className="relative pt-4 pb-4 bg-black  flex justify-between pl-4 pr-4 text-white">
                <Link to='/about' className="hover:text-neutral-300"><div className="absolute right-8 font-semibold ">Info</div></Link>
                {/* <Link to='/refpage' className="hover:bg-blue-300"><div>Ref Pics</div></Link> */}
                <Link to='/' className="hover:text-neutral-300"><div className="mr-[80px] pr-4 pl-0 font-semibold">Home</div></Link>
                {/* <div>Sign up</div> */}
                <div className="absolute top-3 flex items-center left-4 text-lg font-semibold ">
                    {/* STOCK SHAPES */}
                    <Link to='/' className="hover:text-neutral-300 [&>img]:hover:opacity-80 ml-10">
                        <img src={logo512} alt='logo' className="absolute -ml-9 mt-[2px] w-[30px]" />
                        <div className="-mt-2">
                            <div className="-mb-3">
                                Stock
                            </div>
                            <div>
                                Shapes
                            </div>
                        </div>
                        {/* Stock Shapes */}
                    </Link>

                </div>
            </div>
        </>
    )
}

export default TopNav;