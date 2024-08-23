import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachment-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAttachmentQuestionRepository: InMemoryQuestionAttachmentRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeAll(() => {
    inMemoryAttachmentQuestionRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryAttachmentQuestionRepository,
    )
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  // system under test
  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'Nova pergunta',
      title: 'Pergunta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBeTruthy()

    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)

    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)

    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
