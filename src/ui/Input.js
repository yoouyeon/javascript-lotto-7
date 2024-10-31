import { Console } from '@woowacourse/mission-utils';

class Input {
  static async readLine(message) {
    return Console.readLineAsync(message);
  }
}

export default Input;
