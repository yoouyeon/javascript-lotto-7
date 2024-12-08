// @ts-check

import CustomError from './CustomError.js';
import NumberChecker from './NumberChecker.js';

class Lotto {
  static PRICE = 1000;

  #numbers;

  /**
   * @param {(number)[]} numbers
   */
  constructor(numbers) {
    Lotto.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  /**
   * @return {string} - 로또 번호를 문자열로 반환
   */
  get numbers() {
    return `[${this.#numbers.join(', ')}]`;
  }

  /**
   * @param {(number)[]} numbers
   */
  static #validate(numbers) {
    if (NumberChecker.isTooLong(numbers)) throw new CustomError(NumberChecker.LONG_ERROR);
    if (NumberChecker.hasDuplicated(numbers)) throw new CustomError(NumberChecker.DUPLICATED_ERROR);
    numbers.forEach((num) => {
      if (NumberChecker.isOutOfRange(num)) throw new CustomError(NumberChecker.RANGE_ERROR);
      if (!Number.isInteger(num)) throw new CustomError(NumberChecker.INTEGER_ERROR);
      if (Number.isNaN(num)) throw new CustomError(NumberChecker.NAN_ERROR);
    });
  }

  /**
   * @param {number[]} winningNumbers - 당첨 번호
   * @param {number} bonusNumber - 보너스 번호
   * @param {import('./type.js').winningTableType[]} winningTable - 당첨 테이블
   * @returns {number} - 로또의 등수 (0은 미당첨)
   */
  getRank(winningNumbers, bonusNumber, winningTable) {
    const matchCount = this.#numbers.filter((num) => winningNumbers.includes(num)).length;
    const isBonusMatch = this.#numbers.includes(bonusNumber);
    const winningRank = winningTable.find((rank) => {
      if (rank.matchCount === matchCount && rank.bonusMatch && isBonusMatch) return true;
      if (rank.matchCount === matchCount && !rank.bonusMatch && !isBonusMatch) return true;
      return false;
    });
    return winningRank?.rank || 0;
  }
}

export default Lotto;
