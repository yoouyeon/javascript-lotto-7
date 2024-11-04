import LottoPurchaseManager from '../../src/domains/LottoPurchaseManager.js';
import Lotto from '../../src/domains/Lotto.js';
import mockQuestions from '../../src/utils/mockQuestions.js';
import getLogSpy from '../../src/utils/getLogSpy.js';

describe('로또 구매 테스트', () => {
  describe('purchase 테스트', () => {
    const INVALID_INPUT = 'qwerty';
    const VALID_INPUT = '1000';

    test('유효하지 않은 금액을 입력하면 에러 메시지가 출력된다.', async () => {
      const logSpy = getLogSpy();
      mockQuestions([INVALID_INPUT, VALID_INPUT]);

      await LottoPurchaseManager.purchase();

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    });

    test('유효한 금액을 입력하면 로또를 생성하고 구매 금액과 생성한 로또 배열을 반환한다.', async () => {
      mockQuestions([VALID_INPUT]);
      const EXPECTED_COST = 1000;
      const EXPECTED_LOTTO_COUNT = 1;

      const { lottos, purchaseCost } = await LottoPurchaseManager.purchase();

      expect(purchaseCost).toBe(EXPECTED_COST);
      expect(lottos.length).toBe(EXPECTED_LOTTO_COUNT);
      expect(lottos.every((lotto) => lotto instanceof Lotto)).toBe(true);
    });
  });

  describe('createLottos 테스트', () => {
    test.each([
      { input: 1000, expected: 1 },
      { input: 2000, expected: 2 },
    ])(
      '$input원으로 $expected개의 로또를 생성한다.',
      async ({ input, expected }) => {
        const lottos = LottoPurchaseManager.createLottos(input);

        expect(lottos.length).toBe(expected);
        expect(lottos.every((lotto) => lotto instanceof Lotto)).toBe(true);
      }
    );
  });
});
