import Lotto from '../src/Lotto.js';
import LottoMachine from '../src/LottoMachine.js';

describe('로또 클래스 테스트', () => {
  test('로또 번호의 개수가 6개 이하이면 예외가 발생한다.', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Lotto([1, 2, 3, 4, 5]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR]');
  });

  test.each([
    { input: [0, 2, 3, 4, 5, 6], case: '1보다 작은 숫자' },
    { input: [1, 2, 3, 4, 5, 46], case: '45보다 큰 숫자' },
  ])('로또 번호에 $case가 있으면 예외가 발생한다.', ({ input }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Lotto(input);
    }).toThrow('[ERROR]');
  });

  test('로또 번호가 정수가 아니면 예외가 발생한다.', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Lotto([1, 2, 3, 4, 5, 6.5]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호가 숫자가 아니면 예외가 발생한다.', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Lotto([1, 2, 3, 4, 5, '6a']);
    }).toThrow('[ERROR]');
  });

  test('로또 번호가 모든 조건을 만족하면 에러가 발생하지 않는다.', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Lotto([1, 2, 3, 4, 5, 6]);
    }).not.toThrow();
  });

  test.each([
    { lottoNumbers: [1, 2, 3, 4, 5, 6], expectedRank: 1 },
    { lottoNumbers: [1, 2, 3, 4, 5, 7], expectedRank: 2 },
    { lottoNumbers: [1, 2, 3, 4, 5, 8], expectedRank: 3 },
    { lottoNumbers: [1, 2, 3, 4, 8, 9], expectedRank: 4 },
    { lottoNumbers: [1, 2, 3, 8, 9, 10], expectedRank: 5 },
    { lottoNumbers: [1, 7, 8, 9, 10, 11], expectedRank: 0 },
  ])('로또의 등수를 반환한다. ($expectedRank등)', ({ lottoNumbers, expectedRank }) => {
    // given
    const lotto = new Lotto(lottoNumbers);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    // when
    const rank = lotto.getRank(winningNumbers, bonusNumber, LottoMachine.winningTable);

    // then
    expect(rank).toBe(expectedRank);
  });
});
