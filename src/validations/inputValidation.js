import checkRuleSet from '../utils/checkRuleSet.js';

const inputValidation = Object.freeze({
  RULE_SET: Object.freeze({
    isEmpty: Object.freeze({
      isValid: (input) => input !== '',
      errorMessage: '입력값이 비어있습니다.',
    }),
  }),

  validate(input) {
    checkRuleSet(input, this.RULE_SET);
  },
});

export default inputValidation;
