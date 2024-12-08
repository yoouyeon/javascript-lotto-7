// @ts-check
import { Console } from '@woowacourse/mission-utils';
import LottoMachine from './LottoMachine.js';

/** @typedef {import('./Lotto.js').default} LottoType */

const OutputView = {
  /**
   * @param {LottoType[]} lottoes - 구매한 로또 목록
   */
  printPurchasedLottoes: (lottoes) => {
    Console.print(`${lottoes.length}개를 구매했습니다.`);
    lottoes.forEach((lotto) => Console.print(lotto.numbers));
  },

  /**
   * @param {number[]} winningResult - 당첨 결과
   */
  printWinningResult: (winningResult) => {
    Console.print('당첨 통계');
    Console.print('---');
    LottoMachine.winningTable.forEach((rank, index) =>
      Console.print(OutputView.winningResultFormat(rank, winningResult[index]))
    );
  },

  /**
   * @param {import('./type.js').winningTableType} rank - 당첨 등수
   * @param {number} winningCount - 당첨 갯수
   */
  winningResultFormat: (rank, winningCount) => {
    if (rank.bonusMatch) {
      return `${rank.matchCount}개 일치, 보너스 볼 일치 (${rank.prize.toLocaleString()}원)- ${winningCount}개`;
    }
    return `${rank.matchCount}개 일치 (${rank.prize.toLocaleString()}원)- ${winningCount}개`;
  },

  printNewLine: () => Console.print(''),
};

export default OutputView;
