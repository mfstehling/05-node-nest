import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'

export class InMemoryNotificationRepository implements NotificationsRepository {
  public items: Notification[] = []

  async findById(id: string) {
    const notification = this.items.find((item) => item.id.toString() === id)

    if (!notification) return null

    return notification
  }

  async create(notification: Notification) {
    this.items.push(notification)
  }

  async save(notification: Notification) {
    const findIndex = this.items.findIndex(
      (item) => item.id.toString() === notification.id.toString(),
    )

    this.items[findIndex] = notification
  }
}
