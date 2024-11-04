import CustomError from '../../src/utils/CustomError.js';
import inputValidation from '../../src/validations/inputValidation.js';

describe('입력 유효성 검사 테스트', () => {
  const { RULE_SET } = inputValidation;

  test.each([{ input: '', expected: RULE_SET.isEmpty.errorMessage }])(
    '입력이 "$input"일 경우 "$expected" CustomError를 반환한다.',
    ({ input, expected }) => {
      expect(() => inputValidation.validate(input)).toThrow(
        new CustomError(expected)
      );
    }
  );

  test('유효한 입력에는 CustomError를 반환하지 않는다.', () => {
    const VALID_INPUT = '1';

    expect(() => inputValidation.validate(VALID_INPUT)).not.toThrow(
      CustomError
    );
  });
});
