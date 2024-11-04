import Lotto from './Lotto.js';
import LottoNumberGenerator from './LottoNumberGenerator.js';
import SINGLE_LOTTO_PRICE from '../constants/SingleLottoPrice.js';
import LottoInput from '../ui/LottoInput.js';
import retryAsyncWithLog from '../utils/retryAsyncWithLog.js';

const LottoPurchaseManager = Object.freeze({
  async purchase() {
    const purchaseCost = await retryAsyncWithLog(
      LottoInput.readTotalPurchaseCost.bind(LottoInput)
    );
    const lottos = this.createLottos(purchaseCost);
    return { lottos, purchaseCost };
  },

  createLottos(purchaseCost) {
    const count = purchaseCost / SINGLE_LOTTO_PRICE;
    const lottos = Array.from(
      { length: count },
      () => new Lotto(LottoNumberGenerator.generate())
    );
    return lottos;
  },
});

export default LottoPurchaseManager;
