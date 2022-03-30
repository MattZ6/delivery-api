import { randomUUID } from 'node:crypto';

import { IGenerateUuidProvider } from "@application/protocols/providers/uuid/Generate";

export class CryptoUuidProvider implements IGenerateUuidProvider {
  async generate(): Promise<string> {
    return randomUUID();
  }

}
