// @ts-check
import { Console } from '@woowacourse/mission-utils';

/** @typedef {import('./Lotto.js').default} LottoType */

const OutputView = {
  /**
   * @param {LottoType[]} lottoes - 구매한 로또 목록
   */
  printPurchasedLottoes: (lottoes) => {
    Console.print(`${lottoes.length}개를 구매했습니다.`);
    lottoes.forEach((lotto) => Console.print(lotto.numbers));
  },

  printNewLine: () => Console.print(''),
};

export default OutputView;
