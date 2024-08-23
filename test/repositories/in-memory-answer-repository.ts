import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { InMemoryAnswerAttachmentRepository } from './in-memory-answer-attachment-repository'
import { DomainEvents } from '@/core/events/domain-events'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  constructor(
    private inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository,
  ) {}

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) return null

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
    this.items.push(answer)
    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer) {
    const findIndex = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
      DomainEvents.dispatchEventsForAggregate(answer.id),
    )

    this.items[findIndex] = answer
  }

  async delete(answer: Answer) {
    const findIndex = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )
    this.items.splice(findIndex, 1)
    this.inMemoryAnswerAttachmentRepository.deleteManyByAnswerId(
      answer.id.toString(),
    )
  }
}
