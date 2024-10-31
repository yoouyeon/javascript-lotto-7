// TODO : 객체 관리 방법에 대한 고민이 필요함

export const LOTTO_WINNER_RANK = {
  FIRST: {
    matchCount: 6,
    description: '6개 일치',
    winningMoney: 2000000000,
    bonusRequired: false,
  },
  SECOND: {
    matchCount: 5,
    description: '5개 일치, 보너스 볼 일치',
    winningMoney: 30000000,
    bonusRequired: true,
  },
  THIRD: {
    matchCount: 5,
    description: '5개 일치',
    winningMoney: 1500000,
    bonusRequired: false,
  },
  FOURTH: {
    matchCount: 4,
    description: '4개 일치',
    winningMoney: 50000,
    bonusRequired: false,
  },
  FIFTH: {
    matchCount: 3,
    description: '3개 일치',
    winningMoney: 5000,
    bonusRequired: false,
  },
};

export class LottoResult {
  #winningNumbers = [];

  #bonusNumber = 0;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  getTotalResult(lottos) {
    return lottos.map((lotto) => this.getLottoResult(lotto));
  }

  getLottoResult = (lotto) => {
    const matchCount = this.#getMatchCount(lotto);
    const isBonusMatch = this.#isBonusMatch(lotto);
    return LottoResult.#getWinnerRank(matchCount, isBonusMatch);
  };

  #getMatchCount = (lotto) =>
    lotto.numbers.filter((number) => this.#winningNumbers.includes(number))
      .length;

  #isBonusMatch = (lotto) => lotto.numbers.includes(this.#bonusNumber);

  static #getWinnerRank = (matchCount, isBonusMatch) => {
    const winnerRank = Object.values(LOTTO_WINNER_RANK).find(
      (rank) =>
        rank.matchCount === matchCount && rank.bonusRequired === isBonusMatch
    );
    return winnerRank || null;
  };
}
