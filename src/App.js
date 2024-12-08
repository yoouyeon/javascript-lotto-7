// @ts-check
import CustomError from './CustomError.js';
import InputView from './InputView.js';
import retryInput from './retryInput.js';
import NumberChecker from './NumberChecker.js';
import LottoMachine from './LottoMachine.js';

/** @typedef {import('./Lotto.js').default} LottoType */

class App {
  /** @type {LottoType[]} */
  #purchasedLottoes = [];

  /** @type {number[]} */
  #winningNumbers = [];

  /** @type {number} */
  #bonusNumber = 0;

  async run() {
    const purchaseAmount = await retryInput(App.readPurchaseAmount);
    this.#purchasedLottoes = LottoMachine.purchaseLottoes(purchaseAmount);
    this.#winningNumbers = await retryInput(App.readWinningNumbers);
    this.#bonusNumber = await retryInput(() => App.readBonusNumber(this.#winningNumbers));
  }

  /**
   * @returns {Promise<number>} - 구입 금액
   */
  static async readPurchaseAmount() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    App.#validatePurchaseAmount(purchaseAmount);
    return purchaseAmount;
  }

  /**
   * @param {number} purchaseAmount - 입력된 구입 금액
   */
  static #validatePurchaseAmount(purchaseAmount) {
    if (Number.isNaN(purchaseAmount)) throw new CustomError('구입 금액은 숫자여야 합니다.');
    if (purchaseAmount < 1000) throw new CustomError('구입 금액은 1000원 이상이어야 합니다.');
    if (purchaseAmount % 1000 !== 0) throw new CustomError('구입 금액은 1000원 단위여야 합니다.');
  }

  /**
   * @returns {Promise<number[]>} - 당첨 번호
   */
  static async readWinningNumbers() {
    const winningNumbers = await InputView.readWinningNumbers();
    App.#validateWinningNumbers(winningNumbers);
    return winningNumbers;
  }

  /**
   * @param {number[]} winningNumbers - 입력된 당첨 번호
   */
  static #validateWinningNumbers(winningNumbers) {
    if (NumberChecker.isTooLong(winningNumbers)) throw new CustomError(NumberChecker.LONG_ERROR);
    if (NumberChecker.hasDuplicated(winningNumbers))
      throw new CustomError(NumberChecker.DUPLICATED_ERROR);
    winningNumbers.forEach((number) => {
      if (NumberChecker.isOutOfRange(number)) throw new CustomError(NumberChecker.RANGE_ERROR);
      if (NumberChecker.isNotInteger(number)) throw new CustomError(NumberChecker.INTEGER_ERROR);
      if (NumberChecker.isNotANumber(number)) throw new CustomError(NumberChecker.NAN_ERROR);
    });
  }

  /**
   * @param {number[]} winningNumbers - 당첨 번호
   * @return {Promise<number>} - 보너스 번호
   */
  static async readBonusNumber(winningNumbers) {
    const bonusNumber = await InputView.readBonusNumber();
    App.#validateBonusNumber(bonusNumber, winningNumbers);
    return bonusNumber;
  }

  /**
   * @param {number} bonusNumber - 입력된 보너스 번호
   * @param {number[]} winningNumbers - 당첨 번호
   */
  static #validateBonusNumber(bonusNumber, winningNumbers) {
    if (NumberChecker.isOutOfRange(bonusNumber)) throw new CustomError(NumberChecker.RANGE_ERROR);
    if (NumberChecker.isNotInteger(bonusNumber)) throw new CustomError(NumberChecker.INTEGER_ERROR);
    if (NumberChecker.isNotANumber(bonusNumber)) throw new CustomError(NumberChecker.NAN_ERROR);
    if (winningNumbers.includes(bonusNumber))
      throw new CustomError('보너스 번호는 당첨 번호와 중복될 수 없습니다.');
  }
}

export default App;
