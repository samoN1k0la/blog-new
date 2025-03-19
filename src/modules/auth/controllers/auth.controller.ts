import { 
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  Request
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get my info', description: 'Get account info of the currently logged-in session.' })
  @UseGuards(JwtAuthGuard)
  async me(@Request() req: any) {
    const email = req.user.email;
    return this.authService.getInfo(req.user.email);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in and get token', description: 'Log in into a existing user account and on success get session JWT.' })
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password); // Call the login service
  } 

  @Post('logout')
  @ApiOperation({ summary: 'Log out of the current session', description: 'Log out of the current session, thus invalidating the session token.' })
  async logout() {
    return this.authService.logout();
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user', description: 'Register a new user.' })
  async register(@Body() body: { email: string; password: string; name: string }) {
    return this.authService.register(body.email, body.password, body.name); // Register a user
  }

  @Post('auth')
  @ApiOperation({ summary: 'Token refresh', description: 'Refresh the session token only if an action is currently in progress or if the user has initiated activity within the inactivity period, preventing automatic logout after 15 minutes.' })
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Request() req: any) {
    const email = req.user.email;
    //console.log(email);
    return this.authService.refreshToken(email); // Refresh the session token
  }

  @Patch('pass')
  @ApiOperation({ summary: 'Change password', description: 'Change password of the currently logged-in account.' })
  @UseGuards(JwtAuthGuard)
  async resetPassword(@Body() body: { oldPassword: string; newPassword: string }, @Request() req: any) {
    const email = req.user.email;
    console.log(email);
    return this.authService.resetPassword(body.oldPassword, body.newPassword, email); // Reset password
  }
}
