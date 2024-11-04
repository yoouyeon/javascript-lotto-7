import Lotto from './Lotto.js';
import LottoNumberGenerator from './LottoNumberGenerator.js';
import purchaseValidation from '../validations/purchaseValidation.js';
import SINGLE_LOTTO_PRICE from '../constants/SingleLottoPrice.js';

const LottoPurchaseManager = Object.freeze({
  purchase: (money) => {
    purchaseValidation.validate(money);
    const count = money / SINGLE_LOTTO_PRICE;
    const lottos = Array.from(
      { length: count },
      () => new Lotto(LottoNumberGenerator.generate())
    );

    return lottos;
  },
});

export default LottoPurchaseManager;
