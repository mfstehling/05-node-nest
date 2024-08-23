import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AttachmentAnswer,
  AttachmentAnswerProps,
} from '@/domain/forum/enterprise/entities/attachment-answer'

export function makeAnswerAttachment(
  override?: Partial<AttachmentAnswerProps>,
  id?: UniqueEntityID,
) {
  const newAttachmentAnswer = AttachmentAnswer.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return newAttachmentAnswer
}
