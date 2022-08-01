import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServiceError } from 'src/modules/error';
import { CreateUserDto, UserSignInDto } from 'src/modules/user/dto';
import { User } from 'src/modules/user/entities';
import { UsersService } from 'src/modules/user/services';
import { ConfirmationToken } from '../entities';
import { GeneratorService } from './generator.service';
@Injectable()
export class AuthService {
  constructor(
    protected readonly _em: EntityManager,
    protected readonly _userService: UsersService,
    protected readonly _jwtService: JwtService,
    protected readonly _generatorService: GeneratorService,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async signUp(em: EntityManager, createUserDto: CreateUserDto): Promise<User> {
    const user = await this._userService.createUser(em, {
      registerWithEmail: createUserDto,
    });
    return user;
  }

  public async generateConfirmationToken(
    em: EntityManager,
    user: User,
  ): Promise<ConfirmationToken> {
    let token: string;
    do {
      token = this._generatorService.randomHex(16);
    } while ((await em.count(ConfirmationToken, { token })) > 0);

    const confirmationToken = new ConfirmationToken(user, token);

    try {
      await em.persistAndFlush(confirmationToken);
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        throw new ServiceError(304, "confirmation token need confirm");
      }
      throw error;
    }
    return confirmationToken;
  }

  async signInn(em: EntityManager, userSignInDto: UserSignInDto): Promise<User> {
    const user = await this._userService.getUserByEmailAndPassword(
      em,
      userSignInDto.email,
      userSignInDto.password,
    );
    return user;
  }

  async loginWithCredentials(user: any) {
    const payload = { email: user.email};

    return {
      access_token: this._jwtService.sign(payload),
    };
  }

}
