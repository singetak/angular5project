// let base64url = require('base64-url');
export let urlSafeBase64Encoding = (str: string) => {
  // return base64url.encode(str);
  return new Buffer(str).toString('base64');
};
export let urlSafeBase64Decoding = (str: string) => {
  // return base64url.decode(str);
  return new Buffer(str).toString('base64');
};
