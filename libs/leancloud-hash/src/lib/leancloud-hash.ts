import { createHash } from 'crypto';

/**
 * leancloud 密码 hash 加密算法
 */
export const leancloudHash = (pwd: string, salt: string) => {
  let result: Buffer = (salt + pwd) as any;
  for (let index = 0; index < 513; index++) {
    result = createHash('sha512')
      .update(result)
      .digest();
  }
  return {
    salt,
    derivedKey: result.toString('base64')
  };
};
