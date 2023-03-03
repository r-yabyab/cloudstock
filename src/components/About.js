import React, { useEffect, useState } from "react";
// import demogif from '../photos/demogif.gif'
import demogif1 from '../photos/demogif1.gif'

function About () {

    const [miniLog, setMiniLog] = useState(false)


    useEffect (() => {
        document.title = 'Info';
      }, [])

    return (
        <>
            <div className="relative text-center pt-10 max-w-[800px] m-auto ">
                <div className="italic text-xl font-bold">
                    {/* About Stock Shapes  */}
                    About Stock Shapes
                </div>

                {/* <div>Looking for a hassle-free way to view real-time stock quotes? Our website offers a clean and easy-to-use interface where you can access quotes without signing up. With the ability to resize and reposition quotes on the page, you'll have a personalized experience. And if you need more frequent updates, simply sign up for a free account. Get straight to the information you need, no fuss, no distraction. Try it now.</div> */}
                <div>Track your stocks with minimal overhead...</div>
                <div>No login or download needed!</div>
                <br></br>

                    <div className="hidden">
                        {/* <div>Use it to aid your trading sessions or use as a widget by resizing the page.</div> */}
                        <div>This website was made as a way to track real time futures updates. Free stock apps tend to use delayed data and overlook details such as having a timer with milliseconds.</div>
                        <div>Due to IEX cloud API costing money, free users have been limited to 5 stocks with a timeout after 30 minutes. Paid users <span className="text-green-400">$4.99 a month</span> have access to 20 symbols, no timeouts, and more frequent stock updates.</div>
                        {/* <div>Inspired by the live DOM from tradovate. I loved seeing the numbers go bananas during open session</div> */}
                    </div>
                {/* <div className="text-left w-[520px] select-none absolute right-[50%] translate-x-1/2 justify-center"> */}
                <div className=" text-center max-md:w-[450px] md:w-[600px] [&>div]:text-left m-auto justify-center">
                    {/* <div className="italic text-xl pt-10 font-bold"> Features </div> */}
                    <div><u>Free-tier</u>: Real time stock quotes. Max 5 quotes on screen.</div>
                    <div className="indent-4">- Price, latest trade size, change, percent change, time before last trade</div>
                    <div className="indent-4">- On market close: Access to previous session's quotes</div>
                    <div><u>Paid-tier</u>: In progress</div>

                    <div>Globex/crypto data: In progress</div>
                    {/* <div>Due to API costs, SSE streams time out after 10 minutes of inactivity on market open</div> */}
                    {/* <div>Please be mindful of API costs, there's a reason why real time updates tend to only exist on trading platforms!</div> */}
                    <div className="">Please be mindful of API costs! <br></br># of calls from previous sessions: <span className=" italic text-pink-200">8,452,972 - 6,185,228, 1,738,719, 1,417,772</span></div>

                    <div className="relative md:mt-72 max-md:mt-40 select-none">
                        {/* <div className="absolute top-0">Changelog</div> */}
                        <div className=" justify-center text-center text-white">Changelog <span onClick={e => setMiniLog(!miniLog)} className={miniLog ? "hover:text-white hover:cursor-pointer bg-neutral-600" : "hover:text-white hover:cursor-pointer"}>(show minor updates)</span></div>
                        <div className={miniLog ? "bg-neutral-600" : "hidden"}>03/03/23 - Compared to the live updates (SSE) running locally to my test environment, the live updates from the server being fed to this site sometimes lags a couple seconds behind and often skips price updates especially when there's multiple price changes a second. Working to resolve issue. </div>
                        <div className={miniLog ? "bg-neutral-600" : "hidden"}>03/02/23 - Background color now stays gray in any window size. OPEN market status now displays correctly (previously showed PREMARKET on both PREMARKET and OPEN)</div>
                        <div className="text-white [&>span]:ml-8">03/01/23 - Market status now displays PREMARKET and AFTERHOURS along with OPEN and CLOSED. 
                        <br />Hours are as follows in UTC:
                            <br />
                            <span className="text-yellow-400">PREMARKET | 14:00 - 14:30</span> <br />
                            <span className="text-green-400">OPEN | 14:30 - 21:00</span><br />
                            <span className="text-orange-400">AFTERHOURS | 21:00 - 22:00</span><br />
                            <span className="text-red-500">CLOSED | 22:00 - 14:00 on Mon - Fri, closed on Sat - Sun</span>
                        </div>
                        <div className="text-white">02/26/23 17:03 - Removed dropdown for text field, fixed dragging latency (less buggy on mobile, but resizing still disabled)</div>
                        <div className="text-white">02/23/23 17:03 - SSE endpoint (live data) works now; Fixed nginx config</div>
                        <div className="text-white">02/22/23 - data now fetches via secure HTTPS connection through nginx that points to the localhost nodejs script. Only REST endpoints work, SSE times out randomly, sometimes connects. Currently fixing SSE reverse proxy </div>
                        <div className="text-white">02/21/23 - moved server to AWS EC2 because vercel doesn't support websockets/SSE, live updates via SSE not public yet, only REST calls are public (client stays on vercel)</div>
                        <div className={miniLog ? "bg-neutral-600" : "hidden"}>02/20/23 - SSE kept running locally due to Vercel not supporting websockets (live updates not available to public), will implement</div>
                        <div className="text-white">02/19/23 23:53 - deployed client and server to vercel</div>
                    </div>
                </div>
                {/* <div>Access to: Stocks, futures, cryptocurrencies</div> */}

                {/* <div className="italic text-xl pt-10 font-bold"> Frequently Asked Questions: </div>
                <div>Q: Why are latest prices different from other platforms?</div>
                <div>A: Prices are based on the latest sale price of the day including after-market, not before market close.</div>
                <br></br>
                <div>Q: Why are the price changes/open different than in x platforms?</div>
                <div>A: Price open is based on premarket price, not market open.</div> */}
                <img draggable={false} className="pt-[224px] max-md:top-[154px] md:top-[120px] max-md:w-[400px] md:w-[800px] absolute right-[50%] translate-x-1/2 select-none" src={demogif1} alt="gif" />

                {/* <div>Signup: 2 updates per second. Max 10 quotes on screen. </div>
                <div>Rollovers are taken care of.</div> */}
                <div className="mt-40 mb-0 select-none tracking-tighter text-white">© 2023 All Rights Reserved.</div>


                {/* 
<div className="absolute top-20 bg-blue-400 w-10 h-10 overflow-hidden resize">
    penis
    </div> */}



            </div>
        </>
    )
}

export default About;