import { Random } from '@woowacourse/mission-utils';
import LOTTO_NUMBER_RULE from '../constants/LottoNumberRule.js';

class LottoNumberGenerator {
  static #pickNumbers() {
    const uniqueNumbers = Random.pickUniqueNumbersInRange(
      LOTTO_NUMBER_RULE.MIN,
      LOTTO_NUMBER_RULE.MAX,
      LOTTO_NUMBER_RULE.LENGTH
    );
    return uniqueNumbers.sort((a, b) => a - b);
  }

  static generate() {
    return this.#pickNumbers();
  }
}

export default LottoNumberGenerator;
