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

  public async getUserByEmailAndPassword(
    em: EntityManager,
    email: string,
    password: string,    
  ): Promise<User> {
    const user = await em.findOne(
      User,
      {
        email,
      },
    );
    if (!user) {
      throw new ServiceError(216, "user does not exist");
    }
    return user;
  }

  public async checkIfUnique(
    em: EntityManager,
    key: keyof User,
    value: any,
  ): Promise<boolean> {
    return (await em.count(User, { [key]: value })) === 0;
  }

  public async findOne(em: EntityManager, username: string): Promise<any> {
    const user = await this._em
      .createQueryBuilder(User,"u")
      .where({username:username})
      .execute()
    return user;
  }

  getHello(): string {
    return 'Hello World!';
  }
}

