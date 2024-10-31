import Input from './Input.js';

class LottoInput extends Input {
  static #BUY_MESSAGE = '로또 구입 금액을 입력해주세요. (1장: 1,000원)\n';

  static #WINNING_NUMBERS_MESSAGE = '당첨 번호를 입력해 주세요.\n';

  static #BONUS_NUMBER_MESSAGE = '보너스 번호를 입력해 주세요.\n';

  static async readBuyAmount() {
    return super.readLine(this.#BUY_MESSAGE);
  }

  static async readWinningNumbers() {
    return super.readLine(this.#WINNING_NUMBERS_MESSAGE);
  }

  static async readBonusNumber() {
    return super.readLine(this.#BONUS_NUMBER_MESSAGE);
  }
}

export default LottoInput;
