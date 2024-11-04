import LottoStatistics from '../../src/domains/LottoStatistics.js';
import LOTTERY_PRIZE_TABLE from '../../src/constants/LotteryPrizeTable.js';

describe('로또 통계 계산 테스트', () => {
  const {
    '1st': FIRST,
    '2nd': SECOND,
    '3rd': THIRD,
    '4th': FOURTH,
    '5th': FIFTH,
  } = LOTTERY_PRIZE_TABLE;

  test.each([
    {
      input: [null],
      expected: [
        {
          description: FIRST.description,
          winningMoney: FIRST.winningMoney,
          count: 0,
        },
        {
          description: SECOND.description,
          winningMoney: SECOND.winningMoney,
          count: 0,
        },
        {
          description: THIRD.description,
          winningMoney: THIRD.winningMoney,
          count: 0,
        },
        {
          description: FOURTH.description,
          winningMoney: FOURTH.winningMoney,
          count: 0,
        },
        {
          description: FIFTH.description,
          winningMoney: FIFTH.winningMoney,
          count: 0,
        },
      ],
    },
    {
      input: ['1st'],
      expected: [
        {
          description: FIRST.description,
          winningMoney: FIRST.winningMoney,
          count: 1,
        },
        {
          description: SECOND.description,
          winningMoney: SECOND.winningMoney,
          count: 0,
        },
        {
          description: THIRD.description,
          winningMoney: THIRD.winningMoney,
          count: 0,
        },
        {
          description: FOURTH.description,
          winningMoney: FOURTH.winningMoney,
          count: 0,
        },
        {
          description: FIFTH.description,
          winningMoney: FIFTH.winningMoney,
          count: 0,
        },
      ],
    },
    {
      input: ['1st', '2nd', '1st'],
      expected: [
        {
          description: FIRST.description,
          winningMoney: FIRST.winningMoney,
          count: 2,
        },
        {
          description: SECOND.description,
          winningMoney: SECOND.winningMoney,
          count: 1,
        },
        {
          description: THIRD.description,
          winningMoney: THIRD.winningMoney,
          count: 0,
        },
        {
          description: FOURTH.description,
          winningMoney: FOURTH.winningMoney,
          count: 0,
        },
        {
          description: FIFTH.description,
          winningMoney: FIFTH.winningMoney,
          count: 0,
        },
      ],
    },
  ])(
    '로또 결과가 $input 일 때 당첨 통계가 올바르게 계산된다.',
    ({ input, expected }) => {
      const result = LottoStatistics.getWinningStats(input);

      expect(result).toEqual(expected);
    }
  );

  test.each([
    { input: [null], expected: 0 },
    { input: ['1st'], expected: 2000000000 },
    { input: ['1st', '2nd', '1st'], expected: 4030000000 },
    { input: ['1st', '2nd', '3rd', '4th', '5th'], expected: 2031555000 },
  ])(
    '로또 결과가 $input 일 때 총 상금은 $expected 이다.',
    ({ input, expected }) => {
      const result = LottoStatistics.getTotalPrize(input);

      expect(result).toBe(expected);
    }
  );

  test.each([
    { lottoPrice: 5000, lottoResult: ['5th', null], expected: 100 },
    { lottoPrice: 5000, lottoResult: ['4th', '4th', null], expected: 2000 },
    { lottoPrice: 14000, lottoResult: ['5th', null, null], expected: 35.7 }, // 반올림 (내림)
    { lottoPrice: 13000, lottoResult: ['5th'], expected: 38.5 }, // 반올림 (올림)
  ])(
    '로또 구매 금액이 $lottoPrice이고 로또 결과가 $lottoResult 일 때 수익률은 $expected 이다.',
    ({ lottoPrice, lottoResult, expected }) => {
      const result = LottoStatistics.getProfitRate(lottoPrice, lottoResult);

      expect(result).toBe(expected);
    }
  );
});
