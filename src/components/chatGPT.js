import React, { useState } from 'react';

const StockApp = () => {
    const [quotes, setQuotes] = useState([
      { name: 'AAPL', },
      { name: 'GOOG',},
      { name: 'TSLA', },
      { name: 'MSFT',},
      { name: 'FB'},
    //   { name: 'AAPL', top: 0, left: 0, zIndex: 5 },
    //   { name: 'GOOG', top: 50, left: 50, zIndex: 4 },
    //   { name: 'TSLA', top: 100, left: 100, zIndex: 3 },
    //   { name: 'MSFT', top: 150, left: 150, zIndex: 2 },
    //   { name: 'FB', top: 200, left: 200, zIndex: 1 },
    ]);
    const [pressed, setPressed] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);
  
    const handleMouseDown = (index) => {
      setPressed(true);
      setSelectedQuote(index);
    //   quotes[index].zIndex = 6;
    //   setQuotes([...quotes]);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
    };
  
    const handleMouseUp = () => {
      setPressed(false);
    //   quotes[selectedQuote].zIndex = 5;
    //   setQuotes([...quotes]);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  
    const handleMouseMove = (event) => {
      quotes[selectedQuote].top = event.clientY;
      quotes[selectedQuote].left = event.clientX;
      setQuotes([...quotes]);
    };
  
    return (
      <div
        style={{ height: '100vh', width: '100vw' }}
      >
        {quotes.map((quote, index) => (
          <div
            key={quote.name}
            onMouseDown={() => handleMouseDown(index)}
            style={{
              position: 'absolute',
              top: quote.top,
              left: quote.left,
            //   zIndex: quote.zIndex,
              backgroundColor: 'white',
              padding: 20,
              border: '1px solid black',
            }}
            className=" select-none"
          >
            {quote.name}
          </div>
        ))}
      </div>
    );
  };
  
  

export default StockApp;