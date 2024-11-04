import LottoInput from './ui/LottoInput.js';
import LottoOutput from './ui/LottoOutput.js';
import LottoPurchaseManager from './domains/LottoPurchaseManager.js';
import WinningResultChecker from './domains/WinningResultChecker.js';
import LottoStatistics from './domains/LottoStatistics.js';
import retryAsyncWithLog from './utils/retryAsyncWithLog.js';

class LottoMachine {
  #totalPurchaseCost;

  #purchasedLottos;

  #winningResultChecker;

  constructor() {
    this.#totalPurchaseCost = 0;
    this.#purchasedLottos = [];
    this.#winningResultChecker = null;
  }

  async run() {
    await this.#purchase();
    await this.#createWinningResultChecker();
    this.#getWinningResult();
  }

  async #purchase() {
    const { lottos, purchaseCost } = await LottoPurchaseManager.purchase();
    this.#totalPurchaseCost = purchaseCost;
    this.#purchasedLottos = lottos;
    LottoOutput.printPurchasedLotto(this.#purchasedLottos);
  }

  async #createWinningResultChecker() {
    const winningNumbers = await retryAsyncWithLog(
      LottoInput.readWinningNumbers.bind(LottoInput)
    );
    const bonusNumber = await retryAsyncWithLog(() =>
      LottoInput.readBonusNumber.bind(LottoInput)(winningNumbers)
    );
    this.#winningResultChecker = new WinningResultChecker(
      winningNumbers,
      bonusNumber
    );
  }

  #getWinningResult() {
    const result = this.#winningResultChecker.getTotalResult(
      this.#purchasedLottos
    );
    const winningStats = LottoStatistics.getWinningStats(result);
    const profitRate = LottoStatistics.getProfitRate(
      this.#totalPurchaseCost,
      result
    );
    LottoOutput.printResult(winningStats, profitRate);
  }
}

export default LottoMachine;
