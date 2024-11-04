import checkRuleSet from '../utils/checkRuleSet.js';
import SINGLE_LOTTO_PRICE from '../constants/SingleLottoPrice.js';

const purchaseValidation = Object.freeze({
  RULE_SET: Object.freeze({
    notNumber: Object.freeze({
      isValid: (priceInput) => !Number.isNaN(Number(priceInput)),
      errorMessage: '숫자를 입력해주세요.',
    }),
    notEnough: Object.freeze({
      isValid: (priceInput) => Number(priceInput) >= SINGLE_LOTTO_PRICE,
      errorMessage: `${SINGLE_LOTTO_PRICE}원 이상의 금액을 입력해주세요.`,
    }),
    notDivisible: Object.freeze({
      isValid: (priceInput) => Number(priceInput) % SINGLE_LOTTO_PRICE === 0,
      errorMessage: `${SINGLE_LOTTO_PRICE}원 단위로 입력해주세요.`,
    }),
  }),

  validate: (priceInput) => {
    checkRuleSet(priceInput, purchaseValidation.RULE_SET);
  },
});

export default purchaseValidation;
