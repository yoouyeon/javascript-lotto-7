import checkRuleSet from './checkRuleSet.js';

const lottoNumberValidation = Object.freeze({
  RULE_SET: Object.freeze({
    notValidCount: Object.freeze({
      isValid: (lottoNumber) => lottoNumber.length === 6,
      errorMessage: '로또 번호는 6개여야 합니다.',
    }),
    notInRange: Object.freeze({
      isValid: (lottoNumber) =>
        lottoNumber.every((number) => number >= 1 && number <= 45),
      errorMessage: '로또 번호는 1부터 45 사이여야 합니다.',
    }),
    notUnique: Object.freeze({
      isValid: (lottoNumber) =>
        lottoNumber.length === new Set(lottoNumber).size,
      errorMessage: '로또 번호는 중복되지 않아야 합니다.',
    }),
  }),

  validate: (lottoNumber) => {
    checkRuleSet(lottoNumber, lottoNumberValidation.RULE_SET);
  },
});

export default lottoNumberValidation;
