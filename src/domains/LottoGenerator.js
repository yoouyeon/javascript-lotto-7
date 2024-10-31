import { Random } from '@woowacourse/mission-utils';

class LottoGenerator {
  static #LOTTO_NUMBERS = Object.freeze({
    MIN: 1,
    MAX: 45,
    COUNT: 6,
  });

  static #pickNumbers() {
    const uniqueNumbers = Random.pickUniqueNumbersInRange(
      this.#LOTTO_NUMBERS.MIN,
      this.#LOTTO_NUMBERS.MAX,
      this.#LOTTO_NUMBERS.COUNT
    );
    return uniqueNumbers.sort((a, b) => a - b);
  }

  static generate() {
    return this.#pickNumbers();
  }
}

export default LottoGenerator;
