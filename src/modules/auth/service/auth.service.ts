import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dto';
import { User } from 'src/modules/user/entities';
import { UsersService } from 'src/modules/user/services';
@Injectable()
export class AuthService {
  constructor(
    protected readonly _em: EntityManager,
    protected readonly _userService: UsersService,
    protected readonly _jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async signUp(em: EntityManager, createUserDto: CreateUserDto): Promise<User> {
    const user = await this._userService.createUser(em, {
      registerWithEmail: createUserDto,
    });
    return user;
  }

  async validateUser(
    em: EntityManager,
    username: string,
    pass: string,
  ): Promise<any> {
    const user = await this._userService.findOne(em, username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
