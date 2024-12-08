// @ts-check
import { Console } from '@woowacourse/mission-utils';

/**
 * @param {() => Promise<string>} inputFunc - 입력을 받는 함수
 * @description inputFunc이 에러를 던지지 않을 때까지 inputFunc를 실행해 입력을 받는다.
 */
const retryInput = async (inputFunc) => {
  try {
    const input = await inputFunc();
    return input;
  } catch (error) {
    Console.print(error.message);
    return retryInput(inputFunc);
  }
};

export default retryInput;
