import { 
  Controller,
  Get,
  Patch
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {

  @Get()
  @ApiOperation({ summary: 'Get blog settings (Admin-only)', description: 'Fetches the global configuration settings of the blog.' })
  async getGlobalSettings() {}

  @Patch()
  @ApiOperation({ summary: 'Update blog settings (Admin-only)', description: 'Allows an admin to modify blog-wide settings.' })
  async editGlobalSettings() {}

}
