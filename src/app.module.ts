import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [MikroOrmModule.forRoot(), UsersModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
