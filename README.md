Frontend for https://stockshapes-client.vercel.app/

Stock Shapes is a stock tracking website that gives users up to 5 stocks to track prices in real time. Data is pulled from IEX Cloud through Investors Exchange which handles around 2.3% of the daily U.S. equities market volume coming at 5th largest, just before Members Exchange (3.2%), CBOE (12.83%), NASDAQ (16.39%), and NYSE (19.50%, #1 largest) pulled from cboe.com.

Stock quotes are fetched by a single REST API call that sets the ticker and opening price that's used for displaying the market session's price change, in which an SSE stream feeds live price data and stock size traded. When the markets are closed, SSE streams are closed and the latest price and price changes are available.