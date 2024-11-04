import Lotto from '../../src/domains/Lotto.js';

describe('로또 클래스 테스트', () => {
  test('로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
    const INVALID_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6, 7];

    expect(() => new Lotto(INVALID_LOTTO_NUMBERS)).toThrow(/^\[ERROR\]/);
  });

  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    const INVALID_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 5];

    expect(() => new Lotto(INVALID_LOTTO_NUMBERS)).toThrow(/^\[ERROR\]/);
  });

  test('유효한 로또 번호를 입력하면 로또 객체가 생성된다.', () => {
    const VALID_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const EXPECTED_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

    const lotto = new Lotto(VALID_LOTTO_NUMBERS);

    expect(lotto.numbers).toEqual(EXPECTED_LOTTO_NUMBERS);
  });
});
