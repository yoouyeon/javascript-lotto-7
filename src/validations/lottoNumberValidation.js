// @ts-check

import checkRuleSet from '../utils/checkRuleSet.js';
import LOTTO_NUMBER_RULE from '../constants/LottoNumberRule.js';

/**
 *  @type {import('../types.js').ValidationObjectType}
 */
const lottoNumberValidation = Object.freeze({
  RULE_SET: Object.freeze({
    notValidCount: Object.freeze({
      isValid: (lottoNumber) => lottoNumber.length === LOTTO_NUMBER_RULE.LENGTH,
      errorMessage: `로또 번호는 ${LOTTO_NUMBER_RULE.LENGTH}개여야 합니다.`,
    }),
    notInRange: Object.freeze({
      isValid: (lottoNumber) =>
        lottoNumber.every(
          (number) =>
            number >= LOTTO_NUMBER_RULE.MIN && number <= LOTTO_NUMBER_RULE.MAX
        ),
      errorMessage: `로또 번호는 ${LOTTO_NUMBER_RULE.MIN}부터 ${LOTTO_NUMBER_RULE.MAX} 사이여야 합니다.`,
    }),
    notUnique: Object.freeze({
      isValid: (lottoNumber) =>
        lottoNumber.length === new Set(lottoNumber).size,
      errorMessage: '로또 번호는 중복되지 않아야 합니다.',
    }),
  }),

  /**
   * @param {Array<number>} lottoNumber
   * @returns {void}
   * @throws {CustomError}
   */
  validate: (lottoNumber) => {
    checkRuleSet(lottoNumber, lottoNumberValidation.RULE_SET);
  },
});

export default lottoNumberValidation;
