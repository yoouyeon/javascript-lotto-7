import retryAsyncWithLog from '../../src/utils/retryAsyncWithLog.js';
import CustomError from '../../src/utils/CustomError.js';
import getLogSpy from '../../src/utils/getLogSpy.js';

describe('retryAsyncWithLog 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('에러가 발생하지 않으면 에러 로그를 출력하지 않고 결과를 반환한다.', async () => {
    const fn = jest.fn().mockReturnValue('success');
    const logSpy = getLogSpy();

    const result = await retryAsyncWithLog(fn);

    expect(result).toBe('success');
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('에러가 발생하면 에러 로그를 출력하고 재시도해서 결과를 반환한다.', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new CustomError('error'))
      .mockResolvedValueOnce('success');
    const logSpy = getLogSpy();

    const result = await retryAsyncWithLog(fn);

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
  });
});
