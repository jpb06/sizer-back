import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthenticationModule } from './business/authentication/authentication.module';
import { LoggedUserMiddleware } from './business/authentication/middlewares/logged-user.middleware';
import { LoggedUserModule } from './business/logged-user/logged-user.module';

@Module({
  imports: [AuthenticationModule, LoggedUserModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggedUserMiddleware).forRoutes('*');
  }
}
