import App from './App.js';
import mockQuestions from './mockQuestions.js';

describe('로또 발매기 테스트', () => {
  describe('구입 금액 입력 테스트', () => {
    test.each([
      { input: '1000a', case: '숫자가 아닌 경우' },
      { input: '999', case: '1000원 이하인 경우' },
      { input: '1500', case: '1000원 단위가 아닌 경우' },
    ])('유효하지 않은 구입 금액을 입력하는 경우 에러를 던진다.($case)', async (input) => {
      // given
      mockQuestions([input]);

      // when, then
      expect(App.readPurchaseAmount()).rejects.toThrow('[ERROR]');
    });

    test('유효한 구입 금액을 입력하는 경우 구입 금액을 반환한다.', async () => {
      // given
      const validInput = '2000';
      const validInputNumber = 2000;
      mockQuestions([validInput]);

      // when
      const purchaseAmount = await App.readPurchaseAmount();

      // then
      expect(purchaseAmount).toBe(validInputNumber);
    });
  });
});
