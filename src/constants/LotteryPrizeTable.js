// @ts-check

/**
 * @type {import('../types.js').LottoPrizeTableType}
 */
const LOTTERY_PRIZE_TABLE = Object.freeze({
  '1st': Object.freeze({
    matchCount: 6,
    description: '6개 일치',
    winningMoney: 2000000000,
    bonusRequired: false,
  }),
  '2nd': Object.freeze({
    matchCount: 5,
    description: '5개 일치, 보너스 볼 일치',
    winningMoney: 30000000,
    bonusRequired: true,
  }),
  '3rd': Object.freeze({
    matchCount: 5,
    description: '5개 일치',
    winningMoney: 1500000,
    bonusRequired: false,
  }),
  '4th': Object.freeze({
    matchCount: 4,
    description: '4개 일치',
    winningMoney: 50000,
    bonusRequired: false,
  }),
  '5th': Object.freeze({
    matchCount: 3,
    description: '3개 일치',
    winningMoney: 5000,
    bonusRequired: false,
  }),
});

export default LOTTERY_PRIZE_TABLE;
