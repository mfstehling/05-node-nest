import { AuthenticateStudentUseCase } from './authenticate-student'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentRepository: InMemoryStudentRepository
let encrypter: FakeEncrypter
let fakeHasher: FakeHasher
let sut: AuthenticateStudentUseCase

describe('Authenticate student', () => {
  beforeAll(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentRepository,
      encrypter,
      fakeHasher,
    )
  })

  // system under test
  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentRepository.items.push(student)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
