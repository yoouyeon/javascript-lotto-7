// @ts-check
import LOTTERY_PRIZE_TABLE from '../constants/LotteryPrizeTable.js';
import bonusNumberValidation from '../validations/bonusNumberValidation.js';
import winningNumbersValidation from '../validations/winningNumbersValidation.js';

/** @typedef {import('./Lotto.js').default} Lotto */

class WinningResultChecker {
  #winningNumbers = [];

  #bonusNumber = 0;

  /**
   * @constructor
   * @param {Array<number>} winningNumbers - 당첨 번호
   * @param {number} bonusNumber - 보너스 번호
   */
  constructor(winningNumbers, bonusNumber) {
    winningNumbersValidation.validate(winningNumbers);
    bonusNumberValidation.validate({ bonusNumber, winningNumbers });
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  /**
   * @public
   * @param {Array<Lotto>} lottos
   * @returns {Array<(import('../types.js').LottoResultType)>} - 로또 결과 배열
   */
  getTotalResult(lottos) {
    return lottos.map((lotto) => this.getResult(lotto));
  }

  /**
   * @public
   * @param {Lotto} lotto
   * @returns {import('../types.js').LottoResultType} - 로또 결과 (당첨 또는 미당첨)
   */
  getResult = (lotto) => {
    const matchCount = this.#getMatchCount(lotto);
    const isBonusMatch = this.#isBonusMatch(lotto);
    return WinningResultChecker.#getRank(matchCount, isBonusMatch);
  };

  /**
   * @param {Lotto} lotto
   * @returns {number} - 당첨 번호와 일치하는 숫자의 개수
   */
  #getMatchCount = (lotto) =>
    lotto.numbers.filter((number) => this.#winningNumbers.includes(number))
      .length;

  /**
   * @param {Lotto} lotto
   * @returns {boolean} - 보너스 번호와 일치하는 숫자가 있는지 여부
   */
  #isBonusMatch = (lotto) => lotto.numbers.includes(this.#bonusNumber);

  /**
   * @param {number} matchCount - 당첨 번호와 일치하는 숫자의 개수
   * @param {boolean} isBonusMatch - 보너스 번호와 일치하는지 여부
   * @returns {import('../types.js').LottoResultType} - 로또 결과 (당첨 또는 미당첨)
   */
  static #getRank = (matchCount, isBonusMatch) => {
    const lottoRank = /** @type {import('../types.js').LottoResultType} */ (
      Object.keys(LOTTERY_PRIZE_TABLE).find(
        (rank) =>
          LOTTERY_PRIZE_TABLE[rank].matchCount === matchCount &&
          LOTTERY_PRIZE_TABLE[rank].bonusRequired === isBonusMatch
      ) || null
    );

    return lottoRank;
  };
}

export default WinningResultChecker;
