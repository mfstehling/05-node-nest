import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteCommentAnswerUseCase } from './delete-answer-comment'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let sut: DeleteCommentAnswerUseCase

describe('Delete AnswerComment', () => {
  beforeAll(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteCommentAnswerUseCase(inMemoryAnswerCommentRepository)
  })

  // system under test
  it('should be able to delete a answer comment', async () => {
    const newAnswerComment = makeAnswerComment()

    await inMemoryAnswerCommentRepository.create(newAnswerComment)

    await sut.execute({
      authorId: newAnswerComment.authorId.toString(),
      answerId: newAnswerComment.id.toString(),
    })

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer comment', async () => {
    const newAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-2'),
    })

    await inMemoryAnswerCommentRepository.create(newAnswerComment)

    const result = await sut.execute({
      authorId: 'author-1',
      answerId: newAnswerComment.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
