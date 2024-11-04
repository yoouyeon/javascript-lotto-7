import Lotto from '../../src/domains/Lotto.js';
import LottoOutput from '../../src/ui/LottoOutput.js';
import getLogSpy from '../../src/utils/getLogSpy.js';

describe('로또 출력 테스트', () => {
  describe('로또 구매 출력 테스트', () => {
    test.each([
      {
        input: [new Lotto([1, 2, 3, 4, 5, 6])],
        expected: [['로또 1개를 구매했습니다.'], ['[1, 2, 3, 4, 5, 6]']],
      },
      {
        input: [new Lotto([6, 5, 4, 3, 2, 1])],
        expected: [['로또 1개를 구매했습니다.'], ['[1, 2, 3, 4, 5, 6]']],
      },
      {
        input: [new Lotto([1, 2, 3, 4, 5, 6]), new Lotto([1, 2, 3, 4, 5, 6])],
        expected: [
          ['로또 2개를 구매했습니다.'],
          ['[1, 2, 3, 4, 5, 6]'],
          ['[1, 2, 3, 4, 5, 6]'],
        ],
      },
    ])(
      '로또 구매 개수와 각 로또 번호를 오름차순으로 보여준다.',
      ({ input, expected }) => {
        const logSpy = getLogSpy();

        LottoOutput.printPurchasedLotto(input);

        expect(logSpy.mock.calls).toEqual(expected);
      }
    );
  });

  describe('로또 결과 출력 테스트', () => {
    test.each([
      {
        input: {
          statistics: [
            { description: '3개 일치', winningMoney: 5000, count: 2 },
          ],
          yieldRate: 100.0,
        },
        expected: [
          ['당첨 통계\n---'],
          ['3개 일치 (5,000원) - 2개'],
          [''],
          ['총 수익률은 100.0%입니다.'],
        ],
      },

      {
        input: {
          statistics: [
            { description: '3개 일치', winningMoney: 5000, count: 2 },
            { description: '4개 일치', winningMoney: 50000, count: 0 },
          ],
          yieldRate: 1000.001,
        },
        expected: [
          ['당첨 통계\n---'],
          ['3개 일치 (5,000원) - 2개'],
          ['4개 일치 (50,000원) - 0개'],
          [''],
          ['총 수익률은 1000.0%입니다.'],
        ],
      },

      {
        input: {
          statistics: [
            { description: '3개 일치', winningMoney: 5000, count: 2 },
            { description: '4개 일치', winningMoney: 50000, count: 0 },
            { description: '5개 일치', winningMoney: 1500000, count: 1 },
          ],
          yieldRate: 87.654,
        },
        expected: [
          ['당첨 통계\n---'],
          ['3개 일치 (5,000원) - 2개'],
          ['4개 일치 (50,000원) - 0개'],
          ['5개 일치 (1,500,000원) - 1개'],
          [''],
          ['총 수익률은 87.7%입니다.'],
        ],
      },
    ])(
      '당첨 내역과 소수점 둘째 자리에서 반올림한 수익률을 보여준다.',
      ({ input, expected }) => {
        const logSpy = getLogSpy();

        LottoOutput.printResult(input.statistics, input.yieldRate);

        expect(logSpy.mock.calls).toEqual(expected);
      }
    );
  });
});
