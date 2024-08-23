import { WatchedList } from '@/core/entities/watched-list'
import { AttachmentAnswer } from './attachment-answer'

export class AttachmentAnswerList extends WatchedList<AttachmentAnswer> {
  compareItems(a: AttachmentAnswer, b: AttachmentAnswer): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
