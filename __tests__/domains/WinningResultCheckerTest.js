import WinningResultChecker from '../../src/domains/WinningResultChecker.js';
import Lotto from '../../src/domains/Lotto.js';

describe('로또 결과 테스트', () => {
  const makeFakeLotto = (numbers) => new Lotto(numbers);

  const WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];
  const BONUS_NUMBER = 7;
  const LOTTO_RESULT = new WinningResultChecker(WINNING_NUMBERS, BONUS_NUMBER);

  test.each([
    { input: [1, 2, 3, 4, 5, 6], expected: '1st' },
    { input: [1, 2, 3, 4, 5, 7], expected: '2nd' },
    { input: [1, 2, 3, 4, 5, 8], expected: '3rd' },
    { input: [1, 2, 3, 4, 8, 9], expected: '4th' },
    { input: [1, 2, 3, 8, 9, 10], expected: '5th' },
    { input: [1, 2, 8, 9, 10, 11], expected: null },
    { input: [1, 8, 9, 10, 11, 12], expected: null },
    { input: [8, 9, 10, 11, 12, 13], expected: null },
  ])('로또가 $input 일 때, $expected 를 반환한다.', ({ input, expected }) => {
    const fakeLotto = makeFakeLotto(input);

    const result = LOTTO_RESULT.getResult(fakeLotto);

    expect(result).toEqual(expected);
  });

  test('로또 결과 배열을 반환한다.', () => {
    const fakeLottos = [
      makeFakeLotto([1, 2, 3, 4, 5, 6]),
      makeFakeLotto([1, 2, 3, 4, 5, 7]),
      makeFakeLotto([1, 2, 3, 4, 5, 8]),
      makeFakeLotto([1, 2, 3, 4, 8, 9]),
      makeFakeLotto([1, 2, 3, 8, 9, 10]),
      makeFakeLotto([1, 2, 8, 9, 10, 11]),
    ];

    const result = LOTTO_RESULT.getTotalResult(fakeLottos);

    expect(result).toEqual(['1st', '2nd', '3rd', '4th', '5th', null]);
  });
});
