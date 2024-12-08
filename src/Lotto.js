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
}

export default Lotto;
