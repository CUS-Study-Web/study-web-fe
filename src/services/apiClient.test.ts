import { describe, it, expect } from 'vitest';
import apiClient from './apiClient';
import { FILE_SIZE_ERROR_MESSAGE } from '../utils/fileUtils';

describe('apiClient interceptors', () => {
  it('should intercept 413 error and format message as "Vượt quá size limit, hãy thử file nhỏ hơn"', async () => {
    // Interceptors on response error
    const error413 = {
      response: {
        status: 413,
        data: '<html>413 Request Entity Too Large</html>',
      },
      message: 'Request failed with status code 413',
    };

    // Trigger response interceptor error handler
    // Find the response error interceptor handler
    const responseInterceptor = (apiClient.interceptors.response as any).handlers[0];

    await expect(responseInterceptor.rejected(error413)).rejects.toMatchObject({
      message: FILE_SIZE_ERROR_MESSAGE,
      response: {
        status: 413,
        data: {
          message: FILE_SIZE_ERROR_MESSAGE,
        },
      },
    });
  });

  it('should format 413 error when response data is an object', async () => {
    const error413 = {
      response: {
        status: 413,
        data: {
          error: 'Payload Too Large',
        },
      },
      message: 'Request failed with status code 413',
    };

    const responseInterceptor = (apiClient.interceptors.response as any).handlers[0];

    await expect(responseInterceptor.rejected(error413)).rejects.toMatchObject({
      message: FILE_SIZE_ERROR_MESSAGE,
      response: {
        status: 413,
        data: {
          error: 'Payload Too Large',
          message: FILE_SIZE_ERROR_MESSAGE,
        },
      },
    });
  });
});
