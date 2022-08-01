import { forwardRef, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as authController from './controller';
import { AuthService, GeneratorService } from './service';
import * as moduleEntities from './entities';
import { UsersService } from '../user/services';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../user/users.module';
import { jwtConstants } from './constant/constant';
import { User } from './../user/entities';
// import { loadStrategy } from './strategies';

@Module({
  controllers: Object.values(authController),
  exports: [AuthService, JwtStrategy, PassportModule],
  imports: [
    // JwtModule,
    MikroOrmModule.forFeature({
      entities: [...Object.values(moduleEntities), User],
    }),
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy, PassportModule, GeneratorService],
})
export class AuthModule { }
