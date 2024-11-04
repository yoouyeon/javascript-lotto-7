import LottoInput from './ui/LottoInput.js';
import LottoOutput from './ui/LottoOutput.js';
import LottoPurchaseManager from './domains/LottoPurchaseManager.js';
import WinningResultChecker from './domains/WinningResultChecker.js';
import LottoStatistics from './domains/LottoStatistics.js';

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
    this.#totalPurchaseCost = await LottoInput.readTotalPurchaseCost();
    this.#purchasedLottos = LottoPurchaseManager.buy(this.#totalPurchaseCost);
    LottoOutput.printPurchasedLotto(this.#purchasedLottos);
  }

  async #createWinningResultChecker() {
    const winningNumbers = await LottoInput.readWinningNumbers();
    const bonusNumber = await LottoInput.readBonusNumber();
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
