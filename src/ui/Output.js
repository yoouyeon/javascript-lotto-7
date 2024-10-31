import { Console } from '@woowacourse/mission-utils';

class Output {
  static print(message) {
    Console.print(message);
  }

  static printNewLine() {
    Console.print('');
  }
}

export default Output;
