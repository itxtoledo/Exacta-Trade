var ti = require('technicalindicators');
var fs = require('fs');
var drawCandleStick = require('draw-candlestick');

var config = require('./config.json');

const binance = require('node-binance-api')().options({
  APIKEY: config.APIKEY,
  APISECRET: config.APISECRET,
  useServerTime: true
});

// confiavel 5m e 10 candles
var microsec = Date.now();
var frameTime = "5m";
var assetName = "BTC";
var marketName = "USDT";


binance.candlesticks(assetName + marketName, frameTime, (error, ticks) => {
  var open = [];
  var high = [];
  var low = [];
  var close = [];
  for (let i = 0; i < ticks.length; i++) {
    open.push(ticks[i][1]);
    high.push(ticks[i][2]);
    low.push(ticks[i][3]);
    close.push(ticks[i][4]);
  }

  candles = {
    open,
    high,
    low,
    close,
  }
  // var result = ti.bullish(candles);
  // console.log('Is Bullish : '+ result);  
  console.log('Bullish:',ti.bullish(candles));
  // var imageBuffer = drawCandleStick(candles);
  // fs.writeFileSync('candles.png', imageBuffer);
}, { limit: 300, endTime: microsec });

