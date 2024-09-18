import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AttachmentQuestion } from '@/domain/forum/enterprise/entities/attachment-question'
import { Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): AttachmentQuestion {
    if (!raw.questionId) {
      throw new Error('Question ID is required')
    }

    return AttachmentQuestion.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        questionId: new UniqueEntityID(raw.questionId),
      },
      new UniqueEntityID(raw.id),
    )
  }
}
