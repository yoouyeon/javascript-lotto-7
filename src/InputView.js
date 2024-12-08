import { Console } from '@woowacourse/mission-utils';

const InputView = {
  PURCHASE_MESSAGE: '구입금액을 입력해주세요.\n',
  WINNING_NUMBER_MESSAGE: '당첨 번호를 입력해 주세요.\n',
  BONUS_NUMBER_MESSAGE: '보너스 번호를 입력해 주세요.\n',

  async readPurchaseAmount() {
    const input = await Console.readLineAsync(this.PURCHASE_MESSAGE);
    return parseInt(input, 10);
  },
};

export default InputView;
