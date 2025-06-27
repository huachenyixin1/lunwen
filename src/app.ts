import { RuntimeConfig } from '@umijs/max';

export const request: RuntimeConfig['request'] = {
  requestInterceptors: [
    (url: string, options: any) => {
      const token = localStorage.getItem('token');
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return { url, options };
    }
  ]
};
