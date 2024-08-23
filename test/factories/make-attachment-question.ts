import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AttachmentQuestion,
  AttachmentQuestionProps,
} from '@/domain/forum/enterprise/entities/attachment-question'

export function makeQuestionAttachment(
  override?: Partial<AttachmentQuestionProps>,
  id?: UniqueEntityID,
) {
  const newAttachmentQuestion = AttachmentQuestion.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return newAttachmentQuestion
}
