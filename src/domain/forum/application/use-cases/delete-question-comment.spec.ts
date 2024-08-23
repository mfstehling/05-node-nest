import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comment-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteCommentQuestionUseCase } from './delete-question-comment'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository
let sut: DeleteCommentQuestionUseCase

describe('Delete QuestionComment', () => {
  beforeAll(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteCommentQuestionUseCase(inMemoryQuestionCommentRepository)
  })

  // system under test
  it('should be able to delete a question comment', async () => {
    const newQuestionComment = makeQuestionComment()

    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    await sut.execute({
      authorId: newQuestionComment.authorId.toString(),
      commentId: newQuestionComment.id.toString(),
    })

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment', async () => {
    const newQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-2'),
    })

    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    const result = await sut.execute({
      authorId: 'author-1',
      commentId: newQuestionComment.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
