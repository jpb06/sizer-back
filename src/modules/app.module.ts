import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { SubjectModule } from '@business/subject/subject.module';

import { AuthenticationModule } from './business/authentication/authentication.module';
import { LoggedUserMiddleware } from './business/authentication/middlewares/logged-user.middleware';
import { ChapterModule } from './business/chapter/chapter.module';
import { LoggedUserModule } from './business/logged-user/logged-user.module';

@Module({
  imports: [
    AuthenticationModule,
    LoggedUserModule,
    ChapterModule,
    SubjectModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggedUserMiddleware).forRoutes('*');
  }
}
