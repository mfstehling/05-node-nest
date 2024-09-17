import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { StudentRepository } from '../repositories/students-repository'
import { StudentAlreadyExistsError } from './errors/student-already-exists-error'
import { Student } from '../../enterprise/entities/student'
import { HashGenerator } from '../cryptography/hash-generator'

interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentAlreadyExists = await this.studentRepository.findByEmail(email)

    if (studentAlreadyExists) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentRepository.create(student)

    return right({ student })
  }
}
