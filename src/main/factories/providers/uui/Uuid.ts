import { CryptoUuidProvider } from "@infra/providers/uuid/Uuid";

export function makeUuidProvider() {
  return new CryptoUuidProvider();
}
