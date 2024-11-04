// @ts-check

import Lotto from './Lotto.js';
import LottoNumberGenerator from './LottoNumberGenerator.js';
import SINGLE_LOTTO_PRICE from '../constants/SingleLottoPrice.js';
import LottoInput from '../ui/LottoInput.js';
import retryAsyncWithLog from '../utils/retryAsyncWithLog.js';

/**
 * @typedef {import('./Lotto.js').default} LottoType
 */

/**
 * @typedef {Object} PurchaseReturnType
 * @property {Array<LottoType>} lottos - 구매한 로또 목록
 * @property {number} purchaseCost - 구매한 로또의 총 가격
 */

const LottoPurchaseManager = Object.freeze({
  /**
   * @returns {Promise<PurchaseReturnType>} 구매한 로또 목록과 총 가격을 반환
   * @throws {import('../utils/CustomError.js').default} - 구매 금액이 유효하지 않을 경우
   * @description 구매 금액을 입력받아 로또를 생성하고, 생성한 로또 목록과 총 가격을 반환한다.
   */
  async purchase() {
    const purchaseCost = await retryAsyncWithLog(
      LottoInput.readTotalPurchaseCost.bind(LottoInput)
    );
    const lottos = this.createLottos(purchaseCost);
    return { lottos, purchaseCost };
  },

  /**
   * @param {number} purchaseCost - 구매 금액
   * @returns {Array<LottoType>} 생성한 로또 목록
   * @description 로또 1장의 가격을 기준으로 개수를 계산하여 로또 목록을 생성한다.
   */
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
