import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AttachmentQuestionProps {
  questionId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class AttachmentQuestion extends Entity<AttachmentQuestionProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AttachmentQuestionProps, id?: UniqueEntityID) {
    const attachment = new AttachmentQuestion(props, id)

    return attachment
  }
}
