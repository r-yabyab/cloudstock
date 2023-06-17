Frontend for https://stockshapes-client.vercel.app/

Stock Shapes is a stock tracking website that gives users access to trade-executed prices based on Investor's Exchange during open-market hours. Quotes can be resized within the browser. Also mobile friendly. It's a good way to view market sentiment while trading securities because the prices are based on trade-execution, whereas other stock trackers like yahoo finance or tradingview aren't transparent with their data providers.

Due to the recent iexcloud.io platform switch, data has been split between iexcloud.io and finnhub.io. Iexcloud data provides the ticker info and live open-market data. Finnhub.io provides the closing price that gives us the price change during open-market-- During market close, it provides the price and price change through individual REST calls.

![alt text](https://i.gyazo.com/3de5969d12d6f4b89a5f7d29442d5519.png)

The backend is hosted through an EC2 instance. I moved it away from Vercel because serverless doesn't support websockets out the box.

Position data is stored on the browser through local storage.