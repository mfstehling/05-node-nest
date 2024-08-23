import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comment-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeAll(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  // system under test
  it('should be able to fetch question questioncommentss', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('1') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('1') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('1') }),
    )

    const result = await sut.execute({ page: 1, questionId: '1' })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questionComments).toHaveLength(3)
  })

  // it('should be able to check paginated', async () => {
  //   for (let i = 1; 1 <= 22; i++) {
  //     await inMemoryQuestionCommentsRepository.create(
  //       makeQuestionComments({ questionId: new UniqueEntityID('1') }),
  //     )
  //   }
  //   const { questioncommentss } = await sut.execute({ page: 2, questionId: '1' })

  //   expect(questioncommentss).toHaveLength(2)
  // })
})
