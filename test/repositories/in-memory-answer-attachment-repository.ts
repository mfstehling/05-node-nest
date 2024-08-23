import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AttachmentAnswer } from '@/domain/forum/enterprise/entities/attachment-answer'

export class InMemoryAnswerAttachmentRepository
  implements AnswerAttachmentsRepository
{
  public items: AttachmentAnswer[] = []

  async findManyByAnswerId(answerId: string) {
    const answers = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answers
  }

  async deleteManyByAnswerId(answerId: string) {
    const attachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = attachments
  }
}
