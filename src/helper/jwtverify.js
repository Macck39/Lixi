const jose = require('jose');

const key = process.env.JWT_SECRETKEY;


export async function verify(jwt) {
  const { payload } = await jose.jwtVerify(jwt, new TextEncoder().encode(key));
  return payload;
}