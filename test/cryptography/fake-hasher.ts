import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(password: string): Promise<string> {
    return password.concat('-hashed')
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return password.concat('-hashed') === hash
  }
}
