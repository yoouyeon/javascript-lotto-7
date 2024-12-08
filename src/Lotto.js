// @ts-check

import CustomError from './CustomError.js';

const LOTTO_LENGTH = 6;
class Lotto {
  #numbers;

  /**
   * @param {(number)[]} numbers
   */
  constructor(numbers) {
    Lotto.#validate(numbers);
    this.#numbers = numbers;
  }

  /**
   * @param {(number)[]} numbers
   */
  static #validate(numbers) {
    if (numbers.length !== LOTTO_LENGTH) throw new CustomError('로또 번호는 6개여야 합니다.');
    if (new Set(numbers).size !== LOTTO_LENGTH)
      throw new CustomError('로또 번호는 중복되지 않아야 합니다.');
    numbers.forEach((number) => {
      if (number < 1 || number > 45) throw new CustomError('로또 번호는 1과 45 사이여야 합니다.');
      if (!Number.isInteger(number)) throw new CustomError('로또 번호는 정수여야 합니다.');
      if (Number.isNaN(number)) throw new CustomError('로또 번호는 숫자여야 합니다.');
    });
  }
}

export default Lotto;
