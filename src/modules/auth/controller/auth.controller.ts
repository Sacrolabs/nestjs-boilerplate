import { EntityManager } from '@mikro-orm/postgresql';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dto';
import { UsersService } from 'src/modules/user/services';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    protected readonly _em: EntityManager,
    protected readonly _userService: UsersService,
  ) {}

  @Post('user/sigup')
  @ApiOperation({ summary: 'Create new user' })
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(this._em, createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('auth/login')
  login() :any {
  }
}
