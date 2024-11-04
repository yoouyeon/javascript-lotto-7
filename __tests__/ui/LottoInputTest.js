import LottoInput from '../../src/ui/LottoInput.js';
import mockQuestions from '../../src/utils/mockQuestions.js';
import CustomError from '../../src/utils/CustomError.js';

describe('로또 입력 테스트', () => {
  describe('구매 금액 입력 테스트', () => {
    test('유효한 금액을 입력하면 에러 없이 숫자로 변환된 입력값을 반환한다.', async () => {
      const VALID_COST = '1000';
      const EXPECTED = 1000;
      mockQuestions([VALID_COST]);

      const result = await LottoInput.readTotalPurchaseCost();

      expect(result).toBe(EXPECTED);
    });

    test('유효하지 않은 금액을 입력하면 CustomError를 던진다.', () => {
      const INVALID_COST = '500';
      mockQuestions([INVALID_COST]);

      expect(async () => {
        await LottoInput.readTotalPurchaseCost();
      }).rejects.toThrow(CustomError);
    });
  });

  describe('당첨 번호 입력 테스트', () => {
    test('유효한 번호를 입력하면 에러 없이 숫자로 변환한 배열을 반환한다.', async () => {
      const VALID_NUMBERS = '1,2,3,4,5,6';
      const EXPECTED = [1, 2, 3, 4, 5, 6];
      mockQuestions([VALID_NUMBERS]);

      const result = await LottoInput.readWinningNumbers();

      expect(result).toEqual(EXPECTED);
    });

    test('유효하지 않은 번호를 입력하면 CustomError를 던진다.', () => {
      const INVALID_NUMBERS = '1,2,3,4,4,5';
      mockQuestions([INVALID_NUMBERS]);

      expect(async () => {
        await LottoInput.readWinningNumbers();
      }).rejects.toThrow(CustomError);
    });
  });

  describe('보너스 번호 입력 테스트', () => {
    const WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];

    test('유효한 보너스 번호를 입력하면 에러 없이 숫자로 변환된 입력값을 반환한다.', async () => {
      const VALID_BONUS_NUMBER = '7';
      const EXPECTED = 7;
      mockQuestions([VALID_BONUS_NUMBER]);

      const result = await LottoInput.readBonusNumber(WINNING_NUMBERS);

      expect(result).toBe(EXPECTED);
    });

    test('유효하지 않은 보너스 번호를 입력하면 CustomError를 던진다.', async () => {
      const INVALID_BONUS_NUMBER = '6';
      mockQuestions([INVALID_BONUS_NUMBER]);

      expect(async () => {
        await LottoInput.readBonusNumber(WINNING_NUMBERS);
      }).rejects.toThrow(CustomError);
    });
  });
});
