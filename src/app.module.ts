import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config'
import { CreateAccountController } from './controllers/create-account.controller';
import { envSchema } from './env';
import { AuthenticateController } from './controllers/authenticate.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { CreateQuestionController } from './controllers/create-question.controller';
import { ListRecentQuestionController } from './controllers/list-recent-question.controller';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true
  }),
AuthModule
],
  controllers: [CreateAccountController, AuthenticateController, CreateQuestionController, ListRecentQuestionController],
  providers: [PrismaService],
})
export class AppModule { }
