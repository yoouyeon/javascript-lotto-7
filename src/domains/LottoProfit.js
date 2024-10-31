const PERCENT_MULTIPLIER = 100;
const DECIMAL_PLACES = 1;

const roundToDecimalPlaces = (number, decimalPlaces) =>
  Math.round(number * 10 ** decimalPlaces) / 10 ** decimalPlaces;

const LottoProfit = Object.freeze({
  getRate: (lottoPrice, prizes) =>
    roundToDecimalPlaces(
      (LottoProfit.getTotal(prizes) / lottoPrice) * PERCENT_MULTIPLIER,
      DECIMAL_PLACES
    ),
  getTotal: (prizes) => prizes.reduce((acc, prize) => acc + prize, 0),
});

export default LottoProfit;
