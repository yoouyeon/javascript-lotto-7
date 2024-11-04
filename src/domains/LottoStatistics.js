// @ts-check
import LOTTERY_PRIZE_TABLE from '../constants/LotteryPrizeTable.js';

/**
 * @description 소수점 자리수까지 반올림한 숫자를 반환한다.
 * @param {number} number - 반올림할 숫자
 * @param {number} decimalPlaces - 표시할 소수점 자리수
 * @returns {number} - 소수점 자리수까지 반올림한 숫자
 */
const roundToDecimalPlaces = (number, decimalPlaces) =>
  Math.round(number * 10 ** decimalPlaces) / 10 ** decimalPlaces;

const LottoStatistics = Object.freeze({
  PERCENT_MULTIPLIER: 100,

  DECIMAL_PLACES: 1,

  /**
   * @param {Array<import ('../types.js').LottoResultType>} lottoResults - 로또 결과 배열
   * @returns {Array<import ('../types.js').LottoStatisticsType>}
   * @description 로또 결과 배열을 받아서 각 순위별 당첨 개수를 반환한다.
   */
  getWinningStats: (lottoResults) => {
    const winningStats = Object.entries(LOTTERY_PRIZE_TABLE).map(
      ([rank, prize]) => ({
        description: prize.description,
        winningMoney: prize.winningMoney,
        count: lottoResults.filter((result) => result === rank).length,
      })
    );
    return winningStats;
  },

  /**
   * @param {number} lottoPrice - 로또 구매 금액
   * @param {Array<import ('../types.js').LottoResultType>} lottoResults - 로또 결과 배열
   * @returns {number} - 수익률
   * @description 로또 구매 금액과 로또 결과 배열을 받아서 수익률을 계산하여 반환한다.
   */
  getProfitRate: (lottoPrice, lottoResults) => {
    const totalPrize = LottoStatistics.getTotalPrize(lottoResults);
    return roundToDecimalPlaces(
      (totalPrize / lottoPrice) * LottoStatistics.PERCENT_MULTIPLIER,
      LottoStatistics.DECIMAL_PLACES
    );
  },

  /**
   * @param {Array<import ('../types.js').LottoResultType>} lottoResults - 로또 결과 배열
   * @returns {number} - 총 상금
   * @description 로또 결과 배열을 받아서 총 상금을 반환한다.
   */
  getTotalPrize: (lottoResults) =>
    lottoResults.reduce((acc, result) => {
      if (result === null) {
        return acc;
      }
      return acc + LOTTERY_PRIZE_TABLE[result].winningMoney;
    }, 0),
});

export default LottoStatistics;
