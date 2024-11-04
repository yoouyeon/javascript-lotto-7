import LottoNumberGenerator from '../../src/domains/LottoNumberGenerator.js';

describe('로또 번호 생성 테스트', () => {
  test('로또 번호는 6개의 숫자로 이루어져야 한다.', () => {
    const lotto = LottoNumberGenerator.generate();
    expect(lotto.length).toBe(6);
  });

  test('로또 번호는 1~45 사이의 숫자로 이루어져야 한다.', () => {
    const lotto = LottoNumberGenerator.generate();
    expect(lotto.every((number) => number >= 1 && number <= 45)).toBe(true);
  });

  test('로또 번호는 중복되지 않아야 한다.', () => {
    const lotto = LottoNumberGenerator.generate();
    expect(new Set(lotto).size).toBe(lotto.length);
  });

  test('로또 번호는 오름차순으로 정렬되어야 한다.', () => {
    const lotto = LottoNumberGenerator.generate();
    expect(lotto).toEqual([...lotto].sort((a, b) => a - b));
  });
});
