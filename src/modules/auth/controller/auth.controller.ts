import { EntityManager } from '@mikro-orm/postgresql';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto, UserSignInDto } from 'src/modules/user/dto';
import { UsersService } from 'src/modules/user/services';
import { AuthService } from '../service/auth.service';
import { JwtStrategy } from '../strategies';

@Controller('auth')
export class UsersController {
  _authService: any;
  constructor(
    private readonly authService: AuthService,
    protected readonly _em: EntityManager,
    protected readonly _userService: UsersService,
    protected readonly jwtStrategy: JwtStrategy,
  ) { }

  @Post('user/sigup')
  @ApiOperation({ summary: 'Create new user' })
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signUp(this._em, createUserDto);
    const token = await this.authService.generateConfirmationToken(this._em, user)
    return {
      user
    }
  }

  @Post("signin")
  @ApiOperation({ summary: "Sign in" })
  @UsePipes(ValidationPipe)
  public async signIn(em: EntityManager,
    @Body() userSignInDto: UserSignInDto,
  ): Promise<any> {
    const user = this._em.transactional(async (em) => {
      const user = await this.authService.signInn(em, userSignInDto);
    })
    return this.authService.loginWithCredentials(user)


  }
}

