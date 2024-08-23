import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { CommentAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachment-repository'

let inMemoryAnswersCommentRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: CommentAnswerUseCase

describe('Create a comment in answer', () => {
  beforeAll(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersCommentRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    )
    sut = new CommentAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswersCommentRepository,
    )
  })

  // system under test
  it('should be able to create a comment in answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'comment',
    })

    expect(inMemoryAnswersCommentRepository.items[0].content).toEqual('comment')
  })
})
