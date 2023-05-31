import {
  KeyPair,
  middleware,
  PrivateKey,
} from "../node_modules/@biscuit-auth/biscuit-wasm/module/biscuit.js";
import * as dotenv from "dotenv";

dotenv.config();

const pk = process.env.BISCUIT_KEY;
const root = KeyPair.fromPrivateKey(PrivateKey.fromString(pk));

const biscuit_middleware = middleware({
  publicKey: root.getPublicKey(),
});

export default biscuit_middleware;
