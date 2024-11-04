// @ts-check

import Output from './Output.js';

/** @typedef {import ('../domains/Lotto.js').default} Lotto */

class LottoOutput extends Output {
  static #STATISTICS_HEADER_MESSAGE = '당첨 통계\n---';

  static #LOTTO_AMOUNT_MESSAGE = (amount) => `로또 ${amount}개를 구매했습니다.`;

  /**
   * @param {Array<number>} numbers - 로또 번호 배열
   * @returns {string}
   */
  static #LOTTO_NUMBERS_FORMAT = (numbers) =>
    `[${numbers.sort((a, b) => a - b).join(', ')}]`;

  /**
   * @param {string} resultDescription - 당첨 결과 설명
   * @param {number} winningMoney - 결과별 당첨금
   * @param {number} count - 당첨 갯수
   * @returns {string}
   */
  static #STATISTICS_FORMAT = (resultDescription, winningMoney, count) =>
    `${resultDescription} (${winningMoney.toLocaleString()}원) - ${count}개`;

  /**
   * @param {number} yieldRate - 수익률
   * @returns {string}
   */
  static #YIELD_FORMAT = (yieldRate) =>
    `총 수익률은 ${yieldRate.toFixed(1)}%입니다.`;

  /**
   * @param {Array<Lotto>} lottos - 구매한 로또 배열
   */
  static printPurchasedLotto(lottos) {
    super.print(this.#LOTTO_AMOUNT_MESSAGE(lottos.length));
    lottos.forEach((lotto) =>
      super.print(this.#LOTTO_NUMBERS_FORMAT(lotto.numbers))
    );
  }

  /**
   * @param {Array<import ('../types.js').LottoStatisticsType>} statistics
   * @param {number} yieldRate
   */
  static printResult(statistics, yieldRate) {
    this.#printStatistics(statistics);
    super.printNewLine();
    super.print(this.#YIELD_FORMAT(yieldRate));
  }

  /**
   * @param {Array<import ('../types.js').LottoStatisticsType>} statistics
   */
  static #printStatistics(statistics) {
    super.print(this.#STATISTICS_HEADER_MESSAGE);
    statistics.forEach(({ description, winningMoney, count }) =>
      super.print(this.#STATISTICS_FORMAT(description, winningMoney, count))
    );
  }
}

export default LottoOutput;
