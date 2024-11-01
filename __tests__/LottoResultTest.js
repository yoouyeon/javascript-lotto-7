import LottoResult from '../src/domains/LottoResult.js';
import Lotto from '../src/domains/Lotto.js';

describe('로또 결과 테스트', () => {
  const makeFakeLotto = (numbers) => new Lotto(numbers);

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
    const lottoResult = new LottoResult([1, 2, 3, 4, 5, 6], 7);
    const fakeLotto = makeFakeLotto(input);
    const result = lottoResult.getResult(fakeLotto);
    expect(result).toEqual(expected);
  });

  test('로또 결과 배열을 반환한다.', () => {
    const lottoResult = new LottoResult([1, 2, 3, 4, 5, 6], 7);
    const fakeLottos = [
      makeFakeLotto([1, 2, 3, 4, 5, 6]),
      makeFakeLotto([1, 2, 3, 4, 5, 7]),
      makeFakeLotto([1, 2, 3, 4, 5, 8]),
      makeFakeLotto([1, 2, 3, 4, 8, 9]),
      makeFakeLotto([1, 2, 3, 8, 9, 10]),
      makeFakeLotto([1, 2, 8, 9, 10, 11]),
    ];
    const result = lottoResult.getTotalResult(fakeLottos);
    expect(result).toEqual(['1st', '2nd', '3rd', '4th', '5th', null]);
  });
});
