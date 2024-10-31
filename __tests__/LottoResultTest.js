import { LOTTO_WINNER_RANK, LottoResult } from '../src/domains/LottoResult.js';
import Lotto from '../src/Lotto.js';

describe('로또 결과 테스트', () => {
  const makeFakeLotto = (numbers) => new Lotto(numbers);

  test.each([
    { input: [1, 2, 3, 4, 5, 6], expected: LOTTO_WINNER_RANK.FIRST },
    { input: [1, 2, 3, 4, 5, 7], expected: LOTTO_WINNER_RANK.SECOND },
    { input: [1, 2, 3, 4, 5, 8], expected: LOTTO_WINNER_RANK.THIRD },
    { input: [1, 2, 3, 4, 8, 9], expected: LOTTO_WINNER_RANK.FOURTH },
    { input: [1, 2, 3, 8, 9, 10], expected: LOTTO_WINNER_RANK.FIFTH },
    { input: [1, 2, 8, 9, 10, 11], expected: null },
    { input: [1, 8, 9, 10, 11, 12], expected: null },
    { input: [8, 9, 10, 11, 12, 13], expected: null },
  ])('로또가 $input 일 때, $expected 를 반환한다.', ({ input, expected }) => {
    const lottoResult = new LottoResult([1, 2, 3, 4, 5, 6], 7);
    const fakeLotto = makeFakeLotto(input);
    const result = lottoResult.getLottoResult(fakeLotto);
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
    expect(result).toEqual([
      LOTTO_WINNER_RANK.FIRST,
      LOTTO_WINNER_RANK.SECOND,
      LOTTO_WINNER_RANK.THIRD,
      LOTTO_WINNER_RANK.FOURTH,
      LOTTO_WINNER_RANK.FIFTH,
      null,
    ]);
  });
});
