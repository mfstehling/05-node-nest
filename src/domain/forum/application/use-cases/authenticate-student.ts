import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { StudentRepository } from '../repositories/students-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private encrypter: Encrypter,
    private hashComparer: HashComparer,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordCorrect = await this.hashComparer.compare(
      password,
      student.password,
    )

    if (!isPasswordCorrect) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({ sub: student.id })

    return right({ accessToken })
  }
}
