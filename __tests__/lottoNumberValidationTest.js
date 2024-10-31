import CustomError from '../src/validations/CustomError.js';
import lottoNumberValidation from '../src/validations/lottoNumberValidation.js';

describe('로또 번호 유효성 검사 테스트', () => {
  test.each([
    {
      input: [1, 2, 3, 4, 5],
      expected: lottoNumberValidation.RULE_SET.notValidCount.errorMessage,
    },
    {
      input: [1, 2, 3, 4, 5, 6, 7],
      expected: lottoNumberValidation.RULE_SET.notValidCount.errorMessage,
    },
    {
      input: [0, 2, 3, 4, 5, 6],
      expected: lottoNumberValidation.RULE_SET.notInRange.errorMessage,
    },
    {
      input: [1, 2, 3, 4, 5, 46],
      expected: lottoNumberValidation.RULE_SET.notInRange.errorMessage,
    },
    {
      input: [1, 2, 3, 4, 5, 5],
      expected: lottoNumberValidation.RULE_SET.notUnique.errorMessage,
    },
  ])(
    '로또 번호 $input은 "$expected" CustomError를 반환한다.',
    ({ input, expected }) => {
      expect(() => lottoNumberValidation.validate(input)).toThrow(
        new CustomError(expected)
      );
    }
  );

  test('유효한 로또 번호를 입력하면 CustomError를 반환하지 않는다.', () => {
    expect(() =>
      lottoNumberValidation.validate([1, 2, 3, 4, 5, 45])
    ).not.toThrow(CustomError);
  });
});
