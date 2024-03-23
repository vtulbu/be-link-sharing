import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from 'src/utils/decorators';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    // console.log('signInDto', signInDto);

    const response = await this.authService.signIn(signInDto);
    console.log('response', response);
    return response;
    return this.authService.signIn(signInDto);
  }

  @Get('logins')
  test(@Body() signInDto: SignInDto) {
    // return this.authService.signIn(signInDto);
    return 'Hello';
  }
}
