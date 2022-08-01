import { EntityManager } from '@mikro-orm/postgresql';
import {
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { User } from '../entities';
import { UsersService } from '../services';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly em: EntityManager,
  ) {}

  @Get("user/:username")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async getUser( @Param("username") username: string, em:EntityManager): Promise<User> {
    return this.usersService.findOne(em,username);
  }
}
