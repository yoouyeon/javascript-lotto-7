// @ts-check

import { Random } from '@woowacourse/mission-utils';
import LOTTO_NUMBER_RULE from '../constants/LottoNumberRule.js';

class LottoNumberGenerator {
  /**
   * @returns {Array<number>}
   * @description 6개의 번호를 랜덤하게 생성하여 반환
   */
  static #pickNumbers() {
    return Random.pickUniqueNumbersInRange(
      LOTTO_NUMBER_RULE.MIN,
      LOTTO_NUMBER_RULE.MAX,
      LOTTO_NUMBER_RULE.LENGTH
    );
  }

  /**
   * @returns {Array<number>}
   * @description 6개의 번호를 랜덤하게 생성하여 오름차순으로 정렬하여 반환
   */
  static generate() {
    const randomNumbers = this.#pickNumbers();

    return randomNumbers.sort((a, b) => a - b);
  }
}

export default LottoNumberGenerator;
