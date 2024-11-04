// @ts-check

import { Console } from '@woowacourse/mission-utils';
import inputValidation from '../validations/inputValidation.js';

class Input {
  /**
   * @param {string} message - 입력 메시지
   * @returns {Promise<string>}
   * @description 입력을 받아 기본 유효성 검사를 수행한 후 반환한다.
   */
  static async readLine(message) {
    const input = await Console.readLineAsync(message);
    inputValidation.validate(input);
    return input;
  }
}

export default Input;
