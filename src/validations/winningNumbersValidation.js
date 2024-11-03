import checkRuleSet from '../utils/checkRuleSet.js';
import LOTTO_NUMBER_RULE from '../constants/LottoNumberRule.js';

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
      errorMessage: '숫자를 입력해주세요.',
    }),
    notInteger: Object.freeze({
      isValid: (winningNumbers) =>
        winningNumbers.every((number) => Number.isInteger(Number(number))),
      errorMessage: '정수를 입력해주세요.',
    }),
    notUnique: Object.freeze({
      isValid: (winningNumbers) =>
        winningNumbers.length === new Set(winningNumbers).size,
      errorMessage: '중복되지 않는 숫자를 입력해주세요.',
    }),
    notInRange: Object.freeze({
      isValid: (winningNumbers) =>
        winningNumbers.every(
          (number) =>
            number >= LOTTO_NUMBER_RULE.MIN && number <= LOTTO_NUMBER_RULE.MAX
        ),
      errorMessage: `${LOTTO_NUMBER_RULE.MIN}부터 ${LOTTO_NUMBER_RULE.MAX} 사이의 숫자를 입력해주세요.`,
    }),
  }),

  validate: (winningNumbers) => {
    checkRuleSet(winningNumbers, winningNumbersValidation.RULE_SET);
  },
});

export default winningNumbersValidation;
