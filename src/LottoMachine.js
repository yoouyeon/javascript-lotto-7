// @ts-check
import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import NumberChecker from './NumberChecker.js';

const LottoMachine = {
  /** @type {import('./type.js').winningTableType[]} */
  winningTable: [
    { rank: 5, matchCount: 3, prize: 5_000 },
    { rank: 4, matchCount: 4, prize: 50_000 },
    { rank: 3, matchCount: 5, prize: 1_500_000 },
    { rank: 2, matchCount: 5, bonusMatch: true, prize: 30_000_000 },
    { rank: 1, matchCount: 6, prize: 2_000_000_000 },
  ],
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

  /**
   * @param {Lotto[]} purchasedLottoes - 구매한 로또들
   * @param {number[]} winningNumbers - 당첨 번호
   * @param {number} bonusNumber - 보너스 번호
   * @returns {number[]} - 당첨 결과 배열 [등수별 당첨 횟수]
   */
  getWinningResult(purchasedLottoes, winningNumbers, bonusNumber) {
    const winningResult = Array.from({ length: this.winningTable.length }, () => 0);
    purchasedLottoes.forEach((lotto) => {
      const rank = lotto.getRank(winningNumbers, bonusNumber, this.winningTable);
      if (rank) winningResult[this.winningTable.length - rank] += 1;
    });
    return winningResult;
  },
};

export default LottoMachine;
