// @ts-check

import checkRuleSet from '../utils/checkRuleSet.js';
import LOTTO_NUMBER_RULE from '../constants/LottoNumberRule.js';

/**
 *  @type {import('../types.js').ValidationObjectType}
 */
const winningNumbersValidation = Object.freeze({
  RULE_SET: Object.freeze({
    notValidCount: Object.freeze({
      isValid: (winningNumbers) =>
        winningNumbers.length === LOTTO_NUMBER_RULE.LENGTH,
      errorMessage: `${LOTTO_NUMBER_RULE.LENGTH}개의 숫자를 입력해주세요.`,
    }),
    notNumber: Object.freeze({
      isValid: (winningNumbers) =>
        winningNumbers.every((number) => !Number.isNaN(Number(number))),
      errorMessage: '당첨 번호는 모두 숫자여야 합니다.',
    }),
    notInteger: Object.freeze({
      isValid: (winningNumbers) =>
        winningNumbers.every((number) => Number.isInteger(Number(number))),
      errorMessage: '당첨 번호는 정수여야 합니다.',
    }),
    notUnique: Object.freeze({
      isValid: (winningNumbers) =>
        winningNumbers.length === new Set(winningNumbers).size,
      errorMessage: '각 당첨 번호는 중복되지 않아야 합니다.',
    }),
    notInRange: Object.freeze({
      isValid: (winningNumbers) =>
        winningNumbers.every(
          (number) =>
            number >= LOTTO_NUMBER_RULE.MIN && number <= LOTTO_NUMBER_RULE.MAX
        ),
      errorMessage: `당첨 번호는 ${LOTTO_NUMBER_RULE.MIN}부터 ${LOTTO_NUMBER_RULE.MAX} 사이의 숫자여야 합니다.`,
    }),
  }),

  /**
   * @param {Array<number>} winningNumbers
   * @returns {void}
   * @throws {CustomError}
   */
  validate: (winningNumbers) => {
    checkRuleSet(winningNumbers, winningNumbersValidation.RULE_SET);
  },
});

export default winningNumbersValidation;
