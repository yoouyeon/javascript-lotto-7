import CustomError from './CustomError.js';
import InputView from './InputView.js';
import retryInput from './retryInput.js';

class App {
  // eslint-disable-next-line class-methods-use-this
  async run() {
    // eslint-disable-next-line no-unused-vars
    const purchaseAmount = await retryInput(App.readPurchaseAmount);
  }

  static async readPurchaseAmount() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    App.#validatePurchaseAmount(purchaseAmount);
    return purchaseAmount;
  }

  /**
   * @param {number} purchaseAmount - 구입 금액
   */
  static #validatePurchaseAmount(purchaseAmount) {
    if (Number.isNaN(purchaseAmount)) throw new CustomError('구입 금액은 숫자여야 합니다.');
    if (purchaseAmount <= 1000) throw new CustomError('구입 금액은 1000원 이상이어야 합니다.');
    if (purchaseAmount % 1000 !== 0) throw new CustomError('구입 금액은 1000원 단위여야 합니다.');
  }
}

export default App;
