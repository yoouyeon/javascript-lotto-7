// @ts-check

import checkRuleSet from '../utils/checkRuleSet.js';
import LOTTO_NUMBER_RULE from '../constants/LottoNumberRule.js';

/**
 *  @type {import('../types.js').ValidationObjectType}
 */
const bonusNumberValidation = Object.freeze({
  RULE_SET: Object.freeze({
    notNumber: Object.freeze({
      isValid: ({ bonusNumber }) => !Number.isNaN(Number(bonusNumber)),
      errorMessage: '보너스 번호는 숫자여야 합니다.',
    }),
    notInteger: Object.freeze({
      isValid: ({ bonusNumber }) => Number.isInteger(Number(bonusNumber)),
      errorMessage: '보너스 번호는 정수여야 합니다.',
    }),
    notInRange: Object.freeze({
      isValid: ({ bonusNumber }) =>
        Number(bonusNumber) >= LOTTO_NUMBER_RULE.MIN &&
        Number(bonusNumber) <= LOTTO_NUMBER_RULE.MAX,
      errorMessage: `보너스 번호는 ${LOTTO_NUMBER_RULE.MIN}부터 ${LOTTO_NUMBER_RULE.MAX} 사이의 숫자여야 합니다.`,
    }),
    notUnique: Object.freeze({
      isValid: ({ bonusNumber, winningNumbers }) =>
        !winningNumbers.includes(Number(bonusNumber)),
      errorMessage: '보너스 번호는 당첨 번호와 중복되지 않아야 합니다.',
    }),
  }),

  /**
   * @param {number} bonusNumber
   * @param {Array<number>} winningNumbers
   * @returns {void}
   * @throws {CustomError}
   */
  validate: (bonusNumber, winningNumbers) => {
    checkRuleSet(
      { bonusNumber, winningNumbers },
      bonusNumberValidation.RULE_SET
    );
  },
});

export default bonusNumberValidation;
