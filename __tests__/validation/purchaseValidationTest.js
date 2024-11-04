import purchaseValidation from '../../src/validations/purchaseValidation.js';
import CustomError from '../../src/utils/CustomError.js';

describe('로또 구입 금액 유효성 검사 테스트', () => {
  const { RULE_SET } = purchaseValidation;

  test.each([
    {
      input: 'a',
      expected: RULE_SET.notNumber.errorMessage,
    },
    {
      input: 500,
      expected: RULE_SET.notEnough.errorMessage,
    },
    {
      input: 1500,
      expected: RULE_SET.notDivisible.errorMessage,
    },
    {
      input: 1000.5,
      expected: RULE_SET.notDivisible.errorMessage,
    },
  ])('$input은 "$expected" CustomError를 반환한다.', ({ input, expected }) => {
    expect(() => purchaseValidation.validate(input)).toThrow(
      new CustomError(expected)
    );
  });

  test('유효한 금액을 입력하면 CustomError를 반환하지 않는다.', () => {
    const VALID_INPUT = 1000;

    expect(() => purchaseValidation.validate(VALID_INPUT)).not.toThrow(
      CustomError
    );
  });
});
