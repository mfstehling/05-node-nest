import { AttachmentAnswer } from '../../enterprise/entities/attachment-answer'

export interface AnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AttachmentAnswer[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}
