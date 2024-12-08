// @ts-check

import CustomError from './CustomError.js';
import NumberChecker from './NumberChecker.js';

class Lotto {
  #numbers;

  /**
   * @param {(number)[]} numbers
   */
  constructor(numbers) {
    Lotto.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
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
