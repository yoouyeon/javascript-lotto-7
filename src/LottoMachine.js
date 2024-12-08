// @ts-check
import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import NumberChecker from './NumberChecker.js';

// 로또 구매 금액을 입력받아 로또를 발행하는 모듈
const LottoMachine = {
  /**
   * @param {number} purchaseAmount - 구매 금액
   * @returns {Lotto[]} - 구매한 로또들
   */
  purchaseLottoes(purchaseAmount) {
    const lottoCount = Math.floor(purchaseAmount / Lotto.PRICE);
    return Array.from({ length: lottoCount }, () => new Lotto(this.generateLottoNumbers()));
  },
  /**
   * @returns {number[]} - 로또 1개의 로또 번호
   */
  generateLottoNumbers() {
    return Random.pickUniqueNumbersInRange(
      NumberChecker.MIN,
      NumberChecker.MAX,
      NumberChecker.LENGTH
    );
  },
};

export default LottoMachine;
