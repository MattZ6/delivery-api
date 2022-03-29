import { BcryptHashProvider } from '@infra/providers/cryptography/hash/Bcrypt';

import { authConfig } from '@main/config/env/auth';

export function makeHashProvider() {
  return new BcryptHashProvider(authConfig.HASH_SALT);
}
