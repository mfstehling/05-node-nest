import { WatchedList } from '@/core/entities/watched-list'
import { AttachmentQuestion } from './attachment-question'

export class AttachmentQuestionList extends WatchedList<AttachmentQuestion> {
  compareItems(a: AttachmentQuestion, b: AttachmentQuestion): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
