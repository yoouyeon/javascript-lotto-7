import LottoPurchase from '../src/domains/LottoPurchase.js';
import Lotto from '../src/Lotto.js';

describe('로또 구매 테스트', () => {
  test.each([
    { input: 1000, expected: 1 },
    { input: 2000, expected: 2 },
  ])(
    '$input원으로 $expected개의 로또를 구매할 수 있다.',
    ({ input, expected }) => {
      const lottos = LottoPurchase.buy(input);
      expect(lottos.length).toBe(expected);
      expect(lottos.every((lotto) => lotto instanceof Lotto)).toBe(true);
    }
  );
});
