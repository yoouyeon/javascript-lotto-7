// @ts-check

import checkRuleSet from '../utils/checkRuleSet.js';

/**
 *  @type {import('../types.js').ValidationObjectType}
 */
const inputValidation = Object.freeze({
  RULE_SET: Object.freeze({
    isEmpty: Object.freeze({
      isValid: (input) => input !== '',
      errorMessage: '입력값이 비어있습니다.',
    }),
  }),

  /**
   * @param {string} input
   * @returns {void}
   * @throws {CustomError}
   */
  validate(input) {
    checkRuleSet(input, this.RULE_SET);
  },
});

export default inputValidation;
