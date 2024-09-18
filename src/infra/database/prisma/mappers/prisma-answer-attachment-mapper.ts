import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AttachmentAnswer } from '@/domain/forum/enterprise/entities/attachment-answer'
import { Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment): AttachmentAnswer {
    if (!raw.answerId) {
      throw new Error('Answer ID is required')
    }

    return AttachmentAnswer.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        answerId: new UniqueEntityID(raw.answerId),
      },
      new UniqueEntityID(raw.id),
    )
  }
}
