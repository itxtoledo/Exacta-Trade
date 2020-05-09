import * as ti from "technicalindicators";
import moment from "moment";
// import drawCandleStick from "draw-candlestick";
import Binance from "binance-api-node";
import Candle from "./models/Candle";
import _ from "lodash";

const binance = Binance({
  apiKey: process.env.BINANCE_APIKEY,
  apiSecret: process.env.BINANCE_APISECRET,
});

// confiavel 5m e 10 candles
var microsec = Date.now();
var frameTime = "5m";
var assetName = "BTC";
var marketName = "USDT";

// binance.candles(
//   assetName + marketName,
//   frameTime,
//   (error, ticks) => {
//     var open = [];
//     var high = [];
//     var low = [];
//     var close = [];
//     for (let i = 0; i < ticks.length; i++) {
//       open.push(ticks[i][1]);
//       high.push(ticks[i][2]);
//       low.push(ticks[i][3]);
//       close.push(ticks[i][4]);
//     }

//     candles = {
//       open,
//       high,
//       low,
//       close,
//     };
//     // var result = ti.bullish(candles);
//     // console.log('Is Bullish : '+ result);
//     console.log("Bullish:", ti.bullish(candles));
//     // var imageBuffer = drawCandleStick(candles);
//     // fs.writeFileSync('candles.png', imageBuffer);
//   },
//   { limit: 300, endTime: microsec }
// );

// console.log(Candle.findAll());
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

console.log(moment("2018-01-01").valueOf());
