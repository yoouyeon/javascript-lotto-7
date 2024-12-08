// @ts-check

const NumberChecker = {
  LENGTH: 6,
  MIN: 1,
  MAX: 45,

  LONG_ERROR: '로또 번호는 6개여야 합니다.',
  DUPLICATED_ERROR: '로또 번호는 중복되지 않아야 합니다.',
  RANGE_ERROR: '로또 번호는 1부터 45 사이의 숫자여야 합니다.',
  INTEGER_ERROR: '로또 번호는 정수여야 합니다.',
  NAN_ERROR: '로또 번호는 숫자여야 합니다.',

  /**
   * @param {(number)[]} numbers
   * @return boolean
   */
  isTooLong: (numbers) => numbers.length !== NumberChecker.LENGTH,

  /**
   * @param {(number)[]} numbers
   * @return boolean
   */
  hasDuplicated: (numbers) => new Set(numbers).size !== NumberChecker.LENGTH,

  /**
   * @param {number} number
   * @return boolean
   */
  isOutOfRange: (number) => number < NumberChecker.MIN || number > NumberChecker.MAX,

  /**
   * @param {number} number
   * @return boolean
   */
  isNotInteger: (number) => !Number.isInteger(number),

  /**
   * @param {number} number
   * @return boolean
   */
  isNotANumber: (number) => Number.isNaN(number),
};

export default NumberChecker;
