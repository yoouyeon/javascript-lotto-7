import getLogSpy from './getLogSpy.js';
import retryInput from './retryInput.js';

describe('retryInput 함수 테스트', () => {
  test('입력 함수가 에러를 던지면 에러 메시지를 출력하고 입력 함수를 다시 실행한다.', async () => {
    // given
    const inputFunc = jest
      .fn()
      .mockRejectedValueOnce(new Error('에러 메시지'))
      .mockResolvedValue('1');
    const logSpy = getLogSpy();

    // when
    const result = await retryInput(inputFunc);

    // then
    expect(result).toBe('1');
    expect(inputFunc).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('에러 메시지'));
  });

  test('입력 함수가 에러를 던지지 않으면 입력 값을 반환한다.', async () => {
    // given
    const inputFunc = jest.fn().mockResolvedValue('1');
    // when
    const result = await retryInput(inputFunc);

    // then
    expect(result).toBe('1');
  });
});
