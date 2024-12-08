import CustomError from './CustomError.js';
import InputView from './InputView.js';
import retryInput from './retryInput.js';
import NumberChecker from './NumberChecker.js';

class App {
  // eslint-disable-next-line class-methods-use-this
  async run() {
    // eslint-disable-next-line no-unused-vars
    const purchaseAmount = await retryInput(App.readPurchaseAmount);
    // eslint-disable-next-line no-unused-vars
    const winningNumbers = await retryInput(App.readWinningNumbers);
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
}

export default App;
