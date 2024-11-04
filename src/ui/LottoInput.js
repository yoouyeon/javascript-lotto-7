import bonusNumberValidation from '../validations/bonusNumberValidation.js';
import purchaseValidation from '../validations/purchaseValidation.js';
import winningNumbersValidation from '../validations/winningNumbersValidation.js';
import Input from './Input.js';

class LottoInput extends Input {
  static #PURCHASE_MESSAGE = '로또 구입 금액을 입력해주세요. (1장: 1,000원)\n';

  static #WINNING_NUMBERS_MESSAGE = '당첨 번호를 입력해 주세요.\n';

  static #BONUS_NUMBER_MESSAGE = '보너스 번호를 입력해 주세요.\n';

  static async readTotalPurchaseCost() {
    const purchaseCost = Number(await super.readLine(this.#PURCHASE_MESSAGE));
    purchaseValidation.validate(purchaseCost);
    return purchaseCost;
  }

  static async readWinningNumbers() {
    const winningNumbers = (await super.readLine(this.#WINNING_NUMBERS_MESSAGE))
      .split(',')
      .map((number) => Number(number));
    winningNumbersValidation.validate(winningNumbers);
    return winningNumbers;
  }

  static async readBonusNumber(winningNumbers) {
    const bonusNumber = Number(
      await super.readLine(this.#BONUS_NUMBER_MESSAGE)
    );
    bonusNumberValidation.validate(bonusNumber, winningNumbers);

    return bonusNumber;
  }
}

export default LottoInput;
