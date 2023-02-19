import React from "react";
import demogif from '../photos/demogif.gif'

function About () {
    return (
        <>
            <div className="text-center pt-10 max-w-[600px] m-auto">
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
                <div className="italic text-xl pt-10 font-bold"> Features </div>
                <div>Free-tier: Real time quotes, you get the latest updates. Max 5 quotes on screen.</div>
                <div>Globex hours: 1 update every 5 seconds.</div>
                <div>Due to API costs, SSE streams time out after 10 minutes of inactivity on market open</div>
                {/* <div>Access to: Stocks, futures, cryptocurrencies</div> */}

                <div className="italic text-xl pt-10 font-bold"> Frequently Asked Questions: </div>
                <div>Q: Why are latest prices different from other platforms?</div>
                <div>A: Prices are based on the latest sale price of the day including after-market, not before market close.</div>
                <br></br>
                <div>Q: Why are the price changes/open different than in x platforms?</div>
                <div>A: Price open is based on premarket price, not market open.</div>
                <img src={demogif} alt="gif" />
                
                {/* <div>Signup: 2 updates per second. Max 10 quotes on screen. </div>
                <div>Rollovers are taken care of.</div> */}


                <div className="italic text-xl pt-10 font-bold"> Changelog: </div>
                <div>Launch day _______</div>


            </div>
        </>
    )
}

export default About;