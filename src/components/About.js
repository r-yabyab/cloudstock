import React from "react";

function About () {
    return (
        <>
            <div className="text-center pt-10 max-w-[600px] m-auto">
                <div className="italic text-xl font-bold"> About Stock Shapes </div>
                {/* <div>Looking for a hassle-free way to view real-time stock quotes? Our website offers a clean and easy-to-use interface where you can access quotes without signing up. With the ability to resize and reposition quotes on the page, you'll have a personalized experience. And if you need more frequent updates, simply sign up for a free account. Get straight to the information you need, no fuss, no distraction. Try it now.</div> */}
                <div>A quick and accessible way to look at stock quotes.</div>
                <div>No need to download or login!</div>
                <br></br>
                <div>Use it to aid your trading sessions or use as a widget by resizing the page.</div>
                <div>Inspired by the live DOM from tradovate. I loved seeing the numbers go bananas during open session</div>

                <div className="italic text-xl pt-10 font-bold"> Features </div>
                <div>No sign up: 1 update per 1 second per quote. Max 10 quotes on screen</div>
                <div>Signup: 2 updates per second. Max 10 quotes on screen. </div>
                <div>Rollovers are taken care of.</div>
            
            </div>
        </>
    )
}

export default About;