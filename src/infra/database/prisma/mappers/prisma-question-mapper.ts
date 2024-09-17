import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Question as PrismaQuestion, Prisma } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create(
      {
        authorId: new UniqueEntityID(raw.authorId),
        content: raw.content,
        title: raw.title,
        bestAnswerId: raw.bestAnswerId
          ? new UniqueEntityID(raw.bestAnswerId)
          : null,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toString(),
      authorId: question.authorId.toString(),
      content: question.content,
      title: question.title,
      bestAnswerId: question.bestAnswerId?.toString(),
      slug: question.slug.value,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
