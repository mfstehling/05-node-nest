import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { InMemoryQuestionAttachmentRepository } from './in-memory-question-attachment-repository'
import { DomainEvents } from '@/core/events/domain-events'

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = []

  constructor(
    private inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository,
  ) {}

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) return null

    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) return null

    return question
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(question: Question) {
    this.items.push(question)
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async save(question: Question) {
    const findIndex = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    )

    this.items[findIndex] = question
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question) {
    const findIndex = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    )

    this.inMemoryQuestionAttachmentRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
    this.items.splice(findIndex, 1)
  }
}
