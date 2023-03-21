import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo512 from '../photos/logo512.png'

function TopNav({ user, isAuthenticated, isLoading }) {
    // vars for useAuth0 
    //const { user, isAuthenticated, isLoading } = useAuth0();

    const [userMenu, setUserMenu] = useState(false)

    const LoginButton = () => {
        const { loginWithRedirect } = useAuth0();

        return <button onClick={() => loginWithRedirect()}>Log In</button>;
    };

    const LogoutButton = () => {
        const { logout } = useAuth0();

        return (
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
            </button>
        );
    };

    const userDrop = (e) => {
        setUserMenu(!userMenu)
        console.log(userMenu)
    }


    // useEffect(() => {
    //     console.log(`User: ${user} isAuthenticated: ${isAuthenticated} isLoading: ${isLoading}`)
    // }, [user, isAuthenticated, isLoading])

    return (
        <>
            {/* <div className="relative pt-2 pb-2 bg-black border-y-[1px] border-slate-600 flex justify-evenly pl-4 pr-4 text-neutral-300"> */}
            <div className="relative pt-4 pb-10 bg-black justify-between pl-4 pr-4 text-zinc-200">
                <div className="flex gap-8 float-right">
                    {/* <div className="font-semibold hover:cursor-pointer hover:bg-yellow-400">{}</div> */}
                    <Link to='/' className="hover:text-neutral-400"><div className="font-semibold">Home</div></Link>
                    <Link to='/about' className="hover:text-neutral-400"><div className="font-semibold ">Info</div></Link>
                    {/* <Link to='/refpage' className="hover:bg-blue-300"><div>Ref Pics</div></Link> */}
                    <div className="font-semibold select-none  ">
                        {
                            isLoading ? <><div className="tracking-tighter text-zinc-400 animate-pulse">Loading...</div></>
                                : isAuthenticated ?
                                    <>
                                        <div onClick={userDrop} className={userMenu ? 'text-slate-500 hover:cursor-pointer' : 'hover:cursor-pointer hover:text-neutral-400'}>Account</div>
                                        <div className={userMenu ? "absolute w-[240px] z-50  right-0 top-12 bg-slate-500" : "hidden"}>
                                            <div className="flex gap-2 pt-2 pb-2 hover:bg-slate-500   flex-col">
                                                <div className=" hover:cursor-text select-text  text-zinc-800  overflow-hidden w-full text-center">Acc: {user && user.email}</div>
                                                <div className="hover:bg-white hover:cursor-pointer hover:text-zinc-800 text-bg-zinc-200 w-full text-center">{LogoutButton()}</div>
                                            </div>
                                        </div>
                                    </> :
                                    <span className="hover:cursor-pointer hover:text-neutral-400">{LoginButton()}</span>
                        }
                    </div>
                    {/* <div>Sign up</div> */}
                </div>
                <div className="absolute top-3 flex items-center left-4 text-lg font-semibold ">
                    { }
                    <Link to='/' className="hover:text-neutral-400 [&>img]:hover:opacity-80 ml-10">
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
                {/* <div className="absolute text-yellow-200 flex left-[20%]">{isLoading ? "Loading..." : "penis"}
                    {isAuthenticated ? "authed" : "not authed"} {user && user.name} {user && user.email}
                </div> */}
            </div>
        </>
    )
}

export default TopNav;