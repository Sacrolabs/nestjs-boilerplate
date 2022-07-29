import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ServiceError } from 'src/modules/error';
import { CreateUserDto } from '../dto';
import { CreateUserEntityOptions, User } from '../entities';

@Injectable()
export class UsersService {
  constructor(protected readonly _em: EntityManager) {}

  async createUsers(createUserDto: CreateUserDto): Promise<any> {
    const user = this._em
      .createQueryBuilder(User, 'u')
      .insert(createUserDto)
      .execute();

    return user;
  }

  async createUser(
    em: EntityManager,
    createUserEntityOptions: CreateUserEntityOptions,
  ): Promise<User> {
    if (
      !(await this.checkIfUnique(
        em,
        'email',
        createUserEntityOptions.registerWithEmail.email,
      ))
    ) {
      throw new ServiceError(217, 'email', false);
    }

    const user = new User(createUserEntityOptions);
    await em.persistAndFlush(user);
    return user;
  }

  public async checkIfUnique(
    em: EntityManager,
    key: keyof User,
    value: any,
  ): Promise<boolean> {
    return (await em.count(User, { [key]: value })) === 0;
  }

  async findOne(em: EntityManager, username: string): Promise<any> {
    const user = await em.find(User, { username: username });
    return user;
  }

  getHello(): string {
    return 'Hello World!';
  }
}

