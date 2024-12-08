import App from './App.js';
import mockQuestions from './mockQuestions.js';

describe('로또 발매기 테스트', () => {
  describe('구입 금액 입력 테스트', () => {
    test.each([
      { input: '1000a', case: '숫자가 아닌 경우' },
      { input: '999', case: '1000원 이하인 경우' },
      { input: '1500', case: '1000원 단위가 아닌 경우' },
    ])('유효하지 않은 구입 금액을 입력하는 경우 에러를 던진다.($case)', async ({ input }) => {
      // given
      mockQuestions([input]);

      // when, then
      expect(App.readPurchaseAmount()).rejects.toThrow('[ERROR]');
    });

    test('유효한 구입 금액을 입력하는 경우 구입 금액을 반환한다.', async () => {
      // given
      const validInput = '1000';
      const validInputNumber = 1000;
      mockQuestions([validInput]);

      // when
      const purchaseAmount = await App.readPurchaseAmount();

      // then
      expect(purchaseAmount).toBe(validInputNumber);
    });
  });

  describe('당첨 번호 입력 테스트', () => {
    test.each([
      { input: '1,2,3,4,5,6a', case: '숫자가 아닌 경우' },
      { input: '0,2,3,4,5,6', case: '0 이하의 값인 경우' },
      { input: '1,2,3,4,5,46', case: '45 이상의 값인 경우' },
      { input: '1,2,3,4,5,6,7', case: '7개 이상의 값인 경우' },
      { input: '1,2,3,4,5', case: '6개 미만의 값인 경우' },
      { input: '1,2,3,4,5,5', case: '중복된 값이 있는 경우' },
    ])('유효하지 않은 당첨 번호를 입력하는 경우 에러를 던진다.($case)', async ({ input }) => {
      // given
      mockQuestions([input]);

      // when, then
      expect(App.readWinningNumbers()).rejects.toThrow('[ERROR]');
    });

    test('유효한 당첨 번호를 입력하는 경우 로또 번호를 반환한다.', async () => {
      // given
      const validInput = '1,2,3,4,5,6';
      const validInputNumbers = [1, 2, 3, 4, 5, 6];
      mockQuestions([validInput]);

      // when
      const lottoNumbers = await App.readWinningNumbers();

      // then
      expect(lottoNumbers).toEqual(validInputNumbers);
    });
  });
});
