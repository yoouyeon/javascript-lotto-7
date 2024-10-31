import Output from './Output.js';

class LottoOutput extends Output {
  static #STATISTICS_HEADER_MESSAGE = '당첨 통계\n---';

  static #LOTTO_AMOUNT_MESSAGE = (amount) => `로또 ${amount}개를 구매했습니다.`;

  static #LOTTO_NUMBERS_FORMAT = (numbers) =>
    `[${numbers.sort((a, b) => a - b).join(', ')}]`;

  static #STATISTICS_FORMAT = (resultDescription, winningMoney, count) =>
    `${resultDescription} (${winningMoney.toLocaleString()}원) - ${count}개`;

  static #YIELD_FORMAT = (yieldRate) =>
    `총 수익률은 ${yieldRate.toFixed(1)}%입니다.`;

  static printPurchasedLotto(lottos) {
    super.print(this.#LOTTO_AMOUNT_MESSAGE(lottos.length));
    lottos.forEach((lotto) => super.print(this.#LOTTO_NUMBERS_FORMAT(lotto)));
  }

  static printResult(statistics, yieldRate) {
    this.#printStatistics(statistics);
    super.printNewLine();
    super.print(this.#YIELD_FORMAT(yieldRate));
  }

  static #printStatistics(statistics) {
    super.print(this.#STATISTICS_HEADER_MESSAGE);
    statistics.forEach(({ description, winningMoney, count }) =>
      super.print(this.#STATISTICS_FORMAT(description, winningMoney, count))
    );
  }
}

export default LottoOutput;
