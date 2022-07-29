import { EntityManager } from '@mikro-orm/postgresql';
import {
  Controller,
  Get,
} from '@nestjs/common';
import { UsersService } from '../services';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly em: EntityManager,
  ) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }
}
