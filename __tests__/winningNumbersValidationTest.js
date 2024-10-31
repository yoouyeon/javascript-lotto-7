import CustomError from '../src/validations/CustomError.js';
import winningNumbersValidation from '../src/validations/winningNumbersValidation.js';

describe('당첨 번호 유효성 검사', () => {
  test.each([
    {
      input: [1, 2, 3, 4, 5],
      expected: winningNumbersValidation.RULE_SET.notValidCount.errorMessage,
    },
    {
      input: [1, 2, 3, 4, 5, 6, 7],
      expected: winningNumbersValidation.RULE_SET.notValidCount.errorMessage,
    },
    {
      input: [1, 2, 3, 4, 5, 'a'],
      expected: winningNumbersValidation.RULE_SET.notNumber.errorMessage,
    },
    {
      input: [1, 2, 3, 4, 5, 6.5],
      expected: winningNumbersValidation.RULE_SET.notInteger.errorMessage,
    },
    {
      input: [1, 2, 3, 4, 5, 5],
      expected: winningNumbersValidation.RULE_SET.notUnique.errorMessage,
    },
    {
      input: [1, 2, 3, 4, 5, 46],
      expected: winningNumbersValidation.RULE_SET.notInRange.errorMessage,
    },
    {
      input: [0, 1, 2, 3, 4, 5],
      expected: winningNumbersValidation.RULE_SET.notInRange.errorMessage,
    },
  ])(
    '당첨번호 $input은 "$expected" CustomError를 반환한다.',
    ({ input, expected }) => {
      expect(() => winningNumbersValidation.validate(input)).toThrow(
        new CustomError(expected)
      );
    }
  );

  test('유효한 당첨번호를 입력하면 CustomError를 반환하지 않는다.', () => {
    expect(() =>
      winningNumbersValidation.validate([1, 2, 3, 4, 5, 6])
    ).not.toThrow(CustomError);
  });
});
