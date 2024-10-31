import LottoProfit from '../src/domains/LottoProfit.js';

describe('로또 수익률 계산 테스트', () => {
  test('당첨금이 [5000, 50000] 일때 총 수익은 55000 이다.', () => {
    const prizes = [5000, 50000];
    const expectedTotal = 55000;
    const total = LottoProfit.getTotal(prizes);
    expect(total).toBe(expectedTotal);
  });

  test.each([
    { lottoPrice: 1000, prizes: [5000], expectedRate: 500 },
    { lottoPrice: 3000, prizes: [5000, 50000], expectedRate: 1833.3 },
    { lottoPrice: 500000, prizes: [1000], expectedRate: 0.2 },
  ])(
    '로또 구매 가격이 $lottoPrice이고 당첨금이 $prizes 일때 수익률은 $expectedRate% 이다.',
    ({ lottoPrice, prizes, expectedRate }) => {
      const rate = LottoProfit.getRate(lottoPrice, prizes);
      expect(rate).toBe(expectedRate);
    }
  );
});
