import moment from "moment";
import Binance from "binance-api-node";

const binance = Binance({
  apiKey: process.env.BINANCE_APIKEY,
  apiSecret: process.env.BINANCE_APISECRET,
});

binance
  .candles({
    symbol: "BTCUSDT",
    interval: "5m",
    startTime: moment("2019-01-01").valueOf(),
    endTime: moment("2019-12-31").valueOf(),
  })
  .then(async (res) => {
    for (let i = 0; i < res.length; i++) {
      const kline = res[i];

      await Candle.create(
        _.pick(kline, [
          "openTime",
          "closeTime",
          "open",
          "high",
          "low",
          "close",
          "volume",
          "trades",
        ])
      );
    }
  });
