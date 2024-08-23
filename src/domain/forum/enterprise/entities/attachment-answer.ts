import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AttachmentAnswerProps {
  answerId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class AttachmentAnswer extends Entity<AttachmentAnswerProps> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AttachmentAnswerProps, id?: UniqueEntityID) {
    const attachment = new AttachmentAnswer(props, id)

    return attachment
  }
}
