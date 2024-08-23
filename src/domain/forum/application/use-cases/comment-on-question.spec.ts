import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { CommentQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comment-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachment-repository'

let inMemoryQuestionsCommentRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAttachmentQuestionRepository: InMemoryQuestionAttachmentRepository
let sut: CommentQuestionUseCase

describe('Create a comment in question', () => {
  beforeAll(() => {
    inMemoryQuestionsCommentRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryAttachmentQuestionRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryAttachmentQuestionRepository,
    )
    sut = new CommentQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionsCommentRepository,
    )
  })

  // system under test
  it('should be able to create a comment in question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'comment',
    })

    expect(inMemoryQuestionsCommentRepository.items[0].content).toEqual(
      'comment',
    )
  })
})
