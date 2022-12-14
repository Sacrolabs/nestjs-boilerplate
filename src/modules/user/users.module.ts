import { forwardRef, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as usersControllers from './controller';
import { User } from './entities';
import { UsersService } from './services';
import { ConfirmationToken } from '../auth/entities';

@Module({
  controllers: Object.values(usersControllers),
  exports: [UsersService],
  imports: [
    MikroOrmModule.forFeature({
      entities: [User, ConfirmationToken],
    }),
  ],
  providers: [UsersService],
})
export class UsersModule {}
