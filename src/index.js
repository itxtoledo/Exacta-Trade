import * as ti from "technicalindicators";
import Candle from "./models/Candle";
import _ from "lodash";

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

Candle.findAll().then((ticks) => {
  // console.log(ticks.length);
  const open = [];
  const high = [];
  const low = [];
  const close = [];
  for (let i = 0; i < ticks.length; i++) {
    open.push(ticks[i].open);
    high.push(ticks[i].high);
    low.push(ticks[i].low);
    close.push(ticks[i].close);
  }

  const candles = {
    open,
    high,
    low,
    close,
  };

  for (let i = 0; i < candles.close.length; i += 42) {
    console.log(i);
    const closes = candles.close.slice(i, i + 43);
    const EMA42 = ti.ema({ period: 42, values: closes });
    const EMA21 = ti.ema({ period: 21, values: closes });
    console.log("bullish", EMA21[EMA21.length - 1] > EMA42[EMA42.length - 1]);
  }

  // console.log("Bullish:", ti.bullish(candles));
});
