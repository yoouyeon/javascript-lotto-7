import Lotto from './Lotto.js';
import LottoGenerator from './LottoGenerator.js';

const LottoPurchase = {
  price: 1000,
  buy: (money) => {
    // TODO : 유효성 검사를 할 것.
    const count = money / LottoPurchase.price;
    const lottos = Array.from(
      { length: count },
      () => new Lotto(LottoGenerator.generate())
    );
    return lottos;
  },
};

export default LottoPurchase;
