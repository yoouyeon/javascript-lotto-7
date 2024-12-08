import LottoMachine from './LottoMachine.js';

describe('로또 발행 테스트', () => {
  test.each([
    { amount: 1000, expected: 1 },
    { amount: 2000, expected: 2 },
    { amount: 8000, expected: 8 },
  ])('로또 구매 테스트 ($expected 개)', ({ amount, expected }) => {
    // when
    const lottos = LottoMachine.purchaseLottoes(amount);

    // then
    expect(lottos.length).toBe(expected);
  });

  test('로또 번호 생성 테스트', () => {
    // when
    const lottoNumbers = LottoMachine.generateLottoNumbers();
    const LOTTO_LENGTH = 6;
    const LOTTO_MIN_NUMBER = 1;
    const LOTTO_MAX_NUMBER = 45;

    // then
    expect(lottoNumbers.length).toBe(LOTTO_LENGTH);
    lottoNumbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(LOTTO_MIN_NUMBER);
      expect(number).toBeLessThanOrEqual(LOTTO_MAX_NUMBER);
    });
    expect(new Set(lottoNumbers).size).toBe(LOTTO_LENGTH);
  });
});
