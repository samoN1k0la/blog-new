import { 
  Controller,
  Get,
  Patch,
  Delete,
  Param
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {

  @Get('me')
  @ApiOperation({ summary: 'Fetch my notifications', description: 'Retrieves notifications for the currently authenticated user.' })
  async getMyNotifications() {}

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read', description: 'Updates a notification’s status to read.' })
  async markNotificationAsRead(@Param('id') id: string) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification', description: 'Removes a notification from the user\'s list.' })
  async deleteNotification(@Param('id') id: string) {}

}
