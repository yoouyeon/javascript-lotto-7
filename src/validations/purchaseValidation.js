import checkRuleSet from './checkRuleSet.js';

const purchaseValidation = Object.freeze({
  RULE_SET: Object.freeze({
    notNumber: Object.freeze({
      isValid: (priceInput) => !Number.isNaN(Number(priceInput)),
      errorMessage: '숫자를 입력해주세요.',
    }),
    notEnough: Object.freeze({
      isValid: (priceInput) => Number(priceInput) >= 1000,
      errorMessage: '1000원 이상의 금액을 입력해주세요.',
    }),
    notThousand: Object.freeze({
      isValid: (priceInput) => Number(priceInput) % 1000 === 0,
      errorMessage: '1000원 단위로 입력해주세요.',
    }),
  }),

  validate: (priceInput) => {
    checkRuleSet(priceInput, purchaseValidation.RULE_SET);
  },
});

export default purchaseValidation;
