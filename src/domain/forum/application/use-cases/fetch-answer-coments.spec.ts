import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeAll(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  // system under test
  it('should be able to fetch answer answercommentss', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityID('1') }),
    )

    const result = await sut.execute({ page: 1, answerId: '1' })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answerComments).toHaveLength(3)
  })

  // it('should be able to check paginated', async () => {
  //   for (let i = 1; 1 <= 22; i++) {
  //     await inMemoryAnswerCommentsRepository.create(
  //       makeAnswerComment({ answerId: new UniqueEntityID('1') }),
  //     )
  //   }
  //   const result = await sut.execute({ page: 2, answerId: '1' })

  //   expect(result.value?.answerComments).toHaveLength(2)
  // })
})
