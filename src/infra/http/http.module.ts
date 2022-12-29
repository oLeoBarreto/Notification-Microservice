import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@App/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { CancelNotification } from '@App/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@App/use-cases/count-recipient-notifications';
import { GetRecipientNotification } from '@App/use-cases/get-recipient-notifications';
import { ReadNotification } from '@App/use-cases/read-notification';
import { UnreadNotification } from '@App/use-cases/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
