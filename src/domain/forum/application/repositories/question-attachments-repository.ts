import { AttachmentQuestion } from '../../enterprise/entities/attachment-question'

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<AttachmentQuestion[]>
  deleteManyByQuestionId(questionId: string): Promise<void>
}
