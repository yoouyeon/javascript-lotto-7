import { Console } from '@woowacourse/mission-utils';
import inputValidation from '../validations/inputValidation.js';

class Input {
  static async readLine(message) {
    const input = await Console.readLineAsync(message);
    inputValidation.validate(input);
    return input;
  }
}

export default Input;
