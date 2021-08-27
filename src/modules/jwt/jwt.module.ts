import { Module } from '@nestjs/common';

import { CacheModule } from '@modules/cache/cache.module';

import { JwtService } from './jwt.service';

@Module({
  imports: [CacheModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
