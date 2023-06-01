import {
  biscuit,
  KeyPair,
  middleware,
  PrivateKey,
} from "../node_modules/@biscuit-auth/biscuit-wasm/module/biscuit.js";
import * as dotenv from "dotenv";
import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto;
dotenv.config();

const pk = process.env.BISCUIT_KEY;
const root = KeyPair.fromPrivateKey(PrivateKey.fromString(pk));

const biscuit_middleware = middleware({
  publicKey: root.getPublicKey(),
});

export function biscuit_gen(user, role) {
  const biscuitBuilder = biscuit`user(${user}); role(${role})`;
  const token = biscuitBuilder
    .build(root.getPrivateKey()); // biscuit token

  return token.toBase64();
}

export default biscuit_middleware;
