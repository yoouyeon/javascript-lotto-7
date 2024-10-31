import checkRuleSet from './checkRuleSet.js';

const bonusNumberValidation = Object.freeze({
  RULE_SET: Object.freeze({
    notNumber: Object.freeze({
      isValid: ({ bonusNumber }) => !Number.isNaN(Number(bonusNumber)),
      errorMessage: '숫자를 입력해주세요.',
    }),
    notInteger: Object.freeze({
      isValid: ({ bonusNumber }) => Number.isInteger(Number(bonusNumber)),
      errorMessage: '정수를 입력해주세요.',
    }),
    notInRange: Object.freeze({
      isValid: ({ bonusNumber }) =>
        Number(bonusNumber) >= 1 && Number(bonusNumber) <= 45,
      errorMessage: '1부터 45 사이의 숫자를 입력해주세요.',
    }),
    notUnique: Object.freeze({
      isValid: ({ bonusNumber, winningNumbers }) =>
        !winningNumbers.includes(Number(bonusNumber)),
      errorMessage: '당첨 번호와 중복되지 않는 숫자를 입력해주세요.',
    }),
  }),

  validate: (bonusNumber, winningNumbers) => {
    checkRuleSet(
      { bonusNumber, winningNumbers },
      bonusNumberValidation.RULE_SET
    );
  },
});

export default bonusNumberValidation;
