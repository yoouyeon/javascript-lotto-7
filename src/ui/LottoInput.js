// @ts-check

import bonusNumberValidation from '../validations/bonusNumberValidation.js';
import purchaseValidation from '../validations/purchaseValidation.js';
import winningNumbersValidation from '../validations/winningNumbersValidation.js';
import Input from './Input.js';

class LottoInput extends Input {
  static #PURCHASE_MESSAGE = '로또 구입 금액을 입력해주세요. (1장: 1,000원)\n';

  static #WINNING_NUMBERS_MESSAGE = '당첨 번호를 입력해 주세요.\n';

  static #BONUS_NUMBER_MESSAGE = '보너스 번호를 입력해 주세요.\n';

  /**
   * @returns {Promise<number>}
   * @description 구매 금액을 입력받아 유효성 검사를 수행한 후 반환한다.
   */
  static async readTotalPurchaseCost() {
    const purchaseCost = Number(await super.readLine(this.#PURCHASE_MESSAGE));
    purchaseValidation.validate(purchaseCost);
    return purchaseCost;
  }

  /**
   * @returns {Promise<Array<number>>}
   * @description 당첨 번호를 입력받아 유효성 검사를 수행한 후 반환한다.
   */
  static async readWinningNumbers() {
    const winningNumbers = (await super.readLine(this.#WINNING_NUMBERS_MESSAGE))
      .split(',')
      .map((number) => Number(number));
    winningNumbersValidation.validate(winningNumbers);
    return winningNumbers;
  }

  /**
   * @param {Array<number>} winningNumbers - 당첨 번호
   * @returns {Promise<number>}
   * @description 보너스 번호를 입력받아 유효성 검사를 수행한 후 반환한다.
   */
  static async readBonusNumber(winningNumbers) {
    const bonusNumber = Number(
      await super.readLine(this.#BONUS_NUMBER_MESSAGE)
    );
    bonusNumberValidation.validate(bonusNumber, winningNumbers);

    return bonusNumber;
  }
}

export default LottoInput;
