// @ts-check

import lottoNumberValidation from '../validations/lottoNumberValidation.js';

class Lotto {
  #numbers;

  /**
   * @constructor
   * @param {Array<number>} numbers
   */
  constructor(numbers) {
    lottoNumberValidation.validate(numbers);
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
