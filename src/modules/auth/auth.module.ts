import { forwardRef, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as authController from './controller';
import { AuthService } from './service';
import * as moduleEntities from './entities';
import { UsersService } from '../user/services';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../user/users.module';
import { jwtConstants } from './constant/constant';
import { User } from './../user/entities';

@Module({
  controllers: Object.values(authController),
  exports: [AuthService],
  imports: [
    JwtModule,
    MikroOrmModule.forFeature({
      entities: [...Object.values(moduleEntities), User],
    }),
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule {}
