import { 
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  Request
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ResetPasswordDto } from '../dto/reset-pass.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get my info' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async me(@Request() req: any) {
    const email = req.user.email;
    return this.authService.getInfo(req.user.email);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in and get token' })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password); 
  } 

  @Post('logout')
  @ApiOperation({ summary: 'Log out of the current session' })
  async logout() {
    return this.authService.logout();
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password, body.name); 
  }

  @Post('auth')
  @ApiOperation({ summary: 'Token refresh' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Request() req: any) {
    const email = req.user.email;
    //console.log(email);
    return this.authService.refreshToken(email); 
  }

  @Patch('pass')
  @ApiOperation({ summary: 'Change password' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async resetPassword(@Body() body: ResetPasswordDto, @Request() req: any) {
    const email = req.user.email;
    console.log(email);
    return this.authService.resetPassword(body.oldPassword, body.newPassword, email); 
  }
}
