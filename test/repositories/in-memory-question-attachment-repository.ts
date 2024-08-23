import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { AttachmentQuestion } from '@/domain/forum/enterprise/entities/attachment-question'

export class InMemoryQuestionAttachmentRepository
  implements QuestionAttachmentsRepository
{
  public items: AttachmentQuestion[] = []

  async findManyByQuestionId(questionId: string) {
    const answers = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return answers
  }

  async deleteManyByQuestionId(questionId: string) {
    const attachments = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )

    this.items = attachments
  }
}
