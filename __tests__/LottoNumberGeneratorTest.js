import LottoNumberGenerator from '../src/domains/LottoNumberGenerator.js';

describe('로또 생성 테스트', () => {
  test('생성된 로또는 1~45까지의 중복되지 않은 숫자 6개가 오름차순으로 정렬된 배열이어야 한다.', () => {
    const lotto = LottoNumberGenerator.generate();
    expect(lotto.length).toBe(6);
    expect(lotto).toEqual(expect.arrayContaining([expect.any(Number)]));
    expect(new Set(lotto).size).toBe(6);
    expect(lotto.every((number) => number >= 1 && number <= 45)).toBe(true);
    expect(lotto).toEqual([...lotto].sort((a, b) => a - b));
  });
});
